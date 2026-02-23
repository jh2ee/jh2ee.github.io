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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/ad4df74c-7cbe-4465-ac72-71345219e411/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WZAR3G4B%2F20260223%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260223T074448Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEA8aCXVzLXdlc3QtMiJIMEYCIQDh3%2B8crWHcmHgI4j1scGX0IMlSGu4Vn3KHUSl6mQn2mgIhANqFr2S8Ln4oZAB05jQ7%2BjrCWX%2BkKJxhjZcyzyQezzoXKogECNj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxvyDU%2FrRTN2L67AI0q3APbw4uLkQGZByaCQpXPmr1AddfbYJPbM5ahaTPnKgTmbCqmZhU8NeBNVPgyzAntFkKUd4xEIZ77yIwzuIoU%2BWhUktp%2FxCGIDsvqvU0bMVateO%2FBRPY4ZD%2BopjFshY9D2wzpB6QrsQpdMJVrBUVeI0m%2FZkuJZl%2FRlevGeQxzaQSbNI%2BT%2BJnPdw9YtaUZd3Altik1u4%2BtCUUAZjk5oKlMWe%2BgLU1x6sJ4tQLVMJMGxu3G53P8J%2BzPx9UvsquGJ3c%2FUh5RzRrgPXQM6eTaQHCCTfshbB%2B0Hm608c9DCeG%2B7CPZBjs%2FTiOtgAHxeooPvgVAEr0NPNvk0VaZU4L%2BzJU2MEvJ1kPk84roczr18KGu617TF5s9fMyzRx0bZdtl7ecVVxuYeKnTOkWTe8bL%2F3lw2Z7k6cJjbmd0mjXoDuA6hDgg%2FJDEcVP54Y7CU60G3f6KP3G75zsZ5dmtoNoC3mBBGowJcn4xxB0aKpalUc7nbSjW29gFQi4oAmh0bv9kZeS9GbRivF6M%2BtKlKYqGWwI6PkgIgLo1SW3nXuCrlXO3oKFZmPjkihbMsgdfUD5AgUju3kkt%2B3l4vaMB7FT1qE9tKETAtoSeey2b2aL2a7y4Vmozft%2BQuDfXI8vKUkMMfTDr6e%2FMBjqkAS9E%2BBCurGcHeCuAopp0RZgC6OacYJYQOgpSl8BQLAXsmhsS3wA%2FPg2wy101ztIJmQWcxdMB4KTCHYRl2ZnudG9uFve%2FidO6lmC8PpNRnxErHRWLZACtA1%2BjqelQlRXPqAVps%2BPRvqzd3iectMoNjSVbJg7gFwS07J4nJlMQqH6wlK%2B2Kuvc9KOB4DBaH2dl4YjqdaMPpEQFCwGyF3l9ztrx5fIQ&X-Amz-Signature=c4d2f6b81d155cacce6ee301edb696dece93e8932721c9031e4989d8c0e08aba&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


Cortical thickness를 입력으로 3가지 Subtype로 분할

- `Under-developed(Lower CT)` : posterior region에 낮은 CT 보임
- `Over-developed(High CT)` : posterior region에 높은 CT 보임
- `Mixed subtype` : dorsal, prefrontal, posterior region에 높은 CT, temporal에는 낮은 CT 보임

_→ 독립 데이터인 ADHD-200에서도 일관적인 결과 보임_


---



