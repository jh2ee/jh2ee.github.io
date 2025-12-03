---
layout: post
date: 2025-12-02
title: "[논문 리뷰] Deep Multimodal Learning with Missing Modality: A Survey"
tags: [MLMM, Review, Arxiv]
categories: [Paper Review]
---
- Multimodal train/test 에서 modality missing은 성능에 부정적
- missing modality를 처리하도록 설계된 multimodal learning은 model이 robust하게 작동할 수 있게 함

---


---



## Introduction


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/b5bb2d97-9e26-4130-a67d-0876cf0f895d/ee07ef86-39e0-4728-b9b3-b93b966d855d.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46626RUHARX%2F20251203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251203T022822Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFkaCXVzLXdlc3QtMiJIMEYCIQDPc1LWJG4ZyaS0FPaXeCL1C09Q0jZZaJ9rkvTYN5ZLGAIhALRreUO%2BoE7sx%2FvZAb88PTcoD7QmlvN04VssDRgVwXs7Kv8DCCIQABoMNjM3NDIzMTgzODA1Igz0eNgZkARHbAxJYFsq3AMuxYBZTXPsjM1TD1Bsk9PDkmH02ZBMawy1dV9ETBsPtllgJTLcu9rLH9lfe5EOjWsYwCyHvU%2BephfLR5XUfD6NcRGd1ca2s0bxLTjXz1zU1iK4Y9kLwOHOBuJJO%2FyeUpFVQypUQUaxwr15B9h4wdYtVNpxygLWEiYtDRVD%2Bl100z9Q0Yl3OcJPuTZoW7UKj93QM6GQvLyzQLyb6CsJ8azU5Hg8e9bmpctI97EfRlXpRR6PP8ckdkex%2BgPSBt%2BT%2Bn3zLvpTq77bfyf8vzu2tckNlRt5dRyF%2BlYxQOEQCWPV5XGhBXNlTQb82CzfXcTMFh%2Bdg7G4%2BsfFosRgPpjO0RE5urNJp7cBF5qi6%2Blc29EqaKxc0RhSa4J4ETCB%2Bl6w8zyJy4mWA4uUoHqN%2BZ1nfay1VqYrJJBooVe6DuBLKrPxW4xyob05FQfUlxXdf2TRbaccdO5a7U6Uwq0QceabOJfLpJ2FvX4PsNe4XWQ%2BU0iT8UM7yovUueGGWoJ9vOh9CrJ9nP8UV7yOhNAKuOKYSkQYjlZXNEj0DU7FfHk3nhySDazzBAcEJO%2Bl%2Fl9vpl5wG71oI0TM0a0V17F0t%2BRTAnUycezmoeYUp6g5qvCUNbW0zluG6Hc7ZvDsMk98YDC1lb7JBjqkAR2DlW3Xkf%2FhtASr630m5mNu7LQWJ3F1rabDt0zBJGyV3tOe5EDqakHFb4PbEeQa%2F2n6HX0BMOdHk%2FKHBNjlzwZ0RT%2Ft%2BcQ8OIsoJMy%2FwR3P%2B7EZvseysm2HJMxkBPC8IHXWhnRGH2QzPytP5LiTKOFdrLFnffm4Sk%2FN0R%2FA5bQ0O7eIppO3Ql77Nenm9u%2FI2w29zO41q3H1z5CLdgzIHQ1bczLN&X-Amz-Signature=3abf58a63b75e4cc153395347c30d5bb45cfb96bfb89dc2b11dc4f1e749e6372&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/b5bb2d97-9e26-4130-a67d-0876cf0f895d/ee07ef86-39e0-4728-b9b3-b93b966d855d.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46626RUHARX%2F20251203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251203T022822Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFkaCXVzLXdlc3QtMiJIMEYCIQDPc1LWJG4ZyaS0FPaXeCL1C09Q0jZZaJ9rkvTYN5ZLGAIhALRreUO%2BoE7sx%2FvZAb88PTcoD7QmlvN04VssDRgVwXs7Kv8DCCIQABoMNjM3NDIzMTgzODA1Igz0eNgZkARHbAxJYFsq3AMuxYBZTXPsjM1TD1Bsk9PDkmH02ZBMawy1dV9ETBsPtllgJTLcu9rLH9lfe5EOjWsYwCyHvU%2BephfLR5XUfD6NcRGd1ca2s0bxLTjXz1zU1iK4Y9kLwOHOBuJJO%2FyeUpFVQypUQUaxwr15B9h4wdYtVNpxygLWEiYtDRVD%2Bl100z9Q0Yl3OcJPuTZoW7UKj93QM6GQvLyzQLyb6CsJ8azU5Hg8e9bmpctI97EfRlXpRR6PP8ckdkex%2BgPSBt%2BT%2Bn3zLvpTq77bfyf8vzu2tckNlRt5dRyF%2BlYxQOEQCWPV5XGhBXNlTQb82CzfXcTMFh%2Bdg7G4%2BsfFosRgPpjO0RE5urNJp7cBF5qi6%2Blc29EqaKxc0RhSa4J4ETCB%2Bl6w8zyJy4mWA4uUoHqN%2BZ1nfay1VqYrJJBooVe6DuBLKrPxW4xyob05FQfUlxXdf2TRbaccdO5a7U6Uwq0QceabOJfLpJ2FvX4PsNe4XWQ%2BU0iT8UM7yovUueGGWoJ9vOh9CrJ9nP8UV7yOhNAKuOKYSkQYjlZXNEj0DU7FfHk3nhySDazzBAcEJO%2Bl%2Fl9vpl5wG71oI0TM0a0V17F0t%2BRTAnUycezmoeYUp6g5qvCUNbW0zluG6Hc7ZvDsMk98YDC1lb7JBjqkAR2DlW3Xkf%2FhtASr630m5mNu7LQWJ3F1rabDt0zBJGyV3tOe5EDqakHFb4PbEeQa%2F2n6HX0BMOdHk%2FKHBNjlzwZ0RT%2Ft%2BcQ8OIsoJMy%2FwR3P%2B7EZvseysm2HJMxkBPC8IHXWhnRGH2QzPytP5LiTKOFdrLFnffm4Sk%2FN0R%2FA5bQ0O7eIppO3Ql77Nenm9u%2FI2w29zO41q3H1z5CLdgzIHQ1bczLN&X-Amz-Signature=3abf58a63b75e4cc153395347c30d5bb45cfb96bfb89dc2b11dc4f1e749e6372&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- Multimodal은 단일 modality가 감지하지 못하는 복잡한 패턴과 관계 밝힘
- 그러나 Multimodal system은 modality missing 문제에 직면하는 경우 많음 → 관심 커짐
- Missing modality가 발생하는 sample 제거는 단순하나 정보가 낭비되는 문제가 있음

