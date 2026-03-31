---
layout: post
date: 2026-01-22
title: "[논문리뷰] Distinct neuroimaging subtypes of ADHD among adolescents based on semi-supervised learning"
tags: [ADHD, GAN]
categories: [Paper Review]
---


## Abstract

- ADHD는 소아기에 발병하는 neurodevelopmental disorder(신경 발달 장애)로, 진단과 아형 분류가 임상적 특성에 기반해 주관적이며 신뢰성 부족.
- 임상적 subtype 분류는 예후에 대한 명확한 지표 제공 X

_→ __**Semi-Supervised Learning**__ 기반의 heterogenity 파악 method 제시_

- Adolescent Brian Cognitive Development (ABCD) 데이터 활용
- 정상군 대비 Cortical Thickness를 기반으로 세 가지 subtype 확인 → 저발달(lower CT)/과발달(higher CT)/혼합
	- `저발달군` : cognitive score 유의미하게 낮고 사회경제적 지위 좋지 않음
	- `고발달군` : 각성제 약물(stimulant medication) 반응 안좋음
- Gene expressions / Neurotransmitter distributions (유전자 발현 / 신경 전달 물질 분포)
	- `저발달/혼합군` : 도파민 및 흥분성 경로의 upregulation(상향 조절) 강함

		> 💡 **Upregulation** : 특정 신호/자극에 반응해 세포 내 특정 물질(수용체, 단백질 등)/발현 증가하는 현상


			_→ 신호/자극에 대한 민감성을 높이기 위한 반응_

	- `고발달군` : 약함

	_→ 각성제 약물에 대한 반응성 차이 설명 가능 (고발달군에서 흥분성 경로의 upregulation 약함, 저발달/혼합군에서 높음)_


---


---



## Introduction


DSM-5(Diagnostic and Statistical Manual of Mental Disorder, fifth edition)에 따르면 ADHD는 세 가지의 임상 표현형으로 나뉨

- `Redominantly inattentive (ADHD-I)` : 주의력 결핍
- `Predominantly hyperactive/impulsive (ADHD-H/I)` : 과잉 행동/충동성
- `Combined (ADHD-C) presentations` : 복합형

_→ 임상 증상을 이용한 분류는 예후와 관련성 낮음_


<span class="notion-red">_→ 낮은 강건성, 약물 반응 구별 불가, 동반 질환, 공유되는 neuropsychological(신경심리학적) 결손, 신경생물학적 기저 반영 불가 문제_</span>


MRI를 이용한 연구들이 진행되어 왔으나 일관성 없는 결과를 보임

- 기존 연구들은 hierarchical clustering, K-means, Bayesian 같은 unsupervised clustering 위주

	→ 환자 데이터에만 의존해 clustering


_**⇒ Semi-supervised learning을 이용해 정상군 고려**_

	- Smile-GAN 차용 _(Yang et al., 2021)_
	- data distribution과 data transform의 linearity 가정에 의존하지 않음

		> 💡 **Not rely on Assumptions?**

			- 입력 데이터들이 Gaussian distribution과 같은 특정 분포를 따른다고 가정하지 않음
			- 환자 데이터가 정상에서의 선형 변환(NC + noise)으로 가정하지 않음

		<span class="notion-red">_**→ Smile-GAN은 data 자체의 **_</span><span class="notion-red">_**비선형 구조**_</span><span class="notion-red">_**를 학습**_</span>


**연구 내용**

- Smile-GAN을 이용해 ABCD cohort에 대해 Cortical Thickness 분석
	- Subtype 분류
	- 임상 발현/환경 요인/치료 반응 조사
- 외부 데이터셋에 subtype 적용/검증

---


---



## Materials and Method



### Materials



#### Participants


DSM-5 기반 진단, _Kiddie-Schedule of Affective Disorders and Schizophrenia for DSM-5 (KSADS-COMP) → 인터뷰 기반의 ADHD 증상 수치(개수)_

- Schizophrenia(정신분열증), bipolar disorder(양극성 장애), 추정 IQ < 70 제외

**ABCD**

- `Baseline` : ADHD/HC, 929/5580
	- age 9.83 ± 0.50 years, 68.7% male for ADHD
	- age 9.97 ± 0.62 years, 52.0% male for HC
