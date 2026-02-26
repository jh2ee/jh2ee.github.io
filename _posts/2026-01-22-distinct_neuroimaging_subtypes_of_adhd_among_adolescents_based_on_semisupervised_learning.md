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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/ad4df74c-7cbe-4465-ac72-71345219e411/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663ZDGZZ3Z%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T005522Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFEaCXVzLXdlc3QtMiJHMEUCIQCj3RqoSU8oa1jokyGU6nkI8jqoOhtFeZvjbjElwmVMRAIgHUo%2BssrQa4uLI1js92fyltHocn5IqbnUWKB0Ouz58pYq%2FwMIGhAAGgw2Mzc0MjMxODM4MDUiDF3ifZ7ABD22GIiTPyrcA76yZc5qhlDY2hUH7ZG7B4wOAaP6u%2BBopjDmZq7X3NYnep05UG3kpbta0ed13Jif6hjHTTbseX8DLjWmDYazTqnbgVseh%2BDQ1V3YH%2B0dMJf677Kjexx2eILokkzVK%2FRV5pLJZ9%2FFgxwTaLDV7CTEd3wvk7NqvJ5Hilyh4gCIYedp2AbRRzCiaRBTdySIG9IWaOKVaop3IfVFpudrq%2BHQPBHh6gDdSPIPP01h6riG73e7NWS1f4ESe2vq71W0ZwVIoT0mTBqGu47G4poMk5RHb%2FXl1JmN%2BKjADAk3M2qP41kUCpWFltXSTxeXTv9pxCBxV9B45A19TcYM68eC0wnU%2Fi3rx6S4cMCU%2BgzEUrNngJAUkchfl8er%2Fw8bEvWJj%2FMl0vMy2fB1vxpR43s4RnolNmBgZD7p0LR3ewtkORlOyiJVlibfY9ooHb6VjGVTwsOCRcHDZdQGldNFXXxZB3BY9yU9KyXCA0P8rKJI8oZ8Uk7Sk3IDZ13cGNeEvdufDsZAF8X6A2%2FJLXpQk8D%2FC8IRK3wTJFXQqCIzuZgmPTsUTLHHz%2BGX0dpQxWGt7KGI7tp31a9EkpJGG8EtEFb53VIRNlkP%2FqU78OJuOZnYCcgI5h41sKDr8tlbB11EviuKMOit%2FswGOqUBYl0BnEDKWgphoP4PS5c%2BOCdZlQHmyJ1qTQSCZcl12XhpiXD7dKzQE1CF%2BvojLCH2Ralreu2lwENZdHxRpi1Su912pQo2dRRZDLp9OddJaSzjyxliZJ3ab3YZidpphLndNEprPJbY%2BMZqtikmhYC9CoYgF2NbrxgdYFZsPw2V3WGcC%2BS6jyyhFTveU8W8WXGI%2FOsffA02C3qvM9dopj73tKaFj9j8&X-Amz-Signature=3d4aec1c82823dea3e26e6a8f5cd0caa00e51e56ba1261100df57e1ce204d25e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


Cortical thickness를 입력으로 3가지 Subtype로 분할

- `Under-developed(Lower CT)` : posterior region에 낮은 CT 보임
- `Over-developed(High CT)` : posterior region에 높은 CT 보임
- `Mixed subtype` : dorsal, prefrontal, posterior region에 높은 CT, temporal에는 낮은 CT 보임

_→ 독립 데이터인 ADHD-200에서도 일관적인 결과 보임_


---



