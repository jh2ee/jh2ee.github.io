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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/ad4df74c-7cbe-4465-ac72-71345219e411/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667MPGI65B%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T010429Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEO%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDToY%2B5XzMWr5%2Bi%2Fw%2BF62WZHJNCg9C2sbFPQM7%2BVrvY4gIhAJR9RwEySXK2%2BoeDlDJCsj0TdDkGgZXV1snpOTY38XVYKogECLj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzH4Hb9XJIDkFd3jaAq3AOBMLbZrEo38yPG3fFAIBFqaEzHYFXLuu5UfcKHGol6T0Q9ID0dQZyP2MhPHfu7Kg94Caih8yTpKMSxetaaZ1amd8Dm2jFVieqiEAFdIe4hZFLcMZjPCtWPhZAAoFJFAQm%2BzehEbLcu%2FlGv8lfmN5EMeak0jD%2BlOjpmnu85OlL5FDJyKhcoPzkr%2FEJ1rNhSt1pOp4LD1eQMFnRtTfxd7TUZOeKWpmdcEgAYqPREEzJSseHShg9zOtwdzcEkwnecXI3JqulQTmhuqXwusL3izCNSx34BxvRRG%2BMkOJK84L8kj23UMjynkSGis4Z6HUMxAXdkhW0PlwWdY7XhRvJPyhh8HmcfOgwxlsRlTzPRsydHDTc%2FK2seY7bjWByuR%2B%2BvydjLUP%2BaxNJmfhBiR0%2BKiFGQOy2MnAKuU5ZrTamTt8yAMfGRj1o4kcWN9xJESzX5Nwo1hyPZfoDD%2FUX7G5EWtY9sxWGED%2FU0NuVF3gHE%2FlD%2BiK6XMvjez3IR3smbldZ4nOdfsLawO%2B6%2Bl1gJERWT7sffoRm%2Brwkf7gFNfWTVWD%2F%2BpkmUQ9aVY0%2FUpW1x6ZUBMt1PxntsRXh8Ul%2BpRid%2FmsJuZOsdw2KZjdiVvgg3Qw80cr37o%2BjvChqhpppa6TDxzZHOBjqkASwd71%2Fw3nYbl0EpxZ5ZmTmFj0VsOmONm4taakcCOOGnVLDEFaOh8mMAg7xmUqUaOzQkEMgcUoJmwYKO7Ksdu4FiQsvSBpf8%2BVQWRQ1pOCPhtedCFvWoL%2BPfQxsinGGOsxxnGEuE8yaldzMd8gxlR3Blbf4A6u3y1wyWjolBaaTorl4%2Fsdax3UahxLKr713OqlhoQtukKYHOtHLDgJPVFCF6k0Yk&X-Amz-Signature=c204d6b27349ee57fee14ecbdad47956b91fd090e4a02dab1f70290cbd9049d9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


Cortical thickness를 입력으로 3가지 Subtype로 분할

- `Under-developed(Lower CT)` : posterior region에 낮은 CT 보임
- `Over-developed(High CT)` : posterior region에 높은 CT 보임
- `Mixed subtype` : dorsal, prefrontal, posterior region에 높은 CT, temporal에는 낮은 CT 보임

_→ 독립 데이터인 ADHD-200에서도 일관적인 결과 보임_


---



#### Neuroimaging subtypes encompassed differential clinical, family, and social characteristics


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/1a1d4829-9137-4ff7-8c14-b80f0100c690/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667MPGI65B%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T010429Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEO%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDToY%2B5XzMWr5%2Bi%2Fw%2BF62WZHJNCg9C2sbFPQM7%2BVrvY4gIhAJR9RwEySXK2%2BoeDlDJCsj0TdDkGgZXV1snpOTY38XVYKogECLj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzH4Hb9XJIDkFd3jaAq3AOBMLbZrEo38yPG3fFAIBFqaEzHYFXLuu5UfcKHGol6T0Q9ID0dQZyP2MhPHfu7Kg94Caih8yTpKMSxetaaZ1amd8Dm2jFVieqiEAFdIe4hZFLcMZjPCtWPhZAAoFJFAQm%2BzehEbLcu%2FlGv8lfmN5EMeak0jD%2BlOjpmnu85OlL5FDJyKhcoPzkr%2FEJ1rNhSt1pOp4LD1eQMFnRtTfxd7TUZOeKWpmdcEgAYqPREEzJSseHShg9zOtwdzcEkwnecXI3JqulQTmhuqXwusL3izCNSx34BxvRRG%2BMkOJK84L8kj23UMjynkSGis4Z6HUMxAXdkhW0PlwWdY7XhRvJPyhh8HmcfOgwxlsRlTzPRsydHDTc%2FK2seY7bjWByuR%2B%2BvydjLUP%2BaxNJmfhBiR0%2BKiFGQOy2MnAKuU5ZrTamTt8yAMfGRj1o4kcWN9xJESzX5Nwo1hyPZfoDD%2FUX7G5EWtY9sxWGED%2FU0NuVF3gHE%2FlD%2BiK6XMvjez3IR3smbldZ4nOdfsLawO%2B6%2Bl1gJERWT7sffoRm%2Brwkf7gFNfWTVWD%2F%2BpkmUQ9aVY0%2FUpW1x6ZUBMt1PxntsRXh8Ul%2BpRid%2FmsJuZOsdw2KZjdiVvgg3Qw80cr37o%2BjvChqhpppa6TDxzZHOBjqkASwd71%2Fw3nYbl0EpxZ5ZmTmFj0VsOmONm4taakcCOOGnVLDEFaOh8mMAg7xmUqUaOzQkEMgcUoJmwYKO7Ksdu4FiQsvSBpf8%2BVQWRQ1pOCPhtedCFvWoL%2BPfQxsinGGOsxxnGEuE8yaldzMd8gxlR3Blbf4A6u3y1wyWjolBaaTorl4%2Fsdax3UahxLKr713OqlhoQtukKYHOtHLDgJPVFCF6k0Yk&X-Amz-Signature=3621427517405e880c4f5f6087989b3e55f89de0041a682c7dd9de43cf586df9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


