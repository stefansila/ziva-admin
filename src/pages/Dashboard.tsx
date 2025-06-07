import React from 'react';
import Sidebar from '../components/Sidebar';
import AnxietyChart from '../components/AnxietyChart';
import RiskGroupChart from '../components/RiskGroupChart';
import AgeGroupChart from '../components/AgeGroupChart';

const Dashboard: React.FC = () => {
  return (
    <>
      <Sidebar />
      <div className="content">
        <div className="top-right">
          <div className="dh-embed">
            <svg width={20} height={19} viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g opacity="0.3" clipPath="url(#clip0_864_301)">
                <path d="M17.706 13.7598L15.606 6.18475C15.184 4.66096 14.2643 3.32221 12.9933 2.38173C11.7222 1.44125 10.173 0.95314 8.59247 0.995152C7.01189 1.03716 5.49082 1.60688 4.27156 2.61355C3.05229 3.62022 2.20495 5.00595 1.86451 6.55L0.240762 13.855C0.179888 14.1291 0.181353 14.4134 0.245049 14.6868C0.308746 14.9603 0.433046 15.216 0.608775 15.435C0.784504 15.654 1.00717 15.8307 1.26035 15.9521C1.51352 16.0735 1.79073 16.1366 2.07151 16.1365H5.17876C5.41744 16.9619 5.91784 17.6874 6.60461 18.2037C7.29137 18.72 8.12731 18.9992 8.98651 18.9992C9.84571 18.9992 10.6817 18.72 11.3684 18.2037C12.0552 17.6874 12.5556 16.9619 12.7943 16.1365H15.9C16.1891 16.1365 16.4742 16.0697 16.7332 15.9413C16.9921 15.8129 17.2179 15.6263 17.3928 15.3962C17.5677 15.1661 17.6871 14.8986 17.7416 14.6148C17.796 14.3309 17.7834 14.0383 17.706 13.7598ZM2.53876 13.8865L4.06126 7.03375C4.29445 5.9808 4.87317 5.03612 5.7053 4.35009C6.53742 3.66406 7.57512 3.2761 8.65322 3.24799C9.73131 3.21987 10.7878 3.55321 11.6546 4.19493C12.5213 4.83666 13.1485 5.74989 13.4363 6.78925L15.4073 13.8865H2.53876Z" fill="#052C58" />
              </g>
              <circle cx={16} cy={4} r={4} fill="#6D64D3" />
              <defs>
                <clipPath id="clip0_864_301">
                  <rect width={18} height={18} fill="white" transform="translate(0 1)" />
                </clipPath>
              </defs>
            </svg>
          </div>
          <div id="hamburger-trigger" className="hamburger-trigger">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <div className="gap-40">
          <div className="gap-24">
            <section className="animate-entrance animate-entrance-delay-1">
              <div className="gap-10">
                <h1 className="h1-48">Dashboard</h1>
                <p className="text-op-60">Monitor anxiety data and device performance at a glance</p>
              </div>
            </section>
            <section className="animate-entrance animate-entrance-delay-2">
              <div className="grid-4">
                <div className="grid-info-item">
                  <img src="https://global.divhunt.com/1481082635dc391f693325b372da26f3_854.svg" loading="lazy" alt="" className="info-top-icon" />
                  <span className="text-op-60">Average Anxiety</span>
                  <span className="span-item-procent">65%</span>
                  <div className="grid-info-bottom">
                    <div className="info-bottom-arrow">
                      <svg width={14} height={14} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_864_215)">
                          <path d="M11.9584 3.5H9.04171C8.55871 3.5 8.16671 3.892 8.16671 4.375C8.16671 4.858 8.55871 5.25 9.04171 5.25H11.0128L7.58338 8.67942L5.18063 6.27667C4.57571 5.67175 3.59105 5.67175 2.98613 6.27667L0.256131 9.00608C-0.0857025 9.34792 -0.0857025 9.9015 0.256131 10.2433C0.597964 10.5852 1.15155 10.5852 1.49338 10.2433L4.0828 7.65392L6.48555 10.0567C6.7883 10.3594 7.18496 10.5105 7.5828 10.5105C7.98063 10.5105 8.3773 10.3588 8.68005 10.0567L12.2495 6.48725V8.45833C12.2495 8.94133 12.6415 9.33333 13.1245 9.33333C13.6075 9.33333 13.9995 8.94133 13.9995 8.45833V5.54167C13.9995 4.41583 13.0842 3.5 11.9584 3.5Z" fill="#EF4444" />
                        </g>
                        <defs>
                          <clipPath id="clip0_864_215">
                            <rect width={14} height={14} fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                    <span className="text-12 text-color-red">13%</span>
                    <span className="text-12">vs last week</span>
                  </div>
                </div>
                <div className="grid-info-item">
                  <img src="https://global.divhunt.com/c3dc21a94f7349a68bcfd27b3b5518d3_1308.svg" loading="lazy" alt="" className="info-top-icon" />
                  <span className="text-op-60">Active Users</span>
                  <span className="span-item-procent">90%</span>
                  <div className="grid-info-bottom">
                    <div className="info-bottom-arrow">
                      <svg width={14} height={14} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_864_215)">
                          <path d="M11.9584 3.5H9.04171C8.55871 3.5 8.16671 3.892 8.16671 4.375C8.16671 4.858 8.55871 5.25 9.04171 5.25H11.0128L7.58338 8.67942L5.18063 6.27667C4.57571 5.67175 3.59105 5.67175 2.98613 6.27667L0.256131 9.00608C-0.0857025 9.34792 -0.0857025 9.9015 0.256131 10.2433C0.597964 10.5852 1.15155 10.5852 1.49338 10.2433L4.0828 7.65392L6.48555 10.0567C6.7883 10.3594 7.18496 10.5105 7.5828 10.5105C7.98063 10.5105 8.3773 10.3588 8.68005 10.0567L12.2495 6.48725V8.45833C12.2495 8.94133 12.6415 9.33333 13.1245 9.33333C13.6075 9.33333 13.9995 8.94133 13.9995 8.45833V5.54167C13.9995 4.41583 13.0842 3.5 11.9584 3.5Z" fill="#EF4444" />
                        </g>
                        <defs>
                          <clipPath id="clip0_864_215">
                            <rect width={14} height={14} fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                    <span className="text-12 text-color-red">3%</span>
                    <span className="text-12">vs last week</span>
                  </div>
                </div>
                <div className="grid-info-item">
                  <img src="https://global.divhunt.com/e8ec8e7bc5b8664017043166e999de97_631.svg" loading="lazy" alt="" className="info-top-icon" />
                  <span className="text-op-60">Active Devices</span>
                  <span className="span-item-procent">90%</span>
                  <div className="grid-info-bottom">
                    <div className="info-bottom-arrow">
                      <svg width={14} height={14} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_864_215)">
                          <path d="M11.9584 3.5H9.04171C8.55871 3.5 8.16671 3.892 8.16671 4.375C8.16671 4.858 8.55871 5.25 9.04171 5.25H11.0128L7.58338 8.67942L5.18063 6.27667C4.57571 5.67175 3.59105 5.67175 2.98613 6.27667L0.256131 9.00608C-0.0857025 9.34792 -0.0857025 9.9015 0.256131 10.2433C0.597964 10.5852 1.15155 10.5852 1.49338 10.2433L4.0828 7.65392L6.48555 10.0567C6.7883 10.3594 7.18496 10.5105 7.5828 10.5105C7.98063 10.5105 8.3773 10.3588 8.68005 10.0567L12.2495 6.48725V8.45833C12.2495 8.94133 12.6415 9.33333 13.1245 9.33333C13.6075 9.33333 13.9995 8.94133 13.9995 8.45833V5.54167C13.9995 4.41583 13.0842 3.5 11.9584 3.5Z" fill="#EF4444" />
                        </g>
                        <defs>
                          <clipPath id="clip0_864_215">
                            <rect width={14} height={14} fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                    <span className="text-12 text-color-red">13%</span>
                    <span className="text-12">vs last week</span>
                  </div>
                </div>
                <div className="grid-info-item">
                  <img src="https://global.divhunt.com/971369917d6dd6ee35a8d5478ea1a126_537.svg" loading="lazy" alt="" className="info-top-icon" />
                  <span className="text-op-60">Avg. Heart Rate</span>
                  <span className="span-item-procent">75 <span className='bpm-text'>bpm</span></span>
                  <div className="grid-info-bottom">
                    <div className="info-bottom-arrow">
                      <svg width={14} height={14} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_864_215)">
                          <path d="M11.9584 3.5H9.04171C8.55871 3.5 8.16671 3.892 8.16671 4.375C8.16671 4.858 8.55871 5.25 9.04171 5.25H11.0128L7.58338 8.67942L5.18063 6.27667C4.57571 5.67175 3.59105 5.67175 2.98613 6.27667L0.256131 9.00608C-0.0857025 9.34792 -0.0857025 9.9015 0.256131 10.2433C0.597964 10.5852 1.15155 10.5852 1.49338 10.2433L4.0828 7.65392L6.48555 10.0567C6.7883 10.3594 7.18496 10.5105 7.5828 10.5105C7.98063 10.5105 8.3773 10.3588 8.68005 10.0567L12.2495 6.48725V8.45833C12.2495 8.94133 12.6415 9.33333 13.1245 9.33333C13.6075 9.33333 13.9995 8.94133 13.9995 8.45833V5.54167C13.9995 4.41583 13.0842 3.5 11.9584 3.5Z" fill="#EF4444" />
                        </g>
                        <defs>
                          <clipPath id="clip0_864_215">
                            <rect width={14} height={14} fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                    <span className="text-12 text-color-red">13%</span>
                    <span className="text-12">vs last week</span>
                  </div>
                </div>
              </div>
            </section>
            <section className="animate-entrance animate-entrance-delay-3">
              <div className="chart-wrapper">
                <span className="semi-bold">Anxiety Level Trends</span>
                <div className="chart">
                  <AnxietyChart />
                </div>
              </div>
            </section>
            <section className="animate-entrance animate-entrance-delay-4">
              <div className="grid-2">
                <div className="chart-wrapper">
                  <span className="semi-bold">Anxiety Level by Risk Group</span>
                  <div className="chart">
                    <RiskGroupChart />
                  </div>
                </div>
                <div className="chart-wrapper">
                  <span className="semi-bold">Anxiety Level by Age Group</span>
                  <div className="chart">
                    <AgeGroupChart />
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard; 