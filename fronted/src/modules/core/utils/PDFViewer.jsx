import PropTypes from "prop-types";
import { SpecialZoomLevel, Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

export const PDFViewer = ({ fileUrl, pageFit, pageWidth }) => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  let specialZoomLevel;
  if (pageFit) {
    specialZoomLevel = SpecialZoomLevel.PageFit;
  } else if (pageWidth) {
    specialZoomLevel = SpecialZoomLevel.PageWidth;
  }

  return (
    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
      <Viewer defaultScale={specialZoomLevel !== "" ? specialZoomLevel : undefined} fileUrl={fileUrl} plugins={[defaultLayoutPluginInstance]} />
    </Worker>
  );
};

PDFViewer.propTypes = {
  fileUrl: PropTypes.string.isRequired,
  pageFit: PropTypes.bool,
  pageWidth: PropTypes.bool,
};
