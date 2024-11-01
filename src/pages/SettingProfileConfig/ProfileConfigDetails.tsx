import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Card, Title, TitleContainer } from "../../styles/styledTableLayout";
import { fetchProfileInfoList, profileAtom } from "../../recoil/atoms/setting";
import { useRecoilState } from "recoil";

// 프로파일 상세정보
const ProfileConfigDetails: React.FC = () => {
  const { state } = useLocation();
  const [recoilData, setRecoilData] = useRecoilState(profileAtom);
  const [key, setKey] = useState<string[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchProfileInfoList({
          configType: "PROFILE",
          profId: state.prof_id,
        });

        if (result) {
          setRecoilData(result.body.profileConfig);
          setKey(Object.keys(result.body.profileConfig));
        }
      } catch (error) {
        console.error("Error fetching profile info:", error);
      }
    };
    fetchData();
  }, [state]);

  return (
    <>
      <Card>
        <TitleContainer>
          <Title>프로파일 상세정보</Title>
        </TitleContainer>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
          <div>
            <ul style={{ padding: "50px 10px", listStyle: "none" }}>
              {key?.map((item) => (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    gap: "10px",
                    padding: "20px auto",
                    // border : '1px solid pink',
                    margin: "20px auto",
                  }}
                >
                  <li
                    style={{
                      width: "200px",
                      padding: "20px auto",
                      fontWeight: "bold",
                    }}
                  >
                    {item}
                  </li>
                  <li style={{ padding: "20px auto" }}>
                    {recoilData ? recoilData[item] : "Loading..."}
                  </li>
                </div>
              ))}
            </ul>
          </div>
          {/* <div>box 1</div> */}
        </div>
      </Card>
    </>
  );
};

export default ProfileConfigDetails;