- `2 year(follow-up)` : 633/4219
	- age 11.96 ± 0.58 years, 69.8% male for ADHD
	- age 11.90 ± 0.59 years, 53.2% male for HC

**ADHD-200 (external)**

- `Baseline` : 330/414
	- age 11.67 ± 3.02, 78.2% male for ADHD
	- age 11.67 ± 2.89 years, 53.0% male for HC

---



#### Image pre-processing and quality control


**ABCD**

- FreeSurfer 이용한 cortical reconstruction, segmentation pipeline 수행

	_→ DAIRC에서 제공한 전처리된 파일 사용_

- Destrieux template 적용
- Neuro-Combat 이용한 site-specific variations estimation/regression

	> 💡 **Site-specific variations estimation/regression?**

		- 장비/스캔 site 차이로 인한 편차(site effect)를 추정해(estimation) 제거/조정(harmonization)

**ADHD-200**

- NITRC 이용한 유사 과정 수행
- Destrieux template 적용, parcellate the brain into 148 ROIs

---



### Analysis



#### Semi-supervised classification


**Smile-GAN**

- nonlinear semi-supervised DL algorithm
- GAN 이용한 정상값으로부터 환자 데이터 합성
- Adversarial learning을 통한 합성/실제 데이터 구별 불가하도록 함

**Input**

- `HC` : 평균 1, 표준 편차 0.1로 정규화
- `ADHD` : HC에 대해 Z-score normalize (HC 그룹의 평균/표준 편차 이용)

**Subtype 수 결정**

- Adjusted Random Index와 permutation test 진행
- 2-7개의 cluster 분할에 대해 각각 5-fold cross-validation 수행

<span class="notion-red">_→ 3개 cluster에 대해서만 p-value < 0.05 로 유의미_</span>


_분석 결과 검증을 위해 각 subtype에서 main result와 validation dataset간의 T-score spatial correlation을 조사_


(Main result : ABCD; validation dataset : ADHD-200)


---



#### Imaging-transcriptome analysis


Subtype의 genetic signature 분석을 위해 Allen Human Brain Atlas (AHBA) microarray dataset 사용

- 6개 sample의 left hemisphere transcriptome data 사용
- 표준 전처리 수행 (probe-to-gene annotation 식별/filtering/brain region assign/scaled robust sigmoid transformation) 

	→ Destrieux template 교차 후 72개 ROI에 대해 10,027 gene expression 획득

- RNA expression과 T stastics 간의 correlation 분석

_→ 각 Subtype과 높은 correlation 보이는 gene 식별_


---



#### Imaging-neurochemical analysis

- 3가지의 neurotransmitter system에 걸친 5개의 receptor 분석 (JuSpace 이용)
- Neurochemical density map은 prior PET/SPECT 연구에서 차용
	- MNI template에 정렬되어 Destrieux atlas 따라 148개 ROI로 분할
- Neurochemical density map과 subtype의 T stastics map의 spatial correlation 분석

<span class="notion-red">_→ Subtype 별 neurochemical pattern 분석_</span>


---



### Statistical analysis

- Subtype 분석 전 follow-up 데이터에 대해 공변량 제어 (age, sex, site, race, ethnicity, socioeconomic status, and birth maternal conditions)
	- ADHD-200의 경우 age, sex, site 만 통제
- Smile-GAN 이용한 subtyping 후 two-sample T-test
	- psychopathology(정신병리), disease-related symdromes(관련 증후군), and socioeconomic status(사회경제적 지위) 비교
- Disease treatment 반응 비교 위해 baseline 부터 follow-up 까지의 진단명 변화를 T-test 이용해 분석

---


---



## Result