_→ Missing modality에도 robust하게 작동하는 system 개발이 중요_



### Definition


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/3cf0d1ef-3cd1-433d-ace9-502a2061d49b/8bd66c4f-be6a-4ce6-963e-a632a4f5176a.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SD2KUBNG%2F20251203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251203T022826Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFkaCXVzLXdlc3QtMiJHMEUCIAfL2B90U1n1HB60Os5sTq7U7DP4keYv6CYAfOBlL3aQAiEA87e7dDX9ZqmI1F87%2BO4S6IHPpQkU6MhoTpyf3OcoBBIq%2FwMIIhAAGgw2Mzc0MjMxODM4MDUiDO%2FfhCV%2FNxQ1EHpvxircA66n4U6mbH0K22o2VB2VRQQDz%2B0ih%2B8M8C6%2BBRbD%2BYmejfmsBjDaLPvqFeVLI6ZsuSBecwCm5JGI2SQbSrJ1xxp1jWZ%2BL2egux5y%2BJ502XQdDgUykH5EQ5M1s2ELlj%2F%2F9rmjzsVi7jvkOs%2BUT46CKBef5o6WmrCFY5bDmJPcumkkw2e9AA1UQOVlmDHoBva5UbeNTrLoTyUvQnadynuuoR5XqVaCZWcbqDHRKNBGhrb2%2F0pXhaOxG8vmpWtrIONTOq4UQq3IW0nw6K0hyy%2FL1nv8V%2BQuDnrwttLArfMQjD3kiCM2Zrc9ZzC%2BaeatBTXwizGhEHsIj76%2FXxguRA2btLpGWNuDsDIP%2FGHNJtdQsQlIn2flsW9IrbOCjr3uGU%2FqYWtJIYNonpMe1ageP2ifjcv0b%2F%2B%2F6JRA7rd%2BtyiEmD4Kmb%2BfA%2FlOTak5wr01FmydhfWjoy3lc2PQ9In%2BJWW751emxu9Lw6AEBGgcaiUxk8ba9PVI4S6pTv3jKkFvc3fC4i5EjG3E5ozuFqFAeQNaNuDVuaMREyBBSYVyYlN2ATZMMe%2BNZ932yNhZLYDlwjIdfx0Kb9lzU%2BBxDjn4DhrIjtegJDd7CsOzGEWlIKfA4BSQlV1UKQQ4wSoh9v5wMOyUvskGOqUBimIr8vXCI%2BerJpdIFI4o%2BuZfA%2FSjMzb2Rhaagd5Ou9FBwWskXJ8kuB6dnRRb%2F88cf1dkskLgUJpHEkIvja%2Fockhke%2BY1PD3FWIFzMQxQVYy5GioPkyFCXXPAjM3rSOdsjRQJ8LDFWpCBVYa53su0LHXhVWZzrnA25o%2FRTmj2JTW8teJfz0Jf1DTrf5FPSm9jvk44hFMimdCMLxee%2Fnhqmq6hBOsb&X-Amz-Signature=29bd9bc9fd0f01b6a5f96b10a3acc61fc580d064fa44653c327dc85e12dff31d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/3cf0d1ef-3cd1-433d-ace9-502a2061d49b/8bd66c4f-be6a-4ce6-963e-a632a4f5176a.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SD2KUBNG%2F20251203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251203T022826Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFkaCXVzLXdlc3QtMiJHMEUCIAfL2B90U1n1HB60Os5sTq7U7DP4keYv6CYAfOBlL3aQAiEA87e7dDX9ZqmI1F87%2BO4S6IHPpQkU6MhoTpyf3OcoBBIq%2FwMIIhAAGgw2Mzc0MjMxODM4MDUiDO%2FfhCV%2FNxQ1EHpvxircA66n4U6mbH0K22o2VB2VRQQDz%2B0ih%2B8M8C6%2BBRbD%2BYmejfmsBjDaLPvqFeVLI6ZsuSBecwCm5JGI2SQbSrJ1xxp1jWZ%2BL2egux5y%2BJ502XQdDgUykH5EQ5M1s2ELlj%2F%2F9rmjzsVi7jvkOs%2BUT46CKBef5o6WmrCFY5bDmJPcumkkw2e9AA1UQOVlmDHoBva5UbeNTrLoTyUvQnadynuuoR5XqVaCZWcbqDHRKNBGhrb2%2F0pXhaOxG8vmpWtrIONTOq4UQq3IW0nw6K0hyy%2FL1nv8V%2BQuDnrwttLArfMQjD3kiCM2Zrc9ZzC%2BaeatBTXwizGhEHsIj76%2FXxguRA2btLpGWNuDsDIP%2FGHNJtdQsQlIn2flsW9IrbOCjr3uGU%2FqYWtJIYNonpMe1ageP2ifjcv0b%2F%2B%2F6JRA7rd%2BtyiEmD4Kmb%2BfA%2FlOTak5wr01FmydhfWjoy3lc2PQ9In%2BJWW751emxu9Lw6AEBGgcaiUxk8ba9PVI4S6pTv3jKkFvc3fC4i5EjG3E5ozuFqFAeQNaNuDVuaMREyBBSYVyYlN2ATZMMe%2BNZ932yNhZLYDlwjIdfx0Kb9lzU%2BBxDjn4DhrIjtegJDd7CsOzGEWlIKfA4BSQlV1UKQQ4wSoh9v5wMOyUvskGOqUBimIr8vXCI%2BerJpdIFI4o%2BuZfA%2FSjMzb2Rhaagd5Ou9FBwWskXJ8kuB6dnRRb%2F88cf1dkskLgUJpHEkIvja%2Fockhke%2BY1PD3FWIFzMQxQVYy5GioPkyFCXXPAjM3rSOdsjRQJ8LDFWpCBVYa53su0LHXhVWZzrnA25o%2FRTmj2JTW8teJfz0Jf1DTrf5FPSm9jvk44hFMimdCMLxee%2Fnhqmq6hBOsb&X-Amz-Signature=29bd9bc9fd0f01b6a5f96b10a3acc61fc580d064fa44653c327dc85e12dff31d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- **MLMM (Multimodal Learning with Missing Modality) **: Modality missing 문제 해결책
- **MLFM (Multimodal Learning with Full Modality)** : MLMM과 대조되는 모든 modality set 사용하는 방법


