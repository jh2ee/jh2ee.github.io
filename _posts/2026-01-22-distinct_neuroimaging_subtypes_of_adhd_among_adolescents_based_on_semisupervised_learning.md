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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/ad4df74c-7cbe-4465-ac72-71345219e411/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QD5GVGZJ%2F20260317%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260317T103706Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECIaCXVzLXdlc3QtMiJHMEUCIAR8tuz955a6WA9T6%2BRcyLTYKufLzVeDu3FuZdAfDNTSAiEAg7LOQSZLw6xzVkzjX6yYO29exB1TwiZxM4trXAa5Sy0qiAQI6%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDERKX1Sd4EnT6%2Fhp0ircA1WoODUf8reo0sLhoXx5E8eMXZAIPwTOSauhlmFJCb%2FN5aRmrzA6jz%2BX7a6cNIdVUHvadjPbGkklK0SiZ0kP6VL4TPGmu2QthzClA50vYPZEKti6jwjbUny1PrirVYmGEGdQs35znDkcrHFH5uRwBp5qnF0vAQ1Hu%2FWq0Pe5POj6XIIWo7eFGlx2Emn1nV7CprEjZJmLIyDj1GaeDmD4cJVeous9UvYgJTaaGfIuOPuJoxSk9cHA6GFnIs82Jt5CoSjQM1nRCJu8tjY%2Bm0Xs31ybJ2bOrob5Bpxsc8j1wZ%2BT2Z4XSLv4YxPiV%2Bjf7trIDjSJAWwyHRnFoUoC1H2xAnQ%2FhAQ6Lb%2FbVySSVWaBe%2F9ECvj2o1D6JbOo4mYi8CxRYwMZbOUQ4Blxg3zU1zKZHrOav8p21ja5H4KS4xMmp80PMj02SW228CCxFLbggq7TOUF0YZKv8K2SyzfcicW6urET0TwPtcJqGUGOid2MhrdHTfsNigtvfbE5BGz1L9%2Ba3ulGQ9S0XpBflwMl3BVIFcaan4IPSQSMwVh9dejhglfjeu3GGAGYTsjFsseKm6CGBbqBRaYIBkDMn6oTmpo55%2FTM0x4KO91cAQbUI0wvB05wA75629wI%2F0O4aiOBMLTQ5M0GOqUBoCgcdaxHb222ykVhpJ%2FfZ7J5Hjv7ANSnVL1r4fztj%2FczK%2FC2%2BU10iwG1MPteBt5a2PfZiwPpBS26oM73M5FdQcCHG8E4tvTcQHT2369tXY%2FIOBziRPnknlXMit6lYYR1ClddvHsxQBjKzOWGxH4ywRTozCZIARrWpgA%2Bqoh09Jy3Qo3B5VrekHdyx9%2Bk53y2GFmgd9josm4CyIyEet6djeAiueM8&X-Amz-Signature=0825d0ae8d5a8a9bd03e351f5fb290482bd89c00a4632053a2a134aca5eeffb4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


Cortical thickness를 입력으로 3가지 Subtype로 분할

- `Under-developed(Lower CT)` : posterior region에 낮은 CT 보임
- `Over-developed(High CT)` : posterior region에 높은 CT 보임
- `Mixed subtype` : dorsal, prefrontal, posterior region에 높은 CT, temporal에는 낮은 CT 보임

_→ 독립 데이터인 ADHD-200에서도 일관적인 결과 보임_


---



#### Neuroimaging subtypes encompassed differential clinical, family, and social characteristics


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/1a1d4829-9137-4ff7-8c14-b80f0100c690/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QD5GVGZJ%2F20260317%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260317T103706Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECIaCXVzLXdlc3QtMiJHMEUCIAR8tuz955a6WA9T6%2BRcyLTYKufLzVeDu3FuZdAfDNTSAiEAg7LOQSZLw6xzVkzjX6yYO29exB1TwiZxM4trXAa5Sy0qiAQI6%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDERKX1Sd4EnT6%2Fhp0ircA1WoODUf8reo0sLhoXx5E8eMXZAIPwTOSauhlmFJCb%2FN5aRmrzA6jz%2BX7a6cNIdVUHvadjPbGkklK0SiZ0kP6VL4TPGmu2QthzClA50vYPZEKti6jwjbUny1PrirVYmGEGdQs35znDkcrHFH5uRwBp5qnF0vAQ1Hu%2FWq0Pe5POj6XIIWo7eFGlx2Emn1nV7CprEjZJmLIyDj1GaeDmD4cJVeous9UvYgJTaaGfIuOPuJoxSk9cHA6GFnIs82Jt5CoSjQM1nRCJu8tjY%2Bm0Xs31ybJ2bOrob5Bpxsc8j1wZ%2BT2Z4XSLv4YxPiV%2Bjf7trIDjSJAWwyHRnFoUoC1H2xAnQ%2FhAQ6Lb%2FbVySSVWaBe%2F9ECvj2o1D6JbOo4mYi8CxRYwMZbOUQ4Blxg3zU1zKZHrOav8p21ja5H4KS4xMmp80PMj02SW228CCxFLbggq7TOUF0YZKv8K2SyzfcicW6urET0TwPtcJqGUGOid2MhrdHTfsNigtvfbE5BGz1L9%2Ba3ulGQ9S0XpBflwMl3BVIFcaan4IPSQSMwVh9dejhglfjeu3GGAGYTsjFsseKm6CGBbqBRaYIBkDMn6oTmpo55%2FTM0x4KO91cAQbUI0wvB05wA75629wI%2F0O4aiOBMLTQ5M0GOqUBoCgcdaxHb222ykVhpJ%2FfZ7J5Hjv7ANSnVL1r4fztj%2FczK%2FC2%2BU10iwG1MPteBt5a2PfZiwPpBS26oM73M5FdQcCHG8E4tvTcQHT2369tXY%2FIOBziRPnknlXMit6lYYR1ClddvHsxQBjKzOWGxH4ywRTozCZIARrWpgA%2Bqoh09Jy3Qo3B5VrekHdyx9%2Bk53y2GFmgd9josm4CyIyEet6djeAiueM8&X-Amz-Signature=38c9f4fca62167d7821a00c14e4d9473488b4e4fa4b5efec69e7241c88ec2f83&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