#### Distinct neuroimaging subtypes of ADHD


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/ad4df74c-7cbe-4465-ac72-71345219e411/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466557USR23%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T095135Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHIaCXVzLXdlc3QtMiJHMEUCIB06%2FWr%2FaNlkdzZbmLzGk7SJtY5LMRQrL757GmxSIe9yAiEAt4foBoopMiiVftkB9Q6LbYhpn5omDQtHPzLZWk6%2FsFUq%2FwMIOhAAGgw2Mzc0MjMxODM4MDUiDB3a31UfLLi%2Bho3fSSrcA5hd63CzGZ5aHMEL2J169Y5GdSwNuNcJjwNqE6gzLDUz6suh4Iqk%2F1qU6ZbAF7odByOOd00lmPd3eUEO%2B3YakC5kzS0EBYCwVw96PFLno94qBhmIhOgWU14ROPG7GkHw8J7q%2FwyMFY2W9wCZOBqBb2Z7be2Hy5yceQ%2B43oPqZjPBndXc4k2U%2Fm6MXy309qz94e7ljwbuI3aSrHX7F2%2F2o8SVQaZOSKqNz12eUO1h4H3qTmshhnFUsr47CIbGl5TI3AAojCRykp7ZBDkWSm8GM4%2BAwFEHDpGRhzHTxyGgxUedHPU0VQORFZCOTAIjGgBnOhs7bB7auI3nPGJkwxrKkAcN%2Fp1cECAuz5TnZBZPfyXsizepq8rpad%2BomGyxxm0jObPqPdFqMhICB%2Fm4GkOXgAfsockV3laons6vPKrn2te2wxcn1utE1kX7dwcV2OJpTKmeWBZImrYnmTA0lsZLNEtdyl6UbW%2Fi7%2BeBQYq59ZyqXKztlD9Aw9s%2FzHqbx2%2FsahCrLxMOncQkHyu52Kib1XN%2FVWnDCHvGYUoPdn27muki5JNcD2Um9EY4Gut2O%2B%2BL2T6Uzoj%2BCILZ9MvZ3zbMipqoxS3w8W4zzmVeYw1pgy7D2kS4Q0DK0HZlbV3MMKamrs4GOqUBnfx%2FDyrm%2FdHY8e%2BWftJDxOgrjdHsv3Z5%2BFPfgdBuGVmjm0sqEcIhg0Fj6Dzd64M3LKJVk61ybqGsKQ6eefAItZY1QpUWwKghKEAor2PlqOxGbm7%2B4TlPd%2FowecpHjK7Bzp5WI57rbjR1O3MFG0R2436b4FhSXXxuBlpPr9v5XMcLrqS%2BJLEC2EOykySdAwfdYItSizHOdQD9MKkqO91ErPkRDMnu&X-Amz-Signature=dd0342de1586c6961a19dc279c5503f0147aaf08127b3bc3ce4e4b2a4bc89e44&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


Cortical thickness를 입력으로 3가지 Subtype로 분할

- `Under-developed(Lower CT)` : posterior region에 낮은 CT 보임
- `Over-developed(High CT)` : posterior region에 높은 CT 보임
- `Mixed subtype` : dorsal, prefrontal, posterior region에 높은 CT, temporal에는 낮은 CT 보임

_→ 독립 데이터인 ADHD-200에서도 일관적인 결과 보임_


---