### Challenge

- train/test 중에 사용 가능한 modality 수에 관계없이 정보를 dynamic하게 handle/fusion
- Full modality sample 성능과 유사 성능 유지


### Domains

- information retrieval
- remote sensing
- robotic vision
- medical diagnosis
- sentiment analysis
- multi-view clustering

---


---



## Method


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/66502228-d1b0-4790-b025-23bcc5f96d18/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZSXPXYDR%2F20251203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251203T022821Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFkaCXVzLXdlc3QtMiJIMEYCIQDn2VoUZcbkFh7gA9nvEgZn1ZPb729DGT46QUfJgYFC7wIhAJKz9TpF37m3rst%2FtYo%2FE4iNx1WnsGOjGKbA0wW1577BKv8DCCIQABoMNjM3NDIzMTgzODA1IgxUAwXUu1qa5KE72NYq3APrIHAk%2FT7lE1x9BdbUhZClSZ03P%2Bi3zxHutRCw6mTDtJSYgIiKped7d%2FDMPN4cEEeWGke8tINIvWGo4HVTkg01i5QhT5WUYygPRQ2hicJLHK4wjAsf1MLHvCHvY2D7hoUtf5W%2Fh4CazQmw%2F%2FWVlZk0JOE4a2d336GlLJS352bVsTDEmdbkPl00hYKHD5u3rAh7UdmfJMmg7ChzOUyoRexySN%2FdSfdF7rx70V6FsPJStYDsTT3oNnNCaZ1r3wf2AOLPs%2FTWq41x%2B8wxXVMH%2FM4gkiJnb69Kyfs%2F7jHBTzk5potJVeeXCLG%2Br41RLopoXcwiG%2FPbaep3jbryHAufdJ2OPQugAjGqSioXS2XFYRSl11LUMWlC%2FzYCjntacm3sk3HR63t%2BPWOYm4D3OWheQjGBVrcyeQTKgwCKnmrsh4beNnUZ9ypoCN5ZQLjds0Kw497Gi1VQWdjaREloqoAC%2BBiyFD2COAuQpmFzSty1OCtlTr8ylInlwpyhqWkwr1%2Fc9%2B1Qqz0qCjHdEajrrKbDyRp%2BtPy1C%2BbsU5ZE0jRegOOUQRpwWZeZKsW2tsECM4uj6kTPnQMd0F4vvfd2IuTlWsp8q1297tyC%2B08oKMGWKD3gLwxB73Z8rAjKlwdgUjCAlb7JBjqkAc6idSmXGr2J2VDh3mkYe1qAL6F9RE0QbIAeURCAWHVhKKeJASQIWbeoqqn4H6%2BZi6k1RwL6f49ERISe70%2F4ayHNBgDWeHnJNcT5BmAUgQq6rOKNYrHwvAskkjlvW4yYDQerbD1y7MEzIDjjtg6u5PJGAfWMZlQA5c6wmU%2FLjnMGncyjqeuZEGXOBejLDrC69I2P%2BTt%2FLZGJ0uJuBkM4aSpMCIa8&X-Amz-Signature=7eaf3a4fd2092b8d58a213cd22e67523417e35edf1cf8cce698ebf12bf8e485f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Data Processing Aspect


