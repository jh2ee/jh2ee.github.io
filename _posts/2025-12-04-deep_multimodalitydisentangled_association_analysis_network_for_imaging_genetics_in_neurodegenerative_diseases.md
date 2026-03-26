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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UHTRRQS6%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T124125Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCynuI5M6cD18Yd08jglX1G7GoVJ98X7GAq8It9mK74OwIgGPq8pRMC9WHW7BzLNj8AhNP6OoRaFPQiVaXIlXcITdUqiAQIxf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDGJUl1rVbKxiWTWnySrcA3EscbOXDkV2kATElkFuHtRDinAZDIkZEhn4jJL1byqVvN6%2BXzSWd%2Bx2QamRLBUMQjBMIZ8mul0sl1Kt0a%2BGv9kxhr7HjNEqjJRoAwCLg%2F35iFVM6mv3DjOiygm1S9W4rKrVfL%2B02wQosA%2FYsoMSg8ZqqCb0aSks%2FJRh5pNi6VQadPRL%2Bum8%2FLvyPkQdrGREfJYdlSyMylRkTr0JHAksmdMWhBonXzmKi786j%2B1%2BIrveCN6IZxFJDzj7LPNCL72B%2BFCqRl3LC%2FLSqaguYTilSzrQM4XW3jJyv6zFDrRRU3WZ6RQfBKP1Qz3ZrMCSgCksi1ke2V5iNA3XKgM8keIRjvJJkF%2FhsDr1ik88pSp%2BAxSM1MM0oqePVAkhHHwK%2F%2Bk7vTYK1wsrrIVxIw%2BUSl9NwHDVLpQPFxjjPiIowCvJIDjn%2Fuil%2FRcNnypxskqojShNgPYhljKN5vZj9%2BllRDlfJshRJzTFVOIi9y%2BD9Em5PRH2vemPphPvx3gfhxU0LZDYj%2BPnfRJFc8FjuXXyjCM5ZaCfkB6Uc1Bnw9bCJ3IhKGa6IDeHS1RD5i9%2FS8D7rQp5sNzRoNQGUIYV3oSrWE5xB2CwOQ8pjPU4IJuz9%2BviJAQee4Kqt5jZ%2BwFXgyraMPazlM4GOqUB%2F8NpTNQwj2hzn%2BRDUApeilAyOlhRU389UBBDnP82tdlBiaHcfGIOvRF%2BKZWrmfGaStZh9kwDOmLRbVirPgPLNiDmZtewwvnCaXSPlBmFoz5sNih8jbLKO5TIUpOogYVWoUGF2k6UJlwtaSLMXgyfRuLaev5zO6pXJ62e6OEuRb%2Bc3RuTk0nPRHM0ynPfQmUa%2BA%2F%2B3wTyVbpXa8lQTj4IM8Jil5KX&X-Amz-Signature=f0766f36359b94babd813f47ab9eecfda4403a1610692094df5a98754f94cdc3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UHTRRQS6%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T124125Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCynuI5M6cD18Yd08jglX1G7GoVJ98X7GAq8It9mK74OwIgGPq8pRMC9WHW7BzLNj8AhNP6OoRaFPQiVaXIlXcITdUqiAQIxf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDGJUl1rVbKxiWTWnySrcA3EscbOXDkV2kATElkFuHtRDinAZDIkZEhn4jJL1byqVvN6%2BXzSWd%2Bx2QamRLBUMQjBMIZ8mul0sl1Kt0a%2BGv9kxhr7HjNEqjJRoAwCLg%2F35iFVM6mv3DjOiygm1S9W4rKrVfL%2B02wQosA%2FYsoMSg8ZqqCb0aSks%2FJRh5pNi6VQadPRL%2Bum8%2FLvyPkQdrGREfJYdlSyMylRkTr0JHAksmdMWhBonXzmKi786j%2B1%2BIrveCN6IZxFJDzj7LPNCL72B%2BFCqRl3LC%2FLSqaguYTilSzrQM4XW3jJyv6zFDrRRU3WZ6RQfBKP1Qz3ZrMCSgCksi1ke2V5iNA3XKgM8keIRjvJJkF%2FhsDr1ik88pSp%2BAxSM1MM0oqePVAkhHHwK%2F%2Bk7vTYK1wsrrIVxIw%2BUSl9NwHDVLpQPFxjjPiIowCvJIDjn%2Fuil%2FRcNnypxskqojShNgPYhljKN5vZj9%2BllRDlfJshRJzTFVOIi9y%2BD9Em5PRH2vemPphPvx3gfhxU0LZDYj%2BPnfRJFc8FjuXXyjCM5ZaCfkB6Uc1Bnw9bCJ3IhKGa6IDeHS1RD5i9%2FS8D7rQp5sNzRoNQGUIYV3oSrWE5xB2CwOQ8pjPU4IJuz9%2BviJAQee4Kqt5jZ%2BwFXgyraMPazlM4GOqUB%2F8NpTNQwj2hzn%2BRDUApeilAyOlhRU389UBBDnP82tdlBiaHcfGIOvRF%2BKZWrmfGaStZh9kwDOmLRbVirPgPLNiDmZtewwvnCaXSPlBmFoz5sNih8jbLKO5TIUpOogYVWoUGF2k6UJlwtaSLMXgyfRuLaev5zO6pXJ62e6OEuRb%2Bc3RuTk0nPRHM0ynPfQmUa%2BA%2F%2B3wTyVbpXa8lQTj4IM8Jil5KX&X-Amz-Signature=f0766f36359b94babd813f47ab9eecfda4403a1610692094df5a98754f94cdc3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WEDNCKKV%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T124126Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDvpZq0mk6MFAcgF2TXDEB75vd%2BcVA8IQ5Q0%2BvFSmzwuQIgIdsz4XAXcp6a8q4klLt23X6RJB0QZxbB2cfD54MqVaoqiAQIxf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDIA9jWtc8sCPqC8W1CrcA9gt%2FbFZdk08A7hAOJ6mYgX9KmfYgAD%2FlW49FzvnT0yNGPh%2B3HRiFbnfrYoBDFSs0oQG05mchzeNEJvXE2VkVw4kmJ4D%2B9ypkobp7z0oUMUw12FvidkdsbYyu3xvGWqFwgFo0%2B%2BDaXwvO3Oc8hsXPJmToS9vzjjwKFvpV5SbdI90tqifjpbAD%2Fq9VWAN5XWiaTPzd6uEcpJN7B%2FgBu%2B5DnOOW5DlSBqJAzmWoheZNgI11f4UX4gTMVJn5GeBbjfI7fdRPkeUZ6SyJR7J9YW9WDAQVqdvku0FM1AuMGC%2B0iKMgLfPW9WJM99RF68W43BR3D8G%2B0YBi6SxbFsPHqFMPEGcYaprIBG%2BxyHjxSTqdjchl4XICDxN9MllpLP4ybBhRrIb4Qw2ZYql9o5mHakwFIa9Zxadmbj9GxKwtvZdBTzbHlS%2FwD70oAVxaqQ8O7CN1qYYrRpYhZxJmsTVfp6hM37tVh%2Fpn%2B%2BSpBQr1o3xjihnwB33nfc7ughKctOSArA5hOLqbmH1xUDzvuBl939J1jpmkrlhPT8kuZzoDVx7rkfmCZ9P3Fey%2FpYQhfcEHvQ3i5wx1FRwyFOcRsY1IFN9mVe7KW96f6k8SpHQpcJcwjpbXAbm6m0t2nH0sZqsMOOzlM4GOqUBa%2BDjkLSx3zzrI5Nc%2BQbF%2Bcf1wNR3CCZcRyseHBv1vdmTLMdl%2B6%2Bos8ailNp1I4pu8gJW81cztw3XWv4Uyr8dahfHg8GHjtVojO2P0Gs1tIjc6QHPBn1543jYE13IkRAtWyypVqNiCPyk6FoGcaGdGp6ATPbjf3iGP6DqqpX4noVWu5pR6%2BWAyMVDjwPZPXVe7kR19CuA%2BHv9G8cLV9y21%2F2fSDEa&X-Amz-Signature=d44b25d831ecd91caf9f02476d4f3af77eab4434431094c4fa544db9a40f0c3b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663C5EF7GK%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T124127Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCICcEz07aINE2sL%2BTnW7zDmSPyaSDGqVwNGDRlwTdKgXqAiBIm5J52wtIRVNg2OE2RAx4tZ9zEPpX1uZvt302SVa6cCqIBAjF%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMXKbiNA%2FDTYw7YDakKtwDkx%2FKwK0bbOcBp4sgmdAuq0QtS3OEX%2BhJDzk%2Fj%2FDrcq8I21k00H6KFHg%2Fz%2Fj9vUD27VsId4b53oAcvY14yhtgib3UDHBIQ423Q9NxJgZc1Xgy0SjCQyQdMQS931eAkLfgqzMcvq08epGxuQML7d%2BfFGCcaCg1sWj3q14aFOPqFDfpIqmYtDek1lKArqGO%2FR%2FhiLQB8Cg2S7v%2Be8Fhdxcl7m9w1R9tnvXstcTxvLNbfgpr%2FIQwW4oAtiz7gENJYvczwAgfNhNmOoYvRTzS%2FW%2BJKqtYA1KYyNzzlP3GovEcrMGJWDt7j2bq2BhoM21wEJ%2BPAluRPaKQwNk%2FEM10%2BEPILjSLgz6I2kB9GaYRdarXsefBQnXJQpOKfHHgXe51pVMBXThYyufyk8cdOdleNijjwD0FyGYctnCx5mH7GX2yn1SuP%2F7oB9lj9CvhyrMKiPaI7g3IsjoKIyjyRIzuqKfzNeKShQ4NmaMGg22%2FbSln5A3%2FMqvGx52TDbGYjF6R8csgfztlhbDlxaQMdcf3Md1RtcKcgDANUUKLxlrFhEZyM13kUgTII4ozf9e3w7Hve5TlPYML41jKZ2GligeAFnqvCQZ3BH7LjtfIcjjn86iSSpOb3m5BmkqTIGQcCDkw17KUzgY6pgGcKgKI8GGKQsAuK5r4prEhBIZ8bf1MxThV5E8x%2BvfH66z1oGqa3goUen2l3%2BJIIeigoMUGLaE%2F2T0fSXZHIxf6mD8lUdNIwI9tmiCgt%2BgeG7hv9ftPlr1puBFkIZrKnUttuhemrmrD1ZUHIsUfJpkty6Lpsse2rJ1CCDmq9r9DmBk2hrApjM3vayz66d5i6il7bKsRfEryGxPKC%2B8LnBRAoFTUN5Hf&X-Amz-Signature=c326d5d53da0de4cb36e73f52c8e169e5780f6ee5bbbdff35f8eedb0f1ee99cb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663C5EF7GK%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T124127Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCICcEz07aINE2sL%2BTnW7zDmSPyaSDGqVwNGDRlwTdKgXqAiBIm5J52wtIRVNg2OE2RAx4tZ9zEPpX1uZvt302SVa6cCqIBAjF%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMXKbiNA%2FDTYw7YDakKtwDkx%2FKwK0bbOcBp4sgmdAuq0QtS3OEX%2BhJDzk%2Fj%2FDrcq8I21k00H6KFHg%2Fz%2Fj9vUD27VsId4b53oAcvY14yhtgib3UDHBIQ423Q9NxJgZc1Xgy0SjCQyQdMQS931eAkLfgqzMcvq08epGxuQML7d%2BfFGCcaCg1sWj3q14aFOPqFDfpIqmYtDek1lKArqGO%2FR%2FhiLQB8Cg2S7v%2Be8Fhdxcl7m9w1R9tnvXstcTxvLNbfgpr%2FIQwW4oAtiz7gENJYvczwAgfNhNmOoYvRTzS%2FW%2BJKqtYA1KYyNzzlP3GovEcrMGJWDt7j2bq2BhoM21wEJ%2BPAluRPaKQwNk%2FEM10%2BEPILjSLgz6I2kB9GaYRdarXsefBQnXJQpOKfHHgXe51pVMBXThYyufyk8cdOdleNijjwD0FyGYctnCx5mH7GX2yn1SuP%2F7oB9lj9CvhyrMKiPaI7g3IsjoKIyjyRIzuqKfzNeKShQ4NmaMGg22%2FbSln5A3%2FMqvGx52TDbGYjF6R8csgfztlhbDlxaQMdcf3Md1RtcKcgDANUUKLxlrFhEZyM13kUgTII4ozf9e3w7Hve5TlPYML41jKZ2GligeAFnqvCQZ3BH7LjtfIcjjn86iSSpOb3m5BmkqTIGQcCDkw17KUzgY6pgGcKgKI8GGKQsAuK5r4prEhBIZ8bf1MxThV5E8x%2BvfH66z1oGqa3goUen2l3%2BJIIeigoMUGLaE%2F2T0fSXZHIxf6mD8lUdNIwI9tmiCgt%2BgeG7hv9ftPlr1puBFkIZrKnUttuhemrmrD1ZUHIsUfJpkty6Lpsse2rJ1CCDmq9r9DmBk2hrApjM3vayz66d5i6il7bKsRfEryGxPKC%2B8LnBRAoFTUN5Hf&X-Amz-Signature=8287bac017ffd84d6aae33646312ab21be2d6520eeee1c00bc5f35e638080053&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667BJSSRBV%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T124127Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIFdmm%2FLQHieWr1UvW63jJxxL8AA%2FjDiw4mYiJqOJYHgiAiEAmGFgapi774km6GRode5PjoVYO5mwevseVkOuAArYwt8qiAQIxf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDEQfrR1ZLa5nLGeppircA1YhLZOvrDmVXhDHHrDTF9q17l8ailYU%2FgYM9f4wM4a4rXdAVUR96sn9HxdYl%2FHiql3f2S5RshdIYlOygDujBVW3%2BHrVt8qWKuPbZe6fYBi185JMdy%2BMUjaR4j3S7Wg3jgS9zS2qECXlmVm5fKYUdjmVAdBISJzUUGBl%2B6nE5YkLRhlgPvYT5ovpNuD4I9GocRBKgkmZ7SRO77%2FpTLLpkUHinA3i9dlC68I8T1psbyeIYObHSxujmMb5KB110m2SHaSRKjbFRzTL8pP%2B8WrqkH33V378Qbcb4Z0qKdxY2iXMMcSXpzNTmB3JXqROBjyLlrD4eoyrxooOoejoo2%2FXILm1NuRWO%2BJ%2Fyt79CzlwzQxV4%2BjpE3esuDtaHX4JnXzc9cUVlQEZXhrPYWFlwvfbdGlSE%2F1MGN%2FcjfdyH%2BOOmVCylk2ohh6RLQfCpblwF0naP2qVmxQQgL3Pk9qID6obx8fh03BEQExqyWnXSNo3b1l63YGmg6R4hMwMzcqNtRyaFk0rF938IWjUgK1VfmBWjua7OQ5P56rB0wHSCF9BijwVyso37Dgtdhs4BohowJVMR%2FVzOej%2FB%2F3MePZkqwvGjGqrLplYEOhWDaqwpOLo2B%2BSEajJZ8o7c3YojWP0MJWzlM4GOqUBMuh7h%2BO6C%2B15Pmj6j6I96gzBSJuwsp%2BQ6sur%2BWd7eBIw6YjCt8w63EeGT3JXu4OdJoFFwulUZUqDMvTTZ81a%2FQj1r4zGjruDnkDsQTjrfmctsVUEdX69FdcKnGF%2BqFyjb3%2FbRX27%2FrZtpIya7bI6BQXwsO4Wu2FR%2BNC%2FBvCxWOa0H%2FHjFbhXztyp1W0xfe4mXwUhOxzi%2BS0JS%2F2ATOw%2BfpEoBgp6&X-Amz-Signature=f89eb3b9b1bb5308819238b359a118ea05411842f816098a520cc38bca5012f3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SOY34NPA%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T124129Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCy8CyBuDshWN8oIf%2Fu9IYiHjKWxqHH4Sl8DZ5i7jM0DQIgSdKZ6WtIafEpuWeRakLAvxS2qTD8YTQeFgV3gv9CdrUqiAQIxf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDBA4x%2F2RRt1E3b4LFyrcA4HTH7I7rfseM49NWuq3izxfMqnHwZ2L%2FPnbu%2BwCay%2B5LtA5ta3gmLl8Wlw%2BVJJRL99B0I6KxKQpo76I4vkqf0qxyxqJ7mh%2F8xFv13vHiTK2fPrTlO7jyc5JTJk12sGbnL3O7FgQqO6Pw7UBNypK44vd1Eu4VNZOkhVCGWikx6BH1TosFNDF6B2wCpTxoqw3PMDc%2ByIdzJiUVgXrnqh%2BBFclX2wSiTmusZL%2F6XXiyXShMuzfvJgqGMfreVSGOlbHfqiRktSSxHf1QUQUr%2BRMwoqYfP7TdGtY9r6rUIYRj74073ZPZejvBnAW41DjNrSlfM7Cg0f7Dgf4d6CkNPKK2tZgCp%2B2%2BCFP1GZcrxKdqR4oX7p2CZmF95bBPEhkPVYxy0JNs45B6uWwwUooVzbzf44qrdApUIWTIqYXmJrBRsqfcUQ36Y1GNapjcTZPcAX8iwJ9c8k2ppkmIwKS7XFxYimp8X7nM9fmDNbUcF5k1EO1DEdYd0rSZXeHOgR9rb3JNLKQgQ9NLL48ZY6WajKBAHgBv2jnt1hrB9JFR3QDReRNmJ%2FE2mE%2FIUIbezdoicW7ge1UuwLA9Ae8ySnmoozE0TvroMknhDPR6R6pZz%2FBppCkHdkHhoSbRzUBJnegMMCylM4GOqUBz1z8PvqejK5lb%2F%2FL1XDWF6bHfqB1H6I%2FYzzW6WGnOaNc3lc9%2FO7fm6296W2C%2Fm3EIqD8inEwIilFGReBdYJYOnPdXUZGHO2LuobPyDZrvsxJYTHs1y%2Bb1bKYm%2B%2FQje9VvUm5qRSvqaHzvgUN%2BfSidtN%2FAY0jWgRkkk7FNb8eLu5tbcJOlUb%2F9YhPRziGa%2Bxxjjw1P6ss3RBWjCqV%2FpDtECC60dt6&X-Amz-Signature=e6af3b477b91217bf709ff11be8126a0c8b6717f45d33bdd970051c41cfaa027&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466T33FGSAR%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T124130Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIB0jLgafx5k3qYstW9iUdsskAEhzoPBail5NxbpahJPIAiB62exVuo9rlxys28ON8aBn8TBb7XizP8u3wZUVvK7nPCqIBAjF%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM6nVNt%2F87ytwY%2BhqgKtwDm1Xcy3CvFp8HFDOkakwpq4RnmMS5xbNlGKc28NYCWbzQV8VIIL3JVN6SUPxnO7L%2FRU0pvj0OV5Y8eFVkwFVMU1kmGu1c4d2EuxOD7UzRX5VnvShyo8am%2FQg3rEJxUcT7XgSkBFlYma6xmkxx6OAXAjRJahldyhrBwWJtpDJZyIC9V24HV4uqK4LcazrCrpR0e6FKES%2BcnVSekEesILORrqSebPSoX%2F8ysA5o6mjsdMmRRF8N3JQrgsLhEycdDZtDgCkxrsaMG%2B%2BjQ1Hc%2FZ1akOe84Gvx9Uo6y1Qb2zC%2Byq7%2FVzgJeh9RvUO4Awd4bUUAeAMKrhBMamx25hUFpMIEnmScaZ7MnGymduCLcqZBJs8DX1hwL1K26iPNzHm4BMA2DIpWntMmdUWP8tCKLIqKVyZDw0GD8HTk%2BM96hAVTH9pfOLfdUmxlOdVIloGz1gg0La4d%2FeIfpd1jc3Ir9kOW%2FN5lTWFJb3PUlxGc6Q5NoJ%2BWatSxOqsIV%2B5ruualCKBpNsgdWZCedqknXZeCbA38Ir61UUnGVmpWNHc9ylZV3ATGkxThDnFcFQskm4ajI1LmMVng80cgQuqS0AKU1U80Nth%2FLKfNbBhsmhma%2F5B%2FtjB0%2Fxql8xv4dbCZBWMwh7OUzgY6pgHgxfVm7q6cRrIu3JvfWrVM6hDYgLbCrn08mBpdOLlm91LgcdUByVb0iQtunx2MUulB1xtLhDlsFbBBgLKsVko%2B8X9yxenZ8hXUxuvXxpBJ3tpDYKKzIKvFijUAYA5ia%2BuQszinLKELBSHqcEaSYBZ0CjSG5MDDcMY3sRKV4k8c74ajiXWm0V5lwNS%2Bs%2FMVJPWOcT7cb9Enqz4Gb%2BWAB8QCMwpY9UBB&X-Amz-Signature=fd6d65f30361af79264a2130c2b3b75a4e3b9ce4e6b028a41896b128768bd9e6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZXQP42LH%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T124132Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIFD7Xta6%2FVYHxsROglnfd7TU%2BAcaYTC11hFIbV91bhr3AiEAkAIorBaB5UJCipHj%2F782L1t8A0C%2Bc7E5o%2BmS9hJN3ZUqiAQIxf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDOwpVfT5rQGyT1PjJircAzet2%2BKaNYagMmsaGa3XiB5PFk2Pmr9nc2TWBL%2FsqwzEYQBPly%2FnDa2sL1LXqggPvE%2F8K%2FsZ%2BdFD07FWDNvZItlnIu1ymHMEWK6I7HgNPGxZeCf88BnWPeqrMJ4yZYnwepOZRtVC9cyEKRy6NWM722CbgTOI5DEdO9A1CTz8LxGYAAwetf5I%2FagFZ8X5RIoOO0%2FU0zcMS7l2XrTzvoE36Nx4OX2E0%2BEIz4ctGpAUt%2BJi2E4qTAWR3c66LsWanDpxzPxB1foP4YF4OeALAHUc7Lhbu7jgmC5E76Iu0mrk5K2kPRHbCqc3GqO4DaHwicy%2FfLx%2BUh6XAUut%2F1LFzS9b7ytSZ8WRoe4dtpgq%2BUC7Ic%2BTAK7y5wQGJ2PBnLr1BBgdA7x1tMKR%2B4OH8Cs4lyexjHO6N9gL7bj0mAFve8%2Boaa%2Bif%2FjynNMYJscNaPqnhK8RcjLkZEXsJ8Wl1XvJJYuW%2BoAZ1%2BF6eyKTL8tkr4xoOrXNSqZGViMWRWzDOrv3YAdAuxpydC2oBVdJMBrc5fy73NX5gtPdFD3n46YuLBmlO79xn8AS5HdiaxU6VQSUh3o4dzCjbIfrbxWBjTmZAaGpY3DIk69y%2F5oI6BLUc3%2BCLtdQWqzUywspdyrIYKpAMOGzlM4GOqUBCAnVPRLywPMdbAnjmpXM7BB9DpFEvEcmbZ8EC7%2BYbJ%2FYf43KqLFD81QDQ4XtJqZJSXwKSZRiHlMT%2Fkf3kR2tRpw27bqCxtLIkc9IW9Q4nIRWCJ0c0JQ%2Fac4H8ZiW2XgauhHA1VA%2B%2FVtE5NboTqRpOXCRw4IO2SMNVCpqfbkiH8ZiWH%2FLT2SMwtqT6ei%2B5Vnpn%2BMDfS%2B9zzJ3ECXysHP9IcG9ElQ0&X-Amz-Signature=3d0c5bcd33c042efe08a35aa7eb6e394db5c7135cb924e5ab1e596890b8d3b0f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZXQP42LH%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T124132Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIFD7Xta6%2FVYHxsROglnfd7TU%2BAcaYTC11hFIbV91bhr3AiEAkAIorBaB5UJCipHj%2F782L1t8A0C%2Bc7E5o%2BmS9hJN3ZUqiAQIxf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDOwpVfT5rQGyT1PjJircAzet2%2BKaNYagMmsaGa3XiB5PFk2Pmr9nc2TWBL%2FsqwzEYQBPly%2FnDa2sL1LXqggPvE%2F8K%2FsZ%2BdFD07FWDNvZItlnIu1ymHMEWK6I7HgNPGxZeCf88BnWPeqrMJ4yZYnwepOZRtVC9cyEKRy6NWM722CbgTOI5DEdO9A1CTz8LxGYAAwetf5I%2FagFZ8X5RIoOO0%2FU0zcMS7l2XrTzvoE36Nx4OX2E0%2BEIz4ctGpAUt%2BJi2E4qTAWR3c66LsWanDpxzPxB1foP4YF4OeALAHUc7Lhbu7jgmC5E76Iu0mrk5K2kPRHbCqc3GqO4DaHwicy%2FfLx%2BUh6XAUut%2F1LFzS9b7ytSZ8WRoe4dtpgq%2BUC7Ic%2BTAK7y5wQGJ2PBnLr1BBgdA7x1tMKR%2B4OH8Cs4lyexjHO6N9gL7bj0mAFve8%2Boaa%2Bif%2FjynNMYJscNaPqnhK8RcjLkZEXsJ8Wl1XvJJYuW%2BoAZ1%2BF6eyKTL8tkr4xoOrXNSqZGViMWRWzDOrv3YAdAuxpydC2oBVdJMBrc5fy73NX5gtPdFD3n46YuLBmlO79xn8AS5HdiaxU6VQSUh3o4dzCjbIfrbxWBjTmZAaGpY3DIk69y%2F5oI6BLUc3%2BCLtdQWqzUywspdyrIYKpAMOGzlM4GOqUBCAnVPRLywPMdbAnjmpXM7BB9DpFEvEcmbZ8EC7%2BYbJ%2FYf43KqLFD81QDQ4XtJqZJSXwKSZRiHlMT%2Fkf3kR2tRpw27bqCxtLIkc9IW9Q4nIRWCJ0c0JQ%2Fac4H8ZiW2XgauhHA1VA%2B%2FVtE5NboTqRpOXCRw4IO2SMNVCpqfbkiH8ZiWH%2FLT2SMwtqT6ei%2B5Vnpn%2BMDfS%2B9zzJ3ECXysHP9IcG9ElQ0&X-Amz-Signature=59d49335ba870cc01fd855b2d8d43f34784a9e3d79febd8713784cb9c1d4892f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XPIRZ56N%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T124120Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCICetWm%2FvenT%2B8j2JWc1EQ7KZG3ernyY8LtlYtYsxzswLAiEA%2F58Q7mjtYQkFFMK2oyZq0pqcMLVJ6e%2Fl%2Bz1rPimSHLUqiAQIxf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDFHYj0FxW7441CEQOyrcA2TxvRZYYhOu4AGaHYbLqFWRNHqqXr8%2B%2F90S6fuHdp3JPNzPvm9uO1qopriInv59eXsdcGV0J0y8HtmxCQnYMPhK83JLT5DZdkGhRxdKcCwMpSL%2Bb82PHBAbHtCKZb6nAdJpUOu9%2FuqZ2dSMDkRuF83FJvUtnvXWZTs8ggqJ7ghlKjGzuCj3e6JrYxSVmAm49JIO%2FSHc9Pmpf64ZzgfN%2Fw1Hkuw%2FZNEqNX%2BrtDo1xoFExbI2VijIrUqRuZQvGNtpteNtOKks1krMSNhjhFFluH6hJM%2BPRordjo5VfZeVt13P2luRnA9VrltxmaNlLYzCk9KontjzAfAOFdchQl2JMuL6N3lXOm4JUQZdcwVSc5Xg4IRBQ6nol2LeRHELGv0m5poCFrnl63905UROYDR7TfZQne5h2krjW5rhjuPsh8rIbqTx1bed8Rp5b%2BmNXbwfszHCSPyLCsbniS6hLrq0DLmIY5nOrqkbYDPxrUUnUJVUFd4J%2BxQ%2FgZsYYNhB7P6svErvUPzJ1JC5Sa%2Fm6YW25ykKDUWFPD9PeB%2Br7J4%2FPA5MfDT919kozmgOPOb5W5WP3rGUTPid9b0n6VOctGBAh2ghx8Ffs1hOFVDbktZl%2BsKBzVdyjn0MWlWog6h7ML2ylM4GOqUBK8qxvAZmTLekr3unJicugV0aOW%2BAexmFMBhm3QaRS2gb6xYlHoF2%2B9Ivj47vH%2BKGscdllIdKg7kCjZyCJRyrjmzDS3IfBZspDqUpS1LOkD59SG42XPSv1VOUK0a2H%2BLDc63jnE3UsrX0NF%2BglrArPEqdszdBbw8f8nP5cdGNgXSDpIglEBpc3oFxxH8sMIzoBn1TaCxZRN3SPiCCuPggmQhqiJ4X&X-Amz-Signature=61dfa29e1c6cfeda1187d4ac47dad38ec3d6a517bf48f3158f9ada0b56355672&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TMNPDIKE%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T124133Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCzzY9jh1ZHxeeQdrcTbNqG3%2Fk8JTHsYuqs96d1Lan6NQIgTPTSNTV1ZsAypp3sCsqeum4n%2FXqgsUw0oLJmPMUsO8cqiAQIxf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDJlLu4uHy9sVyv4B9ircA047HFe5qEe0s6nqdnnSAXdiMgkvWYuNFNVA9Vr%2F%2BVeABKi06esdOi%2FYE4vWyL%2B12gelY7wSZqG0c0XqShOuecVnlqwFb6m9nJoQ7JyEPoLHyxblQTLx9L9i48GEGph32gKOgVMHGRSGw1Bez3KAfePkFiK9ArYqWIFC09t87qNPAcJx5DavOfnkVIQpwY1W9GV4h6yUm8%2F%2F6LOM1CVIJetsrZBfz8ANFlCVQD3oAzJyDX8OTpc%2B4V7Yx61o0hCrAjgXTsm1GB%2BsE1pKzHv1g07E7KVlkZlH3uSiQQPiMpFJe3hntYwjzol8eihQpRvEx7CBoZW3pV6AEOc%2FdUec4Aa6erSzIjG9zl%2BxMkTDFvCg06NF%2BeT3x1jcoMB0MvQdWePA1g0fM42NpmghwA5lwiQFp14HdTtkdypvi1V%2B28j8k%2BEHPeulkmq8cgoZskDv3PMDlZ%2FyqIyLYtG9qidh3uSZinJ1qIVMvzqq1GjSZxyp1Rkh5HM52rbkiGPir0Tbmf1wjxBBhT1TL3SgqobFI8jseMapfmh7PUndYhDkENtzE89bxgiMFizxCV7F%2B6e6FGQmh%2Bp5zQaWLMt398dcqun07M5fUNea5OUqRRxehmFiAlUMW54EGtpEC5ymMNGzlM4GOqUBjK5p%2B6G1H3GDlBTRU1TP37al4sfjceOWKkpdhz1sTPduXNmwp%2B3%2FmpQK1nlEeriMsvFYPSq1%2BBbQc4Q8L3JAIpRWg4HYOA62sbi6iYA5CrFTSS3%2FwbiuT2BaqIWDKO5tdjn2N8CbvNlk3PBDb%2FfVMX3y2IwrzErsFQ7We6RitWE%2FoUWm8GWzsj%2BjCI%2FxiLvUI%2BFNTdhlvwy96QFQH4mfJISl5dw8&X-Amz-Signature=d36f2321551d6ac8ea5edf83b49f253bfc69fe70afed82d0a104f68b0e480e40&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TMNPDIKE%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T124133Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCzzY9jh1ZHxeeQdrcTbNqG3%2Fk8JTHsYuqs96d1Lan6NQIgTPTSNTV1ZsAypp3sCsqeum4n%2FXqgsUw0oLJmPMUsO8cqiAQIxf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDJlLu4uHy9sVyv4B9ircA047HFe5qEe0s6nqdnnSAXdiMgkvWYuNFNVA9Vr%2F%2BVeABKi06esdOi%2FYE4vWyL%2B12gelY7wSZqG0c0XqShOuecVnlqwFb6m9nJoQ7JyEPoLHyxblQTLx9L9i48GEGph32gKOgVMHGRSGw1Bez3KAfePkFiK9ArYqWIFC09t87qNPAcJx5DavOfnkVIQpwY1W9GV4h6yUm8%2F%2F6LOM1CVIJetsrZBfz8ANFlCVQD3oAzJyDX8OTpc%2B4V7Yx61o0hCrAjgXTsm1GB%2BsE1pKzHv1g07E7KVlkZlH3uSiQQPiMpFJe3hntYwjzol8eihQpRvEx7CBoZW3pV6AEOc%2FdUec4Aa6erSzIjG9zl%2BxMkTDFvCg06NF%2BeT3x1jcoMB0MvQdWePA1g0fM42NpmghwA5lwiQFp14HdTtkdypvi1V%2B28j8k%2BEHPeulkmq8cgoZskDv3PMDlZ%2FyqIyLYtG9qidh3uSZinJ1qIVMvzqq1GjSZxyp1Rkh5HM52rbkiGPir0Tbmf1wjxBBhT1TL3SgqobFI8jseMapfmh7PUndYhDkENtzE89bxgiMFizxCV7F%2B6e6FGQmh%2Bp5zQaWLMt398dcqun07M5fUNea5OUqRRxehmFiAlUMW54EGtpEC5ymMNGzlM4GOqUBjK5p%2B6G1H3GDlBTRU1TP37al4sfjceOWKkpdhz1sTPduXNmwp%2B3%2FmpQK1nlEeriMsvFYPSq1%2BBbQc4Q8L3JAIpRWg4HYOA62sbi6iYA5CrFTSS3%2FwbiuT2BaqIWDKO5tdjn2N8CbvNlk3PBDb%2FfVMX3y2IwrzErsFQ7We6RitWE%2FoUWm8GWzsj%2BjCI%2FxiLvUI%2BFNTdhlvwy96QFQH4mfJISl5dw8&X-Amz-Signature=d36f2321551d6ac8ea5edf83b49f253bfc69fe70afed82d0a104f68b0e480e40&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U73SVFS5%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T124137Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDi%2BqUU7Nzg3hoy1ebLmYnbWmSHK2omI0kwsvGKC1xobgIhAJcLmIfD8%2FjqRfW5v%2F5DWk%2F3fYg1pGjCR%2F7pOcjpsFiNKogECMX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igw0a70183zfCcQVomoq3AMWFvhYbv9wUISlArUqsJTu%2F%2F9jV%2FEdF4exWEclgwuT1FFi2T1DQRcxIjjaVCWkG8DilQbTP2eh5XLasyrFa9JqWP5rVwBGzvg9d1Vm54F2FPXg79E9xN9TtFHbJqV6Gyn87ueU1C2Stmmo3cqZPHgLIqEeRpMLlrLUBohPnGHVF%2FvCaDGsqULjp%2BZbwYczhQbLwbC0BGAVL%2B09vG87I1tipWbY4T7XM7yKM3hFwu0FRpr1WZrIZIUoSLzebg%2B%2BFOqdGlrocD707cdQd4rHId%2Bu7k0sjpa4Ml%2FcAZ1siwHBLY8ynCZrQSPBbJuwdjcUae2ioHdXjwYy7pM0sVacJOkHSOgzh3qVGNT1ApQ28iUszOGOyp6Ab%2BDG9lWluZ8hF8Icy7h7OzCez1yx6qXrEv%2Fq3WbnN0b6CJ1hc%2BdX2hTGo7J2TrBQ6Z%2FOZIBPmYDHVioo6CGkuY1ZEoFq7p%2F91zLO0ZsWK9PVcW8idtlm%2FreQICqk%2Ft3HnYIDobMXY4eodv03e4LDSG0LuRd1u1wpbs7X0ON9K180OyRKw0Ns5JGxmaqlDpXydvYaqJ%2Boe%2BroNHis5D5YJDhxCpy6ZdcXYinzfSwJc7QEH%2FZIA%2FztiiCyFvHGiurCdJFhoH2YYTD7s5TOBjqkAbCrxN2Ie4zC09MA34cQpuhvcgkL2E%2BWNy9Xwb7X%2Be%2FsvXF7d9jkkfdcw%2Bdda%2BHDRMEtInlQKfuT368Ov8OjRoGjSWTIMkC9zPnnqFzDKnQaMftFdcAFhNXLwkJuJXF2cD0kCZ2dFSudVaf3roaf8ykfjArhiMHxjfIUr12snPcGVv1nWs%2F1I2kxKKlHHIDPwP%2BmLY4Ipsu%2BidLjlV%2BGd67u17Ha&X-Amz-Signature=012d725625c2c1d8d2c77cb1100534523ca789b7062c2419532aac4a91e5f81f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