#### Neuroimaging subtypes encompassed differential clinical, family, and social characteristics


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/1a1d4829-9137-4ff7-8c14-b80f0100c690/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466557USR23%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T095135Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHIaCXVzLXdlc3QtMiJHMEUCIB06%2FWr%2FaNlkdzZbmLzGk7SJtY5LMRQrL757GmxSIe9yAiEAt4foBoopMiiVftkB9Q6LbYhpn5omDQtHPzLZWk6%2FsFUq%2FwMIOhAAGgw2Mzc0MjMxODM4MDUiDB3a31UfLLi%2Bho3fSSrcA5hd63CzGZ5aHMEL2J169Y5GdSwNuNcJjwNqE6gzLDUz6suh4Iqk%2F1qU6ZbAF7odByOOd00lmPd3eUEO%2B3YakC5kzS0EBYCwVw96PFLno94qBhmIhOgWU14ROPG7GkHw8J7q%2FwyMFY2W9wCZOBqBb2Z7be2Hy5yceQ%2B43oPqZjPBndXc4k2U%2Fm6MXy309qz94e7ljwbuI3aSrHX7F2%2F2o8SVQaZOSKqNz12eUO1h4H3qTmshhnFUsr47CIbGl5TI3AAojCRykp7ZBDkWSm8GM4%2BAwFEHDpGRhzHTxyGgxUedHPU0VQORFZCOTAIjGgBnOhs7bB7auI3nPGJkwxrKkAcN%2Fp1cECAuz5TnZBZPfyXsizepq8rpad%2BomGyxxm0jObPqPdFqMhICB%2Fm4GkOXgAfsockV3laons6vPKrn2te2wxcn1utE1kX7dwcV2OJpTKmeWBZImrYnmTA0lsZLNEtdyl6UbW%2Fi7%2BeBQYq59ZyqXKztlD9Aw9s%2FzHqbx2%2FsahCrLxMOncQkHyu52Kib1XN%2FVWnDCHvGYUoPdn27muki5JNcD2Um9EY4Gut2O%2B%2BL2T6Uzoj%2BCILZ9MvZ3zbMipqoxS3w8W4zzmVeYw1pgy7D2kS4Q0DK0HZlbV3MMKamrs4GOqUBnfx%2FDyrm%2FdHY8e%2BWftJDxOgrjdHsv3Z5%2BFPfgdBuGVmjm0sqEcIhg0Fj6Dzd64M3LKJVk61ybqGsKQ6eefAItZY1QpUWwKghKEAor2PlqOxGbm7%2B4TlPd%2FowecpHjK7Bzp5WI57rbjR1O3MFG0R2436b4FhSXXxuBlpPr9v5XMcLrqS%2BJLEC2EOykySdAwfdYItSizHOdQD9MKkqO91ErPkRDMnu&X-Amz-Signature=65cb4801d15a4437c33f58f23d560382f58f58f4dfd095a07c847336807e56b4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


Subtype과 임상적 관찰의 관련성 조사 → cognitive function, social behavior 차이 보임

- `Socioeconomic status` 
	- `Under-developed` : 낮은 가계 수입, 부모 교육 수준, 이른 산모 출산 연령 / 다른 subtype 대비 낮은 psychopathology와 cognition 수준 보임

<span class="notion-red">_→ 추가로 Neuroimaging subtype과 symptom-based subtype의 연관성 분석했으나 관련성 파악 못함_</span>


---



#### Differential response to stimulant medication among subtypes


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/310413de-9325-4f0f-929a-09869ea77609/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46667WYBWCJ%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T095135Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHIaCXVzLXdlc3QtMiJIMEYCIQDUORHAas1xqAXtqNrNqpXu%2FPWs3YLQhKJOOZwLN6V%2FNgIhAMvbonYuQnhrC5VXuTGGzWU1dNfTeGy8grV4GvrPoTP0Kv8DCDoQABoMNjM3NDIzMTgzODA1Igz4ts5oo9o3XYHdj4Aq3AM3Klc%2FW%2BMZ%2BsFUWHcArh6ycq%2BI2c7%2B7L3niHCdBSt7fdWP%2B%2F3eG1ca78iQ56plxZ%2Fm0PF195RsAgQ0QaVu0uwParQidzONa2Z9aYm16yrvNiXLvJqDWSZ634dbOxaT4s2R%2Bz31CZG7CpKwN2FLa3Afl7xPnkaTXLY7oPwBW1NotM63vkSWWn7PrP73eEkd3uZgE%2Bdk6X6UlGF97XtlrHxn7KbAX7YNrS1wh%2FtXAcGPOlIA1UxBJQWh%2FUaL69DpltOi%2Fu1X8eJpQzv9FKIy0Mxk%2Fy9S6oYvvG19n96F5uHPLhbxNYv0XDNbMEjcODBx6X9aL8qp6kerOvqymfmGO%2Bt1YQUD7M71Zm%2Bfxz9CdoPOm%2F4VCxASUm%2BLd5pQjZMxuO8u%2FsbpAgwt4XCSaTGoNZFqvntdBI82jkAXzExnvyutSVTQ%2FDsuIubBsCh4XcBFpakMeNBzPpG99%2Bh908IDBPGbsMW5Z1h4FdqTLby%2FYqlmyKf4jGrJ8epZ7n5vNfjW%2BJTx7cj9mvFOoo%2FurOWyr%2BdA49oBZ08VW8yGaBXyrWDz3TxaJeGtYEgcljV4ZYFOGEF2u6tIYCldI72qykFi5t3Rb2ilH%2F05iupcMhdc%2F7rM5bc94x52hcBWhsq9%2FTDTpa7OBjqkAaoW55XhgmvTLGdi3L%2FqyL%2BZoiESSQl%2B339%2BNImj2GJwTF5uG6gLD6OqVgIcS5hKy2i%2BiGepOhpCXCPWzOLk7dN4tOs2qsMLJVhGNdxPKog%2Bb3kEs7yGYYV0qOt4gU%2F41wEM%2F3azCmA2kVvJRShQmnimCbxtC8kdB0yC7jLPOWcwPwAIht6mhx5XxL7vq2wO5OZ3PfvFSc%2Bq%2Fw%2FNlxX72Byn4WdM&X-Amz-Signature=63ac87a85ffcd01952c06165285725711a44adb5294a91dc414f86b3e5e50b35&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


