import { Link } from "react-router-dom";
import { getStoredDiaries } from "../utils/diaryStorage";
import Header from "../components/Header";
import HomePreMatchSection from "../components/HomePreMatchSection";
import DiaryCard from "../components/DiaryCard";
import volleyball from "../assets/volleyball.png";
import "./Home.css";

function Home(){
    const diaries = getStoredDiaries();

    const recentDiary = diaries.length >0 ? diaries[diaries.length - 1] : null;
    
    return (
        <>
            <Header />
            <main className="home">
                <section className="hero">
                    <div className="hero_content">
                        <span className="hero_eyebrow">VOLLEYBALL ARCHIVE</span>

                        <h1>
                            오늘의 경기를 기록하고,
                            <br/>
                            나만의 응원 이야기를 남겨보세요.
                        </h1>

                        <p>
                            경기의 결과부터 그날의 감정까지.
                            <br />
                            나만의 배구 기록을 ON SET에 차곡차곡 모아보세요.
                        </p>

                        <div className="hero_buttons">
                            <Link to="/diary/write" className="primary-button">
                                경기 기록하기
                            </Link>
                            <Link to="/archive" className="secondary-button">
                                기록 모아보기
                            </Link>
                        </div>
                    </div>

                    <div className="hero_visual">
                        <img src={volleyball} alt="배구공" className="volleyball"/>
                        <p>오늘도, 배구와 함께!</p>
                    </div>
                </section>

                <section className="home-grid">
                    <HomePreMatchSection />

                    <section className="home-card">
                        <div className="section-title section-title-between">
                            <div>
                                <span>▣</span>
                                <h2>최근 경기 기록</h2>
                            </div>

                            <Link to="/archive">전체 보기</Link>
                        </div>

                        {recentDiary? (
                            <Link to={`/diary/${recentDiary.id}`}
                            className="home_diary_link">
                                <DiaryCard diary={recentDiary} />
                            </Link>
                        ) : (
                            <div className="home_empty">
                                <p>
                                    아직 작성한 경기 기록이 없어요.
                                </p>

                                <Link to="/diary/write">
                                    첫 경기 기록하기
                                </Link>
                            </div>
                        )}
                    </section>
                </section>
            </main>
        </>
    );
}

export default Home;