#### Neuroimaging subtypes encompassed differential clinical, family, and social characteristics


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/1a1d4829-9137-4ff7-8c14-b80f0100c690/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WZAR3G4B%2F20260223%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260223T074448Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEA8aCXVzLXdlc3QtMiJIMEYCIQDh3%2B8crWHcmHgI4j1scGX0IMlSGu4Vn3KHUSl6mQn2mgIhANqFr2S8Ln4oZAB05jQ7%2BjrCWX%2BkKJxhjZcyzyQezzoXKogECNj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxvyDU%2FrRTN2L67AI0q3APbw4uLkQGZByaCQpXPmr1AddfbYJPbM5ahaTPnKgTmbCqmZhU8NeBNVPgyzAntFkKUd4xEIZ77yIwzuIoU%2BWhUktp%2FxCGIDsvqvU0bMVateO%2FBRPY4ZD%2BopjFshY9D2wzpB6QrsQpdMJVrBUVeI0m%2FZkuJZl%2FRlevGeQxzaQSbNI%2BT%2BJnPdw9YtaUZd3Altik1u4%2BtCUUAZjk5oKlMWe%2BgLU1x6sJ4tQLVMJMGxu3G53P8J%2BzPx9UvsquGJ3c%2FUh5RzRrgPXQM6eTaQHCCTfshbB%2B0Hm608c9DCeG%2B7CPZBjs%2FTiOtgAHxeooPvgVAEr0NPNvk0VaZU4L%2BzJU2MEvJ1kPk84roczr18KGu617TF5s9fMyzRx0bZdtl7ecVVxuYeKnTOkWTe8bL%2F3lw2Z7k6cJjbmd0mjXoDuA6hDgg%2FJDEcVP54Y7CU60G3f6KP3G75zsZ5dmtoNoC3mBBGowJcn4xxB0aKpalUc7nbSjW29gFQi4oAmh0bv9kZeS9GbRivF6M%2BtKlKYqGWwI6PkgIgLo1SW3nXuCrlXO3oKFZmPjkihbMsgdfUD5AgUju3kkt%2B3l4vaMB7FT1qE9tKETAtoSeey2b2aL2a7y4Vmozft%2BQuDfXI8vKUkMMfTDr6e%2FMBjqkAS9E%2BBCurGcHeCuAopp0RZgC6OacYJYQOgpSl8BQLAXsmhsS3wA%2FPg2wy101ztIJmQWcxdMB4KTCHYRl2ZnudG9uFve%2FidO6lmC8PpNRnxErHRWLZACtA1%2BjqelQlRXPqAVps%2BPRvqzd3iectMoNjSVbJg7gFwS07J4nJlMQqH6wlK%2B2Kuvc9KOB4DBaH2dl4YjqdaMPpEQFCwGyF3l9ztrx5fIQ&X-Amz-Signature=94299f5af153b2b851178f55ff418d14b0ac1cc9747f4e2a77a52efc2bdac91d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


Subtype과 임상적 관찰의 관련성 조사 → cognitive function, social behavior 차이 보임

- `Socioeconomic status` 
	- `Under-developed` : 낮은 가계 수입, 부모 교육 수준, 이른 산모 출산 연령 / 다른 subtype 대비 낮은 psychopathology와 cognition 수준 보임

<span class="notion-red">_→ 추가로 Neuroimaging subtype과 symptom-based subtype의 연관성 분석했으나 관련성 파악 못함_</span>


---