Subtype과 임상적 관찰의 관련성 조사 → cognitive function, social behavior 차이 보임

- `Socioeconomic status` 
	- `Under-developed` : 낮은 가계 수입, 부모 교육 수준, 이른 산모 출산 연령 / 다른 subtype 대비 낮은 psychopathology와 cognition 수준 보임

<span class="notion-red">_→ 추가로 Neuroimaging subtype과 symptom-based subtype의 연관성 분석했으나 관련성 파악 못함_</span>


---



#### Differential response to stimulant medication among subtypes


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/310413de-9325-4f0f-929a-09869ea77609/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XZYMWPAS%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T010431Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEO%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQC6z2z%2BUV3cSUcx5qCJeLPcA4mel%2FYtyBghKUgJ3z32awIhAImrcfNGB%2ByOHEKI8LFxurfcbgSIHHya4lC1jA137MObKogECLj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igw8BPfdl6rPVIXTNLoq3AOTNj7WNahZdmYuWYwzWUhepusMMhRFbd34R98siwIkOMjkY2yYUNWOg8cX2DsPjmPKAqM%2Bcdxp7sX0kJxWitb7dzUuhWVNaw%2F2xoOEdSmu7j5Ak10kQsFSKgpa3k62raWOPI3RfSMNvNWhGx2Uz2QlZuwMv4I3rKG%2FyoI9vF7k%2BNwV%2Fa3QMjctth9mzfufsJ5t%2B2s17J36jkdDOLK3n07co%2BvQPLRswl6blvYOkuIi1GqvV7FcH5v%2BPoZGVnfAKyTAZWvGnansyN9qhh9nUDJKEjXlgr2QT2IlkFRSYAHiJMVt6BaXRo4eA%2FVlBEk0sG9zXZIbFoNLh%2BoqBCOhOZZYBchcLEVHNZTZdotjkvDsjPBL6%2FNsMACcQ4wfYMub2ZMZqhprT3mV6d47MIUtjn5RjqrBFOInMMLyowwzbNguwFNwtRT6INfucaASx5%2B8nhkoSvCMrdAhRynBDHbY9Zk3lH4jxhoR6GOvay7h6w7P6w7q4PKfboFbaqh0NjFztGUitYKTh2atr5dBOMNltYqg0tK2FrxAeROcfAUf1%2BP3h%2BS5oq4yResKfQoRZNTdb5OELGLljIvK3dNF8WFCA7LsBM9pdwkfEbejJKlfAdaIUDhDFKcLrWzXTVCjQDCzyZHOBjqkAaNpxJnOwRkHq%2FY3Py1kh2k%2B5qlHTo2hJHhFsKtA1Hmkf8UEZpIDtS0jULVBCNmD4TlD3xfRsENdStTGZKeD9Vza2YysGwyXJZfqYXVb9buZSzxPVAjLv4abX6NeTBac%2Bi1Zb1qPsMemFChqixK6%2BCuy4klDHJxIYHLNwicF4wwG699qv1w7OFZPW08IcvoxNBIXWwgF6yYoXbkBYt70WyjspYCO&X-Amz-Signature=2d266c9df50a753124d252d6ee50f841c395cfe92265889045f508a2b950e8d9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/b9862833-4ef6-427e-a2a2-58f10552bfbe/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XZYMWPAS%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T010432Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEO%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQC6z2z%2BUV3cSUcx5qCJeLPcA4mel%2FYtyBghKUgJ3z32awIhAImrcfNGB%2ByOHEKI8LFxurfcbgSIHHya4lC1jA137MObKogECLj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igw8BPfdl6rPVIXTNLoq3AOTNj7WNahZdmYuWYwzWUhepusMMhRFbd34R98siwIkOMjkY2yYUNWOg8cX2DsPjmPKAqM%2Bcdxp7sX0kJxWitb7dzUuhWVNaw%2F2xoOEdSmu7j5Ak10kQsFSKgpa3k62raWOPI3RfSMNvNWhGx2Uz2QlZuwMv4I3rKG%2FyoI9vF7k%2BNwV%2Fa3QMjctth9mzfufsJ5t%2B2s17J36jkdDOLK3n07co%2BvQPLRswl6blvYOkuIi1GqvV7FcH5v%2BPoZGVnfAKyTAZWvGnansyN9qhh9nUDJKEjXlgr2QT2IlkFRSYAHiJMVt6BaXRo4eA%2FVlBEk0sG9zXZIbFoNLh%2BoqBCOhOZZYBchcLEVHNZTZdotjkvDsjPBL6%2FNsMACcQ4wfYMub2ZMZqhprT3mV6d47MIUtjn5RjqrBFOInMMLyowwzbNguwFNwtRT6INfucaASx5%2B8nhkoSvCMrdAhRynBDHbY9Zk3lH4jxhoR6GOvay7h6w7P6w7q4PKfboFbaqh0NjFztGUitYKTh2atr5dBOMNltYqg0tK2FrxAeROcfAUf1%2BP3h%2BS5oq4yResKfQoRZNTdb5OELGLljIvK3dNF8WFCA7LsBM9pdwkfEbejJKlfAdaIUDhDFKcLrWzXTVCjQDCzyZHOBjqkAaNpxJnOwRkHq%2FY3Py1kh2k%2B5qlHTo2hJHhFsKtA1Hmkf8UEZpIDtS0jULVBCNmD4TlD3xfRsENdStTGZKeD9Vza2YysGwyXJZfqYXVb9buZSzxPVAjLv4abX6NeTBac%2Bi1Zb1qPsMemFChqixK6%2BCuy4klDHJxIYHLNwicF4wwG699qv1w7OFZPW08IcvoxNBIXWwgF6yYoXbkBYt70WyjspYCO&X-Amz-Signature=abd1f53c2f66eb52ae8d3359231667bc2cb9caee4d1dbe491a18acfa7859c85a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/b23fd3d2-7c82-4f9c-9578-378d805f0b5f/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XZYMWPAS%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T010432Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEO%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQC6z2z%2BUV3cSUcx5qCJeLPcA4mel%2FYtyBghKUgJ3z32awIhAImrcfNGB%2ByOHEKI8LFxurfcbgSIHHya4lC1jA137MObKogECLj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igw8BPfdl6rPVIXTNLoq3AOTNj7WNahZdmYuWYwzWUhepusMMhRFbd34R98siwIkOMjkY2yYUNWOg8cX2DsPjmPKAqM%2Bcdxp7sX0kJxWitb7dzUuhWVNaw%2F2xoOEdSmu7j5Ak10kQsFSKgpa3k62raWOPI3RfSMNvNWhGx2Uz2QlZuwMv4I3rKG%2FyoI9vF7k%2BNwV%2Fa3QMjctth9mzfufsJ5t%2B2s17J36jkdDOLK3n07co%2BvQPLRswl6blvYOkuIi1GqvV7FcH5v%2BPoZGVnfAKyTAZWvGnansyN9qhh9nUDJKEjXlgr2QT2IlkFRSYAHiJMVt6BaXRo4eA%2FVlBEk0sG9zXZIbFoNLh%2BoqBCOhOZZYBchcLEVHNZTZdotjkvDsjPBL6%2FNsMACcQ4wfYMub2ZMZqhprT3mV6d47MIUtjn5RjqrBFOInMMLyowwzbNguwFNwtRT6INfucaASx5%2B8nhkoSvCMrdAhRynBDHbY9Zk3lH4jxhoR6GOvay7h6w7P6w7q4PKfboFbaqh0NjFztGUitYKTh2atr5dBOMNltYqg0tK2FrxAeROcfAUf1%2BP3h%2BS5oq4yResKfQoRZNTdb5OELGLljIvK3dNF8WFCA7LsBM9pdwkfEbejJKlfAdaIUDhDFKcLrWzXTVCjQDCzyZHOBjqkAaNpxJnOwRkHq%2FY3Py1kh2k%2B5qlHTo2hJHhFsKtA1Hmkf8UEZpIDtS0jULVBCNmD4TlD3xfRsENdStTGZKeD9Vza2YysGwyXJZfqYXVb9buZSzxPVAjLv4abX6NeTBac%2Bi1Zb1qPsMemFChqixK6%2BCuy4klDHJxIYHLNwicF4wwG699qv1w7OFZPW08IcvoxNBIXWwgF6yYoXbkBYt70WyjspYCO&X-Amz-Signature=cac5f1bc01fdd51da9c5a2a7a1a9f956f1cb898f90676241e6d9c6c93f7eba40&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


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
