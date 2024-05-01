"use client";
import {
  DeviceSettings,
  useCall,
  VideoPreview,
} from "@stream-io/video-react-sdk";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";

export const MeetingSetup = ({
  setIsSetUpCompleted,
}: {
  setIsSetUpCompleted: (value: boolean) => void;
}) => {
  const [isMicCamOn, setIsMicCamOn] = useState(false);

  const call = useCall();

  if (!call) throw new Error("Use Call must be used in stramcall component");
  useEffect(() => {
    if (isMicCamOn) {
      call?.camera.disable();
      call?.microphone.disable();
    } else {
      call?.camera.enable();
      call?.microphone.enable();
    }
    // return () => {
    //   call.camera.disable();
    //   call.microphone.disable();
    // };
  }, [isMicCamOn, call?.camera, call?.microphone]);
  return (
    <div className="flex h-screen w-ful flex-col items-center justify-center gap-3 text-white">
      <h1 className="text-2xl font-bold">
        Setup
        <VideoPreview />
        <div className="flex h-16 items-center justify-center gap-3">
          <label className="flex items-center justify-center gap-2 font-medium">
            <input
              type="checkbox"
              checked={isMicCamOn}
              onChange={(e) => setIsMicCamOn(e.target.checked)}
            />
            Join with camera and microphone off
          </label>
          <DeviceSettings />
        </div>
        <Button
          className="rounded-md bg-green-500 py-2.5 px-4"
          onClick={() => {
            call.join();
            setIsSetUpCompleted(true);
          }}
        >
          Join Meeting
        </Button>
      </h1>
    </div>
  );
};
