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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XUA5Z3LS%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T151753Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEC4aCXVzLXdlc3QtMiJHMEUCIC5t%2B8aajJMEWf0zq%2FXecw4BV7gHLSL525qhjhiQwcmZAiEAwvqMZJ5xa1KvA7FghvwHsDLfaTYlrAEE0AuwOs7u3zcqiAQI9%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDMsxGfC1ngYlbvUWWCrcAzRXLsHDrBrbyOiqnSdC%2FbcelOQ%2FWLAh5gXrAELL9in85M6mo8O2Lcy3mLRuc6XefTebsqEPthWBFDhwlF9R5HlihX8K3K2iVTfJv9lWAODqnc0X6gPqmUmEl6qJa8ebZ246PlESAmp3LPabZkkw0%2BBnuZ%2FkauXE48fC%2F5wSKd8loKOpE5%2F3j8V9kBTvL6B3PMvfoFVYwd01mjxb8fExMObuzu0%2BCFgArkRRwTWOAZZCbd2YfAl0c741%2B0Ppe7RwwTixfROiuM73oz24O4TgBXxfb1s5zS3r%2FfciyEjX8N36xuMHFWlh5p0MUyMPTt5Pr%2Bko4JbTvLKhksq2yEZDyr71sqxIF5%2F4QN9vYfaLsE2Bqov7WG6EiiiWMMH9QFg%2B2%2Ff4%2FktPzG%2FyPCABFNUcAwQCOqXm%2BtMtBKWb53VoQTPrjYFeOdpwNlEuRrcBfNWHyc2s2fEvwOHbXN%2B%2BJKLpfME1EeVnB%2B1m9ZD4se4e5e%2BWvPaIwFmwiLpAXGnssSGc0G7iToXgtI4On%2BHMN1vNtcUB9fb5MV2fkFN1ReulLVLIY%2FjjisB21lB6nKnOsqSwOjQAWz0US3TXIMqHxAQ1EUkPH2bGLlJKyJZWOTdIPI4hwhHibGcs3oWuPZLlMK%2B8n84GOqUBgEqaWuhMBE7SHIajnVbaHVMVoBSR2bETzp9ZCgbV35Np06C3HJN9Co1JY37XcdCTeDDc5u2Fe7WX2wg2F%2BMUf1M6AXgnOYKNGWLpM0Uwtw69LUIzjQDKeEvCCF9fFs0y%2FcFn01aZqcnlu5scxoLiXY3GxrgfZ7Yffjjj4DNStdE1wTqwVC9H7p4vvua9lldZOnLc%2BIiEuIImJhllnjdgYR5PBRHD&X-Amz-Signature=f69645f64b01bab8a1d96e90ed3cdca20019d5a09fac899996e115a1d723d76f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XUA5Z3LS%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T151753Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEC4aCXVzLXdlc3QtMiJHMEUCIC5t%2B8aajJMEWf0zq%2FXecw4BV7gHLSL525qhjhiQwcmZAiEAwvqMZJ5xa1KvA7FghvwHsDLfaTYlrAEE0AuwOs7u3zcqiAQI9%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDMsxGfC1ngYlbvUWWCrcAzRXLsHDrBrbyOiqnSdC%2FbcelOQ%2FWLAh5gXrAELL9in85M6mo8O2Lcy3mLRuc6XefTebsqEPthWBFDhwlF9R5HlihX8K3K2iVTfJv9lWAODqnc0X6gPqmUmEl6qJa8ebZ246PlESAmp3LPabZkkw0%2BBnuZ%2FkauXE48fC%2F5wSKd8loKOpE5%2F3j8V9kBTvL6B3PMvfoFVYwd01mjxb8fExMObuzu0%2BCFgArkRRwTWOAZZCbd2YfAl0c741%2B0Ppe7RwwTixfROiuM73oz24O4TgBXxfb1s5zS3r%2FfciyEjX8N36xuMHFWlh5p0MUyMPTt5Pr%2Bko4JbTvLKhksq2yEZDyr71sqxIF5%2F4QN9vYfaLsE2Bqov7WG6EiiiWMMH9QFg%2B2%2Ff4%2FktPzG%2FyPCABFNUcAwQCOqXm%2BtMtBKWb53VoQTPrjYFeOdpwNlEuRrcBfNWHyc2s2fEvwOHbXN%2B%2BJKLpfME1EeVnB%2B1m9ZD4se4e5e%2BWvPaIwFmwiLpAXGnssSGc0G7iToXgtI4On%2BHMN1vNtcUB9fb5MV2fkFN1ReulLVLIY%2FjjisB21lB6nKnOsqSwOjQAWz0US3TXIMqHxAQ1EUkPH2bGLlJKyJZWOTdIPI4hwhHibGcs3oWuPZLlMK%2B8n84GOqUBgEqaWuhMBE7SHIajnVbaHVMVoBSR2bETzp9ZCgbV35Np06C3HJN9Co1JY37XcdCTeDDc5u2Fe7WX2wg2F%2BMUf1M6AXgnOYKNGWLpM0Uwtw69LUIzjQDKeEvCCF9fFs0y%2FcFn01aZqcnlu5scxoLiXY3GxrgfZ7Yffjjj4DNStdE1wTqwVC9H7p4vvua9lldZOnLc%2BIiEuIImJhllnjdgYR5PBRHD&X-Amz-Signature=f69645f64b01bab8a1d96e90ed3cdca20019d5a09fac899996e115a1d723d76f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XEONP4MP%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T151753Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEC4aCXVzLXdlc3QtMiJGMEQCIEi%2FqRvJmPH97a3eCbaaM%2FSsxqcn5kxNe1Fa8YAOCXzrAiBOKz4kvMMzfuZ%2F11EWT9N2IzQS2C3ATU33VZ1RwGF36CqIBAj3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMY4xdYsssHRGj%2BJBvKtwDgCyw0%2BpB%2F%2BgHDCldjOc412APQCUJ530ZPHtFMMsCdap86zpYDV8n%2BJ3nar62gUZ5BZSm9ja2%2B9axmv7L9RbnkgAcqTRrknl%2BTNCugK5H0mKs1iGF3Syav146%2BesOPWzwKmhvli1Kctz6oaSloSOL44gsthk%2BI6fL0%2FBfL1bUug1vIbqW12ArCd19Ff10v7LraHp%2BB%2BggH7Y338zeQ4A6nx42lF9aTM8%2BLj7hC58XuG6HtsoyhZOxVRrjcYZHnPmul2tD63WAAQFatk9U4%2BdqMzKU2kHnNP%2BQqbMxYMHgIW1kI4X1qONpL7RO8wTERen2lq4eySTJMg%2FYl6caqJcQjtQ2bNnFWK5Z7GIeWZW20IZSZeA5%2BcemjBfZ%2BjsdsoejR2OWIYWvMpVwYVkh0Cu7aKAeihjI5O9vWcaO5%2FcaIaWYy8bkgZMBdfmn4xtvbHdf59xOylPI8OHzpylKd4RmBqVDMPE%2FPJXDW30WVfHrU5vV6pey0BiWqn7hb6K0Nvfr69kzUEA0%2FQJGj2UNqICccxGuA5E1tICDlGH40u8ahkYY1askKgIZ%2FDc08AzCE%2BhHcs4PHjs5UvXJ%2FhuowaIY6BrgEx1jMODPPwgr6LJyHbm02BmG8r%2BiW1BB3vgwgL2fzgY6pgF4qHIBe7zkTfB9WSSsRtToWY9w87rFckcAr5vHn8QKivWnRrvlRzoNxV2vKsmbjNra5OJPvKrZSLMI9d9AABH%2FaztDkXh%2BCyZeOxv3gDwaJ5VvhU%2FwtR4rBzu8q7A2bCBpf197cKfbTzbUrehEKUwEdxosWvHru%2BjBoBDulH0Q09QGuqaH3TqaxRZfaCLOHGvORcOdfsVaj%2FA%2F6hfEmbuVyhMxOtUC&X-Amz-Signature=79adf5506b468d7499c06bea2a373b86ff3c39ca56006919d7b4dda81cf0ed75&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XEI6LZQG%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T151756Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEC4aCXVzLXdlc3QtMiJGMEQCIE%2FEHkekdYgYe595rY8nNxl4TxeOp%2F9wavzUC2vHBLqqAiAFZieNkrrgP5a6%2BOHA8HnP8QdoThe2qPE4eEEwmDHl6iqIBAj3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMXuLUTcNAe7FFLWXwKtwDWQ%2B2CfHsBvKYxbGKjihVj%2FfNriROZ9uVaqRzzOje2JrUHuqB52yn8tfcmMT07buLDeW0IPFtavr7FJP5f1wDrknLtUKMvP8Z3FmjmddDrahPd%2Bey18Be5JbmAfJ037FBesWbebvWMXM4G9IXDnJEyjGTyXtEsbjuXACqcJVPN%2Bqj5DDr%2BzZ5WcNhfZ9h6Gq29KdKCnLSxAsNGkZBnPlLGuv%2BxvhicOqczk85CH5AEFvQtRWWBxesSIdKeCMwmzWRgzkNJnt7dijHJ%2B50a1UX5R5GGff657tlm1PK3SVFP8Ct8GB9ao2%2BRHIrx5kc9esTBnONEgKRKx85sUZIIPFX5gEhpsev%2BCIVIcTyYQp8wO6cxABcKgJH%2Fh%2Fat6ZjWXCSo4LDke84oJuXV1MMIZ%2FGr9D09THphizHU8Zv8tRXAb%2BW44BbbHMb1FciLoUzYSyju60%2BQ1R6SRjVNQ5mUGqElKOehO%2FMD56TrFjj2QsuT%2FdedIfAYnNIy8BSLRu6XT36PASLdyHqBGtkCMWrem1AOlVyds0cEtqBfKCnK0nTRkYsYp%2FfAtkkxKfSME8NSbRhsHZ%2BKNvWHNeHRKfGI%2BlrO0Te9JnhCZr0yispBLLiLe%2BmIRDdb6IaNHmZwfwwu7yfzgY6pgEusNv82WOsVKvGH3dwN9lpr3D8mPqQkcoFwrmWiC5g5gWsUN9RrSW9olZAvjg1RjWCrkaIDqwnK8zWw4c5R52BwqLjWRMD83IOmWFgbIs%2BoLWJUuVDUK6dNvWlo6cgYt6IpAQKqV9xwVrYFxZbYq%2FI1nlwKlGw3ZYBgZ7kqPgOJOLzHde3OVcZnYAu00CcuVijL2zkpGpJxSOTpL3u6Ky6J0Ifj295&X-Amz-Signature=87e562dcdc860bffb76375b19bbcc4ba47bcc71fc88b8d36677c4dd68ec54683&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XEI6LZQG%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T151756Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEC4aCXVzLXdlc3QtMiJGMEQCIE%2FEHkekdYgYe595rY8nNxl4TxeOp%2F9wavzUC2vHBLqqAiAFZieNkrrgP5a6%2BOHA8HnP8QdoThe2qPE4eEEwmDHl6iqIBAj3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMXuLUTcNAe7FFLWXwKtwDWQ%2B2CfHsBvKYxbGKjihVj%2FfNriROZ9uVaqRzzOje2JrUHuqB52yn8tfcmMT07buLDeW0IPFtavr7FJP5f1wDrknLtUKMvP8Z3FmjmddDrahPd%2Bey18Be5JbmAfJ037FBesWbebvWMXM4G9IXDnJEyjGTyXtEsbjuXACqcJVPN%2Bqj5DDr%2BzZ5WcNhfZ9h6Gq29KdKCnLSxAsNGkZBnPlLGuv%2BxvhicOqczk85CH5AEFvQtRWWBxesSIdKeCMwmzWRgzkNJnt7dijHJ%2B50a1UX5R5GGff657tlm1PK3SVFP8Ct8GB9ao2%2BRHIrx5kc9esTBnONEgKRKx85sUZIIPFX5gEhpsev%2BCIVIcTyYQp8wO6cxABcKgJH%2Fh%2Fat6ZjWXCSo4LDke84oJuXV1MMIZ%2FGr9D09THphizHU8Zv8tRXAb%2BW44BbbHMb1FciLoUzYSyju60%2BQ1R6SRjVNQ5mUGqElKOehO%2FMD56TrFjj2QsuT%2FdedIfAYnNIy8BSLRu6XT36PASLdyHqBGtkCMWrem1AOlVyds0cEtqBfKCnK0nTRkYsYp%2FfAtkkxKfSME8NSbRhsHZ%2BKNvWHNeHRKfGI%2BlrO0Te9JnhCZr0yispBLLiLe%2BmIRDdb6IaNHmZwfwwu7yfzgY6pgEusNv82WOsVKvGH3dwN9lpr3D8mPqQkcoFwrmWiC5g5gWsUN9RrSW9olZAvjg1RjWCrkaIDqwnK8zWw4c5R52BwqLjWRMD83IOmWFgbIs%2BoLWJUuVDUK6dNvWlo6cgYt6IpAQKqV9xwVrYFxZbYq%2FI1nlwKlGw3ZYBgZ7kqPgOJOLzHde3OVcZnYAu00CcuVijL2zkpGpJxSOTpL3u6Ky6J0Ifj295&X-Amz-Signature=398c0b98ff2970e5cc863527634789c4709e72d819a5d158a0ef46b875f751b8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46626FLZFMV%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T151759Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEC4aCXVzLXdlc3QtMiJHMEUCIAxsO5sJXHOBZUdmzKmPfswRq98cEC4gocxBHS2Y8J2YAiEAu5RJe2%2FO%2FS4vuyQwfyEGIM7l%2F8WsJgEsg2RdTDIMKvkqiAQI9%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDEQyjkLd2jOK%2BidujircA%2B5cdSPspyhb74seWzXe%2FoIPeAJnIzud1DHOCJNTQnqz5vh7h7q9Yk4KiM%2BzMFah%2BDNmPEbG4uePiQKrGNfvKIVIl5k3RalHUgXNLGwjQI7ohxAMu%2FxtqatzcX0vwsG2tSYNsxUfAG9sDZwTSMHcFQF65DEZmVL%2BFKgNkwvz0tT4cvsROrzzaS3srdjJDM4gHD0r6%2BS%2F%2BVoOnI6NmfG5hy%2F05H3M%2FPaX%2FObri8OAK7cZ32nrCaX%2BciaOofjqy22oLU%2BxlIrAzE3%2BNFEW3A9mv7FNIIkvGstovQAfAITUBoLXr43m%2By0YBtVdf6l6ScnqyEqvsBn8tJRzUW3Izy%2FUTQjfOnSGQnpig4jopcceKzxvhb0Ki94tnFsc3rBbnm77VgNfFRCWkiRk5ZojQAKau4yoQFsOL%2BVpy7RnEv%2Brqs%2BOtROy4YoDGLTz3NmFmrKaAYQsrxFu1vjtC%2Bfswy0x3IsvPBulJ8B8%2BvuxrAIDWKO6IxrKTPcAr%2BLNDmaIrqb8AjySxc2DUwTfSd4i28YxG4DPkhGi6DAGlP4QG3z4h0%2BiwvjT731ZNu63dd8jl5D63mOv%2BAd0Ws9p2VqE00cuOVPmv%2FTSsjy5s4%2BV068%2FWxaTYHHc4qLMCkVGOa%2BFMNy8n84GOqUBXVCiARyD4n%2Bd1jk3IR3boFPpWO7D9gb18BuLXpvNt4BhU2BVuoeMtTl8Am5XoC6ldy1niRWT6pbip5QIhl%2Fwp1iE6CQ08wC3fCdRWIGtnqRXHUkjX99rbXH%2BEeMWTDCPktIL923%2B07nAxUYrjaYLvGRWsBXlekuT%2BNewxlkdsoXyQqkfQ7448v5P9QQyJQ8oVF6MCo9x%2FELNklK8sVygw9pk56Nh&X-Amz-Signature=1e9e179ab5382e7c39b28886a00dd5a26144642aca4a6d9476aa31c8d1959a78&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WLJEEHQS%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T151800Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEC4aCXVzLXdlc3QtMiJHMEUCIQDGy3s06nU9rlwaG7EmgfTIP2VUnK9TmpPwQrgNLeDhMgIgfaFiHKXlKfdtNSFx0P18g%2BfqYrRyBI501jQpDOrAE5cqiAQI9%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDHZ4t5oda1wrEsbZ4yrcA8YIzeqEmb0fJ%2B5Z99gLtREP4IJNCMtx2%2FwKeeQ%2Fkc%2FRQaYEhvISRMixxEiqqK1DldpMyqY2xGu9aT2HxGGC%2FfhQj9QtdrqQ7LgeLV77SM4LYYrwmE6GijjrD3NDUI%2Ftb2jsQtLJXj4rDUPz%2FAkNHmYFhxYBP3v3LRNycT8MPxG1kqGY%2F%2BVwh5QAOxYusL4ViEhgb%2BbmVKkMAhh85Ixh3bSVkZ3FqGHJbwwvUYDfvHFBpNOitDETE4VmBkSb7fN8i1cbxITSm7dapY59xrdoFdcq0UcA3ZYNHUUO9mxf6fYoPUfD2ekhrOQeXZFFkc%2F2f0q6ERiKraIusGnPIyzvRcmglcV9lcvekRbNkcm3iMG%2BHgTTcn7Rc%2BbhMV%2B20eeoUqknrgZWtuSL6G2tgJRVk85n2qJ3m3Hn3sT%2FL%2BGgQXgoXQJ3%2BQE5X1w0zzoQtE5ZhewOz5IJrSNukGw361U4iQzHPRF8uJTnxfInyORqmzSV4JIgVS5Vuxxsep6Og%2FUTzlLbS43aeTIfnEEg654eOE6oZDLx7cDeMz0U3dOyn6XGu52%2BsHKcg0QYsqZ0U0Wn1nt5JxukQq7r9A%2F0n776CbN%2Fzz6cXGMAQLLhQPjg5wBpaBM5ECtyFQiH6qJgMN28n84GOqUBwZHLGkZBDQ48hYT7jYanBDBAl%2BuLmYufysJ%2BAzdMKRBspL4XjBTwTNf9Aokj8JJn%2BgCFbQQHtpbrZ%2BHd4t18IaEEEuUByU9NBQ%2BgBaNb4ocIk%2BjM7rfG3ixfjvsBO9Bg8unaKukV1B2mW6dqO4SW%2FPu84UmIU6FjoyilSdkf0mhu%2B5lpTbyr%2BiLAiFrAdDEvie1gY68c4ux43qit%2B67tuhTKtxaN&X-Amz-Signature=c740b49802b6026e0592cefc06e6225a4c3f8f759c17df7b7af00475b21af8a5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466X2LTRGIC%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T151801Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEC4aCXVzLXdlc3QtMiJHMEUCIH%2F9orBKeJpM%2BtONtUZJu1X4fvnNZfaInE8S1iqrqrPoAiEA2gQAqXKEcoQVCV6VzjLuCWfeFZhiZZGwHMINExAKcWkqiAQI9%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDMT5TbTLd3vEVKfgVyrcA4sNmJuSTNQKjH0sBXCZMShTODxQGcLSGGHwT2kGEnnJZbmQ5BwH7moadYMZHcz370Mww7Yf9zsy%2BCnRbQkVOvD%2FuMo%2BlyxxiJeR2NUFPXss9s9O1NWULzUrJmyquD0vf2vWLV1E%2FPI7sAN7dUX%2B5LC%2FF3gonflxNN%2BKzBTVzzR5SPNFGcqklEgiQhEHln2x%2BdBDDVSqL8mW5VDPdymfIAVoHpLheGY6qm3kQUeoPRNp1OZiuXvrvsfy%2B7Aj%2BeKjWTwIqRbwAZXNZpQoQa24CfOclFQrjU3cjNpVF586Yx35H8tetQvhOmxnRBUMKlhdEB8kjQ%2BaDT%2Fs2h6Z05fJD6xMNnlxTBTeYKMPTAxIctandu0T%2FIaJfFsR5DGFLj1kb54bSqolo2YZBvtoHfQ%2BmjMQEiAoW5sqpCd4N0GV7HQr%2FUi2DDAy2qyOupXNi02VOw3qWbgyB6r46lw01h8cJla6VFy0p3RJMR8oSIK417fRwDdACtlSUUC0BWWTt1ShJCS5z3DcZ2lMQs6jlEkni2cF7k5g%2BK9VrGJPFyhNcPHvLcNJ%2BtgYXDHBWpdFZSzXTfMu%2BrjEZdgl6jUr96OUoyjg4ZN40PRmpWuOrwO%2B3oDTAAZlP%2FJMKp8ZBzheML68n84GOqUBOUAJ1PskDBEr7G5WHiDTh4NvLYur8hSUlhE1l4cbOjwKbnQCn5Eu9p12M0ST3%2B1M8ijOVjnJZ6CL5jJUa2%2BYIcnlLrCFbPu9em3n9Hzkx0xMyc1owv5U0ANnE3TauRr%2FCnZv4V%2BErZJdWNSoiHD50ORQnpnREXAimTIRS7CpGultLydAxFp6HzNb5eskqGMKRYkG571vcHIP5USagA1BMjaGmv5y&X-Amz-Signature=071f7b72aab7490beed501fe965d28635d07b47a37fcd15019bbf1f24b7a1a15&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666IO4YOJY%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T151806Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEC4aCXVzLXdlc3QtMiJHMEUCIF%2B3ERz%2Bw3EsBdJvKl9hqMW%2Fxpmstsl%2FyCZHMCDP4DaiAiEAvmWPUVOFxR4eDUflfAX7kheTrjfVmreDQn9aO8IUnA0qiAQI9%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDNLKRhRcEgkBwyMPaCrcA7VBsQdPrVFLSR3NexxK3ZdhzFg4zdFme9Nj3%2BElTnnB57unHTMTrhx6tuEWymxr%2Fj8w6PimrfDskpC0IJ9mHE%2BpKuup0c1J%2BbQFL6KNhPOl6bwtCvX4qs6%2F7I5EuCQbmh6tp%2B7NZnxtwHBWAaPKmlK%2BwowVPZjvSTtre2BzJ5LLlhmK9CPcL4wpjXLpco699Bi6hCo8AXEzqCBFk7rmrHa0O17uebWPhunMy%2Bf9YTjg15AkHVcuq2KOl%2FwM3GhOlok1q9d5lSF4mBF6GsZdaAQcg46lyf%2B7KPGDiUx3SaSBlUbHuQ30dQnuLj3RLqzLlVW86WKNRSc5x6xHVMKhTK1MRMUC3qDE9uatSu7bdgq4EZjiaQsOnFFdbg7xacRT8MuIw9oaforL9vZsAqSQjfG6lpH%2Bp7l04InunHLN4mOFIDV8f6GcahrNSQTwEV3AAUZWWZhtrER7CNoP9GnemvcwgYWFefn5RmlJ%2B5o6wiV0fasrkHFBQhhKOXvnvAGve4GZlOSqlggmyFtdgJne%2B%2BIBOyGz9Xoj%2BVoL2%2FTGKL3H0zsCrkj%2F9p1sRh9oAqbLGsNGfKIbGzxiZHOLQec%2BmAMDnZtxvzGJGJqPqs4N5nZih005KzZH3uh2ZmhrMO68n84GOqUBYrm%2BxdxQ5bpVcTdHlm6xtdIUm6z63ahRW9%2FItTBi%2B8YUcNT%2BF5PR0APsYZEOuzWO2iphtrvdNGNsFHVnngXoRAuIQc%2FTqjIatvDDAqy1JLAo7LGCYkvRHYpPI8kgXdQC%2FKsFpszNQgV4KjunXqzr6GN%2BD%2BBrvYbShB8V2d%2Fsgu1RmJLwinA9oQKkedSe7tBVEcfZDWyJXGUpO69tFuA3QQjHxHc1&X-Amz-Signature=3d81552431ede8b3e141ff93219ef0d5735ae8b608f798fb33099efe4ebcef1a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666IO4YOJY%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T151806Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEC4aCXVzLXdlc3QtMiJHMEUCIF%2B3ERz%2Bw3EsBdJvKl9hqMW%2Fxpmstsl%2FyCZHMCDP4DaiAiEAvmWPUVOFxR4eDUflfAX7kheTrjfVmreDQn9aO8IUnA0qiAQI9%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDNLKRhRcEgkBwyMPaCrcA7VBsQdPrVFLSR3NexxK3ZdhzFg4zdFme9Nj3%2BElTnnB57unHTMTrhx6tuEWymxr%2Fj8w6PimrfDskpC0IJ9mHE%2BpKuup0c1J%2BbQFL6KNhPOl6bwtCvX4qs6%2F7I5EuCQbmh6tp%2B7NZnxtwHBWAaPKmlK%2BwowVPZjvSTtre2BzJ5LLlhmK9CPcL4wpjXLpco699Bi6hCo8AXEzqCBFk7rmrHa0O17uebWPhunMy%2Bf9YTjg15AkHVcuq2KOl%2FwM3GhOlok1q9d5lSF4mBF6GsZdaAQcg46lyf%2B7KPGDiUx3SaSBlUbHuQ30dQnuLj3RLqzLlVW86WKNRSc5x6xHVMKhTK1MRMUC3qDE9uatSu7bdgq4EZjiaQsOnFFdbg7xacRT8MuIw9oaforL9vZsAqSQjfG6lpH%2Bp7l04InunHLN4mOFIDV8f6GcahrNSQTwEV3AAUZWWZhtrER7CNoP9GnemvcwgYWFefn5RmlJ%2B5o6wiV0fasrkHFBQhhKOXvnvAGve4GZlOSqlggmyFtdgJne%2B%2BIBOyGz9Xoj%2BVoL2%2FTGKL3H0zsCrkj%2F9p1sRh9oAqbLGsNGfKIbGzxiZHOLQec%2BmAMDnZtxvzGJGJqPqs4N5nZih005KzZH3uh2ZmhrMO68n84GOqUBYrm%2BxdxQ5bpVcTdHlm6xtdIUm6z63ahRW9%2FItTBi%2B8YUcNT%2BF5PR0APsYZEOuzWO2iphtrvdNGNsFHVnngXoRAuIQc%2FTqjIatvDDAqy1JLAo7LGCYkvRHYpPI8kgXdQC%2FKsFpszNQgV4KjunXqzr6GN%2BD%2BBrvYbShB8V2d%2Fsgu1RmJLwinA9oQKkedSe7tBVEcfZDWyJXGUpO69tFuA3QQjHxHc1&X-Amz-Signature=b70160f92d62d30e25da0855a0bad96e4ba3b68e565f0dbb99ce2baf42d2e308&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WMUVNKGB%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T151750Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEC4aCXVzLXdlc3QtMiJGMEQCIH%2BeZd5JQfifV%2FULHOjuhilT89WfmPwaO7GYk8GOSFNrAiBeSORbUGjFEPGnkL7mb2OFMFS%2B5P83u6SLHVwJyAjmASqIBAj3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMkvTj05b%2FOEy%2BHccZKtwDfqUf6t076I383xZKjyTvIWkNs2%2BxTDeGXvBnbEMqPKXWPj6Ju%2BcORJaTRODp7OuAmr3HIIpJs%2BMotuza8O%2BrxzUxjk249EP5l3wGTj0U%2FzLX2dvdbGdvRqrt9PqzTRIVFhiFcYHqZ4rF%2FaQm5RUbMdfjAHidHSbAdA8ql7xPv9kvANc8N5w7Eth1u8xF5VRIxdeq%2FrqQ2N%2BCAj6GTIbyUfARsYVBa9JFB%2BpzftSINIRDVIVAH%2FCqDNQeIpGXosWxfbauGGEpomhT3eMuedLfuuQ8q%2Fb%2BRSZycbU9%2BoE21SEKGFj01tdydWOYakierQRuDMgWNuETDiDyps%2FgdZktpEt%2FATIKhNfj4e4YQJejruX5WBwPw8EHmZL25irqbc2erlAp0ViSD43vHU7FIVC4rCh0F8QX5Z3amffKYlNq5P1Np85tpGkgsnSYRizGJ9EX1SBG%2FaL%2FGF3wdLdMWQ8ClJ4cVgLXMKv5zHoU1yQMCxjj%2Bi1QYUu0zc6jVewgCjw3nttL0qeyoPzNeBe%2Fu1s8%2FJrKPDWpV%2FjnoNTpdpNC57sL5J0TaX54CUbJvCCD%2BjqMCohj%2BDdax22CfHvqnGzYsqLSyp6A1h1n8oulAI9TsdITsSXRVVB9ip%2BZ5SUw8LyfzgY6pgHiw8p5%2BY1a48bNks76vKmdkt1P5xx%2BIFIfhR6ElocErKe2JGgbZ%2BPcqda416hGkQfFarPz2rQudNL34%2F2aHc%2BJXKyhb%2B8WtRi8bBvgu5XrnnY%2ByOr1MRhZZ5OengeayMl1aRZ7Zrph50pwS4wPGIko0XkdxY%2BpiQW14T2u8fSvIfPo2KSXQ0VUWTtKlB1YGEtfGpwUuuqkYxCXJgPa%2FuANZoyhuBdk&X-Amz-Signature=e07ec3fbedd7b7dd11995a5a9e3a36dc6e49dc05fdc623a36c7e204960675c66&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S5YLSVL2%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T151808Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEC4aCXVzLXdlc3QtMiJIMEYCIQDIBVn1JVJGR3UP1aoSgiapxNemPnoGdZDe3w3Zb%2F4T7QIhAIzZ05XXV8C0%2FWs0Iv4GUoP3Nux3O%2FQR0y3I2NAEzTqHKogECPf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igzr%2FEmuv3DqahBDBRAq3APiI91J9BPFlwg1QgEwRGQBAQCCygmh%2BmPTg3wW0oauZvArkUDem4AbgEBpIDIY0mUSkCbkzI%2FD10v7sAUsHG3PAiml7jb34dNK79nH4kUWjJXSE37Z%2FakjR%2BdVfR6x8Ebe%2BvZMiQnB3Smeo0SpI83E4IbYD22nbABtA%2FfGhuILz%2BoRGiyAzn%2FVRTfqdyJbKDys2k0SzRAcEmem5rRSu%2FKpg0CLDF7tDev8GBEBlCdOH4p0WzGXLp%2Bq84ZdK%2FFGoWvNChISwftCPcgXA3sMYqB%2B8kGplErofO%2BgCmBXxE8A%2FOemBTM2Ci3SRid18%2BoyCVAbN2qfOeTEqYAis5AOgt0sn2vmgaEEwGm5WVOWpK4w3KoFSvxc6g1adjYHWFKlzonZGZISkH2zQXB4Y4nHE11R9BUFwZSz0fNWDPH5%2BgMkSRA8wN%2FGFNx5jMIw5%2FPpfjN5%2F53whavg%2B4eILwjvek8ZRxjFWKUIsz4owhChPvB91fDdDcbMbkCl1b2dbDxkfccIpxz519d1jEHN88UQTUNTopszRDaoMyaA6tNnQiz9oY8kijvhGrVSXxtHlCf7hOlCkEi2woH4c3zQB8iMiK0kKx8sdVXJ6t2q377e4TN4Oljae27RAUdmmix47TDYvZ%2FOBjqkAQo68%2BrFvXgkOI7oLuaUP9t1Gz3nnxaztgQtT5B7BfmQ6dbGTg1WrCBFl6VhaUf5Lpq2dXT%2BbloHnJQbn0G%2BDgL3WbSAgfv5MnayW%2FveNzgtOsgLCkUmuWfQcAjy487IqhAuYhjY9tHunFrCQUMbK4N6e7wQkLNa8tpiiOjx0fgpYtaIt%2BJ6oIDz1obwN2RTpTju%2BLamY47L4oKGEdvmLcUM3gV3&X-Amz-Signature=73d9ba65d06f62aa28258a46e28cb6c9080361f1cac65acc2a756bc92da74abd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S5YLSVL2%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T151808Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEC4aCXVzLXdlc3QtMiJIMEYCIQDIBVn1JVJGR3UP1aoSgiapxNemPnoGdZDe3w3Zb%2F4T7QIhAIzZ05XXV8C0%2FWs0Iv4GUoP3Nux3O%2FQR0y3I2NAEzTqHKogECPf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igzr%2FEmuv3DqahBDBRAq3APiI91J9BPFlwg1QgEwRGQBAQCCygmh%2BmPTg3wW0oauZvArkUDem4AbgEBpIDIY0mUSkCbkzI%2FD10v7sAUsHG3PAiml7jb34dNK79nH4kUWjJXSE37Z%2FakjR%2BdVfR6x8Ebe%2BvZMiQnB3Smeo0SpI83E4IbYD22nbABtA%2FfGhuILz%2BoRGiyAzn%2FVRTfqdyJbKDys2k0SzRAcEmem5rRSu%2FKpg0CLDF7tDev8GBEBlCdOH4p0WzGXLp%2Bq84ZdK%2FFGoWvNChISwftCPcgXA3sMYqB%2B8kGplErofO%2BgCmBXxE8A%2FOemBTM2Ci3SRid18%2BoyCVAbN2qfOeTEqYAis5AOgt0sn2vmgaEEwGm5WVOWpK4w3KoFSvxc6g1adjYHWFKlzonZGZISkH2zQXB4Y4nHE11R9BUFwZSz0fNWDPH5%2BgMkSRA8wN%2FGFNx5jMIw5%2FPpfjN5%2F53whavg%2B4eILwjvek8ZRxjFWKUIsz4owhChPvB91fDdDcbMbkCl1b2dbDxkfccIpxz519d1jEHN88UQTUNTopszRDaoMyaA6tNnQiz9oY8kijvhGrVSXxtHlCf7hOlCkEi2woH4c3zQB8iMiK0kKx8sdVXJ6t2q377e4TN4Oljae27RAUdmmix47TDYvZ%2FOBjqkAQo68%2BrFvXgkOI7oLuaUP9t1Gz3nnxaztgQtT5B7BfmQ6dbGTg1WrCBFl6VhaUf5Lpq2dXT%2BbloHnJQbn0G%2BDgL3WbSAgfv5MnayW%2FveNzgtOsgLCkUmuWfQcAjy487IqhAuYhjY9tHunFrCQUMbK4N6e7wQkLNa8tpiiOjx0fgpYtaIt%2BJ6oIDz1obwN2RTpTju%2BLamY47L4oKGEdvmLcUM3gV3&X-Amz-Signature=73d9ba65d06f62aa28258a46e28cb6c9080361f1cac65acc2a756bc92da74abd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RE2YYITC%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T151809Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEC4aCXVzLXdlc3QtMiJHMEUCICigmqTv%2FJNAmJa4fVZ4rjTAXmwJe6%2BkGmPQg7lLFR5dAiEA0iVURBaS11pwt9l16wc0q0PtmtOrtbiwUP9OUntuKUIqiAQI9%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDAdQXKQdrXxPe2QbtCrcA66ky06d1eEfv48PuUjhZPdChtA9bxQWrUIHNfKhEWKF8ZAaO17qQPYECV3pyJtvVYXIm%2FBLQLqiyPaBbzF8zd%2FX%2BgLVX5g9m6q7H%2FOIt8Bf%2Bi1Y7fbEg81WCxtlZzKUlAvTambChjLHsYwQRXunU4fFq3UOCaczqXYSegi0RT41GPHnVhfkP7csxJi6yXPHJbpHLBFep6Ejs%2Fjsg22QwWxzYntPW9vRin26iNfoG1Cv6BIsKSG8t0YwvDcX41%2B4whJrWmGTywTPfzC%2BI7L7f%2FInSU%2FnAT1LPQ%2BiqXHvQOl1K3obp3jYQllvtSV5jSP%2FWUU1XdO9n%2FZhpINDKGFxUMNaxopLXQcVugYWpWNxW5TWKhgzEIRUW22FORmTG8h6ShcL%2BF9y2FrhGn%2FYlfRumdnlRIDOTZ10Q%2Fmh%2FzSL7FfdZ4vapAsoAvpullIMdFQOqZ1eQhin38GNqxlZ27ix6as95R5F5jTL7O1Qmjog1dygSA60W%2FHaz4ea%2BTUYkVQnIJz2LQGcb9sAGR2KRST3RIoDCW8pmHZlxRKQq1%2F%2FTFHfTnzUVvaJtOYAzhtZOCh5fcJZ7wgNQaziiz6Y7Zrl9vYvBMpgpEDsjtrhLY0SodYkaLRVQShNYtJTPEuPMJK9n84GOqUB3MG76yYjCeWOBjZGgeC0GD0twZnlFr%2BYajGQ7f066A2s24ljkbyqAu%2FURhvo58Qu32TJYKvHlUSaWf%2FfD53Br8fGIx%2BdC9J9WqZmJ%2BDf%2BeFSVUCkvAK5%2FBcICuZPZUIMJNPBjEBnONr9cd1R6%2FBiZyggHIITB1O06SK7ED4E6aAUsZyyyCZqJ7HAGfCpLGCWLUnuZrGndQ1fWtXaU5iFQpYuxxA4&X-Amz-Signature=e49e39b5929886f809615799eb4435e5f23a1f072b1675025c8c185e0f903672&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