#### Differential response to stimulant medication among subtypes


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/310413de-9325-4f0f-929a-09869ea77609/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466522MSQTE%2F20260223%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260223T074449Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEA8aCXVzLXdlc3QtMiJIMEYCIQCe%2FvipANeB%2BJdGpSr01MpF5y%2FJJ%2FHq9V0u9%2B1dZRjmMAIhAODSTCNZEu2BdolwzEddOLkUG4caDaJhAU07r73EpT2rKogECNj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igw84fPNIJbYhA%2Bq%2FlQq3AO1%2BywoE8CnVgI1snd%2BJqjjKa%2B8%2FI48%2FJOehncvi1UIJnJVMHZIesMubn6Kygy%2BCKoZNGI0i93n%2BVUNxLEKQQmGLNB4INkqxHUtgRReUuC2jlguDJZLGU4kVP79Wjty%2FaITwmW3bxmWXUKUhayNmcygG9tOOrK%2BW2kmapwfapA9uC3i5drX9P%2F8oK0C7Vl1x3%2FDR91S6MZLPIQ29vlRgcH5Xc91PxiV6RRcVKCcl9AFZ5gadt1lzG4apYmTziM02KKo2JkByeLM4jfQ8afcfnQB6yfO%2BssvA5dJovfUO7hU3QKkPdiep0XBFEqrrJKXD37nGpKVwJ8j75i19nNbosi1kbgz7TeG0aV%2FYjkQVmc9co1uQSVrVqg68EAF3SH6qkwCsC5uL%2B%2Fxjq0jzlLTtQ3LvYNgLSh20Bsqn%2F%2BXpyKOdLYtYXNCrMXKMyuv50yFCsrJiEVGvgo0l%2B4yw5XnqOPv7BkkSn9OMxyGYGPr3bWaBftQ5jwWp%2FcZgICDS%2FwZJ%2B1eF7paKwraodHfhz%2FW1HyJfJxk77%2FbGDDPd%2B%2FTmssGoeby3ONCEO%2BYEO2H%2BHToTXJ5XX0MalCiQy6THCIzhTxQdFSXwdaayDw4pCDu0O9ukRDnyulGDHxu9%2Fv8%2FTDD6u%2FMBjqkAYxF84XYz%2BXaNVC4fAoZLr0KC1gSbmrf9ZgT9f3FKPqLr8BGC%2FVTfxkpHIXASCUFk9YHBfDblBWok3k6jYcJJqouJkAmu0t3ZJg46PQtmY0cND5BrkvRHF1d8v%2F1ta9Ohb3mTceEKeWHy9FwXEmWdy0nR9JHyrTbcQl4YjBZA6x9ExHxO1%2BsrBLstpqx%2Fan%2FJXgmLFORypLVJ0xLJ1BXtBkeeDgi&X-Amz-Signature=e1d0a175d1c8039a3af9d869d1914eceea3322d86ebf8a84b2ade502ecce0be3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/b9862833-4ef6-427e-a2a2-58f10552bfbe/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466522MSQTE%2F20260223%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260223T074449Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEA8aCXVzLXdlc3QtMiJIMEYCIQCe%2FvipANeB%2BJdGpSr01MpF5y%2FJJ%2FHq9V0u9%2B1dZRjmMAIhAODSTCNZEu2BdolwzEddOLkUG4caDaJhAU07r73EpT2rKogECNj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igw84fPNIJbYhA%2Bq%2FlQq3AO1%2BywoE8CnVgI1snd%2BJqjjKa%2B8%2FI48%2FJOehncvi1UIJnJVMHZIesMubn6Kygy%2BCKoZNGI0i93n%2BVUNxLEKQQmGLNB4INkqxHUtgRReUuC2jlguDJZLGU4kVP79Wjty%2FaITwmW3bxmWXUKUhayNmcygG9tOOrK%2BW2kmapwfapA9uC3i5drX9P%2F8oK0C7Vl1x3%2FDR91S6MZLPIQ29vlRgcH5Xc91PxiV6RRcVKCcl9AFZ5gadt1lzG4apYmTziM02KKo2JkByeLM4jfQ8afcfnQB6yfO%2BssvA5dJovfUO7hU3QKkPdiep0XBFEqrrJKXD37nGpKVwJ8j75i19nNbosi1kbgz7TeG0aV%2FYjkQVmc9co1uQSVrVqg68EAF3SH6qkwCsC5uL%2B%2Fxjq0jzlLTtQ3LvYNgLSh20Bsqn%2F%2BXpyKOdLYtYXNCrMXKMyuv50yFCsrJiEVGvgo0l%2B4yw5XnqOPv7BkkSn9OMxyGYGPr3bWaBftQ5jwWp%2FcZgICDS%2FwZJ%2B1eF7paKwraodHfhz%2FW1HyJfJxk77%2FbGDDPd%2B%2FTmssGoeby3ONCEO%2BYEO2H%2BHToTXJ5XX0MalCiQy6THCIzhTxQdFSXwdaayDw4pCDu0O9ukRDnyulGDHxu9%2Fv8%2FTDD6u%2FMBjqkAYxF84XYz%2BXaNVC4fAoZLr0KC1gSbmrf9ZgT9f3FKPqLr8BGC%2FVTfxkpHIXASCUFk9YHBfDblBWok3k6jYcJJqouJkAmu0t3ZJg46PQtmY0cND5BrkvRHF1d8v%2F1ta9Ohb3mTceEKeWHy9FwXEmWdy0nR9JHyrTbcQl4YjBZA6x9ExHxO1%2BsrBLstpqx%2Fan%2FJXgmLFORypLVJ0xLJ1BXtBkeeDgi&X-Amz-Signature=440667d10f0b45e5691c266d1af288a68309b98b7b07e66b0891ec080fd17347&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/b23fd3d2-7c82-4f9c-9578-378d805f0b5f/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466522MSQTE%2F20260223%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260223T074449Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEA8aCXVzLXdlc3QtMiJIMEYCIQCe%2FvipANeB%2BJdGpSr01MpF5y%2FJJ%2FHq9V0u9%2B1dZRjmMAIhAODSTCNZEu2BdolwzEddOLkUG4caDaJhAU07r73EpT2rKogECNj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igw84fPNIJbYhA%2Bq%2FlQq3AO1%2BywoE8CnVgI1snd%2BJqjjKa%2B8%2FI48%2FJOehncvi1UIJnJVMHZIesMubn6Kygy%2BCKoZNGI0i93n%2BVUNxLEKQQmGLNB4INkqxHUtgRReUuC2jlguDJZLGU4kVP79Wjty%2FaITwmW3bxmWXUKUhayNmcygG9tOOrK%2BW2kmapwfapA9uC3i5drX9P%2F8oK0C7Vl1x3%2FDR91S6MZLPIQ29vlRgcH5Xc91PxiV6RRcVKCcl9AFZ5gadt1lzG4apYmTziM02KKo2JkByeLM4jfQ8afcfnQB6yfO%2BssvA5dJovfUO7hU3QKkPdiep0XBFEqrrJKXD37nGpKVwJ8j75i19nNbosi1kbgz7TeG0aV%2FYjkQVmc9co1uQSVrVqg68EAF3SH6qkwCsC5uL%2B%2Fxjq0jzlLTtQ3LvYNgLSh20Bsqn%2F%2BXpyKOdLYtYXNCrMXKMyuv50yFCsrJiEVGvgo0l%2B4yw5XnqOPv7BkkSn9OMxyGYGPr3bWaBftQ5jwWp%2FcZgICDS%2FwZJ%2B1eF7paKwraodHfhz%2FW1HyJfJxk77%2FbGDDPd%2B%2FTmssGoeby3ONCEO%2BYEO2H%2BHToTXJ5XX0MalCiQy6THCIzhTxQdFSXwdaayDw4pCDu0O9ukRDnyulGDHxu9%2Fv8%2FTDD6u%2FMBjqkAYxF84XYz%2BXaNVC4fAoZLr0KC1gSbmrf9ZgT9f3FKPqLr8BGC%2FVTfxkpHIXASCUFk9YHBfDblBWok3k6jYcJJqouJkAmu0t3ZJg46PQtmY0cND5BrkvRHF1d8v%2F1ta9Ohb3mTceEKeWHy9FwXEmWdy0nR9JHyrTbcQl4YjBZA6x9ExHxO1%2BsrBLstpqx%2Fan%2FJXgmLFORypLVJ0xLJ1BXtBkeeDgi&X-Amz-Signature=8481068a689ded0b3ba9c7064d8d0455b2b5acac61db075e37c90c725a4d4f32&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


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
