'use client';

import { useCallback, useState } from 'react';
import { useResizeObserver } from '@wojtekmaj/react-hooks';
import { pdfjs, Document, Page } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import  { PDFDocumentProxy } from 'pdfjs-dist';
import './Sample.css';

export default function Sample({uploadedPdf}){
  const [numPages, setNumPages] = useState();
  const [containerWidth, setContainerWidth] = useState(600);
  const maxWidth = 800;


  const options = {
    cMapUrl: '/cmaps/',
    standardFontDataUrl: '/standard_fonts/',
    cMapPacked: true,

  }; 

  console.log('file' , uploadedPdf);
  const onDocumentLoadSuccess = ({ numPages: nextNumPages }) => {
    setNumPages(nextNumPages);
  }

  return (
  <div style={{ border:'1px solid lightgray'}}> <Document file={uploadedPdf} onLoadSuccess={onDocumentLoadSuccess}>
              {Array.from(new Array(numPages), (_el, index) => (
              <Page  
                key={`page_${index + 1}`}
                pageNumber={index + 1}
                width={containerWidth ? Math.min(containerWidth, maxWidth) : maxWidth}
              />
            ))}
            </Document> </div>
)
}
