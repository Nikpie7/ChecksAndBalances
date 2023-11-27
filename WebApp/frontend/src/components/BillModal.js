import { React, useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useQuery } from "react-query";
import Modal from "./Modal";
import dashboardService from "../utils/dashboardService.js";

import LoadingWheel from "./LoadingWheel.js";

const BillModal = ({ isOpen, onClose, billData }) => {
  // const focusInputRef = useRef(null);
  // const [billState, setBillState] = useState(initialBillModalData);

  // useEffect(() => {
  //   if (isOpen && focusInputRef.current) {
  //     setTimeout(() => {
  //       focusInputRef.current.focus();
  //     }, 0);
  //   }
  // }, [isOpen]);

  // Check if bill title is empty. 
  if (billData.title === '') return <div></div>;


  return (
    <Modal hasCloseBtn={true} isOpen={isOpen} onClose={onClose}>
      <div>
        <Title title={billData.Title} />
        <TypeAndCommittee
          type={billData.billType}
          number={billData.BillNumber}
          committee={billData.Committee}
        />
        <LastUpdated lastUpdated={billData.LastUpdated} />
        <CongressNum congressNum={billData.CongressNum} />
        <Summary
          congressNum={billData.CongressNum}
          type={billData.BillType}
          number={billData.BillNumber}
        />
        <Sponsor sponsor={billData.Sponsor} />
        <Cosponsors cosponsors={billData.Cosponsors} />
      </div>
    </Modal>
  );
};

const Title = (props) => {
  const title = props.title;

  return (
    <div>
      <h1>{title}</h1>
    </div>
  );
};

const TypeAndCommittee = (props) => {
  const type = props.type;
  const number = props.number;
  const committee = props.committee;

  return (
    <div>
      <h2>
        {type}.{number}, {committee}
      </h2>
    </div>
  );
};

const LastUpdated = (props) => {
  const lastUpdated = props.lastUpdated;

  return (
    <div>
      <h3>{lastUpdated}</h3>
    </div>
  );
};

const CongressNum = (props) => {
  const congressNum = props.congressNum;

  // TODO: Update to do th or st.
  // TODO: Make superscript

  return (
    <div>
      <h1>{congressNum}th Congress</h1>
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
    return <div>No Summary</div>;
  } else {
    return (
      // Format string into html object.
      <div dangerouslySetInnerHTML={{ __html: summary.summaries[0].text }} />
    );
  }
};

const Sponsor = (props) => {
  const sponsor = props.sponsor;

  return (
    <div>
      <h1>Sponsor: {sponsor}</h1>
    </div>
  );
};

const Cosponsors = (props) => {
  const cosponsors = props.cosponsors;

  return (
    <div>
      Cosponsors:
      {cosponsors.map((cosponsor) => (
        <h2 key={cosponsor}>{cosponsor},</h2>
      ))}
    </div>
  );
};

const RelatedInterest = (props) => {
  const relatedInterest = props.relatedInterest;

  return (
    <div>
      <h1>{relatedInterest}</h1>
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