#### Neuroimaging subtypes encompassed differential clinical, family, and social characteristics


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/1a1d4829-9137-4ff7-8c14-b80f0100c690/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663ZDGZZ3Z%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T005522Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFEaCXVzLXdlc3QtMiJHMEUCIQCj3RqoSU8oa1jokyGU6nkI8jqoOhtFeZvjbjElwmVMRAIgHUo%2BssrQa4uLI1js92fyltHocn5IqbnUWKB0Ouz58pYq%2FwMIGhAAGgw2Mzc0MjMxODM4MDUiDF3ifZ7ABD22GIiTPyrcA76yZc5qhlDY2hUH7ZG7B4wOAaP6u%2BBopjDmZq7X3NYnep05UG3kpbta0ed13Jif6hjHTTbseX8DLjWmDYazTqnbgVseh%2BDQ1V3YH%2B0dMJf677Kjexx2eILokkzVK%2FRV5pLJZ9%2FFgxwTaLDV7CTEd3wvk7NqvJ5Hilyh4gCIYedp2AbRRzCiaRBTdySIG9IWaOKVaop3IfVFpudrq%2BHQPBHh6gDdSPIPP01h6riG73e7NWS1f4ESe2vq71W0ZwVIoT0mTBqGu47G4poMk5RHb%2FXl1JmN%2BKjADAk3M2qP41kUCpWFltXSTxeXTv9pxCBxV9B45A19TcYM68eC0wnU%2Fi3rx6S4cMCU%2BgzEUrNngJAUkchfl8er%2Fw8bEvWJj%2FMl0vMy2fB1vxpR43s4RnolNmBgZD7p0LR3ewtkORlOyiJVlibfY9ooHb6VjGVTwsOCRcHDZdQGldNFXXxZB3BY9yU9KyXCA0P8rKJI8oZ8Uk7Sk3IDZ13cGNeEvdufDsZAF8X6A2%2FJLXpQk8D%2FC8IRK3wTJFXQqCIzuZgmPTsUTLHHz%2BGX0dpQxWGt7KGI7tp31a9EkpJGG8EtEFb53VIRNlkP%2FqU78OJuOZnYCcgI5h41sKDr8tlbB11EviuKMOit%2FswGOqUBYl0BnEDKWgphoP4PS5c%2BOCdZlQHmyJ1qTQSCZcl12XhpiXD7dKzQE1CF%2BvojLCH2Ralreu2lwENZdHxRpi1Su912pQo2dRRZDLp9OddJaSzjyxliZJ3ab3YZidpphLndNEprPJbY%2BMZqtikmhYC9CoYgF2NbrxgdYFZsPw2V3WGcC%2BS6jyyhFTveU8W8WXGI%2FOsffA02C3qvM9dopj73tKaFj9j8&X-Amz-Signature=baa031e8d3aa957a0fe640e557a66272a0abe7a159e60099424550aac4c00a09&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


Subtype과 임상적 관찰의 관련성 조사 → cognitive function, social behavior 차이 보임

- `Socioeconomic status` 
	- `Under-developed` : 낮은 가계 수입, 부모 교육 수준, 이른 산모 출산 연령 / 다른 subtype 대비 낮은 psychopathology와 cognition 수준 보임

<span class="notion-red">_→ 추가로 Neuroimaging subtype과 symptom-based subtype의 연관성 분석했으나 관련성 파악 못함_</span>


---



