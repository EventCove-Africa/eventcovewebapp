/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import DescriptionBar from "../../../../components/DescriptionBar";
import {
  _handleThrowErrorMessage,
  isArrayEmpty,
  isObjectEmpty,
} from "../../../../utils";
import { Export, Trash } from "iconsax-react";
import Button from "../../../../components/FormComponents/Button";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { appUrls } from "../../../../services/urls";
import { api } from "../../../../services/api";
import SkeletonLoader from "../../../../components/EventCard/components/SkeletonLoader";
import RenderEventDetails from "./components/RenderEventDetails";
import RenderTicketsStatForEvents from "./components/RenderTicketsStatForEvents";
import useEventHook from "../../../../hooks/useEventHook";
import CopyToClipboard from "../../../../components/CopyToClipboard";

export default function EventDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    handleGetEventDetails,
    allEventDetails,
    loadingEventDetails,
    setLoadingEventDetails,
    handleGetEventTeamMembers,
    handleGetEventTicketSalesStats,
    eventTeamMembers,
    eventTeamMembersUrl,
  } = useEventHook();
  const isEventPublised = allEventDetails?.published;
  const isReadyForPublish = allEventDetails?.hasTicketType && !isEventPublised;
  const NOT_COMPLETED = allEventDetails?.status !== "completed";
  const isShowDeleteButton =
    !isObjectEmpty(allEventDetails) &&
    !allEventDetails?.soldTicket &&
    !allEventDetails?.deleted &&
    !loadingEventDetails?.event &&
    NOT_COMPLETED &&
    !isEventPublised;

  const handlePublishEvent = async () => {
    const payload = {
      eventId: id,
    };
    const pusblishUnpublish = isEventPublised ? "unpublish" : "publish";
    setLoadingEventDetails((prev) => ({
      ...prev,
      publish: !loadingEventDetails?.publish,
    }));
    try {
      const { status, data } = await api.post(
        appUrls.EVENT_URL + `/${pusblishUnpublish}`,
        payload
      );
      const message = data?.data;
      if ([200, 201].includes(status)) {
        handleGetEventDetails(id);
        toast.success(message);
      }
    } catch (error: any) {
      toast.error(_handleThrowErrorMessage(error?.data?.message));
    } finally {
      setLoadingEventDetails((prev) => ({
        ...prev,
        publish: !!loadingEventDetails?.publish,
      }));
    }
  };

  const handleExportEvent = async () => {
    setLoadingEventDetails((prev) => ({
      ...prev,
      export: !loadingEventDetails?.export,
    }));
    try {
      const { status, data } = await api.get(appUrls.EXPORT_URL + `/${id}`);
      const message = data?.data;
      if ([200, 201].includes(status)) {
        toast.success(message);
      }
    } catch (error: any) {
      toast.error(_handleThrowErrorMessage(error?.data?.message));
    } finally {
      setLoadingEventDetails((prev) => ({
        ...prev,
        export: !!loadingEventDetails?.export,
      }));
    }
  };

  const handleCancelEvent = async () => {
    setLoadingEventDetails((prev) => ({
      ...prev,
      delete: !loadingEventDetails?.delete,
    }));
    try {
      const { status, data } = await api.post(
        appUrls.EVENT_URL + `/delete/${id}`
      );
      const message = data?.data;
      if ([200, 201].includes(status)) {
        toast.success(message);
        handleGetEventDetails(id);
      }
    } catch (error: any) {
      toast.error(_handleThrowErrorMessage(error?.data?.message));
    } finally {
      setLoadingEventDetails((prev) => ({
        ...prev,
        delete: !!loadingEventDetails?.delete,
      }));
    }
  };

  useEffect(() => {
    let mounted = false;
    (async () => {
      mounted = true;
      if (mounted) {
        handleGetEventDetails(id);
        handleGetEventTeamMembers(id);
        handleGetEventTicketSalesStats(id);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [id]);

  const classNameImageBannerLoader =
    "h-[200px] sm:h-[300px] md:h-[300px] lg:h-[300px] xl:h-[300px]";
  const classNameGridEventDetails =
    "w-full grid md:grid-cols-3 grid-cols-1 gap-3 mt-4";

  const renderSkeletonLoaderForEventDetails = () => {
    if (!loadingEventDetails?.event) return null;

    return (
      <>
        <SkeletonLoader
          count={1}
          className={`w-full flex justify-between ${classNameImageBannerLoader} rounded-md`}
        />
        <SkeletonLoader
          count={1}
          className="w-full flex justify-between h-[30px] rounded-md"
        />

        <div className={classNameGridEventDetails}>
          <SkeletonLoader
            count={6}
            className="md:w-1/3 h-[60px] rounded-md mt-4"
          />
        </div>

        {[...Array(2)].map((_, index) => (
          <SkeletonLoader
            key={index}
            count={1}
            className="md:w-1/3 h-[60px] rounded-md mt-4"
          />
        ))}
      </>
    );
  };

  return (
    <div className="w-full h-full">
      <div className="w-full flex md:flex-row flex-col justify-between mb-3">
        <DescriptionBar text="Get the full picture of your event 🌟" />
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="px-3 py-2 bg-primary_300 text-primary_100 rounded-md flex items-center justify-center self-end gap-1 text-sm"
            aria-label="Export details"
            onClick={handleExportEvent}
            disabled={loadingEventDetails?.export}
          >
            <Export size={20} className="text-primary_100" />
            <span>
              {loadingEventDetails?.export
                ? "Exporting....."
                : "Export details"}
            </span>
          </button>
          {isShowDeleteButton && (
            <button
              type="button"
              className="px-3 py-2 bg-primary_300 text-primary_100 rounded-md flex items-center justify-center self-end gap-1 text-sm"
              aria-label="Export details"
              onClick={handleCancelEvent}
              disabled={loadingEventDetails?.delete}
            >
              <Trash size={20} className="text-primary_100" />
              <span>
                {loadingEventDetails?.delete ? "Deleting....." : "Delete Event"}
              </span>
            </button>
          )}
        </div>
      </div>
      <div className="w-full flex lg:flex-row flex-col gap-4">
        <div className="bg-white w-full h-full rounded-xl p-3">
          {renderSkeletonLoaderForEventDetails()}
          <RenderEventDetails
            allEventDetails={allEventDetails}
            classNameImageBannerLoader={classNameImageBannerLoader}
            classNameGridEventDetails={classNameGridEventDetails}
            loadingEventDetails={loadingEventDetails?.event}
          />
        </div>
        <div className="flex flex-col gap-3 w-full">
          <RenderTicketsStatForEvents eventId={id} />
          {id &&
            !loadingEventDetails?.event &&
            !isArrayEmpty(eventTeamMembers) && (
              <>
                <h4 className="text-dark_200 font-bold md:text-base text-sm">
                  Existing Team members{" "}
                </h4>
                <div className="flex gap-3 items-center flex-wrap">
                  {eventTeamMembers?.map((d: any, id: number) => {
                    return (
                      <div
                        key={id}
                        className="px-3 py-2 text-grey_100 border font-semibold border-pink_200 bg-pink_100 rounded-md flex gap-4 items-center justify-between text-xs"
                      >
                        Email: {d.email} <br />
                        Password: {d.password}
                      </div>
                    );
                  })}
                </div>
                <div className="mt-2">
                  <h3 className="text-grey_100 font-normal text-sm">
                    Share the login link with your team members for tickets
                    validations!
                  </h3>
                  <div className="w-full h-auto rounded-lg bg-primary_300 p-3 flex justify-between items-center border border-dotted border-grey_100 text-primary_100 mt-2 font-normal text-sm flex-wrap">
                    <div className="flex-1 break-all">
                      {eventTeamMembersUrl}
                    </div>
                    <CopyToClipboard
                      text={eventTeamMembersUrl}
                      size="20"
                      color="text-primary_100"
                    />
                  </div>
                  <div className="mt-4">
                    <h3 className="text-grey_100 font-normal text-sm">
                      As an Event organizer you can validate tickets too. Click{" "}
                      <span
                        onClick={() =>
                          navigate(`/tickets-validation/${id}`, {
                            state: "EVENT_ORGANIZER",
                          })
                        }
                        className="text-primary_100 cursor-pointer hover:border-b border-primary_100"
                      >
                        here{" "}
                      </span>
                      to validate tickets
                    </h3>
                  </div>
                </div>
              </>
            )}
        </div>
      </div>
      {!loadingEventDetails?.event && (
        <div className="flex gap-2 items-center mt-4">
          {isReadyForPublish && (
            <Button
              title={`Publish Event`}
              type="button"
              isLoading={loadingEventDetails?.publish}
              onClick={() => handlePublishEvent()}
            />
          )}
          {isEventPublised && NOT_COMPLETED && (
            <Button
              title={`Unpublish Event`}
              type="button"
              isLoading={loadingEventDetails?.publish}
              onClick={() => handlePublishEvent()}
            />
          )}
          {NOT_COMPLETED && (
            <Button
              title="Create Ticket"
              type="button"
              onClick={() =>
                navigate(`/app/tickets/add/${allEventDetails?.eventId}`, {
                  state: allEventDetails?.eventId,
                })
              }
            />
          )}
          {["upcoming"].includes(allEventDetails?.status) && (
            <Button
              title="Edit Event"
              type="button"
              backgroundColor="bg-primary_300"
              textColor="text-primary_100"
              className="border border-dark_100"
              onClick={() =>
                navigate(`/app/events/edit/${allEventDetails?.eventId}`)
              }
            />
          )}
        </div>
      )}
    </div>
  );
}
