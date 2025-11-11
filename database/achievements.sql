-- Insert sample achievements
INSERT INTO public.achievements (name, description, badge_icon, requirement_type, requirement_value, exp_reward) VALUES
('첫 걸음', '첫 미션 완료', '🎯', 'mission_count', 1, 50),
('초보 개발자', '5개 미션 완료', '👨‍💻', 'mission_count', 5, 100),
('중급 개발자', '20개 미션 완료', '🚀', 'mission_count', 20, 300),
('고급 개발자', '50개 미션 완료', '⭐', 'mission_count', 50, 500),
('완벽주의자', '평균 점수 90점 이상', '💯', 'score_average', 90, 200),
('연속 학습자', '7일 연속 활동', '🔥', 'streak', 7, 150),
('한 달 챌린저', '30일 연속 활동', '💪', 'streak', 30, 500),
('에러 헌터', '에러 10개 해결', '🩺', 'error_count', 10, 150),
('포트폴리오 빌더', '프로젝트 5개 등록', '📂', 'project_count', 5, 200);