Model의 data processing 방법(시점)에 중점



#### **Modality Imputation**


modality data level에서 missing 처리, missing data 자체를 imputation


_→ modality missing을 정확히 imputation한다면 full modality로 간주_


	**Missing compositing** : 합성

	- `Zero/Random value composition`

		<span class="notion-red">_→ dataset의 다양성 줄임_</span>

	- `Retrieval-based composition` : 유사 분류의 sample에서 데이터 copy / average (KNN)

		<span class="notion-red">_→ pixel-level task에 부적합, KNN의 경우 cost가 높고 불균형 data에 민감_</span>


	**Missing generating** : GAN, Diffusion 통해 missing modality 생성

	- `Individual modality generation` : modality 별 생성 model 학습
	- `Unified modality generation` : 전체 modality 생성 가능한 model 학습

		<span class="notion-red">_→ 고품질 생성 한계, cost 높음_</span>



#### **Representation-Focused Models**


representation level에서 missing 처리


	**Coordinate representation **: 다른 modality의 representation를 semantic space에 align

	- `Regularization`
	- `Correlation`

		→ 두 개 또는 세 개 modality 사용시 성능 높음


	**Missing compositing**

	- `Retrieval-based composition` : 유사 sample의 feature 이용
	- `Arithmetic operation-based representation composition` : 비학습 방식, 단순 pooling 등

	**Missing generating**


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/5116ca66-ded0-4dc2-a7ae-a5bcb44bb6c3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667PMARWHY%2F20251203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251203T022832Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFkaCXVzLXdlc3QtMiJGMEQCIDVwD47iFTpZKhr4G%2BYqcxRuLmysazvsy8qXFxNZjWg5AiADgI461KFcWrxflOXDQAW2iXqH12VSvIkVy4n6JQIEzyr%2FAwgiEAAaDDYzNzQyMzE4MzgwNSIMiu%2F%2F%2Fl17x7Lqdv%2B4KtwDT%2B%2BunV%2F8BrClNQRmmA%2FhsUvsiam7H457%2Bw1yUBDZgTp3FaKzxwyg1pTvYK0Jvxf1jORTWGXGdN5ANLcYtZI56Yiqj5N0lRFW2ModC%2BU6GWLi%2B8fzTbAdRs1xQwsJoVgxu0AZXgmIAdVghinWIBk0oRjVeciH%2BA1tB9dlVZqMni%2BvUAYbBaZkr3Tnm2effFgSgntPH78or9caqO8AgYcTpiYGekkY7IXZdrBA9%2B1s56fbBHYrNpGlvkcyRYMfgJ3RB4DgYPa0pDIqoEIg01ESes%2F9jzf1PmIeBhd9IW4MVoG34xHdJD%2F3moc6gdIKcIkrTO3PLqhs0qpeiho%2FmJaHl5V5gp2C0LBifHQckKZA%2BAenIyCn8m343b%2FYajwFEN0vaFWPtF5%2BTyhkNhzQdvyBRUqavZsJbOF7dAXunVPfFXvv032ZgFUdZa5DF2Vz9IgzbNawNee1HRkPKAhbg2ZsY7SDl3EVgD0MRIAB%2BBJgtkbMmx4eQ6OAykHkO7DqgKpwxvsveH4vkkVLrk3btEVBE986urKhw4Ow4A3W2vN5VXWuL6%2Fklx9660qDC3OkBxB2gNqd4CUMd%2F0O90XzzJE7lJWTcFG1J01iKs4lPi5PDOZ5Aw5kqNSzMQrqVaowmJW%2ByQY6pgHPFiBYljU5r1o4vrXmD1gwAbkhL4%2FT44SKBHsONFfGxmB0kw8xepbh6wygz%2FdwU4EaiikVkzkBIfWoA2uhYI%2BzqP5MTMZRYSQcj%2FJlzB%2BE1W4rKO15UqQXW0DqtI4hkWBhlzXMhjPOyYAO1poLshf8NTJ70ecdyOHPjUdSAy5t0mRAOBIE3LDuoUKWtk62CZ1QxAlvyzYXjKSZHpJAZmgKD5hE3MTV&X-Amz-Signature=3b659c55585d7c418e3942dc7ae560efa4786950d59228e746713b74d5ea13eb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/5116ca66-ded0-4dc2-a7ae-a5bcb44bb6c3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667PMARWHY%2F20251203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251203T022832Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFkaCXVzLXdlc3QtMiJGMEQCIDVwD47iFTpZKhr4G%2BYqcxRuLmysazvsy8qXFxNZjWg5AiADgI461KFcWrxflOXDQAW2iXqH12VSvIkVy4n6JQIEzyr%2FAwgiEAAaDDYzNzQyMzE4MzgwNSIMiu%2F%2F%2Fl17x7Lqdv%2B4KtwDT%2B%2BunV%2F8BrClNQRmmA%2FhsUvsiam7H457%2Bw1yUBDZgTp3FaKzxwyg1pTvYK0Jvxf1jORTWGXGdN5ANLcYtZI56Yiqj5N0lRFW2ModC%2BU6GWLi%2B8fzTbAdRs1xQwsJoVgxu0AZXgmIAdVghinWIBk0oRjVeciH%2BA1tB9dlVZqMni%2BvUAYbBaZkr3Tnm2effFgSgntPH78or9caqO8AgYcTpiYGekkY7IXZdrBA9%2B1s56fbBHYrNpGlvkcyRYMfgJ3RB4DgYPa0pDIqoEIg01ESes%2F9jzf1PmIeBhd9IW4MVoG34xHdJD%2F3moc6gdIKcIkrTO3PLqhs0qpeiho%2FmJaHl5V5gp2C0LBifHQckKZA%2BAenIyCn8m343b%2FYajwFEN0vaFWPtF5%2BTyhkNhzQdvyBRUqavZsJbOF7dAXunVPfFXvv032ZgFUdZa5DF2Vz9IgzbNawNee1HRkPKAhbg2ZsY7SDl3EVgD0MRIAB%2BBJgtkbMmx4eQ6OAykHkO7DqgKpwxvsveH4vkkVLrk3btEVBE986urKhw4Ow4A3W2vN5VXWuL6%2Fklx9660qDC3OkBxB2gNqd4CUMd%2F0O90XzzJE7lJWTcFG1J01iKs4lPi5PDOZ5Aw5kqNSzMQrqVaowmJW%2ByQY6pgHPFiBYljU5r1o4vrXmD1gwAbkhL4%2FT44SKBHsONFfGxmB0kw8xepbh6wygz%2FdwU4EaiikVkzkBIfWoA2uhYI%2BzqP5MTMZRYSQcj%2FJlzB%2BE1W4rKO15UqQXW0DqtI4hkWBhlzXMhjPOyYAO1poLshf8NTJ70ecdyOHPjUdSAy5t0mRAOBIE3LDuoUKWtk62CZ1QxAlvyzYXjKSZHpJAZmgKD5hE3MTV&X-Amz-Signature=3b659c55585d7c418e3942dc7ae560efa4786950d59228e746713b74d5ea13eb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- `Indirect-to-task representation generation` : 
modality 학습 시 decoder도 함께 학습, missing에 대해 decoder로 representation 생성
- `Direct-to-task representation generation` : 
가용 modality의 representation으로 missing modality의 representation 생성하는 model 학습


