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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WNOQLBJX%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T163840Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBAaCXVzLXdlc3QtMiJHMEUCIQDYS%2FCqRuhr8eWduehZRkqi9VkZd87NAfLBJosTEdOTOgIgKEUGJk6nQIuJsMw8y4MML%2FpKHdWZeUtTYIuoIUFH4%2B4qiAQI2f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDPpqewce8wsjlj%2BGTCrcAwWpr%2BOTvS6QwLLVwC0TDKa0AUSvE8%2BANof38QbYkmh5R%2BzbooR8CbLJEHTRWMiQvJL9d8TQ%2BU5N4fLrNYaTa1RVHqpbpiMOyvKotwyoejg87FKlYYPUghX9UlrbvT0s4yPsXIFKxV3wvtOR1xIZU6MVy61vDf6RzIU4RnNEYOJK7e9ChSnFtyUgbwY8pzfh9U6KHDYFbek8LSHUeLd4SrKyrPASFxvjgr1PIOv9sDqvAoUAl7bstuZy9ibL0%2B%2Blfd%2BuBeeTomoNrlFwsxunt3jZ4MNR6gbEdTqgG2s5LCionlU9ROC6QVehGNf3JzF4lXfvVXnotY3ZX2qBnmw%2BTSp3kQF6OK%2BnG8C1cQoWwXE0QCet3lQsGn0rrqsBJ1w85kJeYfAmvZNy8%2BSkeryIxGhqRGV2laUWf2CbIVseIH7LMwvz3cwNSwCiRoECAcQ4fJxc0MiiqtbUHS4gNSNNp5RDueHIEDxwbWfAjALujhEgzYVpx8MRYEpqkLeqELK739KuAs8eAa1R1SaUOM9Cgm8d7ei8a6L3XnnvmNBXwNDmF6GFIv1ADcWHcDjM35biFt%2BzOhlUFF0RD9iwqg%2BOPm9Q4TEHl%2FHeVvrneUF8KRcUvxZdIJysmr4W5H32MMi4ic8GOqUBMiA1yCIPL79qv1%2BFmm9QgSPe7iF7a7d15D2hbdi3NMB%2BhQewZAfnUMiu64Z%2BUhVJWiiM3YeBNdXQ%2BSfjktlW%2BQtDBbi%2FgdIh5uIdSgkwzgO9PJ5Z1%2BMupsEqcsF7eVfcG%2BLc7BG7d4zNbut65JgJY7zK2V%2BwkocBb30JAHgjQz29wU3qiE3bNuGHjT7h7DujIrDOUvflrJMj4cZ4lViVHeGtR%2B%2F4&X-Amz-Signature=dc060b7edf712775361646f0274dfae343b05b4ba9ab5b5c64b8453e5314885b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WNOQLBJX%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T163840Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBAaCXVzLXdlc3QtMiJHMEUCIQDYS%2FCqRuhr8eWduehZRkqi9VkZd87NAfLBJosTEdOTOgIgKEUGJk6nQIuJsMw8y4MML%2FpKHdWZeUtTYIuoIUFH4%2B4qiAQI2f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDPpqewce8wsjlj%2BGTCrcAwWpr%2BOTvS6QwLLVwC0TDKa0AUSvE8%2BANof38QbYkmh5R%2BzbooR8CbLJEHTRWMiQvJL9d8TQ%2BU5N4fLrNYaTa1RVHqpbpiMOyvKotwyoejg87FKlYYPUghX9UlrbvT0s4yPsXIFKxV3wvtOR1xIZU6MVy61vDf6RzIU4RnNEYOJK7e9ChSnFtyUgbwY8pzfh9U6KHDYFbek8LSHUeLd4SrKyrPASFxvjgr1PIOv9sDqvAoUAl7bstuZy9ibL0%2B%2Blfd%2BuBeeTomoNrlFwsxunt3jZ4MNR6gbEdTqgG2s5LCionlU9ROC6QVehGNf3JzF4lXfvVXnotY3ZX2qBnmw%2BTSp3kQF6OK%2BnG8C1cQoWwXE0QCet3lQsGn0rrqsBJ1w85kJeYfAmvZNy8%2BSkeryIxGhqRGV2laUWf2CbIVseIH7LMwvz3cwNSwCiRoECAcQ4fJxc0MiiqtbUHS4gNSNNp5RDueHIEDxwbWfAjALujhEgzYVpx8MRYEpqkLeqELK739KuAs8eAa1R1SaUOM9Cgm8d7ei8a6L3XnnvmNBXwNDmF6GFIv1ADcWHcDjM35biFt%2BzOhlUFF0RD9iwqg%2BOPm9Q4TEHl%2FHeVvrneUF8KRcUvxZdIJysmr4W5H32MMi4ic8GOqUBMiA1yCIPL79qv1%2BFmm9QgSPe7iF7a7d15D2hbdi3NMB%2BhQewZAfnUMiu64Z%2BUhVJWiiM3YeBNdXQ%2BSfjktlW%2BQtDBbi%2FgdIh5uIdSgkwzgO9PJ5Z1%2BMupsEqcsF7eVfcG%2BLc7BG7d4zNbut65JgJY7zK2V%2BwkocBb30JAHgjQz29wU3qiE3bNuGHjT7h7DujIrDOUvflrJMj4cZ4lViVHeGtR%2B%2F4&X-Amz-Signature=dc060b7edf712775361646f0274dfae343b05b4ba9ab5b5c64b8453e5314885b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662KN42SJP%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T163840Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBEaCXVzLXdlc3QtMiJHMEUCIQCKiKiohP42GCqetQxwoKCChzI4rKW3gThJ2RlMrXRVXAIgCH8frpj%2F8K2PQ0W0GH89Bv6bXffn1I6Ck50JYlN9oVEqiAQI2f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDBeoAhThdk239Ldv0CrcA%2FC%2Blp7Ij%2BrVoCzXhos9ip2pgFP9BFspK1JZLysPXkEYUATByykh72efwgsTZbe0FNgNeG7lesRXAh1RDFxkRjYwI5be%2F3eJtfUo8IzApkx6TyPadHNFkSXON1Ms33vmgb8OJagYiCyklZ2brUbo353NlpZ9EhImEOKiAcyt8bdGBEkeiaLo%2FCmjHKNG%2FscRjH0xf8JVT%2FWuIY%2BKANpMpmnRM62h4D%2BtC%2BxVNyVg9q0hBDfSUcB9rnUwnrPvkW%2F3FRumppQ6klEJYYjKVN1%2B8kjqfGOSrylbcDEJcAv79Klafvy9unZ%2BQ3FSlaIiKdu%2F9MpBAHWPDV13fexnWtxzpbXUpmpBeSAeWt27yI3kttOGgzh%2F8FRnkXPP361jzQdzY0%2FkJVUA%2Fijf0HeJ%2FOLgYCsdo2XIpokVImNQniASKiLso4Rf8XLI03z6A%2BdOXsguqmvcgX8J73%2BsdPjQ3Q5iVs%2BNE9UwrY%2B16u6n%2BiprZGe%2FA81jgs%2FcZ4E5gpOae9fcm4awpougGL5YKQYIje9YEdALNkUaaBqRtMK143r0nze3noGBeDMf1v5%2BVEYjg5CKXxPFTsO%2FxeYv4q2ToxdXjsmc%2BL%2B92wI8z%2FoVIdHMs5sASeY1CtSz0W8HqqZQMNa6ic8GOqUBjlDckfOloGdgKjponIs46aMJVP4UAi%2BWcsgpIYiag5U67DQPDcJRGmzb2xaLxbutKfcU50rWqe5M6kOa7FWmyp%2FHyVrOiG4pJYJBaDxVsAlYYWezPVmVmAIdRrp8rigj3bxo838cBCwupNL8c4SJ%2FOSqUlQEvqQJWJRlEZWto07gGDcKJDCB1wrBBhWySdLSlh74JkLJe0R4ENCqRvfTqbSi3vy4&X-Amz-Signature=b59cdd83c39d0347e54aaa345f3ab1e15143d439d006faf85d8527ae933394f2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662GMCV46J%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T163842Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBAaCXVzLXdlc3QtMiJHMEUCIQCmZxcOv9Qru8xKCVKwhQRdrGpusDDCyBQEWLL2JknnsgIgDNjmzElCK8tleR6SP0r6v8yQmsmlqHbw8mXugS3Np8wqiAQI2f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDD6cy87wKLCsx3ykAircAxoYWlFA%2BQzwDzPyCyd7yrOGZxvLBR8yW1Ws2rh7h4VdMyLTFrUdbSHTlwS95MH3jhUS%2BSaY7XYSqNo9LiJlVsRMPqN2RDwdBP0BeMs%2ByNyQBLKWgVyTcaxvst2J77zvgM8zgscrIs7PvUJagglX%2BUlreNY%2BPQZGIGfNcF2ygRLC6Py%2F4smrWmCdcUO3q91hnhOv9X4R9yUFtigmuIePoYMprAZpPNzOr7EfVJusx%2FLlw%2FrWigQ4pHK12A6XKyZyVm%2BkytUahxEqRgUO6xkO%2BxMvofBlleNj503dOR%2FEbu%2BX8CcWxbraXLJu3650SMV8OlgctrmygAmrvQQ1NMe%2BhetcKNCU8JdP1rkl2VhCdgjkV4v%2Fqv8y8Z88kCkj08CMPKgUhr05v0BL87MIOT%2Ba2VPo1o1qqrlIhklxaqet9aZoHDtdgt9acVwNXKI5LjYkeHIcqzYtWMNkyrH5Be6MTdOX%2B1jk9ypuvUFVNzdVBpttOl6%2BaH8pdAWS3jxtqqs6%2Bxf4PLx1kfID2FqhiXEh5BbnDI%2FXh3vU8mApmZ4R0zBXXR8sJNYXNDf0FPVJ%2BI6szLawTYPrm0wcq9YT0wm1vQfD1OyCKUqCeXfZpOB%2F%2BjOtqqzzq1jkTpyYeXk2MMy5ic8GOqUBKFKWvYe%2BC0jHft41D18auucNCW9NIOWL7OiynzDtOa6OPXdN%2BmV%2Fsm2WVWBkx%2FBXb7UIosi9AhHZL%2B%2B33q%2Ff3zozJBmk8jC0Hjguk3vymRVhfum45KHj1Fq%2BdeSpjdor5t2Z39Up55tiRuXYgXJD7JRnD3DTt17Lw3jJnYjSaoQXtCOYg9X5wsePKmeTX60SZozGnoXYisBtdc0pQctztFE5bkvU&X-Amz-Signature=905b04bbed023f7bda583dd6eef45dab09791b4a55456dfb79fe358902d75b65&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662GMCV46J%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T163842Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBAaCXVzLXdlc3QtMiJHMEUCIQCmZxcOv9Qru8xKCVKwhQRdrGpusDDCyBQEWLL2JknnsgIgDNjmzElCK8tleR6SP0r6v8yQmsmlqHbw8mXugS3Np8wqiAQI2f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDD6cy87wKLCsx3ykAircAxoYWlFA%2BQzwDzPyCyd7yrOGZxvLBR8yW1Ws2rh7h4VdMyLTFrUdbSHTlwS95MH3jhUS%2BSaY7XYSqNo9LiJlVsRMPqN2RDwdBP0BeMs%2ByNyQBLKWgVyTcaxvst2J77zvgM8zgscrIs7PvUJagglX%2BUlreNY%2BPQZGIGfNcF2ygRLC6Py%2F4smrWmCdcUO3q91hnhOv9X4R9yUFtigmuIePoYMprAZpPNzOr7EfVJusx%2FLlw%2FrWigQ4pHK12A6XKyZyVm%2BkytUahxEqRgUO6xkO%2BxMvofBlleNj503dOR%2FEbu%2BX8CcWxbraXLJu3650SMV8OlgctrmygAmrvQQ1NMe%2BhetcKNCU8JdP1rkl2VhCdgjkV4v%2Fqv8y8Z88kCkj08CMPKgUhr05v0BL87MIOT%2Ba2VPo1o1qqrlIhklxaqet9aZoHDtdgt9acVwNXKI5LjYkeHIcqzYtWMNkyrH5Be6MTdOX%2B1jk9ypuvUFVNzdVBpttOl6%2BaH8pdAWS3jxtqqs6%2Bxf4PLx1kfID2FqhiXEh5BbnDI%2FXh3vU8mApmZ4R0zBXXR8sJNYXNDf0FPVJ%2BI6szLawTYPrm0wcq9YT0wm1vQfD1OyCKUqCeXfZpOB%2F%2BjOtqqzzq1jkTpyYeXk2MMy5ic8GOqUBKFKWvYe%2BC0jHft41D18auucNCW9NIOWL7OiynzDtOa6OPXdN%2BmV%2Fsm2WVWBkx%2FBXb7UIosi9AhHZL%2B%2B33q%2Ff3zozJBmk8jC0Hjguk3vymRVhfum45KHj1Fq%2BdeSpjdor5t2Z39Up55tiRuXYgXJD7JRnD3DTt17Lw3jJnYjSaoQXtCOYg9X5wsePKmeTX60SZozGnoXYisBtdc0pQctztFE5bkvU&X-Amz-Signature=083087bb2b6361ae43ef62d565f3e47248bb9f8c8acdf9c8abc41df76e6f4318&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662DRADSYB%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T163842Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBAaCXVzLXdlc3QtMiJHMEUCIQCtKLkDA4k20bwKEFrmaWy6wzc%2FSLx%2BYrNEeCs%2F2vfZdwIgNu973d2hMKa76IPsqC1inmlXJsvqMfW1NKVtj9cDFfsqiAQI2f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDEvxU0LfT4V0VgmbUircA6h4SlyyHQzrwkJmjDstBu56qm%2B5b6W7R8GPQuxUz0idqn9boJ2k65dztc1lsDOqkrTX2cEf%2BcVsBj3BaXaI3WVqVXpPJwaXn58Vz0K4Pvml%2F0pYrZ3SJAexIz4gpWOOvPafKeBpr%2BQ0OzrdaYXLmgqc%2B6KsEJpwkmzjh06jLbPkXFxbCT2MvELAzSMEUt71W%2B%2FAiaViv4dYr4ZgWuc8IkCLKxGQ5HH7iZqlArugRWHhbXeqehKlob5Id0FWHG8YgYQom3c2p0uenSPLnCwbl7fwoiBFvvkFrPVkxn2wTiQbNpWS7Saz5L5hjSwQrrrHNAZoaW6OF%2BZpgriE74yonLJs5NZK9EXkjsYs7IWpvlQ4py%2BnH1KkUi%2BVc%2F3%2FLj8Zc8CN3pwP7gahcsaIfZQdAWz%2FgjrOYoW7TdJb%2B3BOtmZK8V2p3aTQAOYNBmUd7PAMQkaVq3ssJGFEJ3qt3KeEO97gSEHS8xiit1sSrVpt7uwGyrPcZP7E1oUHaRNVqIUaPzIePq9uILYnswL2CXO0TVgqHUB90wYB9V0Obvd9j1vLtgS1OGRjDhqupPWsN6vj5ZaPW2B%2Bzr%2F1SPfLyknWkOmzuFT9NBWVkGBe1Tb1JdcW0pcTilIu9HFM2grdMKe6ic8GOqUBfzdcR6OX2ofDggGk03X70zZ2016rt9iCu05F6vIH9kzQfMATvvLFcl59SHHBCRWLsXFM1twn1SLUtQMcu3mmv6M8ckfOum%2BZN3ym1Y3JtKHU3wDQvWGKIWqqpJQlZ0SaOlBdyWad7W926IRQh7MT1O4T76uXNYiNyi5GRBNji4bBJpRpBeNid4S16A0tYboaM7EVVseIGTrAE9c0RJdasXuya4cn&X-Amz-Signature=2505727340af23fa8098202f8e3345ca9ec7f923ed9dbfc7bbb6d5d955e49a20&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S5KEOUBI%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T163842Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBAaCXVzLXdlc3QtMiJHMEUCIAmp%2BnDyBVz5npQDr7vnH1EmB03AsjlgU%2BfRmOqaqUDQAiEAjxbTeO4OPZ6h4AVeBFerBNpgXnC33MhtSe1h1XXHLRIqiAQI2f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDJtR53lr7nt0WrxfLCrcA%2FCLOHa07xE1qy1JzzYkDv38bvFZlzvTdHsljj07SxW%2Fw%2BcOzf5HSUaACE3t1p%2FAJhqKV3VpZpVsW6JCyI6IdJhPYgHGGz%2Fl6nf3wmVP54Ia4i4wTHlrQYg9Xy1Q01%2F%2B57IDrDAdiTV1JgwFYDjBKpRiicmGq2CaPcoaEvbsnGaKmqitlPhwVXHGoRN%2Bs3Y495YPAUOphQzltPrlvnoco3DIpTkCUOm3tZCQO33Hhs%2Bt7KUXe2hYODI2m4BoZ%2BAQU9FOVlfvaPQRlvLeHZy5u8FbSJ9H9pe%2FxspHgI%2Fn7WcYgSuhM7zpIKo67u3SHlo8A4TN%2FC9wKCZyP2cNDHS3LaJfGlFCSq9t%2FUsSh22Ca14tVYzH2O%2BoeDBgfYBvQqRvZrYWchP1Gz3VIyG9YitFYZR2C2tCzkNbSxisqQMdWXjoC4lzRCb7noMOMrJKRAf3a7MwAFsEiFhYR%2BNaD2hGAL4POAzjzxJ2JwkCrCdOwE12VG21QTbjYK97435Zq%2BkZG7LTa%2BnASQ18KyM0QjhqsEkY3aEj4TJqIAOYi2Ng4R1gIpgJrN3uq%2FyNeAh0QyZpqAsym2YyFIU91M%2B37wuKPGIn4lk9NSAOzb87GYNuC1cJPUjOoQgA9z3C1DeeMP24ic8GOqUB5i1Wh%2BMGwG%2BLjmQSFMl8jaZGOA19odB6GiEERYnR12YJZm%2BxbKsNt81gjlmjIhMYIrMAEnp4qF6JME9piSQaMMvmMfZfCSv97EyhS%2BRIGMuMxxDPbKg%2Bybeouu796f9r%2BaYRwEs3Z0DwSSJf4xURm2EFTKJLehCvPJD3MISDf1JmT2vB473QVJ5K1pyoPq%2BrFNgWgRYsHpXHkwLTQrEwhgWMWpzp&X-Amz-Signature=685bda1d3f6b28420318b9c85d095bd0235cb259048be3313a245c1d231774c5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZAJVDMLY%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T163843Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBAaCXVzLXdlc3QtMiJHMEUCICzwvsj%2FixjhYCNwtT8tAH1yw1%2BFDXPezJyk6Nxs%2BmymAiEAl01%2BhBlIuNH97ZOHkBjRMHJ6i2QsuJcBiDnhmPP31BcqiAQI2f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDL%2Bf9KxspmFtQ0YFjCrcAw3rUFW7Nes3uLCXnWFp9HOfBUqrSTLxCcumnAkyecnZ0U17231kkFrkHqLNZ%2BWhIAT6BdT%2Fa%2Fw7SAXRkfv0El50LjnSHpG7HGNxsfcdt21u93xHMSMzqexzQIi3Bspoutjs8%2By231WKbiEdzmFksyMbfilnKtT2IpoWRvu%2F6U13LP6wIrQkY17bYiyx9D2uzI6uRXQljh5%2BQ2cu9UZuEQ00G1i2ICxu78hfKs6B%2F7flJvoqp5SygBIvicskiojiRjHlDzobpkC7kcDnifPpjQEVRMbLEKFihD37M%2BSd61wityKoNstrnkUPxOR9rNVZZbKwOP5ESvMu%2BhXHlu5TLJ2qO4kXnhhFjzSqTaWW%2Bm%2FCgqCaQ9tu6HSvmVALtc5SrT8vihXeVx%2FyfO%2FxvDNSCHJmGcJusn30wwClokBaYBfXhfNxa1e%2FW8p9AAwlFSRadx%2BbsnfkLYn5eN5l%2BfLnBGL8HKOTihLjwr1Y3QV8hbnxcW%2Bq%2Fb%2FOer86mWeWOItojPndeb9omZqHZbGlf95XfNIEpK6kxlTBo8KhTyRfGdQIXIneWxaPBpCvJ2sNG%2Bb74DWHzfUFBVewMvLdWN0Vcl%2B6MGOfG2sEcKnqNqjyqGllC2ZKwnyjauXpDdmgMIq5ic8GOqUB8vRNmCeIyqRUjefxGu%2Bf%2BAfx1hL1Q0PwfazIMvUPtODTS8ifIDYVP0SxHcXAt5XFC%2BS24dYU%2BwAT4jnaYUTWq9E7XJ5kW97O12HEeaYEMOVQITmHHgxI5OmAhaCm%2BtAJbb4lwDNlvud4vXw2s7vqZQeNe1XgW3bRGgenvu8PR%2BGKbF8xJsKxqD0eKQCccowH5CF7a9INEMONsGwCfV6y%2BF1iCDi7&X-Amz-Signature=d055594bc55decaace511ca7d90e4b1d759480693915582f0884a4e300523aff&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SMTS45MJ%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T163844Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBEaCXVzLXdlc3QtMiJGMEQCICbF%2F9BDPA%2FjQPnhCNDB1%2BTPmwpmRTd02vjWFVj8B%2BLwAiAMWzUCYy2cnaPRAWXC3Z4XybFt044pN9B2dBAu%2B0PgIyqIBAjZ%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM4bQ1D9BsmajncnZfKtwDNg1lNYiRWZJI7d8ZOBHvaXMRTxQ6JNDEkOcfTUaqUnJH6%2FHA7nWZSMxtCklPRJWAPxh6zbRB7Jvhame4xR91jO9cTKcBqgogHJGaRlq%2BwdzY8BEVswYc4aae6%2BX9x75pfJfeD3fBlk%2FoXDzMvL6JKJTbt1bE5VA7GsRbdGjTWdw5tzk6DIYWZgcWfGQGbS4VX4ZuAIalSvf3y%2FcsbIDiKytIsDgoFWll8z%2FH%2B63RcJVAITrGfL6P4fDGKm7hKZySxKn%2BCD5w8kOisd%2FLtmxckgEDXtzS5uG4fuAy9Fxuktl83tMDWJWqYAdHfiQneSVvlUb%2B7umKbCa3PZwJjXrtj8Bs1pBml4aHD4jPRxKOsWUIX9PAC6xQk3spjcnW9DNYnMnnM4JeeyoPO8eW5gwUul82AP90AuGGIbGakh3NISqR9cq2JpXCaT1RKU1ulJQ%2BKQLmRu1TQuZNLXBXdx58BscSgVNQyP5dSscQ398P03WChjzUvrwNfG3uuNJv6bwA1p6a%2BEhrdc9CeCnsvBN2oCE3s2xsVLxEnqMo2JOgm1v%2B7RxmvJHM7R7RImD%2FE3teWY72xB5InZsylvf0bIpf7zjZiRFyWwJxLfTqUVC49qFQoQlaENgJ2Y54oQcwvbuJzwY6pgFpMpDAef6lZHDpTH4RUwh8u3jl6qIC2WFUBmEgu%2FGkBDpf6lM%2FKjS%2BaySwgPDN3Q5Zvi%2B4%2BjJ0TE60em2ZW1MFDZOS3rB5kFahmiVwtDhHVZVEy%2BlJbKy5eZJqpvu1BpcnQG0x9w%2FAEAwyGdsDfTjgpLxAtH%2FmOnRc%2BsJQyS1ahc1ugF1dsCukShC%2FO2bs1BfThi1xT8DNdrgw42%2Bzn4SHP1FeiEEY&X-Amz-Signature=f7a7e50071fc5ff5e7f25f09224ede8dfb486b80856cd126ddce7f7742907c69&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SMTS45MJ%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T163844Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBEaCXVzLXdlc3QtMiJGMEQCICbF%2F9BDPA%2FjQPnhCNDB1%2BTPmwpmRTd02vjWFVj8B%2BLwAiAMWzUCYy2cnaPRAWXC3Z4XybFt044pN9B2dBAu%2B0PgIyqIBAjZ%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM4bQ1D9BsmajncnZfKtwDNg1lNYiRWZJI7d8ZOBHvaXMRTxQ6JNDEkOcfTUaqUnJH6%2FHA7nWZSMxtCklPRJWAPxh6zbRB7Jvhame4xR91jO9cTKcBqgogHJGaRlq%2BwdzY8BEVswYc4aae6%2BX9x75pfJfeD3fBlk%2FoXDzMvL6JKJTbt1bE5VA7GsRbdGjTWdw5tzk6DIYWZgcWfGQGbS4VX4ZuAIalSvf3y%2FcsbIDiKytIsDgoFWll8z%2FH%2B63RcJVAITrGfL6P4fDGKm7hKZySxKn%2BCD5w8kOisd%2FLtmxckgEDXtzS5uG4fuAy9Fxuktl83tMDWJWqYAdHfiQneSVvlUb%2B7umKbCa3PZwJjXrtj8Bs1pBml4aHD4jPRxKOsWUIX9PAC6xQk3spjcnW9DNYnMnnM4JeeyoPO8eW5gwUul82AP90AuGGIbGakh3NISqR9cq2JpXCaT1RKU1ulJQ%2BKQLmRu1TQuZNLXBXdx58BscSgVNQyP5dSscQ398P03WChjzUvrwNfG3uuNJv6bwA1p6a%2BEhrdc9CeCnsvBN2oCE3s2xsVLxEnqMo2JOgm1v%2B7RxmvJHM7R7RImD%2FE3teWY72xB5InZsylvf0bIpf7zjZiRFyWwJxLfTqUVC49qFQoQlaENgJ2Y54oQcwvbuJzwY6pgFpMpDAef6lZHDpTH4RUwh8u3jl6qIC2WFUBmEgu%2FGkBDpf6lM%2FKjS%2BaySwgPDN3Q5Zvi%2B4%2BjJ0TE60em2ZW1MFDZOS3rB5kFahmiVwtDhHVZVEy%2BlJbKy5eZJqpvu1BpcnQG0x9w%2FAEAwyGdsDfTjgpLxAtH%2FmOnRc%2BsJQyS1ahc1ugF1dsCukShC%2FO2bs1BfThi1xT8DNdrgw42%2Bzn4SHP1FeiEEY&X-Amz-Signature=c9afb007471f28774f17b79bd172fc5fb0333db1b96d50cbe7acd9b7750aecec&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663PFAUMKT%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T163838Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBEaCXVzLXdlc3QtMiJHMEUCICD0cQguulAJvrRc7%2BsMlFjAA5BUYoTnijquk4T25vffAiEA9nCYUxJNppTu9X40Ue8zahoJ2fvd7Ax4UYuAYlrnoXwqiAQI2f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDFCN3%2BCEU2ceG8LwTyrcA16NGrKw8PJPSqmiDnVd5Vr%2BRTqdOikQeKyHwetPNniIhA39AJW2mig7JEKINIJjYsQdBNBYwb4iSRMuG2rT6KbxnAIFeA%2BBOFdlyJFNw%2FesmxBHevxAFkcQrgUaxMJBxayLtRqrw1dImGlXt%2BZAz7deVXJgZXY%2BWUFg9c%2BgFsqGTDzflMcR2M7Hw%2F31inHEnJgUK4vNLvBx0II%2FgWNy1%2Fwmn1GPBojtcNkNybYVCgrQOaYCCVN%2BWXp%2FsU1Ty82WNYyoqNeGLHU%2F1Mf7QBt1iuvF%2F9YnU9qs36b%2Fin9zrLb1lYbDMkIhU1j%2F2Q4JqjBPs%2BcIpiygEaR8l4Lh79kKmuGk%2FXuyT3FEbBFVdgVacTkfCYYPqscekgovU%2FXXiqayI1YoBxHWKDJfTE9jxS94E23hTcCB38cLkwVlmX2III6fJaZUGuoJz%2BjrpdN7gzNq4kfgX%2FcqQQYjGi4F%2FtTJ%2BZ51XFnu0BSPiova4HeWlwrCSbLI2LXpmFL3gCGV7RvthWwuamY6OKuYOlTaAl%2FwrgI8OxU0QXw0dlg%2FQQAzr2GG3GAi%2FsVBA9H1MMLxoPlR1vsvO4Bf6cNZ086XmDctO005hB2FvNCybK0%2FsGaz5g%2BHCC%2FhoJUyVC2mDZ%2F2MMG6ic8GOqUB7ZAtiXLZaV5M65jquqinyCOkNT6q%2FAxVqcJYgoeyn3w9wV6ee7Wy%2F7OBQ1o6elK%2Byt6Ab%2Fr0gSM9VLXnfR9EdnztTdhFqxUDxnw%2FI0vFHkoTvp2pfFpIgcEXgktTpNRGVc%2FLTDz1nSpRcGrm8xmqVx2Q6y4Z2JHVp4JFHYVkG7ujox3gMOWUUJ7q705nCT%2B3kxpOKelLTHtiiGq%2F3njNgSV8dRDO&X-Amz-Signature=6384ae55f2741641e51647478c64045bc9b279ad51a58e4426cb85216d10b005&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SWFTQJEU%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T163849Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBEaCXVzLXdlc3QtMiJIMEYCIQDJq%2FvgWzne6hme8%2FRO8GD0BHc3KAUsbpvp4JGchmIJLQIhAKegS5XtGLs2c%2FZa6mp4%2BPVzTTYzu24v61G1qauUiGfEKogECNn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgylawyyBNmeRc%2B4Bjcq3AP7nXzWS0XyeRUpEQOmKEyQuoW%2B6YgEP%2BxVgrOwNZcm4Y5PLN68k2mbadgUTbnUTsMxZrRxNj556tqLzzlbHryvHgiXYdEMQNc7hZXNkudxSuTO88SzRVH62%2F0m1rs7Qp0iptRzndqpedBKNsGjK6G9Cqs75MbQWH%2FQti6sYN%2BEHB6phsFU5qcuLmyCiR4CAfTwor7TLCG%2BMeukczWTtOWSz2Yex2AbbuwqY5AKHjL0QSJsaidFnUPwssy6C8hunaesPwRdcXZDGed5N0FGI5ALo%2BnkYmKO8ANmsg6gnNr9QarS0hXe7ooOK1j2qcWHt37afVQZ9ThFnRSJHZbFOKgi8fFWUhe2Zu3EcLHzokDLeust8LBBAr273nUU47URXoTmWI61ReTnLTlBW0uRjt208kAbhMXIkdDsqSr5rSlGcvGk2I%2FZMkDATzPrJ%2FlkX98Jut9jwvYEvRcdixKuP4LhhmMItul%2BaB1Wa0o9IzYWDZI%2Fra3%2FUCNantHPPYQ3o17BtSiT9H%2BWrvlq4M%2B%2Fdy1JEImRCQlISjc%2FXnIJG8bYiET2WEezf4dd97E%2BKyhZsRBri1aMKptw%2BEf%2BiZlYJb1czFuQzjiz2BTEh%2BAsmLiril3i3sVWpOXdbu%2BUejDVu4nPBjqkAchVopu0tZxclNKs8w8MQWTg21I7IS1cOjZhE0ab9Z%2F5fYUZd7JhiJuvnMP6GKvi8%2B6dBCvodnBdeu0Ncfer%2BG3qPjPcZCSOMaa9AvYWefL5fv1hpNZ7HLqWPZ%2FDlXk%2BNeCPErGdjqtKioNzSpOEYWudNHF1nTzcxdyVhLbsrVbc5LCD2UPrutZZ%2Fpu3svB1wRR%2FsI9D%2BgifALnPVa8T0FrLqmOv&X-Amz-Signature=673b9b44f8644372c601ff91b7653ee9b224d7a3cc37f9d3655bcec7ab9f9a6d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SWFTQJEU%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T163849Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBEaCXVzLXdlc3QtMiJIMEYCIQDJq%2FvgWzne6hme8%2FRO8GD0BHc3KAUsbpvp4JGchmIJLQIhAKegS5XtGLs2c%2FZa6mp4%2BPVzTTYzu24v61G1qauUiGfEKogECNn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgylawyyBNmeRc%2B4Bjcq3AP7nXzWS0XyeRUpEQOmKEyQuoW%2B6YgEP%2BxVgrOwNZcm4Y5PLN68k2mbadgUTbnUTsMxZrRxNj556tqLzzlbHryvHgiXYdEMQNc7hZXNkudxSuTO88SzRVH62%2F0m1rs7Qp0iptRzndqpedBKNsGjK6G9Cqs75MbQWH%2FQti6sYN%2BEHB6phsFU5qcuLmyCiR4CAfTwor7TLCG%2BMeukczWTtOWSz2Yex2AbbuwqY5AKHjL0QSJsaidFnUPwssy6C8hunaesPwRdcXZDGed5N0FGI5ALo%2BnkYmKO8ANmsg6gnNr9QarS0hXe7ooOK1j2qcWHt37afVQZ9ThFnRSJHZbFOKgi8fFWUhe2Zu3EcLHzokDLeust8LBBAr273nUU47URXoTmWI61ReTnLTlBW0uRjt208kAbhMXIkdDsqSr5rSlGcvGk2I%2FZMkDATzPrJ%2FlkX98Jut9jwvYEvRcdixKuP4LhhmMItul%2BaB1Wa0o9IzYWDZI%2Fra3%2FUCNantHPPYQ3o17BtSiT9H%2BWrvlq4M%2B%2Fdy1JEImRCQlISjc%2FXnIJG8bYiET2WEezf4dd97E%2BKyhZsRBri1aMKptw%2BEf%2BiZlYJb1czFuQzjiz2BTEh%2BAsmLiril3i3sVWpOXdbu%2BUejDVu4nPBjqkAchVopu0tZxclNKs8w8MQWTg21I7IS1cOjZhE0ab9Z%2F5fYUZd7JhiJuvnMP6GKvi8%2B6dBCvodnBdeu0Ncfer%2BG3qPjPcZCSOMaa9AvYWefL5fv1hpNZ7HLqWPZ%2FDlXk%2BNeCPErGdjqtKioNzSpOEYWudNHF1nTzcxdyVhLbsrVbc5LCD2UPrutZZ%2Fpu3svB1wRR%2FsI9D%2BgifALnPVa8T0FrLqmOv&X-Amz-Signature=673b9b44f8644372c601ff91b7653ee9b224d7a3cc37f9d3655bcec7ab9f9a6d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46665Q5ZZQF%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T163849Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBEaCXVzLXdlc3QtMiJHMEUCIQD%2B%2BFQVVjDAZJahnM7DFG5NARfCaTcu2iBkI5OodS1J1gIgTyizFGZIQelBcbFxlmYD%2BcwH95sOGiflY5qNOax7SmQqiAQI2f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDE%2FglwXqKdInCkQWTyrcA0s9T9pake3%2F7kDKj3JzHR6jzMVVo%2BhSzm7BZaP7ZQNmlLh42gP4BY9nrdFk86QS6tYZ5QgXX5Zp6r0k%2Bn%2BGOSiexFOssPWtDFwRYd9z0z89YwcD45J8hAN8OAKpUdegFJCu2zmz%2F8YTJUFX7o7RAQXnJOHwwfcLFayksJXndsBPU4rSvjtv0aKKf8XZij7ioZo407i1L5B%2F4YhfMSZioZ7R%2Fgn3%2BHbpnHurJGoWSN58owmvhYCu42rgu3s7d2ICJ88LwEjbGw1pTt3YYo14N83v7pgpqpzAwfADz85svUa4oR0EOSN87fbyuj1LSMxvdjVqCxG3Ugauf%2FXoOAfBy2I3h0uVFuWPUMp0bCG7kBJLNcXgIh8mCnIe%2BQVvnwL3gohM9h53zI1EsWMLHIee%2BfyGsnGMdo5edpzSvKyWIhOAr656DekqNs06CvmSNzAJwys7OmS3opInAQ77kxobcltz3Obz95qh7p6d2fUtwtNSxV2p%2B66MRKJN%2BFAPdWkZmQYEQhLM5Uv5mXm7Nb6KWdmXa2WuVNxPvtRYsIdJ8hikqyLcDRSpAK%2FCtKWm4tFo4p52jIrJwxZc2qp1pNAVkYwByw4eByv9qhJHfSk7dny%2BN8dIPul7OcMmidNPMPK6ic8GOqUB%2FcdQFN7%2BW8b5nywX708MUm0I9t6jwAHxDO1Sn%2BDRFnA6sOFgoLX1IsPi5SBLFmsPxsho%2FV8rvjEGbt8Rw8CC9z28JqkRQ%2F89MXhtFrqMH6X%2BlGv5mvByx%2BEZRidjhjk2MZ5IAdkcK0Uj5btRyDvWKQyWxakQj6pQkWnhMSh7dkbG7%2FAaW%2B%2B6UU1THLCJAA01KzdxgwebjZgVQrDfp7wtusLYn0eO&X-Amz-Signature=08d18169e9910ce1587b4d24c0765139339fc4d2881cfcd11d32ab985a5c0660&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

