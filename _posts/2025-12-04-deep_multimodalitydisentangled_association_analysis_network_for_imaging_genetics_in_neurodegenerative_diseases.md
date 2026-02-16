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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YVA75V5P%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T033713Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGMaCXVzLXdlc3QtMiJHMEUCIDFePCi0w7VhST5k1dOA6k5l0uAKEvs65b8IyV32suClAiEAqrXe6baNMsyCDOWN9pIgWCFRULy2oZmWL53F3Ha4BL4q%2FwMIKxAAGgw2Mzc0MjMxODM4MDUiDBjwFT%2BxoCd%2BfA65hyrcA4crOdbRSget8%2ButhqRBVIOdxtAty7PB5kgNUtNSdAqRope1Kflr0ogzE%2FRXRGmkZHTxTocLvV%2BjAMmRqT7YkHi3odIkV4lxkmO6Tg90GS2VYQB9SSpY9Lz2lNADb5yN5JARZqU%2Be5B1%2BUDMn433cIfItCA0%2BbyG4yyPB%2Belhg6aZ45JWEBrIXxLDfWi0c%2FJj8PYlLcrX8S6X6H7q%2B2MExTwv2KvpE8vQsSg1Zo7k7iI5K1kCznmeUlmeQKUfJ1%2Ffab04PQwXS05NAIWjUVyoqesomMGt8jnxdNr42SzEaOoVXH7RHBVI7q8gCRDwtG%2Flsy2Jg%2BzAwywHN0THkCzuuGI5QiOTXcwkhfYm2SgzNhwvvdNdl6m2n7vrdPezzgSBzwR9oExOc6r%2BPRuqvgr9vvyJv2mIShcQykMzELBgAgO8QrTLB1qRhaWM8G7AXPGcSZstdoEybZ8LC1%2BIUQN5KlWEhV1gjjgR1KSls27S12edlyzl9An7%2B40SvS8AEIH7K1kqpHiGYxP1RTMrWzEB1pmKzybJypKoThsDFO54fuvnal1fbZPqA3dTaHypIZtuwGM6Q%2Fp%2FU6j7SuokyfuqmHeAERUnqFtYu4lgC4Gu2eNnkW6QKWDDXGtfpooMMH%2BycwGOqUBfC5FDFLHvwS3mLKAISanjOnYhHvd5rbvhOPKAlSRIFzvg%2BePOalEI93jx77Aeyd%2BUW%2FpQzvqH9QZ5u%2FUMC5yYJB1pC2WamDC4O9VQQSH6HgK62FqD9J7NO8DYphVrLUkGPgpofZsl2qFG6abJfX2%2Fj5KaI5305h4WopTAserKyUFB66CdnOiYRuBXrO6SVxCu1yyxACFoREY7nH1MgHuZXovK5lA&X-Amz-Signature=75b1b606c158ef34d6f2b707ef10537492c993b7443502f20ad70424ccdf24eb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YVA75V5P%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T033713Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGMaCXVzLXdlc3QtMiJHMEUCIDFePCi0w7VhST5k1dOA6k5l0uAKEvs65b8IyV32suClAiEAqrXe6baNMsyCDOWN9pIgWCFRULy2oZmWL53F3Ha4BL4q%2FwMIKxAAGgw2Mzc0MjMxODM4MDUiDBjwFT%2BxoCd%2BfA65hyrcA4crOdbRSget8%2ButhqRBVIOdxtAty7PB5kgNUtNSdAqRope1Kflr0ogzE%2FRXRGmkZHTxTocLvV%2BjAMmRqT7YkHi3odIkV4lxkmO6Tg90GS2VYQB9SSpY9Lz2lNADb5yN5JARZqU%2Be5B1%2BUDMn433cIfItCA0%2BbyG4yyPB%2Belhg6aZ45JWEBrIXxLDfWi0c%2FJj8PYlLcrX8S6X6H7q%2B2MExTwv2KvpE8vQsSg1Zo7k7iI5K1kCznmeUlmeQKUfJ1%2Ffab04PQwXS05NAIWjUVyoqesomMGt8jnxdNr42SzEaOoVXH7RHBVI7q8gCRDwtG%2Flsy2Jg%2BzAwywHN0THkCzuuGI5QiOTXcwkhfYm2SgzNhwvvdNdl6m2n7vrdPezzgSBzwR9oExOc6r%2BPRuqvgr9vvyJv2mIShcQykMzELBgAgO8QrTLB1qRhaWM8G7AXPGcSZstdoEybZ8LC1%2BIUQN5KlWEhV1gjjgR1KSls27S12edlyzl9An7%2B40SvS8AEIH7K1kqpHiGYxP1RTMrWzEB1pmKzybJypKoThsDFO54fuvnal1fbZPqA3dTaHypIZtuwGM6Q%2Fp%2FU6j7SuokyfuqmHeAERUnqFtYu4lgC4Gu2eNnkW6QKWDDXGtfpooMMH%2BycwGOqUBfC5FDFLHvwS3mLKAISanjOnYhHvd5rbvhOPKAlSRIFzvg%2BePOalEI93jx77Aeyd%2BUW%2FpQzvqH9QZ5u%2FUMC5yYJB1pC2WamDC4O9VQQSH6HgK62FqD9J7NO8DYphVrLUkGPgpofZsl2qFG6abJfX2%2Fj5KaI5305h4WopTAserKyUFB66CdnOiYRuBXrO6SVxCu1yyxACFoREY7nH1MgHuZXovK5lA&X-Amz-Signature=75b1b606c158ef34d6f2b707ef10537492c993b7443502f20ad70424ccdf24eb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667G2V6PR6%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T033714Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGMaCXVzLXdlc3QtMiJIMEYCIQCv7UOMMnpFDyRyp9oxRI7KeItz2wfbTnEFPEZOe6wXUAIhAKBjE7HNunU2d87nMlgBiRyGRnShuT7LbPJC0xoE9tLJKv8DCCsQABoMNjM3NDIzMTgzODA1IgxI7wIkxiw1xukDbMkq3ANqg419fGRlTBNT9njVQ2H%2Bp4GLwraAaFNZh9c%2BV9PD24J5Zc5ggbmKx0G8tKoJUUJ5GkwYkdFsjBFLAPEf8y8S1SQ284XDFIsgHvMb4zEHBo4P5ijLdJNpeK3OkDSb2a9GQO8ElKrYxWVTc5Gi%2FZbtVGlR9nIghiom%2FRHbXWGWklfeeX8bfpW%2B8vFPph0nGEn9%2BGz9ZiPHeDAxLFb1TnjW%2BMArLoyjptSO8EOTNRY9vkePL86qJn9a3EHBmIdanVm7Su1KuNjvLJympwQeFNZTKn3A1wl5%2B%2F6QaLCgzOnVDaeFSB2m5QUoGqWrQle5QvUurtDjXWIXaxGsxDa7WcRcR61KYdKwyM7eDKZhSfz6uW25edbrXJoKom9%2FYzq09ql%2B4S2NbEHfb8qQAvlDtgISYmi4kHCIeivHdYEQPix8f85usCkqwP7br9CF0E7PC4vtrHi2o2GKrauDn5cAh3TVFecRUL42OyZKY89tVn%2Bwpx6WeMrxCaNeYeScGmIRmJUB4I%2FaNJGvnDBAn9sGK2iUYMWgulxu3b2kvkpYY446y7ydewr0EgLi2hJFEP4ZRW9cwP6g7snmp28nFXweXZY%2BVh6SXx7Z7yOe3IBABcLVspIvVs9Eb%2Bf3fOcVqzCC%2FsnMBjqkAV8oiXlWc3ENcbK9IXu%2B1NG1c6ic654FwQKLAwTujIj0IdbArbMHhoVQxdaTqoO%2F7PTuQxA0ljLtUX36w%2FOIwR8%2Br0VGoDFdALOsXXV8Gsr5MViodAwUVTd6lJvrwM%2B99joMIKXThwkI5dOwYA2MNPWEXrZZm5aiX%2F3pixJFs%2B3rpf3whmEXioeU1Gw78gPfyijQtsjDn8p50WlbCPrb%2FrD51mpw&X-Amz-Signature=14ad0982814e78753171217e229a504ad17da8ae6d134f769e3a289ac641bc8d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VX56K4YW%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T033715Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGMaCXVzLXdlc3QtMiJGMEQCIB438NBl4D1UzIw6sT%2F41ezvDRZR4IcAwkFGlegZU6unAiBwmaRRxA%2F61tydwNsBiAw5y5TuVkD5tUoPXH9oRGtpeSr%2FAwgrEAAaDDYzNzQyMzE4MzgwNSIMqWhY%2F8dTk793dlnmKtwDohJvC7L%2BGA8G0E3ml5tcANI49HO2%2FTF2MuuAdOtPIdQneDJyT8R6x2GwmvB59BfifpGx7jdiM7pUhvJZwe9m4IhdhqXEPKa2hO1XLnWgJV3%2BAekDK8dTzvo2ODK6BcXC9QkmyglvxqH04BDEuQ6jfHQST7rSLV3IdSRL%2FdeujIoTa3eDVDnJPVVRqCbm7YevScNMPJubMcQUkUqoo4x5hlNJljrLMStA5zfoywWba%2FOm88lCDRrNFdNpN1XaJjoj06I8dQrRVVGgmzWBRdDF8GB26WRTtHxzi7ekoU1XHnmxp%2FhjkPG5h6sMSA93AezIiviDYcL95s6BTrvqSffsQIi3xij%2BSCqsudNCZw5%2FDHvN6QjJi2wZMepBeBKVLchcp8dttIWZCsHSaelrMPXkFtrvdNZ7O2AGP6wi11q%2Bjdlw%2Fb7zcBF5Sjdw3EDIrwZhmoKW6dYLfwqoX0eWFl8PiFf7%2FlBcK5F%2FLhkaVhv%2FmwX%2FHo%2BS2xtaM9f4gQgyejHZeZb%2F1iv0qz2sOYY88HvE7NhXbRM5isHHJR1fBEDZ6MCVo4yaVvRRZ9Ha1LfFplez5qCogMdfsZXEvjlGarRWpBQuEyyA2nNMPfVVB1kyBOTR9ZtU0IL%2F0Y3nh1Awnv7JzAY6pgG9Pak825oomC6vdgK2V0c%2FAxifhNJmtLIgV9Z7Ou%2FUbrAVTBzaVoE%2BjHrlEZXsz0Rt8tH6qMp7tZp6WGKphZ99M6Rmw0hjCva7mPvP%2BS0jGUIlJq4FlOJSvpzsVxTa3zXTvQ5aXWJ2172CM%2F7pjIDYGP0Bx3%2FuZPmtCJV6DqWH4IJN3eV5LnXQU3AQoAPffYWjd1wRVgqxq3LfBw1f91WD5t0b8z46&X-Amz-Signature=202a16e2b0561539793c5b299ae15f979c588fbb9c39fa00878f596c1fbd72bb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VX56K4YW%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T033715Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGMaCXVzLXdlc3QtMiJGMEQCIB438NBl4D1UzIw6sT%2F41ezvDRZR4IcAwkFGlegZU6unAiBwmaRRxA%2F61tydwNsBiAw5y5TuVkD5tUoPXH9oRGtpeSr%2FAwgrEAAaDDYzNzQyMzE4MzgwNSIMqWhY%2F8dTk793dlnmKtwDohJvC7L%2BGA8G0E3ml5tcANI49HO2%2FTF2MuuAdOtPIdQneDJyT8R6x2GwmvB59BfifpGx7jdiM7pUhvJZwe9m4IhdhqXEPKa2hO1XLnWgJV3%2BAekDK8dTzvo2ODK6BcXC9QkmyglvxqH04BDEuQ6jfHQST7rSLV3IdSRL%2FdeujIoTa3eDVDnJPVVRqCbm7YevScNMPJubMcQUkUqoo4x5hlNJljrLMStA5zfoywWba%2FOm88lCDRrNFdNpN1XaJjoj06I8dQrRVVGgmzWBRdDF8GB26WRTtHxzi7ekoU1XHnmxp%2FhjkPG5h6sMSA93AezIiviDYcL95s6BTrvqSffsQIi3xij%2BSCqsudNCZw5%2FDHvN6QjJi2wZMepBeBKVLchcp8dttIWZCsHSaelrMPXkFtrvdNZ7O2AGP6wi11q%2Bjdlw%2Fb7zcBF5Sjdw3EDIrwZhmoKW6dYLfwqoX0eWFl8PiFf7%2FlBcK5F%2FLhkaVhv%2FmwX%2FHo%2BS2xtaM9f4gQgyejHZeZb%2F1iv0qz2sOYY88HvE7NhXbRM5isHHJR1fBEDZ6MCVo4yaVvRRZ9Ha1LfFplez5qCogMdfsZXEvjlGarRWpBQuEyyA2nNMPfVVB1kyBOTR9ZtU0IL%2F0Y3nh1Awnv7JzAY6pgG9Pak825oomC6vdgK2V0c%2FAxifhNJmtLIgV9Z7Ou%2FUbrAVTBzaVoE%2BjHrlEZXsz0Rt8tH6qMp7tZp6WGKphZ99M6Rmw0hjCva7mPvP%2BS0jGUIlJq4FlOJSvpzsVxTa3zXTvQ5aXWJ2172CM%2F7pjIDYGP0Bx3%2FuZPmtCJV6DqWH4IJN3eV5LnXQU3AQoAPffYWjd1wRVgqxq3LfBw1f91WD5t0b8z46&X-Amz-Signature=1c5462ab151801dc59ef9746f5356a2eac28e4fbc7d87a9927b4f426bfee16d9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TP66CFTN%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T033716Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGMaCXVzLXdlc3QtMiJGMEQCIG%2FmdiCN2E9iU2wI3%2BPv2fOGmWzQOepdZWnyW37zd15EAiBY9ndUyrLvJkmwS%2BPH5uCUk8cZBl5kXIa63bl3KGcpbSr%2FAwgrEAAaDDYzNzQyMzE4MzgwNSIMq%2BsJmhM%2BX7r7Gb1sKtwDKRyGPLhfKhg8x26YJIfNHL7eFsj9FATdZthHlOmmDCAeUsw5JWf10H7mXxCw%2FByGrBbLYEn2F6fJpyoUnwN%2FusHZ5QHW2kTCBBhwO5aaNrTNuwVJpXA4Bk2XVsuNvq7NNttYGkD6koHrR%2BPEdULPyaoQI5EpJkdqNswWfWjCLp4RXyadSSZwP8r8SXomQl67rRll%2B7skV0atPTqyux9WMvXZtwPsX2vQeOdA6ADxteTvGk6ez8CBdWbR697CEKB4FIYPV%2FIA5FSt0Yzkyxgj7C9PekMnSI%2F%2FT%2Fqq4e3cfcaCnCzuVAEZHA5aHoJTbuCzZqhwqn0yWHgtS777ytjmcwcoruI0Hoh%2Fwdmrsjac%2FGNTXLfBHubepHZsyCJhjkuTn7sXEoKFeQ1N9cuAxb%2FoRAUO4NukXusHnbQ%2Be1WfUWI8NfEnmAyA8fu%2FRlTSSrZ1A%2F%2Bu5z8GUaudyzz2M7g2c3OHlQzAc509c37eqSYxvSSY4sOX%2FM67pmgkCAFexHqe0K%2B6FaKZLtWAaTi1kN4uM%2B3xZ%2FWhsNHuCQn7FjCfl2X7%2FkkDPUtCE5j7n42HLmbpuyjxSphkqe7GWj%2F3cIyYhWr%2B3%2FKBfTVCYavkU3rBC2jYXY8CQqxtRhpq7X0wwf7JzAY6pgEp1U1j4SAg6e1MeLwIZPMP2FCGe67kq7aSfzwlskw5nmYXmce083d8blqvK3fIzIuAWXEK77PLiJ4WfaaAwAOIGNt7EzB%2BN7nBxCCqdL25z7JQUkH55Cb4MRM1B6AS%2B5sHAU3cMqk%2FdV53WZoVdB7zq9L6swgg9Jjw0pzgbGWEJprbJegJwkFsIzzx7nF28%2B3IesrOB0X8tV4E0tRfuRDDzPg6jsKa&X-Amz-Signature=4f759df5dfefba4a11b6c769a9de23da31d58e22ed37ffbcc7c7e48eb41248c9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VRJFCSER%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T033716Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGMaCXVzLXdlc3QtMiJIMEYCIQCcGLxlSCD3CHkrEqSsnOLcnGgMJSPphLJZXdeaMv%2Bq0QIhAMHfr4qon4qrRbA4odJm8OgQlo2gpdNMZ%2Bg4gVG2wF6NKv8DCCsQABoMNjM3NDIzMTgzODA1IgyPp%2B43IKQgw1GQlEsq3AO3QhfDN%2FYpE5%2BGyI%2ByRZhXi0Hg9FYyTu5XJj%2FNhl%2FKsCg3H1qmcbMiwQ7%2BdmW%2BxeYLEqtmnDBEE8ibomxIJaer%2BLqWZcrUwS0muQldjC72tnrtZsAgA1rxhLv7IHgWpxLpkF0rrLexGKHnporfOHcJVXi1m8PC9tUNyPXYzP3PueRlnE8VwvkJVIx4wDvm6e0fS5ClBae9wO0rPQBRKtW9MWmYiQf6NYUWp53y3LuXZsymqKgiZkR%2FroC7LHzC3OI3s4ouVQSQ8tIsmSFNbAra0ZMyvl8mKYD9LteAjwk0sBW6MZtctrdzxNFDqaW5XlWOmOmUyHTs1yNST%2FuRJnF8ztv2%2Bh1ZbKUEMjGrLP3gIkAFr7QXRUXuAunuM5vOzrA%2B8pZ9WgthVp4WwVZrtch%2F4MzYrLKaQnHdMFAwluDvpAW0Ctu6TLHNJ%2FV64V4mdbLOx4rCsUhwqEVXkd3tUb3B1r4Iuy0W1PoZ0aXATTl%2BLrUJKAMXfQ4PeJk%2B5Tq4pD%2B2vE%2F7qDNx2SSfbPgJN%2BINDCa3yaTgIa8VHUZrfHkHKKnio7CxYSZEOFA0x9fU9yefgn4LLdOSDNYV8I%2B%2FlBACAVSpR%2BgjY%2Fw0HS%2FCC5tSvNk2JziNyckBsDHZiDC9%2FsnMBjqkAUd3Z5YDg1U%2BUfKzkEjREXCeS6W4O0%2FG%2BTFLngfUMPLNzBdNlbRs2mnLX44t9fkpJd93K7ZFD2ONy68uI4SqmkF6T1pNH2AhFw%2B83i2KE1Zr1eQ0BlEwvnvSrDMyfZ5FN4BfcLqFLjsZJ7V7h4AXXMoUiS4tT7EVhXyVUHk9d%2BTioMP6VNKONzfIVXFqsknXcgvzd6kkuvnDJGLC9F6DD86HhhYP&X-Amz-Signature=e560854f9f4cc7434f0d956253c7cedcae2ee81582b2118eecfa99a0685467ef&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UWLBPKDB%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T033717Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGMaCXVzLXdlc3QtMiJHMEUCIFE1hJS4a72ykSxmwmufzQuGr06avqwJXpV4GHVWeTi8AiEA%2BSuadAr7YY6q0UrbNHSvKZzdz9m3roh1yWGICeElwYAq%2FwMIKxAAGgw2Mzc0MjMxODM4MDUiDEAUnYt1oJNo8ZIbCSrcA6kAhUpLLZwqXXlEhUeD6TpfrrZmb5gpGed12PNblGDRB%2FbUvyuEJko1PhuaF0XVD9KdTkQp33t2Cz38sVaYLZiOGoOSYzXvj%2Fczq0rrNltoCo2XIGOv5UjrPnXKiMFkByMzn45aYS77l39x%2Bro7E6XaeuKDepAU67dHkHoHetu83dNDmamMk2VfsSVdvlGMKVlUF3RCBFVSbxbc7hHEPkZh0VAnbgylBu2wga%2FOfmBV%2FJwQ%2BAKssjT1Pj%2FBJgOWQ9PYzlacckUamckViNkqgSIGZABMcsjDAFDE400VYHKzsYqlOKKK%2FFMhloB%2BMWUPr9967hWhRMwyg12ruMyhdSZ6zI7GFo4yeFFYslw6BSowGmuv5RsltrjDspb%2F5jf48HsLFy09iu94pxOJ%2F5HWSp34BPKi1dYgTwV0L3ocldENjs2TSLlUkn%2B%2BxSJwwOgZr8E8bwXSntFA%2FjzEtxSrRo0rl%2Bk1ezg%2FBtAuCpDVTy7P5hTfUonI%2FB%2FLigfTNOcmMvcmsRwQRDW3EqGV7mqm%2FOk9WCzbAhrOztmmpAv5Fg%2FBRkKTcF4gvG25jUDePJ2JaXbtoH6i7OcqZMWhoWARcKZT1B0LMeeZdVkB9mRxpr1A%2BIyKCUVn1nIcTbLeMP79ycwGOqUBUzSy0OXcEDDrKWJG03OnT1CiDvtJH31Em%2BnFbzeCur2hHO8qm44xRPeT4sb7AVRspEEO%2FUn5lx4npa4kGwIrCYbmeEm5750ZqKcJvmWPqzAyVK8Lb%2BxbJLr4ScJ3lHa%2BNpDIIJx0hYqKo3FIxCKNgMZmZCSTKbcEbugAHJLKE9gJsaR4flqkYiWuQk56sAE9iB73ydOPkimYBT%2FqhJab2mBbRWYw&X-Amz-Signature=df26b08a2e7324322c13805cda09c4b081cca4a4f898e4d9b96c83c77ee41f50&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665FQUB2CY%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T033719Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGMaCXVzLXdlc3QtMiJGMEQCIC4%2Fnn5qTTr6yTWSuvnP0eryvOXDvjVrJVhLIJ3bhErwAiAfO4wBy1vNm9oEE4gYU4vvhGBsR6jDmHVdgAFrU2ShPyr%2FAwgrEAAaDDYzNzQyMzE4MzgwNSIMnuO6vhcsZSnspflfKtwD38su%2BQoMUwwOhfiNETwYwSK%2FrDXR4ykVbCByi2W2klx6rxGJeWsAqVciH%2BHWlKgeMTLCssR%2B9cF4MhDovYPSQ2GivdRXCn9hCvWIUMwkaF5ppBdgk%2FyHbuSszH4pbiViw1N1A098CKA2MhAfAVQwthM%2BbKUBrzF34t5ZeD66jj8hB4aCyKNzJgpclWQeyg8tL%2FUyV8o2MzMBzgoLmM8FhBoywbZ7oby%2Fn80lZYW5b0vH0jKgLfEHJcL46yRfqUWVhUXjF2rLINKxrAvh6D5XYcLSWdKp3Oq7DnUhV1xM0hnT2apGUPN5HP8txaDdlRx1jchxaBOrdY4WF7n%2Be1LizqKtlm5k0R5apxAz8pAU059m8%2FdcrWTN3ONYvuxDjGOvGWwpylCxdGFhkvCWJ1wSAvf5uXEsk9Zi8U2%2BW9QF2s9cWFbexZ7f7%2FNHXZqSTcWBYAFNa7E%2F8hwqwD0KJw8gqAswf6jT7lVS%2Fsb%2BrC7x9po4kMU7SIuewmQ0E4cjO1vhhYpRdwwRh3ooP9u0JHmNPAswZoqkflfNLidMDXxhxMhmq2T571vRlI7adasoJv9slThS1ZazjHGX%2FJiN%2BBRoDe1H0vk9SE%2F6LPEWPNdlt5ocRTv8np4HQvrXCU4wk%2F7JzAY6pgEkTfVYjCLo9UFndK3b0elsNnmNSgTCvdfIlgJaQCv0kccPKwndsEzw4DEUjUmNLS51Tb%2BjcTo1C4fVw%2B4RDUKJUdUgtigCw2zDwTzUYWlvk6YyNNAdyT%2BN5xTbtKhIKogSSq0vPlQdEqLd6j8fRd8aCJd9jChpQDPZgQQQ92pq1rxvChnPc8gAuo5bfxEjYPvJ3Spcc55BN1we6CL9MgiH62m8pEkV&X-Amz-Signature=257d72e1deecc02b87c651ad5465ff9be13b1455353ef42dd3653acf2ede06ca&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665FQUB2CY%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T033719Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGMaCXVzLXdlc3QtMiJGMEQCIC4%2Fnn5qTTr6yTWSuvnP0eryvOXDvjVrJVhLIJ3bhErwAiAfO4wBy1vNm9oEE4gYU4vvhGBsR6jDmHVdgAFrU2ShPyr%2FAwgrEAAaDDYzNzQyMzE4MzgwNSIMnuO6vhcsZSnspflfKtwD38su%2BQoMUwwOhfiNETwYwSK%2FrDXR4ykVbCByi2W2klx6rxGJeWsAqVciH%2BHWlKgeMTLCssR%2B9cF4MhDovYPSQ2GivdRXCn9hCvWIUMwkaF5ppBdgk%2FyHbuSszH4pbiViw1N1A098CKA2MhAfAVQwthM%2BbKUBrzF34t5ZeD66jj8hB4aCyKNzJgpclWQeyg8tL%2FUyV8o2MzMBzgoLmM8FhBoywbZ7oby%2Fn80lZYW5b0vH0jKgLfEHJcL46yRfqUWVhUXjF2rLINKxrAvh6D5XYcLSWdKp3Oq7DnUhV1xM0hnT2apGUPN5HP8txaDdlRx1jchxaBOrdY4WF7n%2Be1LizqKtlm5k0R5apxAz8pAU059m8%2FdcrWTN3ONYvuxDjGOvGWwpylCxdGFhkvCWJ1wSAvf5uXEsk9Zi8U2%2BW9QF2s9cWFbexZ7f7%2FNHXZqSTcWBYAFNa7E%2F8hwqwD0KJw8gqAswf6jT7lVS%2Fsb%2BrC7x9po4kMU7SIuewmQ0E4cjO1vhhYpRdwwRh3ooP9u0JHmNPAswZoqkflfNLidMDXxhxMhmq2T571vRlI7adasoJv9slThS1ZazjHGX%2FJiN%2BBRoDe1H0vk9SE%2F6LPEWPNdlt5ocRTv8np4HQvrXCU4wk%2F7JzAY6pgEkTfVYjCLo9UFndK3b0elsNnmNSgTCvdfIlgJaQCv0kccPKwndsEzw4DEUjUmNLS51Tb%2BjcTo1C4fVw%2B4RDUKJUdUgtigCw2zDwTzUYWlvk6YyNNAdyT%2BN5xTbtKhIKogSSq0vPlQdEqLd6j8fRd8aCJd9jChpQDPZgQQQ92pq1rxvChnPc8gAuo5bfxEjYPvJ3Spcc55BN1we6CL9MgiH62m8pEkV&X-Amz-Signature=d19cce9630b4a7017b2fc759fc475a34b0601237821d0e3318f3c6459b33fcfd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662JREBJI6%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T033710Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGMaCXVzLXdlc3QtMiJHMEUCIQC%2BqDuEnMyx29o4UuZnyaJWQAScA5Wwe7nd9R8Ukzke7gIgBo9O0svNRWb9T0N3IlnX8TQTmqxkXA65EkVtJUVk13Eq%2FwMIKxAAGgw2Mzc0MjMxODM4MDUiDHhRJuR%2FBXSAQCjNqCrcA0DkGV57Av%2BvxhEc5VnqnlOSWuDIuxO84z6ZcQRymxH0yYyqF4KWBmaJiPBBxB1oNbTksGrKI5suUxRn82Y0R9qQFStJ4DqlfAVrHUtju3uL4tZV3qD3NEPjmQSDtz28xH7C7CQ3k9cEa4YRM19AcFErVBEts9LXvIw12xzRlWPZuu1EfKVGYYjpDQpktj0HsaKi9gAe1aM0WNJC6%2BeRWAsKXzdPMgt4KbYH3zLMe%2Fx0ZeA323Q5yR85pB80exOgPy3HqKS5XLiqhs0VSujCS45I68kxMmKjowaf62KaailcDrOvXQC2EgJ3htpGKwB4TtARuX6zg5k9b0y54PhqeK1fQiLrMsd6LIZIerhD8UUXKpZxFowkU1rtQhLWivp6GAhVZvP9yOfEp2COBP0QSbH75NgVzT9z%2BYlS%2BSAIXdP3khrrsvYmnFb5%2FOn7uIJAefn2CPOVfet3g%2FaMNTylrLtKiB4H26m6XgRAE4LF2qbHzKACWeH%2Behxg6X6I5bC7ZSL58mnKuCz9jxT8pvnvFRXRkBDJQY4q99jv5mred8%2FaO4VQjMqwGWZNwC7Hh6L5m3jND12qU7iTqn4wBOMBZXY4BuJRDeSWd6vnQFVhlaoYJXxpZMisRI8HX6p5MKb%2BycwGOqUBpF6VlsEn9PLFSZ1kHuOYbjS0n2dZXuSUSRW%2BHOQ3WLtgbHtXpZ9ipUBer2owEgfmD3FuhN%2BjmxrArylM180MoqzSDw2%2BgkW4TFHnqOq9Lwe9GrcgvQZD7C3iENLlfcc0YbN49BSAEe4izF8Uz40G%2BYoyIKH7UoM%2BqMQ6ov3o5zjs9COVc1CdnSUkTqcl6crX0%2B%2Fq2UvudfGVlIXq8mWrAxtpYdUl&X-Amz-Signature=d3832020dd15d024d5f0b58bbd59261f21b04b638166193f2b2179e2ed67a622&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667EL2VOSC%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T033726Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGMaCXVzLXdlc3QtMiJGMEQCIGxg3CURnv2Zw9lPlX5XWNHDSRxaLYrpqlCp6638cXxsAiBNbVTum3sDgCLtE2jtwmGUfx7cDHdyddgHvT2ZiKO61Sr%2FAwgrEAAaDDYzNzQyMzE4MzgwNSIMpX%2FMuHO9xgdCIX9GKtwDlYFdoX%2Fgu%2FTDj2TyNT4a4kd0Bd35qtOHtoyqW%2F7MDWB3cDTHihFlcULEgBQtQQl9%2FrA%2B%2F%2FEjHryxfjsqebRhCHCa%2BpMkIs0TAtBMOBkfjLG8dc8aKowr7PniIZvH%2FOFOl9kpZ2YVHyNcfMBNuJV%2Bm4%2FWlRgsfQkwsBM7PWqE%2FMDFv7VsJ65sov4YbPOMgJpkfJqk6pyobmjDR7PmOaKJ%2FqwAjZsQoRGI6s64ilUsvvX6SmERc4VyKXCChx8AUz5AeCNfcMBqoKie4zxUjIfd3mwWXgsoCR2Gt9mEi16SsBMtA%2FOusNWiKCKG9Y53biuybFlA3M7yaJ6I8Cuc%2B7T9RLWl52QgkvwMlRFHyfdC9SFOhpWiBzI8mjaELR0R4DveP3D4MEbLpd8EzjARJF5Ohatj3cRD7dlGGR4LmHEBIgrUB54iP19Hq2CYxfU5m1DeD2INrKQOXVcuPfNTWfUDjBYScFBfhyjjP78TQpf0OmqKVqu93wiy%2FGesBjGxRXsJDgG%2FGXx9GVGTuYP33nddMWhgyOX7XxdnsAZ6Mey0Pjhgsq%2F6p9%2B%2B%2Fl2NHmhdBLbdHDykm8KlSPFXOW%2FqvMCcUVavKEkh3LJgg0jXxVvwvtDssE9JoTEKHvytN%2BMw2v%2FJzAY6pgEbygO%2Bc5j9Kcl0QMEDamjJSAcLbn5QIYXzjCsM46XvUl6IuQK%2FCCeVM7wj88rIm9HLFe2YZL%2BgJS1ooXOrZWO3PChrm1yYXqYdX%2BgwoFr5%2FaRRg8FJafHP2ZluoIKBaQY13mTcDuAI9xu%2BGk1E7es9ekR2gIarqxewtOgqXRMVTtrYAI4KBArV%2BA0lcSZ4fZp0J5kRtRHpHyks0xrmV9FGScmjfDXm&X-Amz-Signature=76d135a205cb3e5cdc613446e944772b547b2a867321f9f98be1f5f1dc5033c5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667EL2VOSC%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T033726Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGMaCXVzLXdlc3QtMiJGMEQCIGxg3CURnv2Zw9lPlX5XWNHDSRxaLYrpqlCp6638cXxsAiBNbVTum3sDgCLtE2jtwmGUfx7cDHdyddgHvT2ZiKO61Sr%2FAwgrEAAaDDYzNzQyMzE4MzgwNSIMpX%2FMuHO9xgdCIX9GKtwDlYFdoX%2Fgu%2FTDj2TyNT4a4kd0Bd35qtOHtoyqW%2F7MDWB3cDTHihFlcULEgBQtQQl9%2FrA%2B%2F%2FEjHryxfjsqebRhCHCa%2BpMkIs0TAtBMOBkfjLG8dc8aKowr7PniIZvH%2FOFOl9kpZ2YVHyNcfMBNuJV%2Bm4%2FWlRgsfQkwsBM7PWqE%2FMDFv7VsJ65sov4YbPOMgJpkfJqk6pyobmjDR7PmOaKJ%2FqwAjZsQoRGI6s64ilUsvvX6SmERc4VyKXCChx8AUz5AeCNfcMBqoKie4zxUjIfd3mwWXgsoCR2Gt9mEi16SsBMtA%2FOusNWiKCKG9Y53biuybFlA3M7yaJ6I8Cuc%2B7T9RLWl52QgkvwMlRFHyfdC9SFOhpWiBzI8mjaELR0R4DveP3D4MEbLpd8EzjARJF5Ohatj3cRD7dlGGR4LmHEBIgrUB54iP19Hq2CYxfU5m1DeD2INrKQOXVcuPfNTWfUDjBYScFBfhyjjP78TQpf0OmqKVqu93wiy%2FGesBjGxRXsJDgG%2FGXx9GVGTuYP33nddMWhgyOX7XxdnsAZ6Mey0Pjhgsq%2F6p9%2B%2B%2Fl2NHmhdBLbdHDykm8KlSPFXOW%2FqvMCcUVavKEkh3LJgg0jXxVvwvtDssE9JoTEKHvytN%2BMw2v%2FJzAY6pgEbygO%2Bc5j9Kcl0QMEDamjJSAcLbn5QIYXzjCsM46XvUl6IuQK%2FCCeVM7wj88rIm9HLFe2YZL%2BgJS1ooXOrZWO3PChrm1yYXqYdX%2BgwoFr5%2FaRRg8FJafHP2ZluoIKBaQY13mTcDuAI9xu%2BGk1E7es9ekR2gIarqxewtOgqXRMVTtrYAI4KBArV%2BA0lcSZ4fZp0J5kRtRHpHyks0xrmV9FGScmjfDXm&X-Amz-Signature=76d135a205cb3e5cdc613446e944772b547b2a867321f9f98be1f5f1dc5033c5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665K6LWOOK%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T033727Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGMaCXVzLXdlc3QtMiJGMEQCICiSyaNPyv88BJAo7oQgmMjQxfSeitGIPXfYlTj2OQMAAiBEMSF7V6G%2BiWESMDYPySJtdefzkQSzgI0m9SzgRuiz%2FSr%2FAwgrEAAaDDYzNzQyMzE4MzgwNSIMGSILGabKqHN7DrF%2BKtwD%2BVJbmUw%2B74CL%2B2eFo5tMyPLt02BDqgr%2BuTaSD7zGXwNbgY4ZlGirdAb1YHyh5IP37kcEcBX1%2Bt01SjBKMaeLF%2FQvIdjsKLFe8FRbm7pKBCieRas02tHzMVPDne2cbjWguHCBBz9pEY1CElN%2FwdzRXNdJd1kc4vODFPVvukeuqKwiOdQQ62G0Qn%2FIwiYGIxIo%2FWX2r1JBp0VJ7qSFw3R0e1Hnnot1cMfFBY7259lbSbdhVMyiduIw%2B9f%2BprZ%2Bl4bFhDGmDdXlRFhX4WShZtgI5t9KgpcuxMZrA3gxBZ30BnT2RAt8IHXn%2BNvgCzH8UxBZYPuk6X4vij5Vo671FHdps2koWbqdoOCxVBFBVvgazWWQt%2BX77ptHQn9ow8iJXotSrkalnPR0AAgLhLxWcc0I31Qms7LSJHbO%2BZVp%2BlcMR6tFzRz1ukF%2FQkqQ9OUfA2CXLXxYrBvKbts%2FdI6dCGPtxv1LLKr4GdWcKUcXDltNMDlgQxEU6ieR7FXQ%2F%2Bc2XzSpDvE7U4x9iNv2gaJ0hM2%2BifYa50Dzf1SvETC2yUDPSNXq38IHKgC8Z05gNbIae6cF42dt9rNhtmQRJBFGOBCY7uKkfj%2F1YSN8c%2BNUH6ujDEK1fW5T7hcvjkjMjpswi%2F7JzAY6pgHDglxPAbX6ojG7AN1uwHO8d2feJbLBFr7mUYt79qk0NTBaM8G%2F9TTspJtYMB1Cm%2F0vHR58yQoQdjkuj92x1eJdm0PoCVeyyrmd5y7TTR%2B3x%2BueM6gCMycgxklJ%2Fvk7rUXQG3F0xAFIPhxZbQiSoiM9rxvWDhSQIDjF41%2FbBMV9QAbV2H%2FawasCUzzdnGWOR6R%2BIyq34TwRbWcNu0YMSG2s0ZW7AKbu&X-Amz-Signature=159f54afbfc11690ee057655c1069f812a61294dfd28d68ebc7b4cb91885372e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

