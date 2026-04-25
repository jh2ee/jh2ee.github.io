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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665PVAUH5O%2F20260425%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260425T162624Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEND%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCKcuOpL3KyA%2Bq4CJqBfJLOBc8UyamPhNGr6t28IO%2BRUQIhAOXrE%2BSPu2UapG0MYc7ldmN34qMBlrcpm0wnnRKuwH%2B4KogECJn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgygBwlisL4fdistm%2FUq3AODEU7xtoc2TJNZnwLlU5TfXUr4fSJgPPXJpwllGFB8gnahRaC6jSK7OpOJl3g%2F25wzLh5sv35c2R6M9k8gdxPhpfIuPyHBizIKkr6MEwlSYLORUcPNmVq2SIyaJK5iNY4Of9UCjQSmNPW4t3HFNjETKSIyH7zmTBKABcpuwcFUGSWZrstbJBS%2F1SuAuAV%2Fc%2BA7SIMadzeMPYgGordyL2YzSZ%2BIb8CIWW1%2B7g16mNMdTDZjaZqCf31q1C3ENfO2D2D0RdBHSLmxmHrZpaFjHmPVURymJHvx1Pt4uTXgLtBCGhQstdHj1dFS2x%2BfT7JQ0svsls9TRrR54pY8GSEeBlFlM3LFlOHtqOH5O2bhGQfGJcZH9wtz2CajMplRLBvJIY%2FltsQbRZ%2Bzd%2FCrRqdDsgX574pkpJsiWxO1S5SjeyMGxioD1H3XrB6HjwBJE57wddSwB25yuLCSSWabp%2FE9GM4EDw2iP2tWHatgio%2BvJm44iwlrFZgG%2B0M8Y9Lz9Gz7vJWc4z9k4AtI%2B9hZf94HMhFY8Ex3ZB5JmqETbijgJzi4wTuR7jkkFURv090i4q0W9Yg7TKyMdlZW3Agi7RVDxb0lsW6DrYytFrFCYNd8gBvQdCnfO2VfD2%2BYKz0X8jDozbPPBjqkARmjoyw%2FyvoJQJRgOZq7nxjQzzi97n4V%2FYRz0VycZ%2Fvz3jINIgViXgd9gcgyW%2B5D2mCwXJCcjLRUIrUYrZMYlZ%2FPuIQ%2Fvl86WrbCiJsh8parITLCoEoP1Zbae3h4vjEWrxQIRrp2N9FHKseyfKUIVXzj4qi4p%2B1cbCQhlnwOgqVbbjSGvS5ZkdJY4OMA9F3zBSkzIgoK9Wy5%2F%2Fml1G0bbT0qwgYT&X-Amz-Signature=aa4ba4c810467a23670f217e7cd4ebb0e9332325bcf08109c9599073901fdf62&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665PVAUH5O%2F20260425%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260425T162624Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEND%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCKcuOpL3KyA%2Bq4CJqBfJLOBc8UyamPhNGr6t28IO%2BRUQIhAOXrE%2BSPu2UapG0MYc7ldmN34qMBlrcpm0wnnRKuwH%2B4KogECJn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgygBwlisL4fdistm%2FUq3AODEU7xtoc2TJNZnwLlU5TfXUr4fSJgPPXJpwllGFB8gnahRaC6jSK7OpOJl3g%2F25wzLh5sv35c2R6M9k8gdxPhpfIuPyHBizIKkr6MEwlSYLORUcPNmVq2SIyaJK5iNY4Of9UCjQSmNPW4t3HFNjETKSIyH7zmTBKABcpuwcFUGSWZrstbJBS%2F1SuAuAV%2Fc%2BA7SIMadzeMPYgGordyL2YzSZ%2BIb8CIWW1%2B7g16mNMdTDZjaZqCf31q1C3ENfO2D2D0RdBHSLmxmHrZpaFjHmPVURymJHvx1Pt4uTXgLtBCGhQstdHj1dFS2x%2BfT7JQ0svsls9TRrR54pY8GSEeBlFlM3LFlOHtqOH5O2bhGQfGJcZH9wtz2CajMplRLBvJIY%2FltsQbRZ%2Bzd%2FCrRqdDsgX574pkpJsiWxO1S5SjeyMGxioD1H3XrB6HjwBJE57wddSwB25yuLCSSWabp%2FE9GM4EDw2iP2tWHatgio%2BvJm44iwlrFZgG%2B0M8Y9Lz9Gz7vJWc4z9k4AtI%2B9hZf94HMhFY8Ex3ZB5JmqETbijgJzi4wTuR7jkkFURv090i4q0W9Yg7TKyMdlZW3Agi7RVDxb0lsW6DrYytFrFCYNd8gBvQdCnfO2VfD2%2BYKz0X8jDozbPPBjqkARmjoyw%2FyvoJQJRgOZq7nxjQzzi97n4V%2FYRz0VycZ%2Fvz3jINIgViXgd9gcgyW%2B5D2mCwXJCcjLRUIrUYrZMYlZ%2FPuIQ%2Fvl86WrbCiJsh8parITLCoEoP1Zbae3h4vjEWrxQIRrp2N9FHKseyfKUIVXzj4qi4p%2B1cbCQhlnwOgqVbbjSGvS5ZkdJY4OMA9F3zBSkzIgoK9Wy5%2F%2Fml1G0bbT0qwgYT&X-Amz-Signature=aa4ba4c810467a23670f217e7cd4ebb0e9332325bcf08109c9599073901fdf62&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZQS3QNPQ%2F20260425%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260425T162625Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEND%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIBFejG1gCP%2BwFGT0fLzxT32cBvKOoY1h8pbjqGla25H%2FAiB2LG2TVDp6daNf7tVgeSqTld0iBfG%2Buux8%2BR8TOB42sSqIBAiZ%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMs4llo6a0IBlqxUsHKtwDSECYPcpuLphcMQyGHcGDP48SfEyOkeo9oRwtADlfuyiaedwFJJ2sGhmZkMrQZYkHr0N7wyds2HBfV%2BMVSVlwcAbW7fMgmMrYPjxx2qTOxwM1o7%2BfMVNOa7XWp8nIO9RjutWumUCHug3%2FVxjfX9ruNkZTKfZLq%2BW9PVRoA5Twqo7c3tHjCKWdbROAT1pYtYOLgMOFw2PYcnAFb0ssjhzI6npBXCRSWsZNonQ8xNfupKQ331C1sFbUIAYEHlxI%2Fa%2FZg9pTfYJfl5hT8sYOSvDLZFTZnrz016XOOg61wz8nOP8QRrTkMSzO0z8eko7wjQNh8u%2Fw5WpUYuIF3Cj%2FgdTlcaTugQtWFvLi%2B9aeGB9OIiadVQAz7s5x7UjbHGTrDudr5FoQFHfqe374H8VBvF%2FHZyrlW9m38gHg6K4oZDpQZPTAg1VV2tNXgiRHCWDcBacZXLAnO2h3RgOKpjChSOFKuLN00dDl3JnNxgY052nnckwIlPSSdEN7VaSqY2ZmRDfXw5B%2BCc%2B%2Be7hPioLRNdMpawXFU7FGToDzfPSYXda%2Bfl7oJ%2BSrxsZ0zQLiOqSHxLgLyDUUupLEP4r1O%2FU0TU8i5T25mXXd8tzTZGxKEjdiIc0F5De0xB%2F%2Bk%2F1hV7Awp8%2BzzwY6pgFyT1RzFp95y6vbPI21bRocoLfObLnGPRfl8dK4rDhg%2Fzuz%2FJKmbU10Kd%2F%2F6FohsU%2B8MmQGZQ7B6FZioFr9dQjKkHpyqLgvow8HgccCcmCawQMaW9TsMAKmV3ZlcM7OYlie5%2BfIiQgGtbCN0LBjRqCBuMfdf0y9OgVYE0LWSyoM1luu9fqkhO6txgr0VKpioA7ElqZSJDTRYfOemaFStM1O50vlIo%2BU&X-Amz-Signature=8bc54fc53c92917c6b35ed16c8c89bfe15deecb9e4254ad634410991e35fe490&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YYMMSKU5%2F20260425%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260425T162627Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEND%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDWUQSLIVzubM%2FTicuxFAk6tq7zlQjrhjpBwCm7CnOLBwIhALdQ5S4R1QczhcpBqf2LU9dDLJLs%2BSj%2FC4EEaWkn5AcEKogECJn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxILySuuNy0LGwy2tkq3AMRq1nP9SQwzNQ6vLv4GmZK6ZLNUnPD8x7XZuYurlQHFfh7IQ7X9ejWBoMu%2FGOheS69jZJ7D1QFz1fyIZH92xjZ23P%2FIt8l7J0JlasEQ9m0TAw1SwJWbS81Cfa9J%2Fup%2Bke8Svv2n8J5Ba1Z1bUppQ7R%2BbqZWLQ545pr%2By7lOe51zDRneDg5ULB6TkLBGQE06QMn1k1BV2KKzWICpYlF0S3TxtnmREWA227NLVpAdzMq918n%2Boc%2FPUS9IQTxvo2ehtRldU7TE3Uwujj8XTxBSsMwP7xa5WNH7vtrgsQvJWl5VAcNS6Cp%2Bij%2FVZTOdFej06dKbJHSWQYEKhPpxQpnvDTbPhIuimwIo7B5CrTUO7P%2Fd0RgB775e5Y4Jlpwz82HaN3hhYMr15Wy2H2z%2F9l1xLYUbaVHsS8I%2FH4PQ2qjiI9lBGUp8M5WOuDbu3T%2FTof7txDanlapSkN29A7hqIvz7OYkwyEWKaJ4x2vN1%2BRPU4bDgXZt%2BxtCll14HvBEVsYnzCdc%2BAU9M3gzsk7LKdGw1UqO3%2BZ4cvOtID7t7uCq53np8b%2BGL22gA0mBMOTor4OUWSSuRHaxfwpmL852B2jB%2B9bbVSai8iSInTlYLnNBOYF6IBbaIwa%2Fwuk0%2BKkQiTC8zrPPBjqkAdnH82pB2BFcKoVC1ITVNCtjXb40P5vNuxq5WRFAWzvcpgp8UbvsK03z9AITJpb40SdKlxuaCLhWK0VDWmBNGUWJnj53xPcZD2UL1mZkFINhx%2BoAsc6Gvi0GprYN0%2FVO2jua4DJq2as%2B%2BA3YSziFDad7KsdYUqMFrgGQDN6q4Is5zpMJYWq2sFJn439AMgqaXSRxtlQgQttZfskGPqvhr1c%2Ft07d&X-Amz-Signature=58dd9a3c045afcbb71cb89ad7acc9b734f3010e1b15cf1157c87fd413b426b5d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YYMMSKU5%2F20260425%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260425T162627Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEND%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDWUQSLIVzubM%2FTicuxFAk6tq7zlQjrhjpBwCm7CnOLBwIhALdQ5S4R1QczhcpBqf2LU9dDLJLs%2BSj%2FC4EEaWkn5AcEKogECJn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxILySuuNy0LGwy2tkq3AMRq1nP9SQwzNQ6vLv4GmZK6ZLNUnPD8x7XZuYurlQHFfh7IQ7X9ejWBoMu%2FGOheS69jZJ7D1QFz1fyIZH92xjZ23P%2FIt8l7J0JlasEQ9m0TAw1SwJWbS81Cfa9J%2Fup%2Bke8Svv2n8J5Ba1Z1bUppQ7R%2BbqZWLQ545pr%2By7lOe51zDRneDg5ULB6TkLBGQE06QMn1k1BV2KKzWICpYlF0S3TxtnmREWA227NLVpAdzMq918n%2Boc%2FPUS9IQTxvo2ehtRldU7TE3Uwujj8XTxBSsMwP7xa5WNH7vtrgsQvJWl5VAcNS6Cp%2Bij%2FVZTOdFej06dKbJHSWQYEKhPpxQpnvDTbPhIuimwIo7B5CrTUO7P%2Fd0RgB775e5Y4Jlpwz82HaN3hhYMr15Wy2H2z%2F9l1xLYUbaVHsS8I%2FH4PQ2qjiI9lBGUp8M5WOuDbu3T%2FTof7txDanlapSkN29A7hqIvz7OYkwyEWKaJ4x2vN1%2BRPU4bDgXZt%2BxtCll14HvBEVsYnzCdc%2BAU9M3gzsk7LKdGw1UqO3%2BZ4cvOtID7t7uCq53np8b%2BGL22gA0mBMOTor4OUWSSuRHaxfwpmL852B2jB%2B9bbVSai8iSInTlYLnNBOYF6IBbaIwa%2Fwuk0%2BKkQiTC8zrPPBjqkAdnH82pB2BFcKoVC1ITVNCtjXb40P5vNuxq5WRFAWzvcpgp8UbvsK03z9AITJpb40SdKlxuaCLhWK0VDWmBNGUWJnj53xPcZD2UL1mZkFINhx%2BoAsc6Gvi0GprYN0%2FVO2jua4DJq2as%2B%2BA3YSziFDad7KsdYUqMFrgGQDN6q4Is5zpMJYWq2sFJn439AMgqaXSRxtlQgQttZfskGPqvhr1c%2Ft07d&X-Amz-Signature=368471f6e109fdd3ca9ca6f0b652d5faf093fddde564b1d883b35de2c910d1bf&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466X6R622IB%2F20260425%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260425T162628Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEND%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDAoMJoXHRub5weHzoQOnSaEK3gCLfjqGZQbivcxdFIUAIhALw2ccbyhzvFh0k3Qdid9X%2F9EGcGMYN0G8Vdiu09qsz8KogECJn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzOWhrr762WiSAGOYEq3AO1OpWtIr%2FgUFQCFqHWx65IpDhJ%2FJ4iA2g0Sdu71TnJwDPmcUcx6N4dLuO4pQkkGpVAW0pt0fk3yXIaIMaxKjQjLhH6OmNJ0maucj9V5oJRdQ0HI%2Fu8EjTalLdkP4Bqmrxnvw%2BI0CtOyV42ejcrXCuUqoOOdT2hmcI22Pljye6MIZDGU7uhcY2tP7OQg9EMTHDPqNVHnWBk6Q6W44%2FR%2B7zwoSnNekQHC4g7owKjqYk8%2Fp5sK1sQOcfgrq6zT%2BmU8LWpBXpFKGwhzAI2PHCcmB0tUbqOHxzOmNP1UUfBaJlEKaayro9aEMA6sXioyw7HhAVM2XOA79lmF57nryWhiyjEf1Hdo2F0WqTvfmBTNShiHDWf8gFQvVQwi4R97UUp8YSlsVeFv0Oo5MU69SgcPE1BtLodh7mMIUHIQceKk%2BORS0WDnwONUaPj2YlAfSnETFGNzaw1wx5qtqWpaj6G6xNicgmthfN1TmmE49GdkrJ%2FSyGILzgAncPvGh1uyh%2FBqI7pygGos29NKw7JjxJM3tGKmy7ERuY2ZJT5CC%2B4WKnmZ8bjVc3LP7fIOkRO5lROdUGbR0FFcaHtMjhukc3aOm8liviDNZ9nD9vsFKUpqExfZ0I1gIueznmE5HNZHTCR0LPPBjqkAXSrEKaYKXSJvX2OzPfHFiH041t%2FO%2Bd1dqu%2Furl64iOFnvIZwr5U%2BQyNQHJjuOgdMy%2F5r9moKGhW2C43VBFWGOSONQoakOxedoNp6djvZTnGXgihDe4R0A6%2FrzOe9qzI9jx1nr%2BpdpoLvDM2eSV9X67xuHCmmwnvJvBf0rOWSRLH%2BgknKiJRitk9Ish4hnZ0dYKZQV4i%2Bj3Mx%2F4x7mUy6QSxedCY&X-Amz-Signature=f1bee1a70d0ec77d3649997c9c702a50ee367e6f9c9ab30419652902226cb5cd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662XES6ILB%2F20260425%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260425T162628Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEND%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIF0BYNBCvomKU0rZxnbmOIDNZpHM8AUJhVXHTpjFzSUKAiAl9jzKS87gK6rnVYHcvkoZMZl1ED%2FGrqPyUjPVexzcSiqIBAiZ%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMHm%2Fz3AWy0LwS2H2gKtwDNH6NTIzJ75YME77TJj1JHK1A4lPqivu5ULwb5wfWD8vqXdfEP3qtIyeUwPqsMTFzt%2B%2Bfzory0KY%2F7HllydFDlb8BZcDjl7GTDqBrQ2FCnN%2FUdChtEMWj9VwTHO4Flpm8H4MawJvmahMlIjxxlNMPiWu7rlKrvo0q3rMJj%2BuAguL1DTKf1Fme5FQSN%2BfJpq24zT7%2FmUV7wIDhuzQhHgDd74h9eXpGzjigjbSEJg3mup5OB913uxmW4ad2Qiue4CYKRTIjMnDC4SsVShQsj2zNE4QYBi4g1INokXIBAhEk%2FwILkf6oEZcDfPdRMpsEraSsROAfr9kD3ZSwtzXnBVN83h5VZYJcKwfxwCBQCEnlKIT3X43Wfp7kOoVdXADdnfuBQ%2Bs7%2FdyNIGDw38dDIN00Niy1u5QptSLMWG2fZ2WiG%2BbfrRewbxrHCDoux1oSrh0BupA0syfyZcnnNU0MGOu3kOsgvpOHpcmb0m%2BqkUu6F%2FrLKlpkMynXOk4OOGjyMV09mvQFVcpHj3qAHtLU9x7Lniyex%2FcRgmNxadOVouPnArTvP9fiae39U0jbBXm1t5BbctRrS8MOuokonmaja%2Fbm70y1zuhKQ9JLd9xxIxMkSODtgxZrt0xFeSLiI1AwvdCzzwY6pgHht9J3wavrrP5zPz0W3sQ2emCOY640Uwqrwfk%2F6IYbW6x1SYAlRj3vq%2Bb22VXzIgaQLvoqDbAB5VHEKkBTiBKxKL78FHe43QN8jVTfF5YZuTKMhxE5z7%2FL%2BfdoQyXJlvXTle4%2B1S74Y2AOohKdSfKvaiVDeAAf4O4FbrntQb%2BgH%2Bsffqgq3KNg9pYTrJVJGjwY80Jhx7rA00xjy7J9SlGsm2rZELze&X-Amz-Signature=92efd1f13aa01d2c6f13023977cd8c69db21570798d3cb6b365ca748a9d98e61&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VBX7RNEP%2F20260425%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260425T162629Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEND%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQD3i8UCXZloRo6rFhl3QZPqWOmRhKKVKBpgUVqa8IK%2BOgIgGJdt%2F9fgnRLiEhgNHLp3BsHy0bG63TbHmw3IBBWuyZEqiAQImf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDK67LfFrqyRJEZRw2yrcA6MKMitci7LeNsam1Nc3vZFLjjjwJZoiXXHP9bJTty6WBq%2FRvSkRRC3U%2BWa%2BGqD73JI1XvegJvR4zCbtF7fam1WXLCMBsg%2FFaGO1YKNicnIyt0hUcIppIxY2iApuYnkFnRodu860g6xt5IvVwStwXQM90lGT0zqWqNJdDCMWWEoEzmDRyzsqXx2V%2F8Ke8FRM4aRKdJpxqZxlCsxqK1jpH%2Fh88u2td0%2BQ46R2HO4HLFgYxw76erylGbIis%2F%2FO%2F06F1DR2vyMKpEs8pVsa13CE7CFG7ejzhofsx4hJxAMS3T6yVqFruYMpyKgPr%2FUwc6zLhbAit%2BfM9ECOF8HNia%2By1b2B2kfUoFqnXuvpeP1FnTIUJbLxeP591AcqqBV7HtsYnY9oQsKjuw7zCjTQfOC4XbsXApK4acBRHykjkMqM4RzlXkjwy8DS0B3%2FyrlJYQqxey5zzQAvO8e7scKxnTssrTefvbdJ8nwZJPTrktWKD6%2FExXDR%2BfSfF4v8Adl8UXQs1YZvyKSqaLCefng4OzACh5nlusyIoVc%2B1J1bfHqJcDF3zt0G%2FkucmjkS9oaa451a3GPBJPxXsimlvN77u%2Bi7R%2BM%2BjTtOtr1lLUsYASlaMhS3AkuTwF4875ApQ2yXMLvQs88GOqUB6E0XN5JHBK%2BQyWuUP%2FVqcKyaRwj9duDfhjMZORs%2FMd8uXWhLysJPNRCIWI6qQ8VNEJ%2F7BjgnYgD00hpvGs3N8prsQEqI3htXf%2F8dBDGLS7J%2FM%2Bipx90x%2BaIPs%2BoDkxGk5HcFxORytKgFG%2Fg10HYoE8po%2FdudaS1JwNoXyTTf6AToeyPgoIUzkhuAVC7aQ9pzzOwVOdx2srcFOARzimVWRYPxOHNO&X-Amz-Signature=3edb91aa2efb72d824da05464730df54bf3050c3ba9f55afad275b388bf5e34b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZRSQHPGV%2F20260425%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260425T162630Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEND%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIC9c5DN4%2F935r%2BVBEPFup9eKI95ZpIRf5MxabroFgmNbAiBGZmq3xxyrjcqz%2BdyLOk3TMcYDUt25c1ou6wGoK%2BYt6iqIBAiZ%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMsP%2B3PBdQFo3j7XoyKtwDatEJcv8xKjsyOG6CvUhDtLBwtGExAD9OXwzDu7O0cb3f3wOXlod7IKp5uMJG8whLGrorbCqXhxe6Iv%2FN77flc32Zu8B7LaJJ%2F4hgriFf%2FWGC7zfhiV%2B7iE9uYMB35CV1o4iBReBnVs296QZnfiWPoHF8Dhc%2FKOC4GS91TtRfz0%2F5omYXwqCuGUf%2FzG7%2BiaqPp%2BkvweUhLLGwaXvdivK4Gy87Qlh9qQoHHypT1QQ%2F9sbqM%2Bbh%2FD8Nd1lx3DQipCPWugia%2FvzfcU6LTIXT9LnvyL4GCR5RxuChDjUosNYVZzC0NefCbKFGvHzTWn77Wf4%2BqbuHc5YlW68uA%2BEWrjX6608GoyX2GfdmELxtyrUISgqTaZeaOkhH20KimkMQxUAErD%2B3l7NdFHv6dUx3yKeE%2Bo28XP1MK1ltLk2dlKJzozWDdGhH3F%2BKavGnpv1j8HQpWBgP%2Fmdz0ju0EFo02gyLdgfcrBJ%2FOvwF3Tbkc6WowIbsYV1fiNiACLiCQfyTzv2CNlqU%2B00MH4unQgIFEVupwh3%2B4CPAzBTOTQFnPJLfev5kePkpBHhm2Nf9Pe6wbKEjuNVRgpXRf9rEfEdZJmCg%2FbMM3QgMvlVDdacJSFCwr%2BSVyttOgLQaseuQ8Mswzs6zzwY6pgHnR1qi6M1iYe7YOIBKyPp70YbuOeXYk8InSsXLmZ%2FucQIAApsFXj64B8k9gyhRkKj00v5KuDZU0S4YFUuxklnRVTOHFcJjuUJmxMrx0Rf8oIAwqn9JSJ1CLIXq6JXEeXcZEMJbbwOYMmJlt8nr3ccMPBZDYNO3oAfB49VIEx3G%2Bw1svl1mOprDtA0q%2FHprI2D1wHN0RBKZl2XYrx7kC51a1XRHF41g&X-Amz-Signature=03b0b612819cbb2be5c1394b96a029843fdf6c9fa227213fb5b7a273c3ed6feb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZRSQHPGV%2F20260425%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260425T162630Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEND%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIC9c5DN4%2F935r%2BVBEPFup9eKI95ZpIRf5MxabroFgmNbAiBGZmq3xxyrjcqz%2BdyLOk3TMcYDUt25c1ou6wGoK%2BYt6iqIBAiZ%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMsP%2B3PBdQFo3j7XoyKtwDatEJcv8xKjsyOG6CvUhDtLBwtGExAD9OXwzDu7O0cb3f3wOXlod7IKp5uMJG8whLGrorbCqXhxe6Iv%2FN77flc32Zu8B7LaJJ%2F4hgriFf%2FWGC7zfhiV%2B7iE9uYMB35CV1o4iBReBnVs296QZnfiWPoHF8Dhc%2FKOC4GS91TtRfz0%2F5omYXwqCuGUf%2FzG7%2BiaqPp%2BkvweUhLLGwaXvdivK4Gy87Qlh9qQoHHypT1QQ%2F9sbqM%2Bbh%2FD8Nd1lx3DQipCPWugia%2FvzfcU6LTIXT9LnvyL4GCR5RxuChDjUosNYVZzC0NefCbKFGvHzTWn77Wf4%2BqbuHc5YlW68uA%2BEWrjX6608GoyX2GfdmELxtyrUISgqTaZeaOkhH20KimkMQxUAErD%2B3l7NdFHv6dUx3yKeE%2Bo28XP1MK1ltLk2dlKJzozWDdGhH3F%2BKavGnpv1j8HQpWBgP%2Fmdz0ju0EFo02gyLdgfcrBJ%2FOvwF3Tbkc6WowIbsYV1fiNiACLiCQfyTzv2CNlqU%2B00MH4unQgIFEVupwh3%2B4CPAzBTOTQFnPJLfev5kePkpBHhm2Nf9Pe6wbKEjuNVRgpXRf9rEfEdZJmCg%2FbMM3QgMvlVDdacJSFCwr%2BSVyttOgLQaseuQ8Mswzs6zzwY6pgHnR1qi6M1iYe7YOIBKyPp70YbuOeXYk8InSsXLmZ%2FucQIAApsFXj64B8k9gyhRkKj00v5KuDZU0S4YFUuxklnRVTOHFcJjuUJmxMrx0Rf8oIAwqn9JSJ1CLIXq6JXEeXcZEMJbbwOYMmJlt8nr3ccMPBZDYNO3oAfB49VIEx3G%2Bw1svl1mOprDtA0q%2FHprI2D1wHN0RBKZl2XYrx7kC51a1XRHF41g&X-Amz-Signature=6e46c5519a8c3dbab292d7f961e9e54f3454baddf073666c3a9aee48ab870789&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466374YUZHT%2F20260425%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260425T162622Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEND%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDz9LOIDlDVkMPZCTHwS9uRNxVknLcaLRc5QqQecIVWrQIhAIkYPKjIPOjpu91bO%2F0sCI%2F1iEpOpPQ0n1RlQPclg13IKogECJn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxR%2Bwn2i1SVBri7L1oq3ANwonj96bOED2KTHkQWL4BG2%2B2iJy0Dip6qnZxp%2FcSxxG%2FP%2Bs1kt4toAqi2qEcvhY%2B3TqKcP3Ae597SGHgdApO9%2FPqbORDzWE3jwWyLpuRDn%2BK4Rj8PV80rmNO6Q3Qs0cb9J5fWuDKdYMc1G6hMRxBndNXvRLA2i5Mtc7mq%2B9ZwpKzXFsEStQXFOvLeLr48altBEhWb4dDj5fvtPk%2FSFsvfPaBZ0JaKSXjCSI64Z7BcStubEOHvbsaVfUGbBdb5iilaWzc0ZDwjn%2BLuob6RdGs3j08UhZrZ6BpUddRJ4nJX2%2BhCNCLRP%2BnAhYkskX%2ByGh%2Bu4uPDD5rwvR4IiNqB41InXYoc56eNtWP8y3Lvw34AqrJkeuzJ6zs7NgvMQsaV9ENfJFex%2F%2BC3aSQMR6XVl6toAaKtueefqSeJ8ZguVP69JRSRLjojrKWNKI2FNgzN13wnW8Jot91MrJs%2BSsbo39ivSEJTkp6tRz1RBaPai%2BRCadvc278ycVF%2FCzs1i9lW7Y%2Bw7w3eCO5Inl0Uo8kkVMOyQyqTfGJ%2Bqn3yLZ8lX5Olra9TY3JPKzdDRXthcCTPbOiqcGu4t6qrhwVpQxpwRR1e2zB3PSd3Ri66r4tEj698iopXsA5xlfWtkuG02DC70LPPBjqkASudaQS53V0DhFWSHZ4UqKS5JdSpfh%2BF6RUJD7SJM%2FdhA988RRdrVMLZDIPtd%2BpEVrSBlh6iECvvM%2FR7Btj4VG9%2BwdxLSmr7pO0ErrX2f6Vd0IKIZxBlLgqsHUHUC8e2NocZbU%2BuXy8YwgmIq6f7avZ2i5Ln%2BVY0ldba1KjDl5Fjfq62llLd5Xbmh4%2FKos0y%2FSKEFhatITDBX6RKfsQt9NJX%2Fv7r&X-Amz-Signature=f1ca1f5b8207b460d1f25ec8fd920e7f1b0a5c3dc07e4b3e8db111363a854e81&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664OF7HY3Z%2F20260425%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260425T162631Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEND%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQC0LNxhu0D%2Fc8Nm%2BDI1ch%2BsfKhsnbVUqWuMVCGCuzdS1AIhAIWxDMGdnwVqd%2BS%2FRjHycfStYALlSVoPweQk1y2QdX5oKogECJn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxKnKYSF97ZXbqRLJwq3APYqAF0IAbVASGvUD6X1nqdc5mGnJHe4Vn0G3w2oPoUNiauK0S53QzFmOSZmJUvQKfFICsippbt%2FEDVuSGpzqvL0wyy5Qb%2BCPqyN63xM4qUo3Kn1B3zWzrc5R10X8FyRRc370AMzODSad4a2D6mUzPdjoi9RsDPNDdPxLql4CbTC2get37cix3rN1H0nZQD0IfXVtHpc%2BUdL9RzjRaefYpPVDnKlNsHSPMoZFsrtrbKGNXyVm71tWEhorqFqVNyxJ9rsVxSx%2FGPEsNf%2BtYzBDYCngzRQm9Z5oi5yzcyK%2Fr74oM9w2UuyGYkVvML87VMfe7kk5FaOLbQuNGtkWyf8bx%2Fm0%2F%2BZI2DzKspks3mTlgwlTXlzDDmIwWKVz7CgxoD4hrt%2FTwPmIcrRrdveGqYwyhTaM06gSqs7oiIBOQ2b%2BqMVRWgcvCmzQ6G5WxDX4zNITR7X3IVXPjaiA2TL5S%2FE9MfaPu%2BDNuldQ3WIby20BawdDFe3l05ZgeSvGwbJlbdkcEtpSQ4rRA3%2BYCaU%2BNYaGKddLQyLrIp%2F5gGjw9Zf43Bp5T1HZYMcDHpymPJh5VoIziavzDAeVrr3%2BGAYwulT%2FhGZKc%2FQxKMe0YHruEVBrboYkCaalJOi5qCvmUdhjDLzrPPBjqkAaFbu%2Br2sKmnBPaiAew4PNwgqL4w6Y2%2FhXZEh2v0vojSyx1GH0HPfjNzQw9UdYbw%2FqmI2u6%2BxPY0jqAbSbceLX1mNkKhw7YnmKVxRmRuWMxS81eiXjsGMEWNo2k%2F0CH9EmYoRn70erhkcGXxHoGBfcCF6rezDP6xgUfBCgm8TqDGSfIho7yBz2YNpiy0B5EfVUHhXm2bdMA0mNtBYfDDdc%2BJj%2F5r&X-Amz-Signature=3ed73cd1c4bdebc07463dfe770e8f785d343e6c8bce47b07bf9f69e38850ec11&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664OF7HY3Z%2F20260425%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260425T162631Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEND%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQC0LNxhu0D%2Fc8Nm%2BDI1ch%2BsfKhsnbVUqWuMVCGCuzdS1AIhAIWxDMGdnwVqd%2BS%2FRjHycfStYALlSVoPweQk1y2QdX5oKogECJn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxKnKYSF97ZXbqRLJwq3APYqAF0IAbVASGvUD6X1nqdc5mGnJHe4Vn0G3w2oPoUNiauK0S53QzFmOSZmJUvQKfFICsippbt%2FEDVuSGpzqvL0wyy5Qb%2BCPqyN63xM4qUo3Kn1B3zWzrc5R10X8FyRRc370AMzODSad4a2D6mUzPdjoi9RsDPNDdPxLql4CbTC2get37cix3rN1H0nZQD0IfXVtHpc%2BUdL9RzjRaefYpPVDnKlNsHSPMoZFsrtrbKGNXyVm71tWEhorqFqVNyxJ9rsVxSx%2FGPEsNf%2BtYzBDYCngzRQm9Z5oi5yzcyK%2Fr74oM9w2UuyGYkVvML87VMfe7kk5FaOLbQuNGtkWyf8bx%2Fm0%2F%2BZI2DzKspks3mTlgwlTXlzDDmIwWKVz7CgxoD4hrt%2FTwPmIcrRrdveGqYwyhTaM06gSqs7oiIBOQ2b%2BqMVRWgcvCmzQ6G5WxDX4zNITR7X3IVXPjaiA2TL5S%2FE9MfaPu%2BDNuldQ3WIby20BawdDFe3l05ZgeSvGwbJlbdkcEtpSQ4rRA3%2BYCaU%2BNYaGKddLQyLrIp%2F5gGjw9Zf43Bp5T1HZYMcDHpymPJh5VoIziavzDAeVrr3%2BGAYwulT%2FhGZKc%2FQxKMe0YHruEVBrboYkCaalJOi5qCvmUdhjDLzrPPBjqkAaFbu%2Br2sKmnBPaiAew4PNwgqL4w6Y2%2FhXZEh2v0vojSyx1GH0HPfjNzQw9UdYbw%2FqmI2u6%2BxPY0jqAbSbceLX1mNkKhw7YnmKVxRmRuWMxS81eiXjsGMEWNo2k%2F0CH9EmYoRn70erhkcGXxHoGBfcCF6rezDP6xgUfBCgm8TqDGSfIho7yBz2YNpiy0B5EfVUHhXm2bdMA0mNtBYfDDdc%2BJj%2F5r&X-Amz-Signature=3ed73cd1c4bdebc07463dfe770e8f785d343e6c8bce47b07bf9f69e38850ec11&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VFO732XV%2F20260425%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260425T162631Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEND%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCUizx4CqFweHCYCsGXZKIuLQz2MFfY1ec%2FwSYO5AaHAwIhAPHBdivJOnwZfM82iEy%2BCEvqV7cDwuuLjsOHqf9J%2FV0TKogECJn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igw%2FXjkO13uFrub%2Beu8q3ANMJhD%2B6bzbB%2FOey5uF4r0bEkZakrofj2KL%2ByW6hr59TP52nOW2s2OgOpi0q6n1azHX4knkiHCxMssCXkWWIlWlBWhhiFuIfVJxJ18j96bqTURDGl4Y%2FyHQr1Z50D6%2FFNq%2FE8kh0cw6MM03W9OxgItuTazwLJeNW%2FmvFmMZuHfrty2wMdgtG168wfn9QYJvr43O2iOjDpVgtxxlLfm0J0CQW5RSKXjVbrZJMRyp8N3%2Bibo71rHh6tcz6TL9hrGb2a6sMfaINgHUFT%2Bq40enA%2Fe5KtVKcx8Jy9Gz6cPl4CeMgpg4ZXig6gbrwVMQZtS9Cr2ApyZu4aef2cM06ro2dcrLhqjso9MIkrUbCzwRdx6yh6wWRQw0icpihjlCzuQR1fQpuhajmnkYiWcI3f5tfhswj5oIDWd951qavMSGbhBlo6LjcXHcIu4nGjXw7eMm7RGdBP%2FsOYa583rPZ3hNekyi7hXbia%2F%2Fur1vpX3cw3QPNQF9VKiUtdxEOG5kybHKI75txONgAR8R7agjmVpuzIrEQub3hzoA%2FpaF64qaDJWF75Q7ggvIcZA9Vh8%2FEB5pAYqHLWiyWspDFruOc6CBRxDuW5giTNJeIn3NMj0IWgl1e9%2BEiGuky0sx2LEu8TCIz7PPBjqkAbNiA9Dhsf53hwm%2FrFDG5a9TB5y%2F5A2St6x3R9PDbariB%2BCcEAHVV7nX4QFrGM%2BEgyOC%2BAGBwXS42wvQ9zLbKi7GXXJR%2B%2FyUWQP8pzTmZo2QQ5gVKEdyKKfclENrqQ3pc8pqemCJ5KmF2qXKhmVo%2BI9Wz7gXPgNAv%2FcaF8CtwlN%2BuAOd7hnZej3DgaItzFXvAcqbHb9QkaDcmTKGBAb%2BJPSzWZt%2B&X-Amz-Signature=0de19109214d35c1012a4a27753dc10b90c3747399c0c8838fd61c429c1b7858&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

