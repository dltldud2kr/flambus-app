import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import PhotoReview from 'pages/flambus/shop/PhotoReview';
import WriteReview from 'pages/flambus/shop/WriteReview';
function CollapseTab({
  indicatorColor = '#333',
  tabList = [{
    label : '사진일지',
    screen : <PhotoReview />
  },
  {
    label : '수기일지',
    screen : <WriteReview />
  }]
}) {
  const [value, setValue] = React.useState('0');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  return (
    <div className="collapseTab">
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
          <div class="collpaseHeader">
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList
                TabIndicatorProps={{ style: { background: indicatorColor } }}
                variant="fullWidth"
                onChange={handleChange} aria-label="lab API tabs example">
                  {tabList.map((v,i)=> {
                    return(
                      <Tab style={{ color: '#333333', fontWeight: 700, fontSize: 16, fontFamily: 'Pretendard' }} label={v.label} value={i.toString()} />
                    )

                  })}

              </TabList>
            </Box>
          </div>
          {tabList.map((v,i) => {
            return(
              <TabPanel value = {i.toString()}>
             
                {v.screen}
           
              </TabPanel>
            )

          })}

        </TabContext>
      </Box>
    </div>
  )
};


export default CollapseTab;