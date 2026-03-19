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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/ad4df74c-7cbe-4465-ac72-71345219e411/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665DKZCR7H%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T174450Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFkaCXVzLXdlc3QtMiJIMEYCIQDlcgksl%2F32JUfCUpt9sFiEfKxKihSz2lHCJYbJCWCuOgIhALTarg7kgC9XoE3gP3RZBc5%2F%2FiXk2wCrqV1%2FxAJKK9GJKv8DCCIQABoMNjM3NDIzMTgzODA1IgxQ2KH%2Bz%2BAtTndxj9Aq3ANKIB6J2LrA5YcURis9GC4sNj7aE22bcgZ9wxzUJpZrFAsyck3zPCPY0PXb9JMMZEnZ4eFAGQRKqXW3ZUlX9M8iVhSYTIWvAzZ4S40M95F39CBSpj4l%2B3hCrhzgYNlOm%2BbBB5WSZ7seKqeilixJaGpVx1C3OLpMpr8Ov96o3cytyF1nJeKLyEL%2BxiBLaYfIKvHseKRF9bExL0rOops2qMDOc1C122eRhqPYF2Zt7OQ2XeI6vaMKHjbXKM19FQgNJ1Ay07sz4wFBoi%2FP5HrmEOe4kJI6kfk5bukjIGEobilHsbgREEUulcfjnUUv2EJSmBQ5cpaYQ%2BdmEj3PAzbceKg6pHO4UOeysnDtS84W7nCTwnzMBElwqLLCOGORoqVnXjgge6uWmIdpRK2fZUf4YxmSEbv7YhdqnznQg6Z9XmJou710SJDkylkpnA9H3G4GJ72JQbXXel0U7VKVuyn%2BNrq6BaMhojeQh5ISqktvAF75Z%2FdkhX4pnig0EDSvY%2BJ5Sx%2F74le1iBW%2FN9F1lVtqOEezvMlDZADK%2FaFwAeeiEupSDOuZkPw8bexkXBF3%2B%2BK2e4a4xPj0IEoeCzSleT0AxYlugErv0%2F0NszhX0Lxl1tsJllrNV5GMVFPWKM4R%2BzCUyvDNBjqkAb1np74znLtS0Nop718lLj5bY8Os8fl9tEB21u5SDeP3wt8Xu%2B7FDsbO0fkmX3erCXYmdDD1hXcEDuEcehX%2BujwOpsc2N7YA%2FR6jmzCXiG5Pe4FnUKbDrbiXH2AOGL8hB8zhffo4htJsc7u4TquPlRNrKgO52qd0UVExRYC3XBy8xZPxN78aCwwHoK3nhNoSVQ%2F3GJ8dxKxysUIo%2BD%2BCLr6cHixF&X-Amz-Signature=033ce7396ab0499f79f9ee508a9456933b31015297ec26c55cc0501c34199695&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


Cortical thickness를 입력으로 3가지 Subtype로 분할

- `Under-developed(Lower CT)` : posterior region에 낮은 CT 보임
- `Over-developed(High CT)` : posterior region에 높은 CT 보임
- `Mixed subtype` : dorsal, prefrontal, posterior region에 높은 CT, temporal에는 낮은 CT 보임

_→ 독립 데이터인 ADHD-200에서도 일관적인 결과 보임_


---



#### Neuroimaging subtypes encompassed differential clinical, family, and social characteristics


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/1a1d4829-9137-4ff7-8c14-b80f0100c690/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665DKZCR7H%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T174450Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFkaCXVzLXdlc3QtMiJIMEYCIQDlcgksl%2F32JUfCUpt9sFiEfKxKihSz2lHCJYbJCWCuOgIhALTarg7kgC9XoE3gP3RZBc5%2F%2FiXk2wCrqV1%2FxAJKK9GJKv8DCCIQABoMNjM3NDIzMTgzODA1IgxQ2KH%2Bz%2BAtTndxj9Aq3ANKIB6J2LrA5YcURis9GC4sNj7aE22bcgZ9wxzUJpZrFAsyck3zPCPY0PXb9JMMZEnZ4eFAGQRKqXW3ZUlX9M8iVhSYTIWvAzZ4S40M95F39CBSpj4l%2B3hCrhzgYNlOm%2BbBB5WSZ7seKqeilixJaGpVx1C3OLpMpr8Ov96o3cytyF1nJeKLyEL%2BxiBLaYfIKvHseKRF9bExL0rOops2qMDOc1C122eRhqPYF2Zt7OQ2XeI6vaMKHjbXKM19FQgNJ1Ay07sz4wFBoi%2FP5HrmEOe4kJI6kfk5bukjIGEobilHsbgREEUulcfjnUUv2EJSmBQ5cpaYQ%2BdmEj3PAzbceKg6pHO4UOeysnDtS84W7nCTwnzMBElwqLLCOGORoqVnXjgge6uWmIdpRK2fZUf4YxmSEbv7YhdqnznQg6Z9XmJou710SJDkylkpnA9H3G4GJ72JQbXXel0U7VKVuyn%2BNrq6BaMhojeQh5ISqktvAF75Z%2FdkhX4pnig0EDSvY%2BJ5Sx%2F74le1iBW%2FN9F1lVtqOEezvMlDZADK%2FaFwAeeiEupSDOuZkPw8bexkXBF3%2B%2BK2e4a4xPj0IEoeCzSleT0AxYlugErv0%2F0NszhX0Lxl1tsJllrNV5GMVFPWKM4R%2BzCUyvDNBjqkAb1np74znLtS0Nop718lLj5bY8Os8fl9tEB21u5SDeP3wt8Xu%2B7FDsbO0fkmX3erCXYmdDD1hXcEDuEcehX%2BujwOpsc2N7YA%2FR6jmzCXiG5Pe4FnUKbDrbiXH2AOGL8hB8zhffo4htJsc7u4TquPlRNrKgO52qd0UVExRYC3XBy8xZPxN78aCwwHoK3nhNoSVQ%2F3GJ8dxKxysUIo%2BD%2BCLr6cHixF&X-Amz-Signature=2d60e9f96bb0a34e24b7355f1c974e22d185670b5b9db7c4c2fa15f79f05bcea&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


