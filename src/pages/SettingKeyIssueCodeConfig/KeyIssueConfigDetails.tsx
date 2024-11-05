import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Card, Title, TitleContainer } from "../../styles/styledTableLayout";
import { fetchKeyIssueInfo, keyIssueAtom } from "../../recoil/atoms/setting";
import { useRecoilState } from "recoil";

// 키발급코드 상세정보
const KeyIssueConfigDetails: React.FC = () => {
  const { state } = useLocation();
  const [recoilData, setRecoilData] = useRecoilState(keyIssueAtom);
  const [key, setKey] = useState<string[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchKeyIssueInfo({
          configType: "KEYISSUE",
          keyisId: state.keyis_id,
        });

        if (result) {
          setRecoilData(result.body.keyissueConfig);
          setKey(Object.keys(result.body.keyissueConfig));
        }
      } catch (error) {
        console.error("Error fetching script info:", error);
      }
    };
    fetchData();
  }, [state]);

  return (
    <>
      <Card>
        <TitleContainer>
          <Title>키발급코드 상세정보</Title>
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

export default KeyIssueConfigDetails;
