import { splitter_service } from "../../config";
import VoiceTimestamper from "./ivoicetimestamper";
import GCloudVoiceTimestamper from "./gcloudvoicetimestamper";

enum TimestamperServiceType {
  GCloud = "gcloud",
}

type TimestamperServiceTypeEntry = keyof typeof TimestamperServiceType;

const splitterServiceType =
  TimestamperServiceType[splitter_service as TimestamperServiceTypeEntry] ||
  TimestamperServiceType.GCloud;

function toService(splitterType: TimestamperServiceType): VoiceTimestamper {
  switch (splitterType) {
    case TimestamperServiceType.GCloud:
      return new GCloudVoiceTimestamper();
  }
}

export default toService(splitterServiceType);
