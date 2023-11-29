import { React, useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useQuery } from "react-query";
import Modal from "./Modal";
import dashboardService from "../utils/dashboardService.js";

import LoadingWheel from "./LoadingWheel.js";

const BillModal = ({ isOpen, onClose, billData }) => {
  // Check if bill title is empty.
  if (billData.title === "") return <div></div>;

  return (
    <Modal hasCloseBtn={true} isOpen={isOpen} onClose={onClose}>
      <div className="ml-2">
        <div className="grid grid-cols-10 grid-rows-1">
          <div className="col-start-1 col-span-9">
            <Title title={billData.Title} />
          </div>
          <div className="col-start-10">
            <LastUpdated lastUpdated={billData.LastUpdated} />
          </div>
        </div>
        <TypeAndCommittee
          type={billData.BillType}
          number={billData.BillNumber}
          committee={billData.Committee}
        />

        <CongressNum congressNum={billData.CongressNum} />
        <Summary
          congressNum={billData.CongressNum}
          type={billData.BillType}
          number={billData.BillNumber}
        />
        <Sponsor sponsor={billData.Sponsor} />
        <Cosponsors cosponsors={billData.Cosponsors} />
        <RelatedInterest relatedInterest={billData.RelatedInterest} />
        <AccessVotes />
      </div>
    </Modal>
  );
};

const Title = (props) => {
  const title = props.title;

  return (
    <div className="mb-4">
      <h1 className="text-4xl">
        <b>{title}</b>
      </h1>
    </div>
  );
};

const TypeAndCommittee = (props) => {
  const type = props.type;
  const number = props.number;
  const committee = props.committee;

  let billType = type.toUpperCase();

  let temp = billType.split('');

  let finalBillType = temp.join('.');
  

  return (
    <div className="mb-2">
      <h2>
        <b><u>Bill Type & number</u>: </b>{finalBillType}.{number}
      </h2>
      <h2><b><u>Committee</u>: </b>{committee}</h2>
    </div>
  );
};

const LastUpdated = (props) => {
  const lastUpdated = props.lastUpdated;

  return (
    <div className="mb-2">
      <h3>
        <b><u>Last updated</u>:</b>
        <br/>
        {lastUpdated}
      </h3>
    </div>
  );
};

const CongressNum = (props) => {
  const congressNum = props.congressNum;

  // TODO: Update to do th or st.
  // TODO: Make superscript

  return (
    <div className="mb-2">
      <h1>
        <b><u>Congress Number</u>: </b>{congressNum}th Congress
      </h1>
    </div>
  );
};

const Summary = (props) => {
  const congressNum = props.congressNum;
  const type = props.type;
  const number = props.number;

  // Call API to get bill summary.
  const {
    data: summary,
    isLoading,
    isError,
  } = useQuery(
    [
      "summaryData",
      { congress: congressNum, billType: type, billNumber: number },
    ],
    () =>
      dashboardService.getGetBillSummaries({
        congress: congressNum,
        billType: type,
        billNumber: number,
      })
  );

  if (isLoading) return <LoadingWheel />;
  if (isError) return <p>Error...</p>;

  // Check if summary is empty.
  if (summary === undefined) {
    return <div></div>;
  } else if (summary.summaries.length === 0) {
    return <div className="mb-2">No Summary</div>;
  } else {
    return (
      <div className="mb-2">
        <h1>
          <b><u>Summary</u>:</b>
        </h1>
        {/* Format string into html object. */}
        <div dangerouslySetInnerHTML={{ __html: summary.summaries[0].text }} />
      </div>
    );
  }
};

const Sponsor = (props) => {
  const sponsor = props.sponsor;

  return (
    <div className="mb-2">
      <h1>
        <b><u>Sponsor</u>:</b> {sponsor}
      </h1>
    </div>
  );
};

const Cosponsors = (props) => {
  const cosponsors = props.cosponsors;

  return (
    <div className="mb-2">
      <h1>
        <b><u>Cosponsor(s)</u>:</b>
      </h1>
      {cosponsors.map((cosponsor) => (
        <div><h2 key={cosponsor}>{cosponsor},</h2></div>
      ))}
    </div>
  );
};

const RelatedInterest = (props) => {
  const relatedInterest = props.relatedInterest;

  return (
    <div>
      <h1>
        <b><u>Related Interest</u>: </b>
        {relatedInterest}
      </h1>
    </div>
  );
};

const BillAmendments = (props) => {
  return <div></div>;
};

const BillActions = (props) => {
  return <div></div>;
};

const RelatedSubjects = (props) => {
  return <div></div>;
};

const AccessVotes = (props) => {
  
  
  return <div></div>;
};

export default BillModal;
