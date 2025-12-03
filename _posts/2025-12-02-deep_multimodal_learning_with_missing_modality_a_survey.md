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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/b5bb2d97-9e26-4130-a67d-0876cf0f895d/ee07ef86-39e0-4728-b9b3-b93b966d855d.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664ADHAKUA%2F20251203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251203T171239Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGkaCXVzLXdlc3QtMiJGMEQCIF5PuurOYAvT2FE6LhGsPFlb0gVqu7hItw7vS0LkzFzAAiANkvBmmnp2ef%2FDzIqBcrebmp2hmQI0z3CqpBn31XUnyyr%2FAwgyEAAaDDYzNzQyMzE4MzgwNSIMnuOoyvFc%2BMPfYhYdKtwDo5x4%2BjZFGUI4RrueTTgE1MI%2BPIeGuw%2Bsc9z4kIZi8pPvtUwPpDZ9y5uMUSle0PwyEKfMdke%2FtdUzuwxIELLH%2BKUuDF2MAMVbQM2KjWh701tF7vu37hEvap9QfKW%2Fei5MeQiU53EGts0V3Ec5eOkg7EB8rWzMv%2F7G4ZSVhoqI1bQIwpJ4KIJ2UdolKFiIbTVtmdN6XJavQEUg5%2BwBIzk7051ADv5XcTKQGRl7pQS0yX8yvbQQ6iv22Z5KCzHePvlZOC4eZ3bibbogFAZS5e8vH2DaUhV3G7zyuHPjZ7BACgXmG8UrhbMLIGB8zlGg6JI77ATp7lr0ts%2FOOQRYGmQoSSova%2F0Nt%2FrKIvFcIHES%2BqPrCZFeX4uQ9M2HWyg%2B68%2BFF3Etaook9%2F6%2FMoKtBEFi8MWvQLkBqsxgSUu21DasFktGR9BytHNnD%2FWTvzZ%2BRjBW0CIM7CdnVrq204Ddpt%2FODD%2B%2FM5DSTOEtpZmAEaj091uk%2FKVDfz75AHmf2xh7DF4yRcLiuSf62lDIn9176omCbF1eUGA6ZmmeROT6iPyC30P9tR%2BsnOC9vphfxIsaU%2FlLPgqrLERogq%2BrDqYFBfVhwIfFNMhBCuWM8FBb%2BsEwGt3czvIfK2jqQAHyUz0wtMrByQY6pgESXJkkgMY3%2FjC%2BjdGW3dgEK3iWOvFaw5r2RkVuPLKJY6lWgh%2B%2BzQQYxpuUvlitZbU%2FmVAuQk7HnjUPhhL9jqC%2BVh8U53e9W%2BYolr1CDw9fzUUCS70O7KQOhIIbdKk1ieg6J%2F7b1sAI1EqQ%2FraeuMHo9GQpikMipwY78bxyPWaXX7Zr65rDkJCG%2BszIM7VigN8uoASsEnjJ6w1MJk%2B%2FF%2BhDA87BShNw&X-Amz-Signature=a5668c31a5fb16019e4f729b26100ba557a62268203aa81402447c1da636d965&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/b5bb2d97-9e26-4130-a67d-0876cf0f895d/ee07ef86-39e0-4728-b9b3-b93b966d855d.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664ADHAKUA%2F20251203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251203T171239Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGkaCXVzLXdlc3QtMiJGMEQCIF5PuurOYAvT2FE6LhGsPFlb0gVqu7hItw7vS0LkzFzAAiANkvBmmnp2ef%2FDzIqBcrebmp2hmQI0z3CqpBn31XUnyyr%2FAwgyEAAaDDYzNzQyMzE4MzgwNSIMnuOoyvFc%2BMPfYhYdKtwDo5x4%2BjZFGUI4RrueTTgE1MI%2BPIeGuw%2Bsc9z4kIZi8pPvtUwPpDZ9y5uMUSle0PwyEKfMdke%2FtdUzuwxIELLH%2BKUuDF2MAMVbQM2KjWh701tF7vu37hEvap9QfKW%2Fei5MeQiU53EGts0V3Ec5eOkg7EB8rWzMv%2F7G4ZSVhoqI1bQIwpJ4KIJ2UdolKFiIbTVtmdN6XJavQEUg5%2BwBIzk7051ADv5XcTKQGRl7pQS0yX8yvbQQ6iv22Z5KCzHePvlZOC4eZ3bibbogFAZS5e8vH2DaUhV3G7zyuHPjZ7BACgXmG8UrhbMLIGB8zlGg6JI77ATp7lr0ts%2FOOQRYGmQoSSova%2F0Nt%2FrKIvFcIHES%2BqPrCZFeX4uQ9M2HWyg%2B68%2BFF3Etaook9%2F6%2FMoKtBEFi8MWvQLkBqsxgSUu21DasFktGR9BytHNnD%2FWTvzZ%2BRjBW0CIM7CdnVrq204Ddpt%2FODD%2B%2FM5DSTOEtpZmAEaj091uk%2FKVDfz75AHmf2xh7DF4yRcLiuSf62lDIn9176omCbF1eUGA6ZmmeROT6iPyC30P9tR%2BsnOC9vphfxIsaU%2FlLPgqrLERogq%2BrDqYFBfVhwIfFNMhBCuWM8FBb%2BsEwGt3czvIfK2jqQAHyUz0wtMrByQY6pgESXJkkgMY3%2FjC%2BjdGW3dgEK3iWOvFaw5r2RkVuPLKJY6lWgh%2B%2BzQQYxpuUvlitZbU%2FmVAuQk7HnjUPhhL9jqC%2BVh8U53e9W%2BYolr1CDw9fzUUCS70O7KQOhIIbdKk1ieg6J%2F7b1sAI1EqQ%2FraeuMHo9GQpikMipwY78bxyPWaXX7Zr65rDkJCG%2BszIM7VigN8uoASsEnjJ6w1MJk%2B%2FF%2BhDA87BShNw&X-Amz-Signature=a5668c31a5fb16019e4f729b26100ba557a62268203aa81402447c1da636d965&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- Multimodal은 단일 modality가 감지하지 못하는 복잡한 패턴과 관계 밝힘
- 그러나 Multimodal system은 modality missing 문제에 직면하는 경우 많음 → 관심 커짐
- Missing modality가 발생하는 sample 제거는 단순하나 정보가 낭비되는 문제가 있음