Subtype 별 각성제 약물 반응성 확인

- Methylphenidate Derivative(MPH), Amphetamine (AMPH)
- 두 약물은 ADHD의 1차 치료제

**분석 지표**

- `ADHD severity` : change of CBCL-ADHD t-score at DSM-5 scale, ΔCBCL-ADHD
- `Disease symptoms` : change of KSADS-COMP ADHD diagnostic symptom number, ΔKSADS

<span class="notion-red">_→ Baseline에서의 severity와 symptom이 유사했음에도 각성제 투약 후 subtype 별 회복 정도는 차이 보임(High-developed 의 경우 약물 반응 약함, under-developed가 나은 회복률 보임)_</span>


<span class="notion-red">_→ 약물 미투여군에 대해 subtype 별로 유의미한 차이 없음_</span>


---



#### Distinct transcriptomic signatures among the subtypes


**RNA expression data(AHBA transcriptome dataset)와 CT T-map의 correlation 분석**

- Subtype의 genetic basis 조사
- Bonferroni correction 사용
- `Under-developed` : 1063/1335 (pos/neg)
- `Over-developed` : 1120/713
- `Mixed` : 315/534

**Subtype 별 상위 300개 gene 이용해 Enrichment 분석**

- Gene Ontology/Kyoto Encyclopedia of Genes and Genomes (KEGG) database 기반
- FDR correction 사용
- `Under‑developed`
	- GO/KEGG에서 다수의 신경전달 관련 항(term) 풍부
	- GABAergic synapse, dopaminergic synapse, glutamatergic synapse, regulation of dopamine secretion 등.

	_→ 해당 subtype의 CT 패턴과 일치하는 유전자들이 도파민·GABA·글루탐산 경로와 밀접하게 연결되어 있어, neurotransmitter 불균형(또는 변조)이 구조적 차이를 반영할 가능성 존재_

- `Mixed`
	- GABAergic 및 glutamatergic 관련 항이 풍부

	_→ 신경전달체계 관련 기전이 관여된다는 점에서 under‑developed와 유사_

- `Over‑developed`
	- 신경전달 관련보다는 대사/인슐린 관련 항(e.g. regulation of insulin secretion)이 유의하게 풍부

	_→ Neurotransmitter 경로보다는 대사적 (insulin/비만 관련) 유전적 기질과 연관될 수 있고, 이는 임상적으로 비만·대사 연관성으로 이어질 수 있음_


_→ Subtype 간 뚜렷한 유전적 특성 존재_


_→ Under-develoepd/Mixed subtype의 경우 neurotransmitter 관련 유전적 뿌리 가짐_


_→ Over-developed의 경우 comorbid(insulin) 유전적 뿌리 가짐_