#### Differential response to stimulant medication among subtypes


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/310413de-9325-4f0f-929a-09869ea77609/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666SNV45PP%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T005522Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFEaCXVzLXdlc3QtMiJIMEYCIQCReFeUpv3plQ3ODZpgNTwqjIk%2FBiPmkZKtOzOaywhs1wIhAMeSmcppMHtzwxGyx%2Bfe0l6OR80a%2F3d2vQ6pl%2BnmJ4INKv8DCBoQABoMNjM3NDIzMTgzODA1IgxHaN7wUHNDSXjqhFYq3AO%2F8jwMuHVT9tK%2FQO1YjrEaBvdMDrXTGUb0TY34Fk39%2FPkIKC%2FsK1hw5oJ%2F1mqer7wVokh0E%2FDV3draDjleFOd2tAqH4un3c%2FiFMlOqj6B%2B1DkQN0cfbVLoFzaziryL8EgdMf6mH%2FBKAp1JuslqMXCd%2FegrZAF1kHzN2SDHihoyuIEPQu95zs3Utc%2BYcsh0L1huByhA5P2V2VDQLl2HeZL%2Fn5XilxYHmh8ZNg2GFjUOXrQ39g%2BEEUAiG3gNU3dikEHZAtPd2Dv0nTKbBlfc2br%2F9cM1XdO4pB%2B4b4NK7MG8CITriH3zom5tWWXM0VXNAEwnN2nGjmmAozBEpavTNfVRStYeaOCjsEuif3rxdO2P2kbVLpFsJqxBZ9XRGk5IJZslBfc09e8SHW0mqqV3yCKk7JnFsDjwbJDveWt8oj6T%2FxW8prjx0v14Z02ar%2FIR3RQIgOXX%2BCLyuFbwuSzSQ%2BNVhdrdLDwcUnyimuvmlg1bl4PQ%2B5k1gkyRWFZ6rLTl8MpvuiUoMFEf9RRS32Fw0IJK13FutN6A9lsKRBFs3Pttz4D4bkIKzexMiXFzpEAiPVJ0D7Aeh%2BKVE1JkrKpUi8Z77z8mom%2FCMsJPLqsliUyddsOvp2TmsQ15vXWEADDPrP7MBjqkAZCoVJflfn%2BclcGw9lTSKcqWiDfGbjnz6u7XDEq%2FKbdxmo4o%2BY9hkWTjoHG43py9GHMRAMJ3lsy3Zb6UmwK1QiwXVEr976vvzPXpZswCI6SbKmjgEz78ELZWzimaCcoryxtx6Ge5zSU5vKkjQKC%2FPl7O5Q9UlPjd1F%2BoAsTzVzz60nFfHtrZgya8TRLlRN3gyOhxET3Yz4HpXQHCXev1jfbdbTeW&X-Amz-Signature=4c7c3311d9a721d43abfa3aa0845a9c13f29a63ad5dec6976c001a540193c61a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/b9862833-4ef6-427e-a2a2-58f10552bfbe/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666SNV45PP%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T005523Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFEaCXVzLXdlc3QtMiJIMEYCIQCReFeUpv3plQ3ODZpgNTwqjIk%2FBiPmkZKtOzOaywhs1wIhAMeSmcppMHtzwxGyx%2Bfe0l6OR80a%2F3d2vQ6pl%2BnmJ4INKv8DCBoQABoMNjM3NDIzMTgzODA1IgxHaN7wUHNDSXjqhFYq3AO%2F8jwMuHVT9tK%2FQO1YjrEaBvdMDrXTGUb0TY34Fk39%2FPkIKC%2FsK1hw5oJ%2F1mqer7wVokh0E%2FDV3draDjleFOd2tAqH4un3c%2FiFMlOqj6B%2B1DkQN0cfbVLoFzaziryL8EgdMf6mH%2FBKAp1JuslqMXCd%2FegrZAF1kHzN2SDHihoyuIEPQu95zs3Utc%2BYcsh0L1huByhA5P2V2VDQLl2HeZL%2Fn5XilxYHmh8ZNg2GFjUOXrQ39g%2BEEUAiG3gNU3dikEHZAtPd2Dv0nTKbBlfc2br%2F9cM1XdO4pB%2B4b4NK7MG8CITriH3zom5tWWXM0VXNAEwnN2nGjmmAozBEpavTNfVRStYeaOCjsEuif3rxdO2P2kbVLpFsJqxBZ9XRGk5IJZslBfc09e8SHW0mqqV3yCKk7JnFsDjwbJDveWt8oj6T%2FxW8prjx0v14Z02ar%2FIR3RQIgOXX%2BCLyuFbwuSzSQ%2BNVhdrdLDwcUnyimuvmlg1bl4PQ%2B5k1gkyRWFZ6rLTl8MpvuiUoMFEf9RRS32Fw0IJK13FutN6A9lsKRBFs3Pttz4D4bkIKzexMiXFzpEAiPVJ0D7Aeh%2BKVE1JkrKpUi8Z77z8mom%2FCMsJPLqsliUyddsOvp2TmsQ15vXWEADDPrP7MBjqkAZCoVJflfn%2BclcGw9lTSKcqWiDfGbjnz6u7XDEq%2FKbdxmo4o%2BY9hkWTjoHG43py9GHMRAMJ3lsy3Zb6UmwK1QiwXVEr976vvzPXpZswCI6SbKmjgEz78ELZWzimaCcoryxtx6Ge5zSU5vKkjQKC%2FPl7O5Q9UlPjd1F%2BoAsTzVzz60nFfHtrZgya8TRLlRN3gyOhxET3Yz4HpXQHCXev1jfbdbTeW&X-Amz-Signature=5860f5588dbf1a5b144bd16228c5633727c2e5f6bea59d4f5addbbff724f7091&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/b23fd3d2-7c82-4f9c-9578-378d805f0b5f/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666SNV45PP%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T005523Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFEaCXVzLXdlc3QtMiJIMEYCIQCReFeUpv3plQ3ODZpgNTwqjIk%2FBiPmkZKtOzOaywhs1wIhAMeSmcppMHtzwxGyx%2Bfe0l6OR80a%2F3d2vQ6pl%2BnmJ4INKv8DCBoQABoMNjM3NDIzMTgzODA1IgxHaN7wUHNDSXjqhFYq3AO%2F8jwMuHVT9tK%2FQO1YjrEaBvdMDrXTGUb0TY34Fk39%2FPkIKC%2FsK1hw5oJ%2F1mqer7wVokh0E%2FDV3draDjleFOd2tAqH4un3c%2FiFMlOqj6B%2B1DkQN0cfbVLoFzaziryL8EgdMf6mH%2FBKAp1JuslqMXCd%2FegrZAF1kHzN2SDHihoyuIEPQu95zs3Utc%2BYcsh0L1huByhA5P2V2VDQLl2HeZL%2Fn5XilxYHmh8ZNg2GFjUOXrQ39g%2BEEUAiG3gNU3dikEHZAtPd2Dv0nTKbBlfc2br%2F9cM1XdO4pB%2B4b4NK7MG8CITriH3zom5tWWXM0VXNAEwnN2nGjmmAozBEpavTNfVRStYeaOCjsEuif3rxdO2P2kbVLpFsJqxBZ9XRGk5IJZslBfc09e8SHW0mqqV3yCKk7JnFsDjwbJDveWt8oj6T%2FxW8prjx0v14Z02ar%2FIR3RQIgOXX%2BCLyuFbwuSzSQ%2BNVhdrdLDwcUnyimuvmlg1bl4PQ%2B5k1gkyRWFZ6rLTl8MpvuiUoMFEf9RRS32Fw0IJK13FutN6A9lsKRBFs3Pttz4D4bkIKzexMiXFzpEAiPVJ0D7Aeh%2BKVE1JkrKpUi8Z77z8mom%2FCMsJPLqsliUyddsOvp2TmsQ15vXWEADDPrP7MBjqkAZCoVJflfn%2BclcGw9lTSKcqWiDfGbjnz6u7XDEq%2FKbdxmo4o%2BY9hkWTjoHG43py9GHMRAMJ3lsy3Zb6UmwK1QiwXVEr976vvzPXpZswCI6SbKmjgEz78ELZWzimaCcoryxtx6Ge5zSU5vKkjQKC%2FPl7O5Q9UlPjd1F%2BoAsTzVzz60nFfHtrZgya8TRLlRN3gyOhxET3Yz4HpXQHCXev1jfbdbTeW&X-Amz-Signature=92beec189d2ecc2a8023a7751777e0fcd3faf6dc7e19596fac1cac92e223e53e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


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
