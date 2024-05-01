"use client";
import MeetingRoom from "@/components/MeetingRoom";
import { MeetingSetup } from "@/components/MeetingSetup";
import Loader from "@/components/ui/Loader";
import { useCallById } from "@/hooks/useCallById";
import { useUser } from "@clerk/nextjs";
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
import { useState } from "react";

function Meeting({ params: { id } }: { params: { id: string } }) {
  const { user, isLoaded } = useUser();
  const [isSetUpCompleted, setIsSetUpCompleted] = useState(false);
  const { call, isCallLoading } = useCallById(id);

  if (!isLoaded || isCallLoading) return <Loader />;
  return (
    <main className="h-screen w-full">
      <StreamCall call={call}>
        <StreamTheme>
          {!isSetUpCompleted ? (
            <MeetingSetup setIsSetUpCompleted={setIsSetUpCompleted} />
          ) : (
            <MeetingRoom />
          )}
        </StreamTheme>
      </StreamCall>
    </main>
  );
}

export default Meeting;