**ADHD 관련 유전자 분석 (TWAS 기반 후보)**


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/b9862833-4ef6-427e-a2a2-58f10552bfbe/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46667WYBWCJ%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T095135Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHIaCXVzLXdlc3QtMiJIMEYCIQDUORHAas1xqAXtqNrNqpXu%2FPWs3YLQhKJOOZwLN6V%2FNgIhAMvbonYuQnhrC5VXuTGGzWU1dNfTeGy8grV4GvrPoTP0Kv8DCDoQABoMNjM3NDIzMTgzODA1Igz4ts5oo9o3XYHdj4Aq3AM3Klc%2FW%2BMZ%2BsFUWHcArh6ycq%2BI2c7%2B7L3niHCdBSt7fdWP%2B%2F3eG1ca78iQ56plxZ%2Fm0PF195RsAgQ0QaVu0uwParQidzONa2Z9aYm16yrvNiXLvJqDWSZ634dbOxaT4s2R%2Bz31CZG7CpKwN2FLa3Afl7xPnkaTXLY7oPwBW1NotM63vkSWWn7PrP73eEkd3uZgE%2Bdk6X6UlGF97XtlrHxn7KbAX7YNrS1wh%2FtXAcGPOlIA1UxBJQWh%2FUaL69DpltOi%2Fu1X8eJpQzv9FKIy0Mxk%2Fy9S6oYvvG19n96F5uHPLhbxNYv0XDNbMEjcODBx6X9aL8qp6kerOvqymfmGO%2Bt1YQUD7M71Zm%2Bfxz9CdoPOm%2F4VCxASUm%2BLd5pQjZMxuO8u%2FsbpAgwt4XCSaTGoNZFqvntdBI82jkAXzExnvyutSVTQ%2FDsuIubBsCh4XcBFpakMeNBzPpG99%2Bh908IDBPGbsMW5Z1h4FdqTLby%2FYqlmyKf4jGrJ8epZ7n5vNfjW%2BJTx7cj9mvFOoo%2FurOWyr%2BdA49oBZ08VW8yGaBXyrWDz3TxaJeGtYEgcljV4ZYFOGEF2u6tIYCldI72qykFi5t3Rb2ilH%2F05iupcMhdc%2F7rM5bc94x52hcBWhsq9%2FTDTpa7OBjqkAaoW55XhgmvTLGdi3L%2FqyL%2BZoiESSQl%2B339%2BNImj2GJwTF5uG6gLD6OqVgIcS5hKy2i%2BiGepOhpCXCPWzOLk7dN4tOs2qsMLJVhGNdxPKog%2Bb3kEs7yGYYV0qOt4gU%2F41wEM%2F3azCmA2kVvJRShQmnimCbxtC8kdB0yC7jLPOWcwPwAIht6mhx5XxL7vq2wO5OZ3PfvFSc%2Bq%2Fw%2FNlxX72Byn4WdM&X-Amz-Signature=1369c45f79e03848cef0f5cc60bde490964c8594949fc7ba4c73820adaa95514&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- **(a)** TWAS로 보고된 8개 유전자 중 AHBA에 남아있던 5개 유전자에 대해 permutation(1000번)을 사용해 subtype과의 correlation 평가
	- 발견된 subtype‑관련 유전자(4개): CCDC24, ELOVL1, TIE1, MED8
	- `Under‑developed`: CCDC24, MED8와 양의 상관; TIE1와 음의 상관
	- `Over‑developed`: CCDC24, MED8와 음의 상관
	- `Mixed`: ELOVL1, TIE1와 양의 상관
- **(b)-(d)** 5개 유전자의 2개 PC 이용해 추가 분석
	- ROI 별 Gene expression으로만 PC 계산, 상위 2개에 대해 분석
	- ROI 별 CT값과 PC의 산점도 구함

<span class="notion-red">_→ 동일한 ADHD‑관련 후보 유전자조차 subtype마다 spatial correlation 달라 유전적 기질의 이질성 시사._</span>


---



