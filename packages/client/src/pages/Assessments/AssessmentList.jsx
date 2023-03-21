/* eslint-disable no-console */
import React, { useEffect, useMemo, useState } from 'react';
import { useTable } from 'react-table';
import 'bootstrap/dist/css/bootstrap.min.css';
import { set } from 'react-hook-form';
import { AssessmentService } from '../../services/AssessmentService';

export const AssessmentList = () => {

  const [ assessments, setAssessments ] = useState([]);

  // fetch all assessments using the AssessmentService.getList function from OCAT/client/services/AssessmentService.js
  useEffect(() => {
    const fetchAssessments = async () => {
      setAssessments(await AssessmentService.getList());
      console.log(`Inside the Client side `);
    };
    fetchAssessments();
  }, []);

  useEffect(() => {
    console.log(`Assessments updated:`, assessments);
  }, [ assessments ]);

  const columns = useMemo(
    () => [
      {
        Header: `Cat Name`,
        accessor: `catName`,
      },
      {
        Header: `Date of Birth`,
        accessor: `catDateOfBirth`,
      },
      {
        Header: `Instrument`,
        accessor: `instrumentType`,
      },
      {
        Header: `Score`,
        accessor: `score`,
      },
      {
        Header: `Risk Level`,
        accessor: `riskLevel`,
      },
      {
        Header: `Creation Date`,
        accessor: `createdAt`,
      },
    ],
    []
  );
  const data = useMemo(
    () => assessments,
    [ assessments ]
  );
  const tableInstance = useTable({ columns, data });

  const {
    getTableBodyProps,
    getTableProps,
    headerGroups,
    prepareRow,
    rows,
  } = tableInstance;

  async function handleDelete(id) {
    const res = await AssessmentService.deleteAssessment(id);
    const returned = await AssessmentService.getList();
    setAssessments(returned);
  }

  return (
    <div>
      <h1>Assessment List</h1>
      <table {...getTableProps()} className="table table-striped">
        <thead>
          {headerGroups.map((headerGroup) =>
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) =>
                <th {...column.getHeaderProps()}>
                  {column.render(`Header`)}
                </th>)}
              <th>Delete</th>
            </tr>)}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) =>
                  <td {...cell.getCellProps()}>{cell.render(`Cell`)}</td>)}
                <td>
                  <button onClick={() => handleDelete(row.original.id)}>
                    <i className="bi bi-trash" aria-hidden="true" />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