Subtype과 임상적 관찰의 관련성 조사 → cognitive function, social behavior 차이 보임

- `Socioeconomic status` 
	- `Under-developed` : 낮은 가계 수입, 부모 교육 수준, 이른 산모 출산 연령 / 다른 subtype 대비 낮은 psychopathology와 cognition 수준 보임

<span class="notion-red">_→ 추가로 Neuroimaging subtype과 symptom-based subtype의 연관성 분석했으나 관련성 파악 못함_</span>


---



#### Differential response to stimulant medication among subtypes


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/310413de-9325-4f0f-929a-09869ea77609/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46642XF2T3T%2F20260317%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260317T103707Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECIaCXVzLXdlc3QtMiJHMEUCIQDThKFPWLW2GgJY6xopSQTkS8%2BVsWOybnKmvywKhKUcMwIgHMgAgIw9SJ9t0Gn9txCCHY7sEtQtZJMcv5p9xOSJFp4qiAQI6%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDDwrATKCMXG2i%2FfJ0CrcA0vt2jEt%2BwgF6bUKpA6A8eU5zw4glzlO6MLTl7lcmANwDxUqEDY7PtA6c0hbH0qYqFQA47rXq9MIhLHkH%2FPEE08zTc36YmzF4WUojTADfkfbPvwus%2BsLsIcqGg8BQZvxYv20OiBTE%2BrooO%2BlaQVQ0ltiMgB%2BasvTmkpiwHRLhloBIc6dMdL42pNlyLAtJh2vvmK0wzZ6%2B2%2BA1E25isghWHt5kzfw024IWswKU9nB6sIbclKD95CRV6q6rrMVTJvHcn1UEPfmxc0MwdIjpLZY6YqEsXw5biUVoI0XSMVbmB085MBxWD69t1mR2Xa%2B4rgU3if1bnApYfdaPg3EsbKwteuQ363f7in7NlUnUqz4pOhD3Dn1n2N7k8vMjctZdX6tTHPdND4K9bSzAVJF%2BItl27rJO3SgASe8BXUQWm7Lm57kPTRioBOUzgZa286UPCQePZeeoZXNx6Uk6GVAE976GEJK6YlzrosPqYapL08eqPBA%2FfJlQOSs9cbNCQ81ARxHv1n7ailm7AeYZefuRG2dZ6nDvElFsbOUuoiAS3v7mxmxUmXPNp%2F%2FtfiSB6Vav9QC6O8ZRDGiqEGwPfcAhnyL9IobC04%2FQ5RcQjM9gtU4hpwSgj9uNzailfIxC0ZjMNrP5M0GOqUB2Yj9WgYWisF2sNjJpX6JUIq3zEEWGxo0K5n1Mk4BQtht%2BBazd5Xzrtoyrcs5sFIEWVgeATFptUSvuKL4IXDRNppp72JjqUdskINJNiFZ1MLDcc%2B4v8SwBFQusn8sx43msCQ8MqyK%2BUR9m9A4cpad0eln3RPoKZbfTH5dsf4aMsrvwSi%2BMUYRSgwY8kUf2msT6utspHNOZppsGRxyCBEK6xDiOS%2FA&X-Amz-Signature=2597799c1a84608834ddbd7bc318564caff4a8751fb2887605a0f658dd7aa6ff&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/b9862833-4ef6-427e-a2a2-58f10552bfbe/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46642XF2T3T%2F20260317%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260317T103707Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECIaCXVzLXdlc3QtMiJHMEUCIQDThKFPWLW2GgJY6xopSQTkS8%2BVsWOybnKmvywKhKUcMwIgHMgAgIw9SJ9t0Gn9txCCHY7sEtQtZJMcv5p9xOSJFp4qiAQI6%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDDwrATKCMXG2i%2FfJ0CrcA0vt2jEt%2BwgF6bUKpA6A8eU5zw4glzlO6MLTl7lcmANwDxUqEDY7PtA6c0hbH0qYqFQA47rXq9MIhLHkH%2FPEE08zTc36YmzF4WUojTADfkfbPvwus%2BsLsIcqGg8BQZvxYv20OiBTE%2BrooO%2BlaQVQ0ltiMgB%2BasvTmkpiwHRLhloBIc6dMdL42pNlyLAtJh2vvmK0wzZ6%2B2%2BA1E25isghWHt5kzfw024IWswKU9nB6sIbclKD95CRV6q6rrMVTJvHcn1UEPfmxc0MwdIjpLZY6YqEsXw5biUVoI0XSMVbmB085MBxWD69t1mR2Xa%2B4rgU3if1bnApYfdaPg3EsbKwteuQ363f7in7NlUnUqz4pOhD3Dn1n2N7k8vMjctZdX6tTHPdND4K9bSzAVJF%2BItl27rJO3SgASe8BXUQWm7Lm57kPTRioBOUzgZa286UPCQePZeeoZXNx6Uk6GVAE976GEJK6YlzrosPqYapL08eqPBA%2FfJlQOSs9cbNCQ81ARxHv1n7ailm7AeYZefuRG2dZ6nDvElFsbOUuoiAS3v7mxmxUmXPNp%2F%2FtfiSB6Vav9QC6O8ZRDGiqEGwPfcAhnyL9IobC04%2FQ5RcQjM9gtU4hpwSgj9uNzailfIxC0ZjMNrP5M0GOqUB2Yj9WgYWisF2sNjJpX6JUIq3zEEWGxo0K5n1Mk4BQtht%2BBazd5Xzrtoyrcs5sFIEWVgeATFptUSvuKL4IXDRNppp72JjqUdskINJNiFZ1MLDcc%2B4v8SwBFQusn8sx43msCQ8MqyK%2BUR9m9A4cpad0eln3RPoKZbfTH5dsf4aMsrvwSi%2BMUYRSgwY8kUf2msT6utspHNOZppsGRxyCBEK6xDiOS%2FA&X-Amz-Signature=7d532254127104c9d981ee0ddabb87ff89bf234cbc99cd3e44586b19f06bd2f5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/b23fd3d2-7c82-4f9c-9578-378d805f0b5f/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46642XF2T3T%2F20260317%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260317T103707Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECIaCXVzLXdlc3QtMiJHMEUCIQDThKFPWLW2GgJY6xopSQTkS8%2BVsWOybnKmvywKhKUcMwIgHMgAgIw9SJ9t0Gn9txCCHY7sEtQtZJMcv5p9xOSJFp4qiAQI6%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDDwrATKCMXG2i%2FfJ0CrcA0vt2jEt%2BwgF6bUKpA6A8eU5zw4glzlO6MLTl7lcmANwDxUqEDY7PtA6c0hbH0qYqFQA47rXq9MIhLHkH%2FPEE08zTc36YmzF4WUojTADfkfbPvwus%2BsLsIcqGg8BQZvxYv20OiBTE%2BrooO%2BlaQVQ0ltiMgB%2BasvTmkpiwHRLhloBIc6dMdL42pNlyLAtJh2vvmK0wzZ6%2B2%2BA1E25isghWHt5kzfw024IWswKU9nB6sIbclKD95CRV6q6rrMVTJvHcn1UEPfmxc0MwdIjpLZY6YqEsXw5biUVoI0XSMVbmB085MBxWD69t1mR2Xa%2B4rgU3if1bnApYfdaPg3EsbKwteuQ363f7in7NlUnUqz4pOhD3Dn1n2N7k8vMjctZdX6tTHPdND4K9bSzAVJF%2BItl27rJO3SgASe8BXUQWm7Lm57kPTRioBOUzgZa286UPCQePZeeoZXNx6Uk6GVAE976GEJK6YlzrosPqYapL08eqPBA%2FfJlQOSs9cbNCQ81ARxHv1n7ailm7AeYZefuRG2dZ6nDvElFsbOUuoiAS3v7mxmxUmXPNp%2F%2FtfiSB6Vav9QC6O8ZRDGiqEGwPfcAhnyL9IobC04%2FQ5RcQjM9gtU4hpwSgj9uNzailfIxC0ZjMNrP5M0GOqUB2Yj9WgYWisF2sNjJpX6JUIq3zEEWGxo0K5n1Mk4BQtht%2BBazd5Xzrtoyrcs5sFIEWVgeATFptUSvuKL4IXDRNppp72JjqUdskINJNiFZ1MLDcc%2B4v8SwBFQusn8sx43msCQ8MqyK%2BUR9m9A4cpad0eln3RPoKZbfTH5dsf4aMsrvwSi%2BMUYRSgwY8kUf2msT6utspHNOZppsGRxyCBEK6xDiOS%2FA&X-Amz-Signature=7620fc1486e846fcf27035d511f1914f911ccd3eacc2b31d252a3198751c7579&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


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
