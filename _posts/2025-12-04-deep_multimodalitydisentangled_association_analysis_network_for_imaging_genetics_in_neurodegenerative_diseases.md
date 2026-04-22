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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XVWPIHP4%2F20260422%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260422T204355Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEI3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIArwHsgHdfoIW%2B28zxj5SNjJtx%2FBBD9retSag4G8lKkNAiEAw%2Fr5ine8DEU4IDWK6tzfmMhVQjISeshoBIpQRSu25R4q%2FwMIVhAAGgw2Mzc0MjMxODM4MDUiDOweEhTtOspNS4v1pyrcA8Yx1LREJdxsq9IcSnRt%2FCgjZqDK3WQAFOboluQ9GFo9P5bw2TQFoCCF5%2BtII7TEC%2BlfPbAUZkZ%2B9wIs5uqHYh9It4RM%2BwYa%2F91cuoY8jDDo0IuIuzDfvK8ZWX4eezHiUi%2FAaI%2FP7Iy3RaL6WD3bmwFrS2FOpcjM3q3NGKsE4xWV4lnn%2FK8LVQNGJ7hHsakwKUG706olFUm1%2BHIK17NsvCKfsIILsOz%2F170sh2xYsgSvozPKSzIuZqkIQdm%2FQmM06n7tCZK4ILfUianRA2c3AVNchFqmreOza%2BrFD7XTiDgiOMX2DafJ3z5rgkg23tjafxF%2BnhnwHk2bG6f2iR9QPhgQKHiCoYriCTxdfDJDdU2XVSeuqDlxjCGwbxfvkauz1GLnMqrNUTCvFUFJFC3FCRJslPkYTM%2F8SEOeCgkOJ8KRhl%2FRDQmZaGq4SF%2F7hDRamf%2FEjenU%2BxlwNO8GOSjnqp6eeFY%2FAoIgZIwJ3m5Bstxvss2oo0KNM96qwcVJNAzSAYKeWUFf3Htre3G0bgHzpWNFYG%2F5MoX99Z%2BMjZztZas5v%2FYdsydc7nOXRXd25%2BtDcxNcJl8uRlxPEcZJAwtV6FhHU5%2B9YmpluJW5CjXo%2F93VtA6AUlD3TA7GCmCCMO%2FjpM8GOqUBB3LlvXmJS0TC6QBs8n6KPh9G3wvUPrm1X8FGi6UJ7P%2FEFgBAcBWq07f0YmnTZ3lGeO%2FQwfs15EXXQC%2Fpwg1KYCPPFn%2BKMdDZ11kt2orRFLW5Iy0ZJfajInk2DvQAN0Vn9cXtT23OM5yFG9lLPlCXSpSGfeLuPnlwWYNjimUur43ZIQ84ARO8dmLicNKAudZ3GhbOw9wzJexufu4s3nJaNLjcM2IL&X-Amz-Signature=4f7a1f7846d0df8d2a833a372cb2bae5958c685e99a867ea969de23f1387a1d9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XVWPIHP4%2F20260422%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260422T204355Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEI3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIArwHsgHdfoIW%2B28zxj5SNjJtx%2FBBD9retSag4G8lKkNAiEAw%2Fr5ine8DEU4IDWK6tzfmMhVQjISeshoBIpQRSu25R4q%2FwMIVhAAGgw2Mzc0MjMxODM4MDUiDOweEhTtOspNS4v1pyrcA8Yx1LREJdxsq9IcSnRt%2FCgjZqDK3WQAFOboluQ9GFo9P5bw2TQFoCCF5%2BtII7TEC%2BlfPbAUZkZ%2B9wIs5uqHYh9It4RM%2BwYa%2F91cuoY8jDDo0IuIuzDfvK8ZWX4eezHiUi%2FAaI%2FP7Iy3RaL6WD3bmwFrS2FOpcjM3q3NGKsE4xWV4lnn%2FK8LVQNGJ7hHsakwKUG706olFUm1%2BHIK17NsvCKfsIILsOz%2F170sh2xYsgSvozPKSzIuZqkIQdm%2FQmM06n7tCZK4ILfUianRA2c3AVNchFqmreOza%2BrFD7XTiDgiOMX2DafJ3z5rgkg23tjafxF%2BnhnwHk2bG6f2iR9QPhgQKHiCoYriCTxdfDJDdU2XVSeuqDlxjCGwbxfvkauz1GLnMqrNUTCvFUFJFC3FCRJslPkYTM%2F8SEOeCgkOJ8KRhl%2FRDQmZaGq4SF%2F7hDRamf%2FEjenU%2BxlwNO8GOSjnqp6eeFY%2FAoIgZIwJ3m5Bstxvss2oo0KNM96qwcVJNAzSAYKeWUFf3Htre3G0bgHzpWNFYG%2F5MoX99Z%2BMjZztZas5v%2FYdsydc7nOXRXd25%2BtDcxNcJl8uRlxPEcZJAwtV6FhHU5%2B9YmpluJW5CjXo%2F93VtA6AUlD3TA7GCmCCMO%2FjpM8GOqUBB3LlvXmJS0TC6QBs8n6KPh9G3wvUPrm1X8FGi6UJ7P%2FEFgBAcBWq07f0YmnTZ3lGeO%2FQwfs15EXXQC%2Fpwg1KYCPPFn%2BKMdDZ11kt2orRFLW5Iy0ZJfajInk2DvQAN0Vn9cXtT23OM5yFG9lLPlCXSpSGfeLuPnlwWYNjimUur43ZIQ84ARO8dmLicNKAudZ3GhbOw9wzJexufu4s3nJaNLjcM2IL&X-Amz-Signature=4f7a1f7846d0df8d2a833a372cb2bae5958c685e99a867ea969de23f1387a1d9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666NPYH6YC%2F20260422%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260422T204355Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEI3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQD8E5ykT%2FTuEqZBZPOZSUKmxrWQm4E8gRuEo%2BtEB3NSygIhAKT0WiIfNSOsNcYApCuSJeglIvxGS%2BfSJ2YTkm3GS%2FgeKv8DCFYQABoMNjM3NDIzMTgzODA1Igz%2FVpKko2wXFKUADTEq3ANXoZr08Ilw4p0n%2FZi9G33WzRsPxFDQ4CrjIxKljIC%2FGr4ZaicK%2FKoSBMTEGGdJVpjepQKLOVuCErz8Qi2Nxe1B9wVPFZ%2BaPzkkyVWI2nznwRf23EUPxz1BGyrhZde4K3%2FbqJoByJRliMTk10fuWAPborxAXr91pVEion4KW6j1Na5L03W564Vmkr2HEXBAAalxr6UZawXMPi7xWPrCGvyA9Y9AloQSFVihKFY%2B4v5JX2oMqLKkwcmshvBD%2BiS%2FFLT9MiAxDXaD%2Bm%2BKhwtAYGSfzfapGhpwkcrTNPjRxNmvnv6Bb%2F4L2rdVcyh6IOEd4h48yHx736QANCI9ybceqRJVAAqZIrfmv7QJ%2B9frtDOUoPc4TO8fuosR%2B0SWikPUsjmLMUTYyNggx7dXQirz6t3gft562f%2Fs11FSb1qFo08Ttt%2Ff4FkGPMwMbVdzi5MgC5s1n4dErAyGBseDb38h5Jp328GXwDw6IsrgjPu6oQHaIk9Y8PC2zuxq0G2T9a2jnPlV%2FDlpsOCQqE2m7bvkp1bfhPcxggjupjo65Y0EGM0b85I9WmVmj7mWn%2BpB%2FXVGLefrbBTrOTf2w7aXQSyfab8iZjxECpvmwVEIV4xA%2BeGnTo4r3Ahn5ebeD9%2BoVDD85KTPBjqkAYhDFALe6GMzrOW3Hrli2s566ETwrRuobaCVSFyDVEBPK3CJcRjTRbmEhE7AdbxPXNKFzbIv%2FOh%2BOoBy59QtMmjjL%2FnlaXLa9Bqc1qxeeOZsHJfmcbLNmQ7q4vmBGeueQ4QJ30Hpgn2R7MTSO7JF0FQO%2F8ioO06KG%2FAuoyBRY4Cd0B5BDzsFSH54530ktyDyA4IZq2zh5WnJVm%2FOt7IvmAs4GPkO&X-Amz-Signature=a0d7492f4842873b50b385475dc2941ed61f64d04758001daf71bb030fef0ccc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VZUZ2KWT%2F20260422%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260422T204356Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEI3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQC%2FDYIqD59K%2FD0QZBTF9aHvtU5oUThCf8sc6XHNnMPyswIhALpbT43HNslY2MrXotNZYwvpzg9bn%2FQrX1iI3YP%2BLzbfKv8DCFYQABoMNjM3NDIzMTgzODA1IgxttUJWoJJIqoDSUj8q3APlc4qQE5pn1yAsPAEX549IZs8MkFhsob8oYrmt%2FOMEJlD6RtewfCCTz8lDo4HJ8KoJjCAqzce%2FdzjoPuZRyiDkRa3YIMqmemayTfCSpNWeFCwsm6kPoAkLinaxhsmSaHVtkBWivOdZ2ybsgJBNigBCZD%2BXMLeDoNqTUikHb%2FoF9hwl9J133rMc32DJ1B6Iy2sZm5uBatA9ohVMQ0EC8lvsyfQ%2FjDwGCS9zmUKwgU9r4kVDAvCOQQt6LGyyPJcj%2BNAWJPOWpKnkPPqbrxCSnm52MYvwbNc%2Fy8uIUQIZZOCzUHqeTn7sqSonQKJvB7p5%2BFmHRjnWr5G3N9JzpKQUu8rd2358CCQSnm6Q%2BlwJ6WrfYcLG5Ya2V9nSuTMTQsv1jUFrnPtapLVExVUXM%2FmOGSO%2FQ41KzOuGG2qNXpOWuM74RZ%2BcV%2BucNi5h1VMNrRCxQUWSmBvfAOtcucR9m968MN0BsE2kUMVPmCpCtiMt2lKqeNz4qsCO7X69Avo5dOR9pBSFtUoeibwcKplw%2FOEbVKgqRqjU2b8GEAuk62uIt%2BQBeDn3c%2ByC3Or9jlWFL0HUAc7BpsydKxaaiJkG%2FZ9soROK1lZe77HlNqtBZ0lF7SzpL%2BS1aperNI9UXarIzzDw26TPBjqkAVTQVeX%2BSiXJ1RIE%2BUbh8mcAL%2F4Iti3mHinIgLOaKzVBjHw47%2BuD2sQRF0iuB1D5alld4nQjJFnitLJllrYRVGHgRZ3t%2BxKcQVCEEbOr44CMRAgcbg%2FlIBb4Jzfwmm%2Fd%2BlDfIkSNYcOD9E26iOltk%2BRPVdEOxieP5N4acINKmQc4FxIOuQjmHBqPTJ%2Bcb%2BqM0Yzd5qxQhXX%2FxDTrp4gdlIyVn6xO&X-Amz-Signature=8485c4a2e7a48cb1903cb090d056bccfc4380de9e39e6f05d75272a29660004f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VZUZ2KWT%2F20260422%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260422T204356Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEI3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQC%2FDYIqD59K%2FD0QZBTF9aHvtU5oUThCf8sc6XHNnMPyswIhALpbT43HNslY2MrXotNZYwvpzg9bn%2FQrX1iI3YP%2BLzbfKv8DCFYQABoMNjM3NDIzMTgzODA1IgxttUJWoJJIqoDSUj8q3APlc4qQE5pn1yAsPAEX549IZs8MkFhsob8oYrmt%2FOMEJlD6RtewfCCTz8lDo4HJ8KoJjCAqzce%2FdzjoPuZRyiDkRa3YIMqmemayTfCSpNWeFCwsm6kPoAkLinaxhsmSaHVtkBWivOdZ2ybsgJBNigBCZD%2BXMLeDoNqTUikHb%2FoF9hwl9J133rMc32DJ1B6Iy2sZm5uBatA9ohVMQ0EC8lvsyfQ%2FjDwGCS9zmUKwgU9r4kVDAvCOQQt6LGyyPJcj%2BNAWJPOWpKnkPPqbrxCSnm52MYvwbNc%2Fy8uIUQIZZOCzUHqeTn7sqSonQKJvB7p5%2BFmHRjnWr5G3N9JzpKQUu8rd2358CCQSnm6Q%2BlwJ6WrfYcLG5Ya2V9nSuTMTQsv1jUFrnPtapLVExVUXM%2FmOGSO%2FQ41KzOuGG2qNXpOWuM74RZ%2BcV%2BucNi5h1VMNrRCxQUWSmBvfAOtcucR9m968MN0BsE2kUMVPmCpCtiMt2lKqeNz4qsCO7X69Avo5dOR9pBSFtUoeibwcKplw%2FOEbVKgqRqjU2b8GEAuk62uIt%2BQBeDn3c%2ByC3Or9jlWFL0HUAc7BpsydKxaaiJkG%2FZ9soROK1lZe77HlNqtBZ0lF7SzpL%2BS1aperNI9UXarIzzDw26TPBjqkAVTQVeX%2BSiXJ1RIE%2BUbh8mcAL%2F4Iti3mHinIgLOaKzVBjHw47%2BuD2sQRF0iuB1D5alld4nQjJFnitLJllrYRVGHgRZ3t%2BxKcQVCEEbOr44CMRAgcbg%2FlIBb4Jzfwmm%2Fd%2BlDfIkSNYcOD9E26iOltk%2BRPVdEOxieP5N4acINKmQc4FxIOuQjmHBqPTJ%2Bcb%2BqM0Yzd5qxQhXX%2FxDTrp4gdlIyVn6xO&X-Amz-Signature=01c3615c27209360af885ae987600299788c610155fc34236aa396071bcd6499&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WHOOMWTZ%2F20260422%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260422T204356Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDicqvb%2F5JMebwYnSQrHC8c1mNjiXwVm%2Byep1aV0jVWWQIhAJSoJS4NQeisTibTwgM1eIzKmGYINlxxO%2Bk%2FRRWSASz1Kv8DCFUQABoMNjM3NDIzMTgzODA1Igwsg8uGFBIaCUIfnhoq3APlMKlglIDIntCIj0tatxIfXR%2Bkk%2BYH925URbwXsD1sZPl%2FiriCd1GKD8240yCh1tOsxzP5zLS6kG3iAe4dnXwolyvlGC%2FemI1nmZffls77qfL0A7GcfpcIiZm44HBph0vrif5V8Fr8A%2B5RTff9pZSasdQDuuRr%2BMHmw3YJfEUHqFCYj0%2BDrqquwGF0C3k7xEpu9Mhs1VMW%2FLSAU1khHynePaqadAaXmU3YEGkmRnFiQB9v%2FIlEmhLdhIWMSnVipmQFAL2QGGv1Y5%2BzjCCaM1TQZ7kGtbVmZOE10sp%2B2tGGzca23f50%2Bqcbyhgzyk1JoNUIjAIZ%2BF7H%2B%2Bp4372nAeS817VBQKJWUpEiqxUF4sY0XTE9PqmWLGiM2oWjH7MyBJQS1GekLa2BnsIG8dAx5wDUZPS0EsbH8AqjoJuqMb%2FCrprskphFJYmAYwOFJTea6YDeS3FguqfhNWoUI5%2F0qoDfLeSS1pILaxmRxPTSz1UrebukwOburdFoA9bjt77CAsbmtfbQg4wDSs%2F6SbAKVh4zOdbquFjo1gEXt2Yp5NWRK9gfKWt0JGGhfDumM8Mx%2BkYmmd50B08PHO12C777DIixljcCIX92gGHsHFPlfu3QFiMo15eG9cY0tjk3kTCv1KTPBjqkAWLvWgZDKGvPBx9tZ%2Fj8GomVnAflvdzJ8oNk%2BDwXhdfm%2FdgqlKrfKi8GVVFh9sihvd%2FoxHYBD%2BFA6SzrYfJepoyIsONnIuYz%2FMgqeSKnrfrCzd6DKhDSJ5LVAAMmv62AiUog3yci0rqdyTolQgVxVGk8m3W9IWNProHx8bTGSqz9835TzwqxWmodnMMgdXf8usuCRP0q49xZQlUnu1qKYauUycpa&X-Amz-Signature=f2c63e848a610095c1d375039af30d18db8875d9ae5ef2069e12cd748ab351af&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZGKO563S%2F20260422%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260422T204356Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDLLbktgwrYaL8rkEWtFvY5ByR407M4XhD4sKJV9mhNkwIgXQZawaxas8LAcUUtQgH5hPqFai46a5%2BsnEamkyIjuRwq%2FwMIVRAAGgw2Mzc0MjMxODM4MDUiDNvRPArIrlipffYKkyrcA7ueiNU1vY9Cu%2BUqPzQ%2FF9C%2FzmxBOT5sbO61WHr83BmN2%2F5uA4OMTLSwSO%2F6NUqmub%2BxkxYdiWLS48dT8Ilm6wa%2Buay7dd6k5Xf46D%2F4mAZaX64odsvfzsy5vk7rdBnMGHqRnYKmooEZf528D8BI%2FdWmmCknaHncyM5nR8aPCoGL4v5PfRJylnPpIGUAyDNkrNKO83LMy1Jf5eTvt9dagmURkFvJQe9QAbGOk4l%2BcsqsJXTlI%2BBPt%2FHJO1rcsof5T%2BriCYAgbFHowECBVLKMfY1tgaHBFb%2B5Dfve%2BZGXg8GPG7dEHi2NIF%2Bm%2Btnlz18xImgglT2vvyD0mony2n%2BjlmtGIpKMefetQd0O5Tyyt8ydTqQd%2B0SoqZ9OXBoJOgD%2BWbGW4lXB0Gpt62H3ZzWEjC0nHCv0aHdn82OmAdGW%2B33mXOfPzNV9B3sDdymJ56%2Fek17e%2FhF3j6FQlvTKjEP%2Fz3NDcQWPVzfexW8%2BWPES6V5pDoXG5942F5EYpouLXDqQVgmdQ093DvOIgPa%2BzS8wGujdkOE4Om%2BrTttWHsoZjGG9BQQMirFfIp9EdcnNH%2FsRXxHfkshNTEg%2FixrhRuAuTt%2Fowd8gEx49WI4LlnN6WAPczG9y9d%2FpTBewWub6MMPYpM8GOqUB%2Fomg%2BgoK8R188SSzRS45adONx5W4EnBB1B0KQ6VLCdo37YpcRMxSR6wtxaey1DElM9qR0yRcrvcCar%2B%2FtJzatfOQ0aWRKczMZMEVtBoIqIbOGSXYhc84Tqbd%2FfDAOGmVzKDtyAoewX1SRHxh6LIyKuQhywfVwFyv3udvCCi6guY%2F1Pf1YsR8kJe2lxQGCc1Z%2F48iRt7AUNEFRjvWoSICm9zQeKbq&X-Amz-Signature=8c30b3afc6433f348d3e3f70759f62ea563a666e4a3f1fde7875d57f9bef6033&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VQWTJCMJ%2F20260422%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260422T204357Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEI3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCVRQTVFGB05pxHBSpW3EyLSNbexii4wQ4O0NwYZSUv2wIgCR%2BG9RQOlIMe7bYzzmixAVOEPnMXa35MQD26ObVL14Iq%2FwMIVhAAGgw2Mzc0MjMxODM4MDUiDPFBQJ10K8kMqPCp0CrcA7fgnJsQOoD5byoYvCilRPJT%2F%2FmcwSkUEc4yS6bpVCiTUhYJ5pt15SDWSBVFBTToXX4%2Fvs1ZXNOVfeC%2B2ZBvJhoy8AGdiOQCCW1YUNIbEHqEHPWVh806MmSK51XZjYaaRvkk%2BFrZ%2FxStTC8IZfLYP4MfW7zwaK%2FiPaWULVViH52iO9Lx2JcTHkiMaiH9Vua9A3mEvFBdCBv5GnqQ6kAD8XHCkD4H8w0h8pYButGSrE2xoAhmiG2%2FG2pB8dKWHHYmVu8bKtAHublLe%2FsBXZGQXE%2BTD6Jh7kQv6n%2BnfU40kH9TC7Yu08ZdQ30YizgitHjgH1T4KQ%2FR6djLdl%2Fw%2Bv5E%2BHE1df7ZDMwuwdgXTpAHq6SPy67xIPiRH4ANTNZTTCjLr2nb0kPdP2EK6EOrS%2FaIsXOMz5chz8P%2FXLYNsG9rCjcp4BZyhtTAyXsSHSmRmGrsP%2Bps%2BVmRetozmSnId6n8RDURM4%2FyF0Z2JbfSYxVvMtOkD6nDs%2Ft86H16RPG5d1367f3jkofRljQ3axRBBexyEY8SpwMnaPZG5dw%2FjgQ6nAPFVSn32SwCt5FvzQxE7bw8J8a3IrZdY84B6jnP3y8h%2Fy6%2BGEsYwBxEyvIqyAIhfX0AKJwEGEZifmEjBGHHMOrjpM8GOqUBBKys8IiUTgLgfBa2hg%2BUueuxlHdfKtvpK%2FMM6dwfefkCDMnbcddz4NNJy%2FLkGdUQHOppfflyIdlSbKRTu2hYpK1%2BKnbK9aDoXykWWLygIfWmNK7ZNTjT%2BpR6BwMALrfW%2FRzejO48oIaN31s5qLoquJKdFEHeH6hStNXuFjcSlgn8gwRSL8vWZyhWA7tVN3rUcK1k%2FdNNTZiHnksNNRZ1ZshoArvp&X-Amz-Signature=b0b8ea0c0ffc3b0ca246e3becc6b3aa21e48ddd3899a6c359277736093be7b78&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663AXDLANB%2F20260422%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260422T204358Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEI3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCDszmpbfVhLYhatpQiAzdF%2FQS734dw6RAEnu7wPvLLCgIhAK84chE5Yr6IOC5fiCdAojgChibrONOkL%2FstcCsd2GUTKv8DCFYQABoMNjM3NDIzMTgzODA1Igy47O8R87mlhYsYRYoq3ANRkXGN4UcCSctYhALWD0iHanuAbPBfvdSzlPVx3c34l8IERPaKT0zXnmrmYP%2Fl3BN%2FhzunPXCR%2B4eKTRLODf5jsAkz7EyTxD1w0Y6nzdGJgEEan%2BasZwFeKS0gGr7k9RU9qhVSQn0kr9%2FP64A9LV2zsiMVS%2Fv16GnRxnTF9jsU08pSqa8bepWqjYd2pG4iWJ%2B6zE6PnAQzFSfNJYl0zeOGBVccJA3brlzbnV3F%2FQzRh3FcIsQjAgIM9MW3Q9gMzOtHDyNJbFh52g%2FpbbB1PeN%2FPaBi%2FYZwRiw8%2FRZVw%2BIqLMJXJ8fwL%2FTgzbmb3BPjwWtZ9y5zZbue8cMhI0BWcy46HRgCcCK3cKjMmNwFcw%2Bbbs7mnpNUoAfNzn7fV%2FR%2BGQZOmOhfB6grvuU9ldCGQUYl%2FYPjG46RZSvWF%2B5betAX8%2F%2Fei1gwSyHemgpTIV7Ni5yq7egv5pAqRkJgwTTTJ%2FUsfw31Ok8ddswdJjE0obyMZf5FjKJZtO1DK8e9GZd%2F7tKj8zWyOHWMaNlCRmpruNPF906nPkUPLFL9IgvckUi6VASH29qRVbuFSaORJMPsZUMO9e4UGQTmbamJbZQxVzsZo97wHbXg1el7yV3iWXyepNuNaX8CwZAZJIpA6jCe46TPBjqkAQ5JBxG%2BiDXkZG4ngY87dqLQyImmgjpzFhAy%2Bs6FyZsBLWyT2JjzLBJcqj31lzczt9fpBjXXfs2Awgp67%2BTsteNuASPFKoesry1ooSZiK6glUwjwF8qgvL4RazcqOmfMAtwO7h43ceCE2DaykNNbS5Xj5%2BX088b7%2FscW17x765qlVzptJ0BG12LaAxGPksUvjGeD3k%2B8OLpw6MoeULP2RDO6TtSx&X-Amz-Signature=f06f74d04c0c9a9be759e20567935bc76434cd047ae8dd276d02a728ce74cbff&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663AXDLANB%2F20260422%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260422T204358Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEI3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCDszmpbfVhLYhatpQiAzdF%2FQS734dw6RAEnu7wPvLLCgIhAK84chE5Yr6IOC5fiCdAojgChibrONOkL%2FstcCsd2GUTKv8DCFYQABoMNjM3NDIzMTgzODA1Igy47O8R87mlhYsYRYoq3ANRkXGN4UcCSctYhALWD0iHanuAbPBfvdSzlPVx3c34l8IERPaKT0zXnmrmYP%2Fl3BN%2FhzunPXCR%2B4eKTRLODf5jsAkz7EyTxD1w0Y6nzdGJgEEan%2BasZwFeKS0gGr7k9RU9qhVSQn0kr9%2FP64A9LV2zsiMVS%2Fv16GnRxnTF9jsU08pSqa8bepWqjYd2pG4iWJ%2B6zE6PnAQzFSfNJYl0zeOGBVccJA3brlzbnV3F%2FQzRh3FcIsQjAgIM9MW3Q9gMzOtHDyNJbFh52g%2FpbbB1PeN%2FPaBi%2FYZwRiw8%2FRZVw%2BIqLMJXJ8fwL%2FTgzbmb3BPjwWtZ9y5zZbue8cMhI0BWcy46HRgCcCK3cKjMmNwFcw%2Bbbs7mnpNUoAfNzn7fV%2FR%2BGQZOmOhfB6grvuU9ldCGQUYl%2FYPjG46RZSvWF%2B5betAX8%2F%2Fei1gwSyHemgpTIV7Ni5yq7egv5pAqRkJgwTTTJ%2FUsfw31Ok8ddswdJjE0obyMZf5FjKJZtO1DK8e9GZd%2F7tKj8zWyOHWMaNlCRmpruNPF906nPkUPLFL9IgvckUi6VASH29qRVbuFSaORJMPsZUMO9e4UGQTmbamJbZQxVzsZo97wHbXg1el7yV3iWXyepNuNaX8CwZAZJIpA6jCe46TPBjqkAQ5JBxG%2BiDXkZG4ngY87dqLQyImmgjpzFhAy%2Bs6FyZsBLWyT2JjzLBJcqj31lzczt9fpBjXXfs2Awgp67%2BTsteNuASPFKoesry1ooSZiK6glUwjwF8qgvL4RazcqOmfMAtwO7h43ceCE2DaykNNbS5Xj5%2BX088b7%2FscW17x765qlVzptJ0BG12LaAxGPksUvjGeD3k%2B8OLpw6MoeULP2RDO6TtSx&X-Amz-Signature=6a2c10c98fb332ab07cd939f1afd4f24f0c81727d8cc6f4c271deab3a98e5a09&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664W4B2JI6%2F20260422%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260422T204354Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEI3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCS%2BTjWHMHnqH2FCpFpLrNB6VIXAxY9Oy%2FQE%2BGyDkYcDgIgKQqsgaYmloShmfZBdG1ycFcKcekZawBgrqKHY0Xwurcq%2FwMIVhAAGgw2Mzc0MjMxODM4MDUiDG97A%2BHunbliKS3lVCrcA0F%2B%2BYK20H%2FkenA86iZECvfNToWP6r3CZndJ4bXC%2B1%2F40rK9vSx8eItzR15SJgbLyLmtQPYwKVfwFWAz2olspYTGD9Efl%2BVy8IGqfI65iHGgeYDZxkVtt1Yl5vy16kUoXOQOWfscV5PsvEzR6WQ%2BwDnQtbycFwmGMvQRCGk7uIHmZljHaG12699JR6EYf%2BwAjYqsDckDdn0EA8zzF%2Bdf0dav3eaEdBhjh8MTNJdCUJdYuO4YYHoRMF8RT39cW4LyTeaDyDeQeNLIHxqLMT5nHkOXryeKB%2BgrhgMsW8dTCjd3UKRqrsLte0CM3Ce0PPBHcC7x4nSWj870T39xRLu8YbcdPGTGVgRpdYJNGT0o3BBydSquMVVVeTO4vJDZeeaVYtMjUb9LQcRnUx6x4LsZoc2EuVTYS%2B8BKMyzefkdr0IJ%2FdchWMRuui8xgCqiXQMzwgrW9EoFlRm2zey8br8yQIJm4NGBulsznS1d5ARfBbtnmPFKjs5yc4krJPYLISIKmKfadYvMjo3h7nkb5JYo0bOdZ17r1dBMHDczHrVT%2Fx2c9uVydHdt8Ldyxd7jSjgNk9hObNmrrB8Ce2ln8aeUmuWaHx11aOenTNnZSqGJzKs0hBSZvq%2FZE2B%2BLnCvMIDkpM8GOqUBVEQ%2FZ%2BCj7N3I%2F5J%2BazQ0YH2VsXxntrDCwmcnSewS%2FUADrbU%2BEoBrDRyvhJkBH1LwzUhXhMn9qlZNddt4AdNKqQi62csLZYBBtJ6mEPNBY8RsqJDfHx0WUBaAurbERn8ay%2FM%2BQLRh%2FUoI11IuFns4pdUlMKx00hOMbkYF3Q7OBeki378sD6yzGbEWQorAP7X7YVNZ4jgV8aTzgMWZmfUkw6h6nWlq&X-Amz-Signature=013b95bfa2661bf0f7edfc4fcee992a6318da1af736fa634dc93510d8c424fce&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XTUAMXLD%2F20260422%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260422T204358Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEI3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDD9tTQRZDiJttwRvprQFtYn0hfgjVpSxgsmXbanwaT6wIgLxOSwppF8mALTUHdI17lfhBgpIFW0OzDk%2Bzo4eQaPhcq%2FwMIVhAAGgw2Mzc0MjMxODM4MDUiDLYYNLWz81TkQlJIvircA%2BzkqI336N0D9%2FsMY5jlH5plPOGO0iPhxiiHjDdeN71ipPIx7cMtGsgoUGL3zsl%2B%2FK%2BzfxGILm1a6xYkubPYk5aHrcRJ7C0LgCT55wpYHh76w37p2bRFzYqqVpH12imRnr8RhZEbLmg5VbJOX%2B60MKIM9qIjy0st0sukUH%2Fq3iKRdMbESrFtyIYteMnO9NQIUSCMhc%2FyqaBRqc7hL0hvNiJNswBkxQ046aHJi8F6k1eEoJVfcQkvIJOtmmydh9lVg5MsNTg0Vto2E8FE%2BCt7glPuK0QuFz%2FsJDnELuWx36334jq56OZVFUmXUcsW9EtszDenIJzBwxOt7LThgMrIj%2Fk%2F1ooEOZHZw0HlxFL77kJLivpotooghmMtE3SygyRiRB6rD58Y2I4vfiNiiir4cJQXi8C%2BGPk8bPxFa3z%2FDMedaACtEYS%2FtSINPbK0lje9H%2B1Nupx%2B2jCDv8zs5Lfmz6MthAqJccdJtJ0LesorYYRKV%2F2y7pYX3KF42yD135LD2lPprnrelOtmF%2B6cTJlyJpXr3BwTJTUUWGKsPOgoGG6Z68IEzg7pqaCwyeivoR9i%2FYircnOJZ813ARFW%2F3rRcO6cbytGoCc4%2Bf3yfszUn62XDzM8cwkc2tr65ujzMOHjpM8GOqUBOtaXklTpAW09b8DAwuHUPrf12KRBvUgeaHm6msLRbtKbNkgAacxfMfMRu2EdRTCEeD6omVc4%2Bk%2FKOEXFLQSC%2FywifyTeZZw6HDmmrmFp0bDdnSs%2BwUWmr3GAadXaHdbgsgwvwhaatvAfvPcdQ1TZAJJcbKd2%2FAlqlPkOz9khQm%2FXJuFjcxdDhXpko8VYI8NohPruhsvqLkeihS2KVAQIbSw%2BdXOW&X-Amz-Signature=b734e8fa6c156e5d03455677d5f577e7fbeb8a0a614c7fbb6596fa45406869be&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XTUAMXLD%2F20260422%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260422T204358Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEI3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDD9tTQRZDiJttwRvprQFtYn0hfgjVpSxgsmXbanwaT6wIgLxOSwppF8mALTUHdI17lfhBgpIFW0OzDk%2Bzo4eQaPhcq%2FwMIVhAAGgw2Mzc0MjMxODM4MDUiDLYYNLWz81TkQlJIvircA%2BzkqI336N0D9%2FsMY5jlH5plPOGO0iPhxiiHjDdeN71ipPIx7cMtGsgoUGL3zsl%2B%2FK%2BzfxGILm1a6xYkubPYk5aHrcRJ7C0LgCT55wpYHh76w37p2bRFzYqqVpH12imRnr8RhZEbLmg5VbJOX%2B60MKIM9qIjy0st0sukUH%2Fq3iKRdMbESrFtyIYteMnO9NQIUSCMhc%2FyqaBRqc7hL0hvNiJNswBkxQ046aHJi8F6k1eEoJVfcQkvIJOtmmydh9lVg5MsNTg0Vto2E8FE%2BCt7glPuK0QuFz%2FsJDnELuWx36334jq56OZVFUmXUcsW9EtszDenIJzBwxOt7LThgMrIj%2Fk%2F1ooEOZHZw0HlxFL77kJLivpotooghmMtE3SygyRiRB6rD58Y2I4vfiNiiir4cJQXi8C%2BGPk8bPxFa3z%2FDMedaACtEYS%2FtSINPbK0lje9H%2B1Nupx%2B2jCDv8zs5Lfmz6MthAqJccdJtJ0LesorYYRKV%2F2y7pYX3KF42yD135LD2lPprnrelOtmF%2B6cTJlyJpXr3BwTJTUUWGKsPOgoGG6Z68IEzg7pqaCwyeivoR9i%2FYircnOJZ813ARFW%2F3rRcO6cbytGoCc4%2Bf3yfszUn62XDzM8cwkc2tr65ujzMOHjpM8GOqUBOtaXklTpAW09b8DAwuHUPrf12KRBvUgeaHm6msLRbtKbNkgAacxfMfMRu2EdRTCEeD6omVc4%2Bk%2FKOEXFLQSC%2FywifyTeZZw6HDmmrmFp0bDdnSs%2BwUWmr3GAadXaHdbgsgwvwhaatvAfvPcdQ1TZAJJcbKd2%2FAlqlPkOz9khQm%2FXJuFjcxdDhXpko8VYI8NohPruhsvqLkeihS2KVAQIbSw%2BdXOW&X-Amz-Signature=b734e8fa6c156e5d03455677d5f577e7fbeb8a0a614c7fbb6596fa45406869be&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XWXS7NHI%2F20260422%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260422T204358Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEI3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQC7sb8PnjDA7d0FM1acdpShXN5rvWPixCcNu6jomXowqwIgdqrMAZ0FXn5u4zBdKaP7NylHAfcQbYx%2FeSqYQjDQopMq%2FwMIVhAAGgw2Mzc0MjMxODM4MDUiDK4TuSdJ1aXnkHNTdyrcA5DPHnVPzdT%2BOqBv0I8Yu3c3Ic6%2F6PFXdAcd4lb87I%2FsoGHV9q%2Fn7LJA0FqtdnzaAFNimJPYqf0F0kfmSMbzHK0Q5T%2FTdkYa9EsPOhBPwiNTFqg87cJHbIqKh3MCYnwYblan5Pyoc9hwkimd8hAf53i6mdCI0QIdK2znJfBfvgITvetKyTs%2FKdnG2nb5XlJ8hWq5XB7t%2BY%2FZla9IIUXPpP0P4GnUaPasZwUVWh08mGsvefrQ0MtQ1yhp29rwrR757XqnUupXS7Hx%2FZqSS9HS2O6awQXfmVVqWL4kLYSSPhlMwx%2Bl%2FwquiwI8CoeuwDbkcrOC%2BnaL%2FPEhTVvZx3gyufrruTnv2%2FSB4QiX0xWLFkd%2FlnjwaK88b%2FGXz1AXC8LazVykeR8Z8T7TbT4TxnJ69aBdVEDthRiW5Q0liJHfsu%2BuOENtAl21%2FAqMvrSnPSdtZeXWRLl7MHtO%2BR1DwDGeyGBXyK5JUfT36Pj9Dsl4pEDPuHWulMq6YUv%2Bq%2B3cY%2BvT%2FECG%2BHT2%2FOZZ0AgspEj7YEiW3knJOI9PfslkqZY7z7b4KUaMzsqH4rFOKBS3yH6NxY21D1YJa6DmbDDz%2B61mHXttIgcpBR5tbo2Mt5aouarCWWk8mmAef8upBHFNML7jpM8GOqUBWB4XOU5QZHBfdyYw3B8udCzzul1Y%2FukXVbDlmgy520WNvAkpRS%2Bb0J%2Fkb3a3Op5sRYWczwNXGs3Yrfa9%2B6t2ayYoIg9r1rSABv9u%2FQWbc9mZZYNBQ0rZP3XL9fu0QIplTVmeGIKvEJwaiYhNAAYmDJmA0z45kPxZ41Pjbnhv0RgHoSKMPo8suzg92TqvQjiVK4o6LnNp5Fl8jj5rZ412li%2BEojOD&X-Amz-Signature=d8bcdc8e03e4f55e53e84d3e4b0c46146ab2d91fca3b0eee32b1b0a8c31f472e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

