import MainCard from "components/MainCard";
import React, { useEffect, useState } from "react";
import { CustomOverlayMap, Map, MapMarker, MarkerClusterer, useKakaoLoader } from "react-kakao-maps-sdk";
import { API_POST, customFetch, formDataFetch } from "utils/common-api";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { DataGrid } from "@mui/x-data-grid";
import { workerColumn } from "pages/worker/worker-column";
import { CustomToolbar } from "components/utilItem/custom-toolbar";
import { koKR } from '@mui/x-data-grid/locales';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import Box from '@mui/material/Box';
import SearchOutlined from '@ant-design/icons/SearchOutlined';



export default function ShowMap() {
  useKakaoLoader();

  const [hotleList, setHotelList] = useState([]);
  const [positions, setPositions] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null); // 선택된 호텔 하나만 저장
  const [markerPosition, setMarkerPosition] = useState(null); // 마커 위치 저장
  const [workerRows, setWorkerRows] = useState([]);
  const [address, setAddress] = useState("");
  const [mapCenter, setMapCenter] = useState({ center: { lat: 37.564214, lng: 127.001699 } });

  const searchHotel = () => {
    customFetch({ path: "/hotel/workers/list", method: "GET" }).then((res) => {
      if (res.status === 200) {
        res.json().then((result) => {
          setHotelList([...result]);
        });
      }
    });
  };

  const handleMakerClick = (id, position) => {
    customFetch({ path: "/hotel/workers/" + id, method: "GET" }).then((res) => {
      if (res.status === 200) {
        res.json().then((result) => {
          if (result.workers.length > 0) {
            setMarkerPosition(position);
            setSelectedHotel(result);
            setWorkerRows([...result.workers]);
          } else {
            setSelectedHotel(null);
          }
        });
      }
    });
  };

  const handleInputChange = (event) => {
    setAddress(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && address) {
      searchMap(address);
    }
  };

  const searchMap = (address) => {
    var geocoder = new kakao.maps.services.Geocoder();

    geocoder.addressSearch(address, function (result, status) {
      if (status === kakao.maps.services.Status.OK) {
        const coords = {
          lat: parseFloat(result[0].y),
          lng: parseFloat(result[0].x),
        };

        setMapCenter({
          center: { lat: coords.lat, lng: coords.lng }
        })
      }
    });
  };



  useEffect(() => {
    // 컴포넌트가 마운트될 때 API를 호출하여 호텔 리스트를 가져옵니다.
    searchHotel();
  }, []);

  useEffect(() => {
    const geocoder = new window.kakao.maps.services.Geocoder();

    const fetchCoordinates = async () => {
      const coordPromises = hotleList.map((hotel) => {
        return new Promise((resolve) => {
          geocoder.addressSearch(hotel.address, (res, status) => {
            if (status === window.kakao.maps.services.Status.OK) {
              resolve({
                lat: res[0].y,
                lng: res[0].x,
                id: hotel.hotelId,
                hotelName: hotel.hotelName, // 호텔 이름도 저장
                workers: hotel.workers
              });
            } else {
              resolve(null);
            }
          });
        });
      });

      const coords = await Promise.all(coordPromises);
      setPositions(coords.filter((pos) => pos !== null));
    };


    if (hotleList.length > 0) fetchCoordinates();
  }, [hotleList]);

  return (
    <MainCard
      sx={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        overflow: 'hidden', // 스크롤 숨기기
      }}
    >
      <Box sx={{ width: '100%', ml: { xs: 0, md: 1 } }}>
        <FormControl sx={{ width: { xs: '100%', md: 224 } }}>
          <OutlinedInput
            size="small"
            startAdornment={
              <InputAdornment position="start" sx={{ mr: -0.5 }}>
                <SearchOutlined />
              </InputAdornment>
            }
            aria-describedby="header-search-text"
            inputProps={{
              'aria-label': 'weight'
            }}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
        </FormControl>
      </Box>
      <Map
        id="map"
        center={mapCenter.center}
        style={{
          width: "1000px",
          height: "500px",
        }}
        level={8}
      >
        <MarkerClusterer
          averageCenter={true}
          minLevel={10}
        >
          {positions.map((position, index) => {
            if (position.workers && position.workers.length > 0) {
              return (
                <MapMarker
                  key={index}
                  position={{ lat: position.lat, lng: position.lng }}
                  clickable={true}
                  onClick={() => handleMakerClick(position.id, { lat: position.lat, lng: position.lng })}
                  opacity={1}
                  style={{
                    width: "30px",  // 마커 크기
                    height: "30px", // 마커 크기
                    backgroundColor: "red", // 마커 색상
                    borderRadius: "50%", // 원형 마커로 만들기
                    border: "2px solid #fff", // 흰색 테두리
                    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)", // 그림자 추가
                    cursor: "pointer", // 마우스 커서 스타일
                  }}
                >
                  <div
                    style={{
                      padding: "5px",
                      width: "150px",
                      borderRadius: "5px",
                      boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)",
                      position: "relative",
                      textAlign: "center",
                    }}
                  >
                    <div className="title" style={{ fontWeight: "bold", fontSize: "14px", paddingRight: "25px" }}>
                      {position.hotelName}
                      ({position.workers.length})
                    </div>
                  </div>
                </MapMarker>

              );
            }
            return null; // workers가 비어있거나 없으면 아무것도 렌더링하지 않음
          })}
        </MarkerClusterer>
      </Map>
      <MainCard sx={{ height: '100%', overflow: 'hidden' }}>
        <Box sx={{ height: '100%', width: '100%' }}>
          <DataGrid
            rows={workerRows}
            columns={workerColumn}
            initialState={{
              density: "compact",
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5]}
            disableRowSelectionOnClick
            sx={{
              minHeight: '300px',  // 빈 행일 때 최소 높이 설정
              '& .MuiDataGrid-cell, & .MuiDataGrid-columnSeparator': {
                borderColor: '#ddd',
              },
              '& .MuiDataGrid-columnHeaders': {
                borderBottom: '1px solid #ddd',
              },
            }}
            localeText={koKR.components.MuiDataGrid.defaultProps.localeText}
          // onRowClick={onWorkerRowClick}
          />
        </Box>
      </MainCard>
    </MainCard>
  );
}