Subtype과 임상적 관찰의 관련성 조사 → cognitive function, social behavior 차이 보임

- `Socioeconomic status` 
	- `Under-developed` : 낮은 가계 수입, 부모 교육 수준, 이른 산모 출산 연령 / 다른 subtype 대비 낮은 psychopathology와 cognition 수준 보임

<span class="notion-red">_→ 추가로 Neuroimaging subtype과 symptom-based subtype의 연관성 분석했으나 관련성 파악 못함_</span>


---



#### Differential response to stimulant medication among subtypes


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/310413de-9325-4f0f-929a-09869ea77609/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z4ZVPE27%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T174450Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFkaCXVzLXdlc3QtMiJIMEYCIQCp6w73KsMUxP7oBUM5HWadcCb5Z9CdUq4C5YOldmY%2B3wIhAM%2FHW3%2FtHlxSsMPG8B5CKLBOi60EwGVcWZO1lAjN59%2BiKv8DCCIQABoMNjM3NDIzMTgzODA1Igyfqdys163PLJxztFYq3AOB0B4Stpifk0hrkWUtMpbIeZVZ4dKTdL%2FtQ8BAk0uDRhjyEyoC04C8PPToV4apoqxxk2K6LmZs1SK2CJ8JBYmnXc4YiBufvmtvTm0%2Bz3n1iEcKVWBveS5%2BCkBr7z%2BF05lZeH%2BSt0ykvpFh0B8j8weA0pC%2FTcqBoKsEO22Qjlyg88dPZCahvE3c9qZfBo79z%2FhT8dJ%2FUyWwA8za%2B0V34jkSkZfGMBoDqbsCGEHCDGOCJtfnFDvLbUa9CtDYXaJNmZ8G1YAxhGZKynAeZfFBJ85URgZqKt2oxQWxi6NJfmyfCWHhDULq4vf8szdd%2FLmUMPjnbdE7wYQcY1DR5YmS2Y91DFN4GOnKCfTh61LneiZzpVhUQLxzw1fGG54Mnt2f9Er5vB%2FeqIsnTAx8HMRrd3OISYvLnaBdxXm45eyEkwZDliGsvixwo2fZWFwoT%2FjkleWw%2FYSUVqRTxhv47Rg%2FzqNy0guUrop2wRvkLeJkuA3VcEAybmMSq%2FVSJAb%2BErVbM2NrO8Zz%2Fh7lRwinG1U7tO9dDZsKftXDnqNBR3PsfKIriMiDzijyh2HHixdhVE%2BK5bi4lkWSJPTUplCoBxMAiXFKy2nAhU9KyYTq36lsVH2WD%2BZIfTxfzWiG%2BXafdzCzyvDNBjqkAY7EOyLnYfupMKNE1B50zGPWOAOLIH5Abt0QP0tuYylmfSoVjzqDgPt%2BNvNHcI971cBMnJUFBt91pr39Wkcg2KL57yuEH9OQvRK8SD0oDcAaFTcvwq13On2BtzyxsmR3W5M%2FFXlMc2opo8qU8F5v0hgoj3hilkqUybNE0nRkDGBDu8truUL%2BMVvvtzfuvBK92kfgP4TMeyGuTzCNDLaCCcXbbLG3&X-Amz-Signature=69f4239ede6bdf6d0e96f310a9a0f553e9e65f4666ad5cb5eba3e43852d51536&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/b9862833-4ef6-427e-a2a2-58f10552bfbe/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z4ZVPE27%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T174451Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFkaCXVzLXdlc3QtMiJIMEYCIQCp6w73KsMUxP7oBUM5HWadcCb5Z9CdUq4C5YOldmY%2B3wIhAM%2FHW3%2FtHlxSsMPG8B5CKLBOi60EwGVcWZO1lAjN59%2BiKv8DCCIQABoMNjM3NDIzMTgzODA1Igyfqdys163PLJxztFYq3AOB0B4Stpifk0hrkWUtMpbIeZVZ4dKTdL%2FtQ8BAk0uDRhjyEyoC04C8PPToV4apoqxxk2K6LmZs1SK2CJ8JBYmnXc4YiBufvmtvTm0%2Bz3n1iEcKVWBveS5%2BCkBr7z%2BF05lZeH%2BSt0ykvpFh0B8j8weA0pC%2FTcqBoKsEO22Qjlyg88dPZCahvE3c9qZfBo79z%2FhT8dJ%2FUyWwA8za%2B0V34jkSkZfGMBoDqbsCGEHCDGOCJtfnFDvLbUa9CtDYXaJNmZ8G1YAxhGZKynAeZfFBJ85URgZqKt2oxQWxi6NJfmyfCWHhDULq4vf8szdd%2FLmUMPjnbdE7wYQcY1DR5YmS2Y91DFN4GOnKCfTh61LneiZzpVhUQLxzw1fGG54Mnt2f9Er5vB%2FeqIsnTAx8HMRrd3OISYvLnaBdxXm45eyEkwZDliGsvixwo2fZWFwoT%2FjkleWw%2FYSUVqRTxhv47Rg%2FzqNy0guUrop2wRvkLeJkuA3VcEAybmMSq%2FVSJAb%2BErVbM2NrO8Zz%2Fh7lRwinG1U7tO9dDZsKftXDnqNBR3PsfKIriMiDzijyh2HHixdhVE%2BK5bi4lkWSJPTUplCoBxMAiXFKy2nAhU9KyYTq36lsVH2WD%2BZIfTxfzWiG%2BXafdzCzyvDNBjqkAY7EOyLnYfupMKNE1B50zGPWOAOLIH5Abt0QP0tuYylmfSoVjzqDgPt%2BNvNHcI971cBMnJUFBt91pr39Wkcg2KL57yuEH9OQvRK8SD0oDcAaFTcvwq13On2BtzyxsmR3W5M%2FFXlMc2opo8qU8F5v0hgoj3hilkqUybNE0nRkDGBDu8truUL%2BMVvvtzfuvBK92kfgP4TMeyGuTzCNDLaCCcXbbLG3&X-Amz-Signature=e10718de178251ae005ac5bdcbb2abbcdfd0d5ec72f17a67a3d7de93b6e1afee&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/b23fd3d2-7c82-4f9c-9578-378d805f0b5f/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z4ZVPE27%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T174451Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFkaCXVzLXdlc3QtMiJIMEYCIQCp6w73KsMUxP7oBUM5HWadcCb5Z9CdUq4C5YOldmY%2B3wIhAM%2FHW3%2FtHlxSsMPG8B5CKLBOi60EwGVcWZO1lAjN59%2BiKv8DCCIQABoMNjM3NDIzMTgzODA1Igyfqdys163PLJxztFYq3AOB0B4Stpifk0hrkWUtMpbIeZVZ4dKTdL%2FtQ8BAk0uDRhjyEyoC04C8PPToV4apoqxxk2K6LmZs1SK2CJ8JBYmnXc4YiBufvmtvTm0%2Bz3n1iEcKVWBveS5%2BCkBr7z%2BF05lZeH%2BSt0ykvpFh0B8j8weA0pC%2FTcqBoKsEO22Qjlyg88dPZCahvE3c9qZfBo79z%2FhT8dJ%2FUyWwA8za%2B0V34jkSkZfGMBoDqbsCGEHCDGOCJtfnFDvLbUa9CtDYXaJNmZ8G1YAxhGZKynAeZfFBJ85URgZqKt2oxQWxi6NJfmyfCWHhDULq4vf8szdd%2FLmUMPjnbdE7wYQcY1DR5YmS2Y91DFN4GOnKCfTh61LneiZzpVhUQLxzw1fGG54Mnt2f9Er5vB%2FeqIsnTAx8HMRrd3OISYvLnaBdxXm45eyEkwZDliGsvixwo2fZWFwoT%2FjkleWw%2FYSUVqRTxhv47Rg%2FzqNy0guUrop2wRvkLeJkuA3VcEAybmMSq%2FVSJAb%2BErVbM2NrO8Zz%2Fh7lRwinG1U7tO9dDZsKftXDnqNBR3PsfKIriMiDzijyh2HHixdhVE%2BK5bi4lkWSJPTUplCoBxMAiXFKy2nAhU9KyYTq36lsVH2WD%2BZIfTxfzWiG%2BXafdzCzyvDNBjqkAY7EOyLnYfupMKNE1B50zGPWOAOLIH5Abt0QP0tuYylmfSoVjzqDgPt%2BNvNHcI971cBMnJUFBt91pr39Wkcg2KL57yuEH9OQvRK8SD0oDcAaFTcvwq13On2BtzyxsmR3W5M%2FFXlMc2opo8qU8F5v0hgoj3hilkqUybNE0nRkDGBDu8truUL%2BMVvvtzfuvBK92kfgP4TMeyGuTzCNDLaCCcXbbLG3&X-Amz-Signature=cbc5a6aa69b20e855bff37f60799336de2da3658cc1c627323e178938508cc42&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


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