### Strategy Design Aspect



#### **Architecture-Focused Models**


train/inference 단계에서 사용 가능한 modality에 adaptive하도록 설계


	**Attention-based**

	- `Attention fusion` : modality 내 또는 intra modality 에서의 attention fusion

		<span class="notion-red">_→ missing modality 의 정보는 실제 fusion 과정에서 무시, 존재하는 modality로 representation을 잘 만들기 위한 목적_</span>


	**Transformer-based**

	- `Joint representation learning` : modality encoder 의 출력을 transformer 기반의 fusion model에 전달
		- missing modality를  masking처리
	- `Parameter efficient learning` : Full modality sample들로 학습 후 누락 modality sample들로 LoRA 등 추가해 학습

	**Distillation-based** : full modality sample로부터의 distillation / model 내의 branch 통한 distillation

	- `Representation-based` : full modality로 학습된 teacher model로 missing modality로 학습되는 student model 지도
	- `Process-based`
	- `Hybrid` 

	<span class="notion-red">_→ teacher model의 학습 시 결국 full modality 요구_</span>


	**Graph Learning-based**

	- 각 modality `공통 space에 mapping`
	- 가용 modality를 dynamic하게 연결하는 `hyper edge` 도입
	- `graph attention` 

**MLLM **: LLM이 feature processor 역할, encoder feature 통합.



#### **Model Combinations**


architecture 또는 학습 방법을 통해 해결


	**Ensemble** : encoder 결합


	**Dedicated training** : train method 중심


	**Discrete scheduler** : LLM이 controller 역할을 해 task에 따라 적절한 module 선택


---


---


> 💡 <span class="notion-red">최근 MLMM task에 대한 연구가 늘어나고 있고 특히 의료나 비디오 등의 분야에서 주목받고 있는 듯 하다. GAN과 같은 generative model을 이용한 modality imputation 시도와 Auto encoder를 이용한 representation 단에서의 imputation이 주를 이루는 것 같다. Fusion이나 train method를 이용한 시도도 등장하고 있으나 조금 더 연구가 필요해 보인다.</span>