#### Stronger dopamine upregulation in under-developed and mixed subtypes


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/b23fd3d2-7c82-4f9c-9578-378d805f0b5f/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46667WYBWCJ%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T095135Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHIaCXVzLXdlc3QtMiJIMEYCIQDUORHAas1xqAXtqNrNqpXu%2FPWs3YLQhKJOOZwLN6V%2FNgIhAMvbonYuQnhrC5VXuTGGzWU1dNfTeGy8grV4GvrPoTP0Kv8DCDoQABoMNjM3NDIzMTgzODA1Igz4ts5oo9o3XYHdj4Aq3AM3Klc%2FW%2BMZ%2BsFUWHcArh6ycq%2BI2c7%2B7L3niHCdBSt7fdWP%2B%2F3eG1ca78iQ56plxZ%2Fm0PF195RsAgQ0QaVu0uwParQidzONa2Z9aYm16yrvNiXLvJqDWSZ634dbOxaT4s2R%2Bz31CZG7CpKwN2FLa3Afl7xPnkaTXLY7oPwBW1NotM63vkSWWn7PrP73eEkd3uZgE%2Bdk6X6UlGF97XtlrHxn7KbAX7YNrS1wh%2FtXAcGPOlIA1UxBJQWh%2FUaL69DpltOi%2Fu1X8eJpQzv9FKIy0Mxk%2Fy9S6oYvvG19n96F5uHPLhbxNYv0XDNbMEjcODBx6X9aL8qp6kerOvqymfmGO%2Bt1YQUD7M71Zm%2Bfxz9CdoPOm%2F4VCxASUm%2BLd5pQjZMxuO8u%2FsbpAgwt4XCSaTGoNZFqvntdBI82jkAXzExnvyutSVTQ%2FDsuIubBsCh4XcBFpakMeNBzPpG99%2Bh908IDBPGbsMW5Z1h4FdqTLby%2FYqlmyKf4jGrJ8epZ7n5vNfjW%2BJTx7cj9mvFOoo%2FurOWyr%2BdA49oBZ08VW8yGaBXyrWDz3TxaJeGtYEgcljV4ZYFOGEF2u6tIYCldI72qykFi5t3Rb2ilH%2F05iupcMhdc%2F7rM5bc94x52hcBWhsq9%2FTDTpa7OBjqkAaoW55XhgmvTLGdi3L%2FqyL%2BZoiESSQl%2B339%2BNImj2GJwTF5uG6gLD6OqVgIcS5hKy2i%2BiGepOhpCXCPWzOLk7dN4tOs2qsMLJVhGNdxPKog%2Bb3kEs7yGYYV0qOt4gU%2F41wEM%2F3azCmA2kVvJRShQmnimCbxtC8kdB0yC7jLPOWcwPwAIht6mhx5XxL7vq2wO5OZ3PfvFSc%2Bq%2Fw%2FNlxX72Byn4WdM&X-Amz-Signature=a069026e3daf7117de446caab1631ac31c8cd5820ca2d595772e34dea071d590&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


Neurotransmitter 관련 pathway가 존재한다는 유전적 발견에 기반해 neurotransmitter profile 조사

- Under-developed/mixed subtype 과 관련
- ABA-ergic synapse, dopaminergic synapse, glutamatergic synapse
- `Under-developed` : Dopamin receptor D1/D2, DAT, GluR5와 양의 상관관계 (r = 0.555, 0.470, 0.566, r = 0.382, P\_{permu}<0.001)
- `Over-developed` : D1, DAT, GluR5와 음의 상관관계 (r = −0.316, −0.407, −0.181, P\_{permu}<0.001, <0.001, 0.015)
- `Mixed` : D1, DAT, GluR5와 음의 상관관계( r = −0.269, −0.652, −0.303, P\_{permu} < 0.001)

<span class="notion-red">_→ Over-developed/Mixed는 유사한 음의 상관관계 보임_</span>


<span class="notion-red">_→ Under-developed/Mixed subtype은 Over-developed 보다 더 큰 상관관계 크기를 보임_</span>


---


---



## Discussion

- Semi-supervised learning method(Smile-GAN)을 이용한 ADHD의 heterogenity 분석
- 뚜렷한 Cortical thickness profile 가지는 세 가지 subtype 분류
- Under-developed subtype은 가장 낮은 cognitive score를 보이며, 환경적 스트레스(낮은 가계 소득/부모 교육 수준)와 관련 있을 수 있음
- Over-developed subtype은 stimulant medication 반응이 가장 좋지 않았고, ADHD의 비정형적 특징과 관련 유전자/신경 전달 물질 경로와의 낮은 상관관계와 연관이 있을 수 있음

---


---



## Limitations

- AHBA는 성인 HC의 소수 sample data → 연령, 질환 차이 존재함