_→ Missing modality에도 robust하게 작동하는 system 개발이 중요_



### Definition


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/3cf0d1ef-3cd1-433d-ace9-502a2061d49b/8bd66c4f-be6a-4ce6-963e-a632a4f5176a.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UTF6L5ZF%2F20251203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251203T171240Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGkaCXVzLXdlc3QtMiJGMEQCIEw%2F7OGOyzdFGqAkb4eX3sU9DU7pGPOkmqCVjzLh6K1SAiBM9323bCo8zKkVuDa8bYzihj2TV4KJCUJOfR4ADKyWQir%2FAwgyEAAaDDYzNzQyMzE4MzgwNSIMBPicXXZyMaxZKMaDKtwDte6SkNytdssESIIWeEXb%2BE%2BDiDsVMf9aB2HY3OqNJOmnEtaRAzknKk%2Bv8u8v3e4vAbujOoDuia3osLiO99w5D%2BXZBlDf72NdzvOJRavE7OqPDSE07f6KgM9p9M79PDdUQUhygG19QIA1TcK7c9MsCNWSS8tUywgFsJXWo42u7FqOu65I4IoEaxa%2FISk%2BMrfyLbV7MdmmxO%2FfgcPOjTpshRomeLVTWgI7dUXL9OvHTxEaytKp2xVyCKSrNImT7Z0OFprxAmbrvBPUbON4ng7Y3B3ffpO%2FM7UQqjMo8czmXjPDM8HQX0krsXaRZSO2Hp7pzU97fjUG5Ul2PPvohDP0AiVjFRBEeMthJZVJB2clAIJ7%2BBs%2FEU8ONys3zMv0jDN3kzHea8Zvr3wWs0ce7aK1T2B%2Fbeq3yTPkRrKSzxdQvHWl%2F1KQNn3BDYvXIcnss2F3HwFR%2FKAe08Pij8e2uXlHTaswbIWmy7guw7QRW%2BEFMZbitOestGoboac1jEeguPUUJx18sIBYk184od8SGiU9cb20vugBEgCZBiXXH0lHXf%2BCjejqQgsda84SZg035%2F5zHqsHnf%2FxV18wgRQNyYuzGx8AhMOY%2B8QogkVgWoHWLnn1antu7hRV6o3tnz8wucrByQY6pgEzCzsYUIf1Pz6txSx%2B6VprdQreBWfUeDSVHWXc%2Flxwgz7rY9%2BNYPPFEh8E7cYn%2BRdT26f9BRUK6VZHPikKVdZaVfRz76pRIsgAywNajoyo2wnO2vxzTZBZM1tfpQK55dYMuYlerwp%2BwMAVl99Of8mCOUeKThaylGmHEVrRcN%2BO7TxoBvWlAfm%2FJi%2Bw8ItkJFW8VHRxlHF3ZdfXlGSSdjc2lPW%2Bjz5v&X-Amz-Signature=16ce7c4aaef62bff4913c16fe76120df1bf2888b4693e9411e738b246fc63299&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/3cf0d1ef-3cd1-433d-ace9-502a2061d49b/8bd66c4f-be6a-4ce6-963e-a632a4f5176a.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UTF6L5ZF%2F20251203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251203T171240Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGkaCXVzLXdlc3QtMiJGMEQCIEw%2F7OGOyzdFGqAkb4eX3sU9DU7pGPOkmqCVjzLh6K1SAiBM9323bCo8zKkVuDa8bYzihj2TV4KJCUJOfR4ADKyWQir%2FAwgyEAAaDDYzNzQyMzE4MzgwNSIMBPicXXZyMaxZKMaDKtwDte6SkNytdssESIIWeEXb%2BE%2BDiDsVMf9aB2HY3OqNJOmnEtaRAzknKk%2Bv8u8v3e4vAbujOoDuia3osLiO99w5D%2BXZBlDf72NdzvOJRavE7OqPDSE07f6KgM9p9M79PDdUQUhygG19QIA1TcK7c9MsCNWSS8tUywgFsJXWo42u7FqOu65I4IoEaxa%2FISk%2BMrfyLbV7MdmmxO%2FfgcPOjTpshRomeLVTWgI7dUXL9OvHTxEaytKp2xVyCKSrNImT7Z0OFprxAmbrvBPUbON4ng7Y3B3ffpO%2FM7UQqjMo8czmXjPDM8HQX0krsXaRZSO2Hp7pzU97fjUG5Ul2PPvohDP0AiVjFRBEeMthJZVJB2clAIJ7%2BBs%2FEU8ONys3zMv0jDN3kzHea8Zvr3wWs0ce7aK1T2B%2Fbeq3yTPkRrKSzxdQvHWl%2F1KQNn3BDYvXIcnss2F3HwFR%2FKAe08Pij8e2uXlHTaswbIWmy7guw7QRW%2BEFMZbitOestGoboac1jEeguPUUJx18sIBYk184od8SGiU9cb20vugBEgCZBiXXH0lHXf%2BCjejqQgsda84SZg035%2F5zHqsHnf%2FxV18wgRQNyYuzGx8AhMOY%2B8QogkVgWoHWLnn1antu7hRV6o3tnz8wucrByQY6pgEzCzsYUIf1Pz6txSx%2B6VprdQreBWfUeDSVHWXc%2Flxwgz7rY9%2BNYPPFEh8E7cYn%2BRdT26f9BRUK6VZHPikKVdZaVfRz76pRIsgAywNajoyo2wnO2vxzTZBZM1tfpQK55dYMuYlerwp%2BwMAVl99Of8mCOUeKThaylGmHEVrRcN%2BO7TxoBvWlAfm%2FJi%2Bw8ItkJFW8VHRxlHF3ZdfXlGSSdjc2lPW%2Bjz5v&X-Amz-Signature=16ce7c4aaef62bff4913c16fe76120df1bf2888b4693e9411e738b246fc63299&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/66502228-d1b0-4790-b025-23bcc5f96d18/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664P67T3ML%2F20251203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251203T171239Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGkaCXVzLXdlc3QtMiJHMEUCIFkrc%2BLIINI2Pn%2Fh8RRJUrgc%2Bnk%2BYwbYpwvQtFR9deZQAiEAwL0%2FGdbRZdMTdjM1c%2FTMwpImVqFJo9e%2FPKOQdle5mfEq%2FwMIMhAAGgw2Mzc0MjMxODM4MDUiDMs630ZvIdr1ZDmjuircAxUpNYeD9YFeldBURc10Wb%2Bq0YC%2BasHlCnfNX7HrnwITjJt8fau89tCkhx4Bn67sS%2BcnRsiiqoc0hB0l6wpyCHk0IT7c%2F576l2ikQKvxI3j76SqGh48tuqjUsLBBVimTQz0%2BEqwHCMdD6WK17yP3ftObOEVxxa5dnGDwWyJ%2Fc%2BiHVcVL3pB7R4%2FPdZuenugrPiY6P86u5j5X44xRC7SacxBKJtDXGsAcQuO5DE%2B6rZq3HtjFvI6meL6%2FekwWdjzXztwvT31vX0nW%2FdP4cECeceT3MTYUcw21ssrJRM1AlozswAgRFfSurnHVmrz67W39GA5X2S6HLWlSJ9RbqzwngWY3BciD4uNQcbelplZtz%2FfWwBA5jXCQcDWqu5ufLztr%2BHhczAKSIdStA%2B6PE25r6XJnTELuHnrlmb2WhUcjjfdwifTmMWqFJywwurndeOURiM2Oq1MMLlgPH01OnUyRerNnJOMFH98nONPZHDe44WieTr%2BWnWTEA73dvOzgB5JghgKOCdQNIykTwZ3Vuh3zt9cclsPD3U4LSW6fYfXeSYirswwDr%2Bq9bBprsJ0EweFBD6xlfTGPemSwKURojyPu0uldivfCfS53368vo87sGktWJXbHpO0NrbnFDI0DMM7KwckGOqUB8WbJh5x0hh0vaehF2L1JKYIVx7FkWJE96nCQcIPAIHiPR4Om9wJ88km44oEsxsmvY6adyIJ5r3vp6T3%2FTMS5uJLO6dImWytioFiGnO%2FyO4KkcCRYVXYz3m7Weeg%2BOPY8MfVV4IlB%2FcE5NLNZpZgofRHshMobUg34858M6CvvxxRIv15KTFwFV6xxAgFd5PyFUBw0bANGh%2FHlhBCbeGm5cZPRlOql&X-Amz-Signature=5b3232034e36b9891edaeba414ed55cc78077697b955c7860eb153a6fbb2b6de&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/5116ca66-ded0-4dc2-a7ae-a5bcb44bb6c3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZIHJWKCR%2F20251203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251203T171244Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGkaCXVzLXdlc3QtMiJHMEUCIQDhlxdIDok7hJFlek4WtbwEacJycJzK7Mzouu7btXSvXAIgWXS2qUPwVvLt3exWLiuJRztIIAluLc7kjUPOSX64mJIq%2FwMIMhAAGgw2Mzc0MjMxODM4MDUiDDdKxoe%2BiQBudD845yrcAzkke4wjlbomwQ%2FrimySWkQhh9qA1nQt9%2FuUv1YettVd3gnM4nxnXjM59MYD3Ep5%2Fv4Z7OAQyPObOluOolGZudXwSKyyI15r0rf6CXIQcr5tSmK7izqz4tXsTFyvph6XhmR3ac8QpRhgEUvEStj50cX9VKjrGArwoQAE%2BsOZsbn3y4PtJT7RKWvB0aKRYM6e0OeBAp%2B0up1tFRuwwBOmoKMBUs%2ByTRKVQiofVIJW%2FpLVxBHHzjTx3zuNHMJrcr0I8K0X21AXYWn8rTB%2FmiWv45Y54goXUnKtRZg6bi7zFrUOPgZJmHPzbjrUaaxxVA6Us4cEvi%2BXOPx1a7YtKcpxFbmz713172tgtyqrHwN3Xd1ODuwIi2hU85JtPXwyk0tJThSBXdx390foDdHuoF5na7zLYJtyranyQSzqILLrK2AVhnZEDUAQdqKJnSREMl%2Ff11PdYwLelnDyzNL%2B%2Bb7u7Vah1qf1XKiR00zAhBecG2UR8UDpq1OifQ7DdTA4n5QymCJPyWYwH7TuNWNsHxvDCYpF5bfroh8oEjwZDV120zXXe4VJM4BD9htbh%2FxhFhoWqxH%2FbLmIs6J7Soo7LSfDgDzzUa1Wz9r%2FlBYjS5gfNk8G%2FRZ8BREzrFeItTJNMNHKwckGOqUBd35GjBnp2%2BLmk%2BTGr3q5iaEPFD6zrkh9kOKlQYKRwm6%2FmQPLdGDP1HqESgc0lkV9LVAZl0o6dNDMGh%2BC3b23Kn%2B6l5X9ljP6P3yYrtI%2Butl4v3Nvttm2nkQq8mleGjUy11yjxSIjB18zu9%2BQ7Q3kwc8wNQ8JnhnO1UZb13pavE6x8YPQiOV3Xg3KVQ6IxvFTtVxGcQWnwIYKxsscC1kSe2L27nsO&X-Amz-Signature=c213de67ddab0ff0a8aca00d693a7c57e3f3ca77b839399962b9ad6e6d0f3066&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/5116ca66-ded0-4dc2-a7ae-a5bcb44bb6c3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZIHJWKCR%2F20251203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251203T171244Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGkaCXVzLXdlc3QtMiJHMEUCIQDhlxdIDok7hJFlek4WtbwEacJycJzK7Mzouu7btXSvXAIgWXS2qUPwVvLt3exWLiuJRztIIAluLc7kjUPOSX64mJIq%2FwMIMhAAGgw2Mzc0MjMxODM4MDUiDDdKxoe%2BiQBudD845yrcAzkke4wjlbomwQ%2FrimySWkQhh9qA1nQt9%2FuUv1YettVd3gnM4nxnXjM59MYD3Ep5%2Fv4Z7OAQyPObOluOolGZudXwSKyyI15r0rf6CXIQcr5tSmK7izqz4tXsTFyvph6XhmR3ac8QpRhgEUvEStj50cX9VKjrGArwoQAE%2BsOZsbn3y4PtJT7RKWvB0aKRYM6e0OeBAp%2B0up1tFRuwwBOmoKMBUs%2ByTRKVQiofVIJW%2FpLVxBHHzjTx3zuNHMJrcr0I8K0X21AXYWn8rTB%2FmiWv45Y54goXUnKtRZg6bi7zFrUOPgZJmHPzbjrUaaxxVA6Us4cEvi%2BXOPx1a7YtKcpxFbmz713172tgtyqrHwN3Xd1ODuwIi2hU85JtPXwyk0tJThSBXdx390foDdHuoF5na7zLYJtyranyQSzqILLrK2AVhnZEDUAQdqKJnSREMl%2Ff11PdYwLelnDyzNL%2B%2Bb7u7Vah1qf1XKiR00zAhBecG2UR8UDpq1OifQ7DdTA4n5QymCJPyWYwH7TuNWNsHxvDCYpF5bfroh8oEjwZDV120zXXe4VJM4BD9htbh%2FxhFhoWqxH%2FbLmIs6J7Soo7LSfDgDzzUa1Wz9r%2FlBYjS5gfNk8G%2FRZ8BREzrFeItTJNMNHKwckGOqUBd35GjBnp2%2BLmk%2BTGr3q5iaEPFD6zrkh9kOKlQYKRwm6%2FmQPLdGDP1HqESgc0lkV9LVAZl0o6dNDMGh%2BC3b23Kn%2B6l5X9ljP6P3yYrtI%2Butl4v3Nvttm2nkQq8mleGjUy11yjxSIjB18zu9%2BQ7Q3kwc8wNQ8JnhnO1UZb13pavE6x8YPQiOV3Xg3KVQ6IxvFTtVxGcQWnwIYKxsscC1kSe2L27nsO&X-Amz-Signature=c213de67ddab0ff0a8aca00d693a7c57e3f3ca77b839399962b9ad6e6d0f3066&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

