/* eslint-disable prettier/prettier */
import { React, useState, useEffect, useRef } from 'react';
import { View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { useQuery } from 'react-query';
import Modal from './Modal';
import dashboardService from '../../utils/dashboardService';

import LoadingWheel from '../LoadingWheel/LoadingWheel';

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
  if (billData.title === '') {return <View/>;}

  return (
    <Modal hasCloseBtn={true} isOpen={isOpen} onClose={onClose}>
      <View>
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
        <RelatedInterest relatedInterest={billData.RelatedInterest} />
      </View>
    </Modal>
  );
};

const Title = (props) => {
  const title = props.title;

  return (
    <View>
      <Text>
        Title: {title}
      </Text>
    </View>
  );
};

const TypeAndCommittee = (props) => {
  const type = props.type;
  const number = props.number;
  const committee = props.committee;

  return (
    <View>
      <Text>
        Type+Committee: {type}.{number}, {committee}
      </Text>
    </View>
  );
};

const LastUpdated = (props) => {
  const lastUpdated = props.lastUpdated;

  return (
    <View>
      <Text>
        Last updated:
        {lastUpdated}
      </Text>
    </View>
  );
};

const CongressNum = (props) => {
  const congressNum = props.congressNum;

  // TODO: Update to do th or st.
  // TODO: Make superscript

  return (
    <View>
      <Text>
        Congress Num:
        {congressNum}th Congress
      </Text>
    </View>
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
      'summaryData',
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
    return <View/>;
  } else if (summary.summaries.length === 0) {
    return <View>No Summary</View>;
  } else {
    return (
      <View>
        <Text>Summary:</Text>
        {/* Format string into html object. */}
        <View dangerouslySetInnerHTML={{ __html: summary.summaries[0].text }} />
      </View>
    );
  }
};

const Sponsor = (props) => {
  const sponsor = props.sponsor;

  return (
    <View>
      <Text>Sponsor: {sponsor}</Text>
    </View>
  );
};

const Cosponsors = (props) => {
  const cosponsors = props.cosponsors;

  return (
    <View>
      <Text>Cosponsor:</Text>
      {cosponsors.map((cosponsor) => (
        <Text key={cosponsor}>{cosponsor},</Text>
      ))}
    </View>
  );
};

const RelatedInterest = (props) => {
  const relatedInterest = props.relatedInterest;

  return (
    <View>
      <Text>Related Interest: {relatedInterest}</Text>
    </View>
  );
};

const BillAmendments = (props) => {
  return <View></View>;
};

const BillActions = (props) => {
  return <View></View>;
};

const RelatedSubjects = (props) => {
  return <View></View>;
};

const AccessVotes = (props) => {
  return <View></View>;
};

export default BillModal;
