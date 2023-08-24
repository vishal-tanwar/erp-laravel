import React from 'react';
import '../Item master/style.css';
import { Container, Row, Col } from 'react-bootstrap';

const CreateItemR = () => {
  const data = [
    { Mcc: 1, Sm: 'pratik', Stg: 21, StageName: 'A', MkReady: '123-456-7890', prodnTime: '123 Street, City', Machine: 'abc', Name: 'Pratik', Ups:'123', Remark: 'ok' },
    { Mcc: 2, Sm: 'pratik', Stg: 22, StageName: 'B', MkReady: '123-456-7890', prodnTime: '123 Street, City', Machine: 'abc', Name: 'Pratik', Ups:'123', Remark: 'ok' },
    { Mcc: 3, Sm: 'pratik', Stg: 23, StageName: 'C', MkReady: '123-456-7890', prodnTime: '123 Street, City', Machine: 'abc', Name: 'Pratik', Ups:'123', Remark: 'ok' },
    { Mcc: 4, Sm: 'pratik', Stg: 23, StageName: 'C', MkReady: '123-456-7890', prodnTime: '123 Street, City', Machine: 'abc', Name: 'Pratik', Ups:'123', Remark: 'ok' },
    { Mcc: 5, Sm: 'pratik', Stg: 23, StageName: 'C', MkReady: '123-456-7890', prodnTime: '123 Street, City', Machine: 'abc', Name: 'Pratik', Ups:'123', Remark: 'ok' },
    // Add more data rows as needed
  ];
  return (
    <Container>
      <div className="container-div">
        <h1 className="mapping_heading">Item Wise Stage Mapping (Stage Linking)</h1>
        <p className="entry-routine">Item Wise Stage Entry Routine</p>
        <hr />

        <div className="containerr">
          <div className='mathFF'>
            <div class="row mb-3 heading-div">
              Item Wise Stage Entry Routine <label for="inputEmail3" class="col-sm-2 col-form-label lable-top">Doc No.</label>
              <div class="col-sm-2">
                <input type="text" class="form-control heading-input" id="inputEmail3" />
              </div>
              <label for="inputEmail3" class="col-sm-2 col-form-label lable-top">Date:</label>
              <div class="col-sm-2">
                <input type="date" class="form-control heading-input" id="inputEmail3" />
              </div>
            </div>


            <div class="row mb-3 heading-div">
              Cycle Time in Mintues For Min Lot Size <label for="inputEmail3" class="col-sm-2 col-form-label lable-bottom">ERP Code.</label>
              <div class="col-sm-2">
                <input type="text" class="form-control input-bottom" id="inputEmail3" />
              </div>
              <label for="inputEmail3" class="col-sm-2 col-form-label lable-bottom">Item Code:</label>
              <div class="col-sm-2">
                <input type="text" class="form-control input-bottom" id="inputEmail3" />
              </div>
            </div>

            <div class="row mb-3 heading-div">
              Ctrl+i to insert
              <div class="col-sm-2">
                <input type="text" class="form-control placeholder" id="inputEmail3" placeholder='Pending items' />
              </div>
              <label for="inputEmail3" class="col-sm-2 col-form-label item-name">Item Name:</label>
              <div class="col-sm-2">
                <input type="text" class="form-control item-input" id="inputEmail3" />
              </div>
            </div>
          </div>
        </div>

        <div className="content-div">
        <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Mc.C</th>
            <th>Sm</th>
            <th>Stg</th>
            <th>Stage Name</th>
            <th>MK. Ready</th>
            <th>prodn. Time</th>
            <th>Machine</th>
            <th>Name</th>
            <th>Ups</th>
            <th>Remark</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id}>
              <td>{row.Mcc}</td>
              <td>{row.Sm}</td>
              <td>{row.Stg}</td>
              <td>{row.StageName}</td>
              <td>{row.MkReady}</td>
              <td>{row.prodnTime}</td>
              <td>{row.Machine}</td>
              <td>{row.Name}</td>
              <td>{row.Ups}</td>
              <td>{row.Remark}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
        </div>
      </div>
    </Container>
  );
};

export default CreateItemR;