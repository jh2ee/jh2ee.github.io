---
layout: post
date: 2025-12-04
title: "[논문 리뷰] Deep multimodality-disentangled association analysis network for imaging genetics in neurodegenerative diseases"
tags: [MLMM, Alzheimer's Disease, MedIA]
categories: [Paper Review]
---

Adversarial Autoencoder를 이용한 representation imputation 논문이다. AD와 PD 두 종류의 신경퇴행성 질환을 대상으로 연구했으며 metadata와 SNP 데이터를 이용해 imputation을 진행한다.


임상에서는 SNP데이터가 없는 sample이 대부분이라 실적용에는 한계가 있어보인다.


---


---



## Introduction

- 신경퇴행성 질환, Neurodegenerative diseases (NDs) 는 비가역적 신경계 질환으로 명확한 원인과 치료 방법이 부재
- Multimodal image data는 상호 보완적으로 진단 향상에 도움줄 수 있음

> **Image data**

- sMRI는 뇌의 구조적 변화를 파악하는데 효과적
- PET은 amyloid beta, tau 파악에 효과적 (AD)
- DTI는 white matter 변화 파악에 효과적이며 PD에서의 인지, 보행 및 자세 등에 관련
- 이전 연구들은 IDPs, ROI 기반 feature extract 방법 사용
	- IDPs 추출의 경우 전처리 비용 높음
	- ROI 기반 연구들이 주를 이룸

> **Genetic data**

- NDs 는 유전적 요인과 관련이 있음

_**→ Multimodality로 image, genetic 사용**_


> **Challenges**

- MLMM (Multimodal Learning with Modality Missing)
- Common and complementary information in multimodal data → 데이터에서의 공통, 상호보완적 정보

	_**→ modality-shared, modality-specific biomarker 탐색이 multimodal imaging genetics의 핵심 과제**_

- image와 genetic data간 관계의 복잡성
	- multi-genetic, multi-imaging
	- correlation among genetic data, correlation among imaging data

> **Proposal of DMAAN**

- Deep Multimodality-disentangled Association Analysis Network
- End-to-end framework
- 3개 module로 구성
	- `Multimodality-disentangled module`
		- multimodal image data가 encoding되어 서로 다른 modality의 latent representation 얻음
		- latent representation은 common과 specific으로 분리
		- self, cross attention 통해 유용한 정보 추출
	- `Association analysis module`
		- potential genetic representation 탐색
		- imaging data 와의 연관성 분석
	- `Disease diagnosis module`

> **Contribution**

- multimodal imaging, genetic data의 비선형 관계 모델링 framework
- MLMM 문제 처리 위한 learning strategy 적용 → disentangled representation learning
- 외부 dataset 이용한 결과 제시 → 일반화 능력 향상

---


---



## Method


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RL4Z33HG%2F20260416%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260416T125541Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIBtfc1JzXBoyusXk6%2BdhTY25UkZdgPxYvt2vEEazy99%2BAiAdLMBmpPh%2FMOEafp28bjJ7WQ6I92lrt7mGrunLfIkldSqIBAi8%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMIyZ7JoujH3Om%2BRTQKtwDYWEUL2bvW%2FHAlnR9Qoz%2FJGCczpgXQkhI%2B%2Ft8n%2F6azcltmB9a3FXut9Kk79JB0biii42RIKhZ7JrPUFLZJTBxGIV1rjPWCaL%2FjU1533fH118SG9angioG2sZi0OMmn6wLqLscc9mOVGwRBpTXKuT%2BKcSQUviDFKkS3XE9JoJceWEeF1dznN0qNkzF9iuXC%2FX2AG%2FNpcNjvlMqJ%2BUYMulcIe3pxrXiOLroN17lHTJeKZ1xifAcNQSEwd33nopentW8OLkx%2BKSiQqZ0u0%2B%2FZpRCj1HXSyGIOsNC5cUvmXCRJTMC7t7k4sNh09x64FQs0yV9qgDQIxMpDvnBMvOTGdjsXta3mqX5TzgP8A6P59x0UihZf7HBD61wlSlph79pxtQNQsnCHeIQn930sEgT20QQL%2FBrOAR0LuQpTtAzodBE2vY66r0APFG7MIVIiOKRYAf9DJasTwcXBhhln%2BnN%2BCo75ltqlLER44CCzsmaQ13uqDrBygbqSrNyDw9zmGbiuPI9tuUVxU33gRQCetFEqItNKsAS4CI%2FpG%2FiQS8e%2FDY6jEkp2gUwfMATc6Tk4Fa4R3z7EtGHy7cooOwAhHpDMcPgGFB%2FKe4RmVS8YKHG%2BboQcdm9C2id%2F%2BVqG2CG3Rswx4WDzwY6pgEY%2FsTZS28hXAT4YFAo4KHKhV0dHmxMGkzhr2%2FsNn5hk8SF6dPbLmOGES8k60mGUAL3a%2BD3eCWPYx7as7OBO3v%2BwQSR3GkcJQ3ADsg4WSFSnzydQ69UMC5DoVjU2F4Vjv%2B0nDdDg2pKvvQlK5DfZfsT%2FTov5AwPLXtbWithgZrsOvWkSEUl0Rs2ctQuTSFKhV5s3gqfzpK96pcf0mkIlFo6eiyH692T&X-Amz-Signature=0563b742e7cb3cea71e4c582bdf7082dd7e4813e22bf91c74e151cfb818437db&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RL4Z33HG%2F20260416%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260416T125541Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIBtfc1JzXBoyusXk6%2BdhTY25UkZdgPxYvt2vEEazy99%2BAiAdLMBmpPh%2FMOEafp28bjJ7WQ6I92lrt7mGrunLfIkldSqIBAi8%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMIyZ7JoujH3Om%2BRTQKtwDYWEUL2bvW%2FHAlnR9Qoz%2FJGCczpgXQkhI%2B%2Ft8n%2F6azcltmB9a3FXut9Kk79JB0biii42RIKhZ7JrPUFLZJTBxGIV1rjPWCaL%2FjU1533fH118SG9angioG2sZi0OMmn6wLqLscc9mOVGwRBpTXKuT%2BKcSQUviDFKkS3XE9JoJceWEeF1dznN0qNkzF9iuXC%2FX2AG%2FNpcNjvlMqJ%2BUYMulcIe3pxrXiOLroN17lHTJeKZ1xifAcNQSEwd33nopentW8OLkx%2BKSiQqZ0u0%2B%2FZpRCj1HXSyGIOsNC5cUvmXCRJTMC7t7k4sNh09x64FQs0yV9qgDQIxMpDvnBMvOTGdjsXta3mqX5TzgP8A6P59x0UihZf7HBD61wlSlph79pxtQNQsnCHeIQn930sEgT20QQL%2FBrOAR0LuQpTtAzodBE2vY66r0APFG7MIVIiOKRYAf9DJasTwcXBhhln%2BnN%2BCo75ltqlLER44CCzsmaQ13uqDrBygbqSrNyDw9zmGbiuPI9tuUVxU33gRQCetFEqItNKsAS4CI%2FpG%2FiQS8e%2FDY6jEkp2gUwfMATc6Tk4Fa4R3z7EtGHy7cooOwAhHpDMcPgGFB%2FKe4RmVS8YKHG%2BboQcdm9C2id%2F%2BVqG2CG3Rswx4WDzwY6pgEY%2FsTZS28hXAT4YFAo4KHKhV0dHmxMGkzhr2%2FsNn5hk8SF6dPbLmOGES8k60mGUAL3a%2BD3eCWPYx7as7OBO3v%2BwQSR3GkcJQ3ADsg4WSFSnzydQ69UMC5DoVjU2F4Vjv%2B0nDdDg2pKvvQlK5DfZfsT%2FTov5AwPLXtbWithgZrsOvWkSEUl0Rs2ctQuTSFKhV5s3gqfzpK96pcf0mkIlFo6eiyH692T&X-Amz-Signature=0563b742e7cb3cea71e4c582bdf7082dd7e4813e22bf91c74e151cfb818437db&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QRDOQFPS%2F20260416%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260416T125541Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCPTOBo9Wx7QbI5%2BbIemr%2F5bM7K%2FjjdFTngHrR%2B7EjsBgIgWRUkLnx6FAVvQxYdg1K5XbU9NPIM4KM7n1DmhuTzlCsqiAQIvP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDABZ6fwM7W%2BZZtjSiyrcA3nkh8wlo%2BjmsiO04eebPF271yzHlKSfgedSXr1hFrJNMjVZZWgJ0XJrDWhdKNsKbPK7DqPSZ%2Bvb93ZJPgMRAACdTd6SfJMfYVZNBxSUmJFHHD6EIIQcBUyEY1jj%2BuTKu1G3tyZNQepz%2FScjw0dEr69gGKxB52fqOZOSrygwibiJ1hez3aPReIA6%2BCRREsJx2HumTTAdoKTpxm4hfWFNMdUuuqEilgSWhX9MYzABuMD7Plm84hHeUpuLIp8wlOJlp0OiU7HiI6s%2BW7DFsvW%2FiBDsiuI3ad8s0yRTQYWz8IIuwo4SyQV5KArk%2BzYSjkGDzNSPtpHDVXPdopvypwwKC%2Fal6lw5uG8yePrciDFKWikgvrr36OWO2isZxFsWBUJFgpNKNUjMgATIUu8X6kQN7rQ81gIi40Y57tk3NMN0NKp65IFB0RKnroGwN8PpQmdVBc358g8AH5xPip634V4v%2B4ZKfpJZc6gZyrKhl70KXNifkLA8NcflCbhHve%2BGpjy%2BfrcWWV%2FzlEdCkhc9xSOoOGIzpd3gms6tmy8hT0REig%2BEHrcrtL35xDGgxc%2BthpmI2I%2FQTF%2FCyUibUj4BkbbOty176jaUX5g8h%2FcHK8SJhcA9lhDXVyh74d8ORk12MPiFg88GOqUB%2BaOL3rf4HHdMWKhyhBEckqEtwJb8Iuw8ivGeCHygMIcohY4vWdJ3%2Fs1aKZUQhiw4UbTGvvEb8S%2BCXKqecPw4XeO67%2B2b%2FGPqxqo%2BbyLOF2v27S1z4PwH2krnOZoqc%2FORGP7ltKOLfy5mRzgzbeAN5zrp2ezBENrtQRWM1dYZ5gaWGStwHFQ9XRTVTin29Vpkz1749hQ5jGW%2Fm31MHZoSRDYf3nCF&X-Amz-Signature=5afb5a4afcdc7ae0b605e8d31aafd114986b2f0a1018f5f8b430861b36149087&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Multimodality-disentangled module

- `Adversarial autoencoder, AAE`
	- data의 posterior distribution을 pre-defined된 prior distribution에 가깝도록 강제 

		→ prior distribution의 data는 쉽게 disentangle 될 수 있기 때문

	- VAE, AAE 모두 distribution 일치하도록 허용 

		→ AAE는 prior distribution의 정확한 형태 얻을 필요 없어 채택 (data manifold 포착 능력 높음)

	- Encoder, Decoder, Discriminator(shared MLP) 로 구성
undefined
> **Flow**

1. `Encoder`
	- Modality data \{x\_i\}\_{i=1,...,M}, encoder E^{Img}\_i 로 입력, latent imaging representation \{v\_i\}\_{i=1,...,M} 생성
	- v\_i = E^{Img}\_i(x\_i)
1. `Discriminator`
	- _**Adversarial learning & Discriminator learning**_
	- representation은 Discriminator에 의해 prior distribution(Gaussian)에 근사하도록 강제
	- Discriminator는 MLP로 구성
	- multimodality에 대해 shared parameter 가짐
	- v\_i가 prior distribution 따르는지 판별

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YF5JV364%2F20260416%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260416T125542Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIB1%2FaWOCny%2FNhgwQf7icN1%2FvEslr2B%2FMQ9x4VsMKp5V8AiBe30NGOVNNi2MCSD%2BMsbOeVjgEbzuXBW8uMtl%2BcptJ1yqIBAi8%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM%2Brmg2HuMNa02NxY%2FKtwDq1qkl35deFDakZ%2B9uSyr%2BCtjTlQQC%2BcKEAL0R3EhkqqK%2FsQ69sb4UpycvCVau7fBpn0GRNej%2FT37LcZq0MhkVefZrGOdi7CHViVmd7TqEWvlsjmet5hbMIR3vArdkrRIN2UPwDHJIUruLH7dyIKsf2SuUmP8ljl0%2FTaqD5IxZsqJv4Q%2FcKXm0B4dWJN7S%2FqpTECuGWmy5G2nZEULdVibg86kioMgMrN%2FALKxQUAki%2FWWSaG8h3U5TOkyble83NK1VBvJZ9Ny%2BD5z6ub1Xsl0PJTck25OShF%2F7FnYl4IIxyKxvC56N%2BTeDHz381MiZsVcQ70vGV1EZhN%2B4btS8%2F31SnE8SpG5yZGLbnTPr1%2FEXoGIhqn4j0Kx7pp094pS%2F%2BgTLiVON3swdDElHXrR0JKZ9PqWwgxyM7wvFz01yzEj4t939%2FwtZw5v7UdJI%2FuCtfO5dybsNUop4E7nLBmOzAxSRDenRR1%2FuAU9akyaBt6P7vfXaT4onSFw8oGXWmQhXHP2MIq5KYyLvFBOF8%2ByPa40sGtcdXh70L69MkA%2FY1ZcM8pVI3G%2B%2FbpbpDM%2BTP7cD%2BrZsA7BLf990KzSp1wDROLhAAjRJPnLBUojNOTWRgs4eJ47CnJFQbsGMf6ApYAwmYaDzwY6pgF%2BHpFfdZrDVcXXoD2D5Vv2ih4GYXtJquHnOaYY%2BpB1AF514PyvVcvI4IbWMRs9wnRp8MKugg0AiaTGPc77%2F0m%2FDRDfGn0vLztzkDiG1N3PRfAdV4NWCE0X3QyRsOhKBsZe%2BD7y5M%2FPoBLDvSmwQPwEIckJ%2B1bzMcoDYlhMYiPT%2FvpUicAECB6RZvMYPoQCbq%2FHYyMDq%2BJRoG1V0iEkKuCARWGi5wF4&X-Amz-Signature=70b10f7dc4b6c112e47c7308cdaf9db8a4175e9a138dce029fe7b6c2c6c37809&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YF5JV364%2F20260416%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260416T125542Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIB1%2FaWOCny%2FNhgwQf7icN1%2FvEslr2B%2FMQ9x4VsMKp5V8AiBe30NGOVNNi2MCSD%2BMsbOeVjgEbzuXBW8uMtl%2BcptJ1yqIBAi8%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM%2Brmg2HuMNa02NxY%2FKtwDq1qkl35deFDakZ%2B9uSyr%2BCtjTlQQC%2BcKEAL0R3EhkqqK%2FsQ69sb4UpycvCVau7fBpn0GRNej%2FT37LcZq0MhkVefZrGOdi7CHViVmd7TqEWvlsjmet5hbMIR3vArdkrRIN2UPwDHJIUruLH7dyIKsf2SuUmP8ljl0%2FTaqD5IxZsqJv4Q%2FcKXm0B4dWJN7S%2FqpTECuGWmy5G2nZEULdVibg86kioMgMrN%2FALKxQUAki%2FWWSaG8h3U5TOkyble83NK1VBvJZ9Ny%2BD5z6ub1Xsl0PJTck25OShF%2F7FnYl4IIxyKxvC56N%2BTeDHz381MiZsVcQ70vGV1EZhN%2B4btS8%2F31SnE8SpG5yZGLbnTPr1%2FEXoGIhqn4j0Kx7pp094pS%2F%2BgTLiVON3swdDElHXrR0JKZ9PqWwgxyM7wvFz01yzEj4t939%2FwtZw5v7UdJI%2FuCtfO5dybsNUop4E7nLBmOzAxSRDenRR1%2FuAU9akyaBt6P7vfXaT4onSFw8oGXWmQhXHP2MIq5KYyLvFBOF8%2ByPa40sGtcdXh70L69MkA%2FY1ZcM8pVI3G%2B%2FbpbpDM%2BTP7cD%2BrZsA7BLf990KzSp1wDROLhAAjRJPnLBUojNOTWRgs4eJ47CnJFQbsGMf6ApYAwmYaDzwY6pgF%2BHpFfdZrDVcXXoD2D5Vv2ih4GYXtJquHnOaYY%2BpB1AF514PyvVcvI4IbWMRs9wnRp8MKugg0AiaTGPc77%2F0m%2FDRDfGn0vLztzkDiG1N3PRfAdV4NWCE0X3QyRsOhKBsZe%2BD7y5M%2FPoBLDvSmwQPwEIckJ%2B1bzMcoDYlhMYiPT%2FvpUicAECB6RZvMYPoQCbq%2FHYyMDq%2BJRoG1V0iEkKuCARWGi5wF4&X-Amz-Signature=2c4e3950c700e7cfb7537b72f5e8ee1768f86a1fb002b5077ff10eaf634b1516&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664BUFRQW3%2F20260416%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260416T125542Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIF84pVgiygS90RvhwZX2PqU6WHAX%2FKn6WPZXDCpvKDH%2BAiAPCJyRmRSfNFzGelPuVli9%2BgsSia4GTQMeobpIuMPdbCqIBAi8%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMzVYxMXUPKGh238QFKtwDzD3Xt0HyidhVYDQQshUHeFsBLVQCpLG0JldAEq8DA%2Btcz5X5r0LF3e9GWAv7LJIHf39HYdzuQyisnd14YOveVRlWyT9YtcPg6Bidl3zmryy9NTvWEbHe%2BdoqWGhWLhR0qj9lpam%2B%2Fwq%2FAB1FnC7iAQpVfz9ueTMl1srhgurq8VyiXpd02Rpj0OkIVq7py49YG9MKHrty2JbO9JqCs1lbIPGhJz%2Fr5AeeP7Z8nKneXqRpovyZUbAnHDrWhxSCMM4Cjhil07r224Shu0ZKR23aeQpAzcJMkXUTtaR1Ld%2B8FZYae%2FZKHYj6lHPym9QoIk6NZvEAg7yskq9MVlkAsGmXJfi2Cu451vdo1u7Gn898iYSHd0o7gUxpBI%2B36DX5YpJ4ET9QhCQNr9YvYe30J5sILyqoXDkpBPdZcFv41yH5TNUQAZmTq1tYeOah9boXa6aPv6cOG8Je5znXF9u9Tvzka2Zfh5CYRKN1ZjRIvvHxmnxTFyy1i%2F%2FaWZWxEgDUmupsQweajzmRKRptQkFGNkBg6vny%2FWYfTHwmRQfxnJ%2FOR3c6pWN1qke4%2BGLKG5oWqsjGyPuFB2MwEXpG7TuRoHUwE%2BK75ftk7y%2FEIBGjzR%2Ba1mpblCdPOtEEoqDXNgEw7oeDzwY6pgEo0oeM6FPmVSIC5%2FHlQFyz445QMnsM%2Busi5WtTQ2W%2F7jEFyeHsXQaIdb8wTsSRnRaC%2FloawM%2FUqbLgi2ZIwvM24NUGmszrCrUnfaiOEIeGnfMDRnIu%2BKQBJENK%2B9wHZGkM3LVNrTiQnOqwKNce0Ws0YVBS1BuRQ8aqWC8hdxH6voimF9CObtxJv3qJi5tjhETXC3LSedCkquowQZqFBCAICw6CEHux&X-Amz-Signature=d790ce498d35ef167412962848f0da4b8967ef43ed753a98f81501babd5d4bd8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SDTTMQ52%2F20260416%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260416T125543Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIDVgek97CaliNrHkA%2B6y%2F0r54mwJ98f%2F7NR%2BDVB0yECHAiEA%2Bh7K2LR1ztF%2Bl%2BEb1ZV1oSiJEcyLVah3MjMyNQ6rSl8qiAQIvP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDHNy1xVPTKkPV8W83SrcAw2%2FzeV3ndRzNE%2Bug%2FyhG%2FvgRLS7ftScFcPyEDtkjR6Z6nUgzddrpzNFRjr1hC3AREpFjMYFM9st3Mtls1UmA%2BUVszYvDrNZUPMIgf9TVWJrFtFzQCMdGQOTtNnUBTDL9U5Wju90LK3skZpjeApfTt61DXNSWIErPatWg5eQlg2m0H%2B4KSCzfGE8c5RC1W0ck9U7x7SfhZ0ZysDENcwMGOJfiSmw%2BBaBOIWmSRClrBe0RtyglhrCOT98CsyXINBohdfKzkOTM6w7ErsPf9If6QcgaBu4EoIWznPjn8V3osNG0r2SNVuDNlB4nnS2Agy3qpunNM5sIN2li%2BwhOas%2FiMMm%2Brs61h7z%2FQ%2BvItn4MqGjXxxX7qnO5SjGJJT3a0KZKeVt1oUxdTocr9VC%2BkP5W8hIbqiLe%2BK9SQ54mvhnRvmRtY7THqjQg17rds8xcmgxIiV3Ofv8%2BrRUwctrz36Qn62Mlfg%2Fp%2FNV5cJda2gcws%2Fpc8jY2hKPc6fsNx8Yi2zr%2FYjvJbZBANmQN7fDwlhejfIZpw99fTwR%2F9Yl3txpMpfLCPSs4NfIHycBdsS%2BbaBqoslX6OrUY7MX6YP8oWPNA7se0jPnMeQnEXON5ONKEwhly8KcZa34R6I5BKfoMJyIg88GOqUBasEzgXzblg0OMoj5wzRWxAeqqU1DNuF1uQszFHs2W6KzZjIX2VqhV3ufeoUwC9ATTbi5ylm5FvR31LnzGg8oat9CEtD2vr9prSDew9kSdFgKUfwyeeNL8MViLHTgQoLZRLxGVokFXnjhSI7iOzHtTru5dp%2BKI3a4T871B%2B8LRfCEn9864jLJdm5HXWF%2BH6IFXaL39aiThDuoPbkW7cOgMOlGiyXP&X-Amz-Signature=48d773d7c742a142ec59edcdfee899b91ebbc1547c9b229975973f6d7ac15e53&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

	- modality 별로 존재하는 common representation과 현재 specific representation을 입력으로 reconstruction

		→ modality 수가 2개라면 2회 reconstruct 진행됨



### Association analysis module


AAE와 2개의 association network로 구성 (network는 imaging modality 수 만큼 존재)

- `Adversarial autoencoder, AAE` 
	- prior distribution 내 제약된 genetic latent representation 생성
	- adversarial learning, gene representation reconstruction
- `Association network` 
	- genetic representation을 imaging representation에 mapping
		- 각 network는 imaging data의 common, specific representation과 각각 mapping

		> ⚠️ **Mapping?**


			imaging data의 latent representation과 유사한 representation 출력하도록 학습하겠다는 의미 (objective)


			_**→  image representation과 어떠한 연산을 하는 개념이 아님**_

		- imaging data와 genetic data의 association 분석

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665V52WPQF%2F20260416%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260416T125543Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIGKo8DNL2DopmYhL11WCdyYDwKksB4L2FLcQhMQxkyz2AiASbktP1QQOfxdhxWir2ypeAM6ASfJtNGPQnPJnYHWLXCqIBAi8%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM5%2B5juXsHyBoXcTNPKtwDbOpwh%2B8oEvmWM3EWwHNpj5yRV3ZYM%2Fe7KDo2NIUcrmRcRxYoSgY64PiO6h4QYe%2F2BX%2FjclkCw9cjHePXTdophw9TLm82hJg4FCNf%2BMax6%2BzTlETncDL%2B1J5rU7rBoWnQf7%2BFbjalXfawUVJ%2FrJr03kNP7582y5ynuk0p1soDMaWY3Ib9EHQpftEGWZ19f3ErnByilZ%2B6pC27yJFNwLtkO6q1fB6HSrZUy3SN8rCnVRYvRHF1JJocehwNtuO63GUqSfNzsa92QNSrIHa7hb0MAsD1ljftV0dqmfVJxpzYftFMLjAM8%2Ba1X8yq%2BZw3UvmOqPft5XeVYBe%2BLXmb%2FlAV6IxJCN1hhOJBHa5RcIMdbrAU%2F1RtC%2FxJP77HYE8Mpd5L969ZZ4W9%2Fs7cQnuWsT64V8wLwSvpa0mFr0E3nmT%2BFTcN9nA%2BNRTz2yt%2F5uCi98NLWfnI5Z1BCCtntWm74pOPnM7xvaZ7v9H4blQpE%2BfwtqhR%2FmuxALeDvn136LbFzs%2BadomAWHqbMCMmKebo0%2BgBNyYqeJ55LquIuoqxrEXs5BvRd3QoKCfToLWtStq%2BjvxqR7vzNJBUKnSL9Y3iBIAFMR4MDq8jyx%2BoSMfC2TJh7yoBADF9wCp7HRaceJkwtYaDzwY6pgHqRWZ%2F%2Fi9FBH4pQYFHxnSNfBZLj%2F3JThA7uD0lQHy2hykL3g%2FR583nT%2B%2FBpNs6TF1TwHvJo0C%2Bk%2FNxeDkbY0PmCF6LAnk9DurDMU1D%2F4fslBJJe1mVKkNJxPI7pZ0ICSGHkjoAncNuRFaCy5mWyGvpiNFUFurpazu%2BPIWmQgBK3xwwooxuO2eRJcvaOSxINdGgQXO4OEaQKOqqD6ly0FEX9JNPrwEl&X-Amz-Signature=eaca5ccdec433e7258b1de4068bfe64e2c8bfd903ad562671be9385cd3825bd0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

	- mapping 시킨 representation은 missing modality의 representation imputation으로 사용됨
	- mask의 경우 diagnosis module에서 representation에 가중치 부여하는 역할

> **Flow**

1. `Feature embedding`
	- SNP의 0/1/2의 categorical 표기 → population에서의 발생 빈도에 따라 0~1 사이 값으로 embedding

	> 💡 **e.g. **


		trainset에서 한 SNP locus에 대해 dosage가 0/1/2 나올 확률이 각각 0.1/0.7/0.2 라고 할 때


		→ sample의 dosage 값이 1인 경우 0.7로 embedding

1. `Adversarial learning`
	- Multimodality-disentangled module과 같은 방법으로 adversarial learning
	- genetic AAE의 경우 disentangle layer 없이 전형적인 AAE 형태

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SGEP3P74%2F20260416%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260416T125546Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCmsUwf0nnDAZhlF32yQbBNRim4KTNGifif6bOpOqYo1wIhAKgkQQIc5mAoEdTAEhZCXKHFns2RSsRX2rd82YZm%2BvtiKogECLz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgySdNQnBsb1bvo6yI8q3AO7L6dZQyOrxwMdFPzI9rgoI%2FKCfP0Sl5nLAYcHRcaRp%2FDRmW7H6dCDOUd5GFyCsXyETq3B6N7FxoVOljd3RWIlI0k0FaUvi0j%2B%2BDzQKXskud2YxGJV5UU6J%2FHkPm9ZyA%2BGpjnCvyivLxUntvDGNam00dvP%2BOP2EPPy4bvjWTeV2hsQNNPUe5zXj3GWQ1ik1hjsl5dLmbWcbPDOlhuUmO63itahmImV5UAT69iFwIAhEJMHV4BbV3sto4VKPIpNO68Agj0SQZfkR4EIHvGyAIEE10cRovltc4wNpEgF9yWSMnfU701W9C%2FPDOKJfnKxiN9rvbpx33I2qFoUa6qj7kf0JfTqqw21Up570jEE1TNf3d5Z7aFWzZ2CbiOntxbEa44HtlUl3MHfGnSGlfLigO03plJ%2FGyRTGegOk3I3CbrAIAVOuETjyPCpnOMcCrwmT0NqxEZ7BQgFfSnsnDju1RNYZ7tlO99%2BpoEW0rgGOj2DMiO0pFIK1DF3LTpDKfwXu3GwJ57Q%2BrKsM5%2BDH3Xsr36kPK8vm2ul8%2Be9rKnX6rXpYnU1ulWhNNvlTDjmX4LUbXZY149amd2kji6aX8OkKuZn1tQQzXJvtl1Wt8sqj2Gwgeu9DUmJowTQJORZWTDVhYPPBjqkAWkOVNagm%2FKppR%2BDFSBLewokZf3FbJcIfqZo1pugm3sV8HmxmCKHVsHIIqbhgD4kCF%2FvWWY8h8rBoVj4IpXXkrTh8jS3sHRaYtNE3iGe1K5fsaXD8B8WZa9MYm4VKV7ZzsNHd%2Be4yzkd6ZNggKiYV2ul4vaXSXT8BuJO%2Bb6lacxIZ%2FzH4RZxetAh1z9FBJ5KjpLkvUB57pKT%2BPTOb6DlAoiHj%2F87&X-Amz-Signature=f6f9e2dce064e2bbaeafd448e04ef964e12757b1c131820678150ec8407de1ca&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SGEP3P74%2F20260416%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260416T125546Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCmsUwf0nnDAZhlF32yQbBNRim4KTNGifif6bOpOqYo1wIhAKgkQQIc5mAoEdTAEhZCXKHFns2RSsRX2rd82YZm%2BvtiKogECLz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgySdNQnBsb1bvo6yI8q3AO7L6dZQyOrxwMdFPzI9rgoI%2FKCfP0Sl5nLAYcHRcaRp%2FDRmW7H6dCDOUd5GFyCsXyETq3B6N7FxoVOljd3RWIlI0k0FaUvi0j%2B%2BDzQKXskud2YxGJV5UU6J%2FHkPm9ZyA%2BGpjnCvyivLxUntvDGNam00dvP%2BOP2EPPy4bvjWTeV2hsQNNPUe5zXj3GWQ1ik1hjsl5dLmbWcbPDOlhuUmO63itahmImV5UAT69iFwIAhEJMHV4BbV3sto4VKPIpNO68Agj0SQZfkR4EIHvGyAIEE10cRovltc4wNpEgF9yWSMnfU701W9C%2FPDOKJfnKxiN9rvbpx33I2qFoUa6qj7kf0JfTqqw21Up570jEE1TNf3d5Z7aFWzZ2CbiOntxbEa44HtlUl3MHfGnSGlfLigO03plJ%2FGyRTGegOk3I3CbrAIAVOuETjyPCpnOMcCrwmT0NqxEZ7BQgFfSnsnDju1RNYZ7tlO99%2BpoEW0rgGOj2DMiO0pFIK1DF3LTpDKfwXu3GwJ57Q%2BrKsM5%2BDH3Xsr36kPK8vm2ul8%2Be9rKnX6rXpYnU1ulWhNNvlTDjmX4LUbXZY149amd2kji6aX8OkKuZn1tQQzXJvtl1Wt8sqj2Gwgeu9DUmJowTQJORZWTDVhYPPBjqkAWkOVNagm%2FKppR%2BDFSBLewokZf3FbJcIfqZo1pugm3sV8HmxmCKHVsHIIqbhgD4kCF%2FvWWY8h8rBoVj4IpXXkrTh8jS3sHRaYtNE3iGe1K5fsaXD8B8WZa9MYm4VKV7ZzsNHd%2Be4yzkd6ZNggKiYV2ul4vaXSXT8BuJO%2Bb6lacxIZ%2FzH4RZxetAh1z9FBJ5KjpLkvUB57pKT%2BPTOb6DlAoiHj%2F87&X-Amz-Signature=c9cd99221c35dfae63dfaeef0b1665868b94d4df540777ecfa51d3be9a120151&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662HCI7RZ2%2F20260416%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260416T125540Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCySwMybBV8Ndjpk8cVK%2Fq4wAaqAAxUvP18o8GDyDSb6gIhAIEiQuzxzZ%2FjdXsK9aLJDCxyEkYjibzN%2BC23pFm4wwpyKogECLz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igwnci0qk6aw7ER4ud8q3AOX%2FckFpEUFH1tTpnssgYddn1oUmM0YG%2BfH2RJdBtwQGuOCpT7N%2BhFxgDxUtupYZcOskzmhmvO%2F3Do7RG%2F%2BeIwqBMUFswKvSI0rK9KKlX7Qbwg3GSox0Cm1AXj2eGzwrBwnu2XB39U0BImXzvbBPBSbql5IiWe4iYC7tg2rSZ6Blfv7JkDntvNZYXYavYTEXPoIMcIU7CLFUd6EBsuYkbjNeSISN%2FIA7twR5hTUFSQaAKE%2BsUYphfm9eSfg0Q5O%2FIkICChBS84XKwYNVmo6xyAWDAOXKQOoh%2Bk%2FaMmpbbrHMe2mHH2k5M38Z2wL6m%2BNnrzX%2Fg4ie2cKQ%2F2o5KxU2fyfwNGMC%2FqbYSDjckYQkJPfM9Op4BachXP938Nt%2FQL3eoxsdmT04bpm8cnQ3SmBvmmVH1YMi7yWgPJKF7UAj9hP7nlvOrrMvCteHwx2SfxXf%2BZ69ECgzy1e%2B2ZZ2MGy%2FJUErsd5SsRd%2B04SeX3amBH51w1Bdki9M%2BBQANjb%2BrCcC38wSKImv7pHHbaXuaBLMlUaVRMiAxF3N7gYq5G0wORKSffv%2Fh8fapp5RHqi%2FSNkxxAUmEGqYqFETL0r8EpKkirKMNMTHTWQ%2B6XoGg%2B6yHnNotIYGEJAnUXb8x9xcjDVh4PPBjqkAeinaVcMxDDkQ84yjW3EEaRuVi5geHGLcoOq17RrYYluO%2FrFidEjA3yYfyWdMRhxutzJWy51KKnW%2Biwwwo1IqneQrcFty0SPVZWObdd8U8gbBkuf1by8%2BOf4JCYt2WrvB3LrQG7l8115DQ8f8h%2FO4uZWTAz9QVHGzyESr%2FWPvrlZd2DPeEzChcFHjR7DaV8TwWdWagJ6GfgBp4knzR1eMIFYROH1&X-Amz-Signature=6147610d846f814af3cc4d76361ea4f58a7d07410ea718206f5bfceca517b14d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665F4VM4Y5%2F20260416%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260416T125548Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDtHHnHBrN6rW5XgSyx9DNMwTivO92ufGjl74E2PfcWEQIgc%2BIBC0vorq8Dx8RpDF6KSArqnnncDqSDt9hpaHmcTlYqiAQIvP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDLOeyPajbd6ijIdQHCrcAw6uSmK%2BLfasx464ZJ2lF2wtQH8YhG3tq7XZSUTMGJ5T%2BrJiR3mgjdzR25eEeE8fPCgjvwWgM2ADf8hOioKcMseoigEk2SpRHLa8%2Bg3UyLqTu6mSrKpUiBs9fU9MBm3VaTc%2BJjlCINsz0LTPpuUlLWqzmyRQ8xU8KF4YicbkJG%2FKhyjI2r1gy5d3%2F84MYNKQUcBocT82gPFclXdTQa16t4xpq7HpPhWz6FAjpyjqt6sw33o55l0TH4mtyYV%2FOb8YIEaXbNYPgEAouR2F7n4K3ivD18ag2iLS3lBd7Tq4Iyi8fHW6sCXJ%2BcOcSqlLuXA89jrNVHQjUtODKmxBy%2BEupFsdaQTt6D8PX4kUXkez1HW%2B%2B6TVd%2FtPKAr%2BqM%2FoCbRvWfZl%2Bvk9U9T4krtCvik2bHK6Ay8ndnEh8gSHQibP8QdR2zgHyPfxsTWMGj1z2Lo8SoOZqEuoKX%2B86n6qBulxiyFZ1jaGirbe5WpsTCgHDfJrzxzOYNX2nrw%2BXMautvZmbvYeaFCkrfQEA5LG4FwIKbhOxmCMB%2FeqfA4qI3ngyUbntV4d3VU246PMbyaA6qUUH%2B8B0fZCyu2kcrPxKJdF2VxxCCOuIffJbF2Ehhmj0lijrlGnk0D%2Begkn8vMQMIaHg88GOqUBrfHfPyywPZVW3OvAzNSdk4ptV03%2F9J7LeQMCAufIEaL%2BM7K84zOWDjef0%2BuAEOZ2Cyc0dg9PUelgUojWwXrXqgQQh8nOCkLOhdKECadvIgQ%2FHUQqoMuMz6%2BfIuGK%2B%2FACh%2BvJCV22gxS3xi%2FMnPlGIXqrsQYmGSIhp5OW72MZWp4RkL1t93OIujL5urlg%2B68V3dmhMSzHp22aPjksmdJCl0mBKJMD&X-Amz-Signature=b6bc3aa28bc9c8eba2471e45b413b7c60c8989cf8924224e6e315d87e63fa703&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665F4VM4Y5%2F20260416%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260416T125548Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDtHHnHBrN6rW5XgSyx9DNMwTivO92ufGjl74E2PfcWEQIgc%2BIBC0vorq8Dx8RpDF6KSArqnnncDqSDt9hpaHmcTlYqiAQIvP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDLOeyPajbd6ijIdQHCrcAw6uSmK%2BLfasx464ZJ2lF2wtQH8YhG3tq7XZSUTMGJ5T%2BrJiR3mgjdzR25eEeE8fPCgjvwWgM2ADf8hOioKcMseoigEk2SpRHLa8%2Bg3UyLqTu6mSrKpUiBs9fU9MBm3VaTc%2BJjlCINsz0LTPpuUlLWqzmyRQ8xU8KF4YicbkJG%2FKhyjI2r1gy5d3%2F84MYNKQUcBocT82gPFclXdTQa16t4xpq7HpPhWz6FAjpyjqt6sw33o55l0TH4mtyYV%2FOb8YIEaXbNYPgEAouR2F7n4K3ivD18ag2iLS3lBd7Tq4Iyi8fHW6sCXJ%2BcOcSqlLuXA89jrNVHQjUtODKmxBy%2BEupFsdaQTt6D8PX4kUXkez1HW%2B%2B6TVd%2FtPKAr%2BqM%2FoCbRvWfZl%2Bvk9U9T4krtCvik2bHK6Ay8ndnEh8gSHQibP8QdR2zgHyPfxsTWMGj1z2Lo8SoOZqEuoKX%2B86n6qBulxiyFZ1jaGirbe5WpsTCgHDfJrzxzOYNX2nrw%2BXMautvZmbvYeaFCkrfQEA5LG4FwIKbhOxmCMB%2FeqfA4qI3ngyUbntV4d3VU246PMbyaA6qUUH%2B8B0fZCyu2kcrPxKJdF2VxxCCOuIffJbF2Ehhmj0lijrlGnk0D%2Begkn8vMQMIaHg88GOqUBrfHfPyywPZVW3OvAzNSdk4ptV03%2F9J7LeQMCAufIEaL%2BM7K84zOWDjef0%2BuAEOZ2Cyc0dg9PUelgUojWwXrXqgQQh8nOCkLOhdKECadvIgQ%2FHUQqoMuMz6%2BfIuGK%2B%2FACh%2BvJCV22gxS3xi%2FMnPlGIXqrsQYmGSIhp5OW72MZWp4RkL1t93OIujL5urlg%2B68V3dmhMSzHp22aPjksmdJCl0mBKJMD&X-Amz-Signature=b6bc3aa28bc9c8eba2471e45b413b7c60c8989cf8924224e6e315d87e63fa703&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TAXNYQAW%2F20260416%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260416T125548Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDxjD4aE2QGD5ab3mAM5iztoTMVCTYmAbpjsu%2FGsugHegIhAMg0UMYCHOm7%2BAQgI34BliHhqZXWcsw2Lu8bpvXsB8roKogECLz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxctqZWIFpAfVfu1Xgq3AM1OxaT4bhfiY%2B8wQd8aegNdgXtfu5V%2BRfy%2FaeKXJEteeYNBM0%2B1Do1iWtKFA3UsAFVslbWx0D0c6ERcGSatQKr765VnuQAu3qyqa98CcDCIoWiLUpvQbh04paSkZXtXeriYguAd%2F8WTvNGIWUObHeggi699qQGBlqMm8TJCEFajVFJp9o1m%2FY%2FBV4iEmxJr%2BhEGNMHPQHkGQHDi0Xl9FAEbO%2B5QclUg8MdMXMBXyku5CgX9eYDoT8wBHqdytsYfwEdn4onuh%2FQ1jkZfSesAOehqPCMALDXwRRHcb9lYaCQON9skl5t42hBZTEOokP%2FsijiF%2Fml9CP7LAtCjwqboSEmPt91SEIamvrkn0gOBmp2dYxbmRXoQIlJr6PO%2BPp9ha5N3%2F3J1XQeYId7IRy5FTJYLaTtDQWhIBLgdXP8HVt1VWWFS%2Fj5vmn716b%2By7G7TKSwwfq1Fx6y4nkEgv9kySBpPKGkis%2FwBzwIeBL%2F1Turee%2BtBWc0wJNSRD5GmLh7k%2FYqbH7UFtoJJ532GuOjLfRz7CmFVc4pw8XmUK9af9I97dGSfgMmgmOCpzIUtiBStZMj4WIxGJ5vMBBgXQ1TOpgFEKjI2D69pORqmpHNNuLVkRBRyhkI%2BGRqWUoBEDCkh4PPBjqkAQjWkrSSdQu8uJc26Vk%2B1Loxbg%2Fv20tWzrANyY%2BYwsEbdZswSXSuIQlsPzC5USh3ZB%2FjkJPfQrLx4k698W4WRd6OAZx8fRzPGHm%2FoEbp9ZdXyFBGRFT%2BVGKkwvVckJWOdGn%2BXGFf8z5g1tU%2B8EIMWH%2FODgJ2uWSWqxJMdgmxPpLzm5hoUdX1YubO4TKCxmP3p86MHtwf0QmtxsyVdjUdteixLyno&X-Amz-Signature=1bd2952549e2ddd233411c68abdc0518ee058673bfd454b19d2f6a52ff60b54a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

