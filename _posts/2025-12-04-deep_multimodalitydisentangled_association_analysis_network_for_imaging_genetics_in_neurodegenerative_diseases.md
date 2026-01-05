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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666IAPJ3WL%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T044553Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHMaCXVzLXdlc3QtMiJHMEUCIQC%2FH9dzrYgxrTmOaUlApDc577nzvaz25ML88ke%2BPwkInQIgFWhlj1z%2BmHphP3a9Xx%2BiwQrsOF%2FnBKNFBZkGjLcvFOoq%2FwMIOxAAGgw2Mzc0MjMxODM4MDUiDNrPRFzVKgJ4Wikc5CrcA74%2FgyLleHmPGKpjmz13QEg5leiewhLS95FLtWnj%2BnxACL7aOQ00RmkYKmbQLk89%2BJgprkvuCoqghl6SVdN2yFZ276S7wYV7SUY3mpWl1TK8t161hyRZTuLx8GyQKdNMWH5%2BhKT7D6mc56m8sGw%2BtlHiRfRzuLWtN6RhIUVHt3OrUZjlBpK31UVSd03bDHxLbN%2B2O3EXpsCyHnmhAv9BNTpeJrTb1EtXYo2dfAr%2BCz59yVs8yAtFJTcJh7A3A8ZS7EXpX%2BnSOal0KLZA4JplthTON552oDXQsQCUBbPQvhYoDXvperMCI3wkziGCiypO%2BJ2os4X6R3%2Fimc5vC49b1IHQ%2B%2B83FkkisReZbTEkJQKDhgDsmFn6y3k%2FDPgNTZYMayWa1aOyAlXcZhrJmUTj05N6f6a%2FKI2bhjrFegYrZgKJpxzyq7THXLCe5VtuMAJvWMjMqK%2Bo%2FbUOxgSOdiy5fokXHoDaFyJ5i2Oj4Y68mIVOMKQRGGEnRyJd%2BgHkhEgG8El0YkX1n5W8YpgXexmuOzLSW5irLBy%2FeJszgwrI%2Bv7d5h54YAmmziP5Pq5tNHyD0Cza9bNDDnOif3Q2UNZ8zA1eRCA0mf%2BLfLO%2F7xk6Axq2es0uT0bsxOgC9510MJLB7MoGOqUByXqf4mQa71lByPbU3zlyQBd7d1UVA7Hshu%2FPFYRzTXDqLLgtOopd3Nh7ZyGT%2FN3wj5duqEunENU9fw%2FdVt5xiDRHHIKHaUZUp58SpcnFnp12GTI9oDQG4ucDUhXnULZBDswmX15rs3MWdNIPnMYuW%2BppymJFJ7090R%2BGZUynW7TrqPGzRHOclFC1sO5wTqlby%2ByJ%2FMCivnRpVsWishHVmIsdb%2BM4&X-Amz-Signature=5c312098eb182a3d76f3e45d2e9664602d4159f04ffeaa943036fc3a2669e330&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666IAPJ3WL%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T044553Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHMaCXVzLXdlc3QtMiJHMEUCIQC%2FH9dzrYgxrTmOaUlApDc577nzvaz25ML88ke%2BPwkInQIgFWhlj1z%2BmHphP3a9Xx%2BiwQrsOF%2FnBKNFBZkGjLcvFOoq%2FwMIOxAAGgw2Mzc0MjMxODM4MDUiDNrPRFzVKgJ4Wikc5CrcA74%2FgyLleHmPGKpjmz13QEg5leiewhLS95FLtWnj%2BnxACL7aOQ00RmkYKmbQLk89%2BJgprkvuCoqghl6SVdN2yFZ276S7wYV7SUY3mpWl1TK8t161hyRZTuLx8GyQKdNMWH5%2BhKT7D6mc56m8sGw%2BtlHiRfRzuLWtN6RhIUVHt3OrUZjlBpK31UVSd03bDHxLbN%2B2O3EXpsCyHnmhAv9BNTpeJrTb1EtXYo2dfAr%2BCz59yVs8yAtFJTcJh7A3A8ZS7EXpX%2BnSOal0KLZA4JplthTON552oDXQsQCUBbPQvhYoDXvperMCI3wkziGCiypO%2BJ2os4X6R3%2Fimc5vC49b1IHQ%2B%2B83FkkisReZbTEkJQKDhgDsmFn6y3k%2FDPgNTZYMayWa1aOyAlXcZhrJmUTj05N6f6a%2FKI2bhjrFegYrZgKJpxzyq7THXLCe5VtuMAJvWMjMqK%2Bo%2FbUOxgSOdiy5fokXHoDaFyJ5i2Oj4Y68mIVOMKQRGGEnRyJd%2BgHkhEgG8El0YkX1n5W8YpgXexmuOzLSW5irLBy%2FeJszgwrI%2Bv7d5h54YAmmziP5Pq5tNHyD0Cza9bNDDnOif3Q2UNZ8zA1eRCA0mf%2BLfLO%2F7xk6Axq2es0uT0bsxOgC9510MJLB7MoGOqUByXqf4mQa71lByPbU3zlyQBd7d1UVA7Hshu%2FPFYRzTXDqLLgtOopd3Nh7ZyGT%2FN3wj5duqEunENU9fw%2FdVt5xiDRHHIKHaUZUp58SpcnFnp12GTI9oDQG4ucDUhXnULZBDswmX15rs3MWdNIPnMYuW%2BppymJFJ7090R%2BGZUynW7TrqPGzRHOclFC1sO5wTqlby%2ByJ%2FMCivnRpVsWishHVmIsdb%2BM4&X-Amz-Signature=5c312098eb182a3d76f3e45d2e9664602d4159f04ffeaa943036fc3a2669e330&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665EUPYR5T%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T044555Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHIaCXVzLXdlc3QtMiJGMEQCIA2yZ69Smgba5HEAqN6COe5q9I288WfyUqlCWQXnfuuPAiAj9Ee3qd0ApZOA0RJ3d8gIhYdeUSx8r6KEmg9GMMkaDir%2FAwg7EAAaDDYzNzQyMzE4MzgwNSIMIcsiJHjxxedXhkWyKtwDTLnsX8FEu6rY%2BL1HDINrLVNB8kcRTxg5RZqyQ5twocCC4hx7UiDF1vQ58f%2Bh%2BsAgkb5T2mt903gagSpmmbcmAIuriRYGlsJhSlHwqe2RAwtncz6wdNIuME5TNjp6fTScSOrfKXJ7eu%2BXgeN3pY2OPnI8VETzjYf1jSYE5WOhJy6BRMM%2FypcbRwOlA9OA6xMxkyHmcxW1eFp9Tw20BGhiAYVGT8aRfeOMCXu%2B3ejJAfIB%2BhNQKkl5zfh1XqbkG9e0ger2yW9gq1t4SKSK86jGSZIbb7HjZ%2BG8WrJi9Up%2Bc%2FEww16wKlrfNIcC7OqKYpKFN3gmB6CPYPJPEhM74UrRCkrKNQEfhJ%2FLbk8v8eKICMKIrdRJtlCyq6giLitVG1p9uOi1oy2iutAqytIMEXNQOghMLaHwUTTodajx9vQSA7z79xAp4KihZ%2FU7CInxk32YMePs6blZzHsCESFyHp53%2BI6jQHvJUM9LJZPgRsefykJKcxUHJZHRJh4FXD8NmLNtgtZb0Xx9LZE3uLEZ2rsDpD2H6f1QLtUyS3NC%2BEE7sYhb3RBo6Nqjt2eKw%2BVLeuM%2BizHkBVM4Wcf%2FZXCLwCibKFhqanOGM81bJ7oTfMJG3ne%2BEXzFtdUMYSJPNQQw463sygY6pgF6sZiePxmoO4kBG3KhNGAZErqPLI5cFdhLGwWb9bAM6vCAt9H9G2w6HajutBYo68i2xR1Ex7OdbLp5XsjCQ1ITFJ%2FmgX0CBNUIv%2BHn5aljl%2FEkqFEcQgAj2jnOTuHIGZNMSbGfi6jCkaMvjiDc5pDqShTTS6yDfun9zn%2FKaYmIWeNLy2OJfUk6fLcAXB6jeuilQRk4gKtgEcoXImXeeClpI79dgZNx&X-Amz-Signature=7404080720df85985bdf9375acecd173c1da6b2239cf4bab3cf7b20230ed7bea&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UA6XOPU5%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T044559Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHIaCXVzLXdlc3QtMiJHMEUCIE%2Fd6Xj4V5ND3ON%2FSmZzQCHtu9z8IRhey7odSEwf3kKoAiEA2eMxKQI3qNb6kDSkulyCkYZT51Hvh1D2Z93ReOMuHXkq%2FwMIOxAAGgw2Mzc0MjMxODM4MDUiDB9fGj0gzG%2FgtyAkPircA6S9uZ1SX9t9JS31d0not5CsBezG1L5ThhUVq3DAtyjqZYGjkhGgk12d%2BXP96NReTpb%2B7%2FSy4xiNsLI%2FBEGmFnWNoXMZ0I4FeHAvP5EtT7vyVv9Ftb7QVN2EIpR%2FBK%2BgXjbAnxeIZ4zJzIg1QDrZVWX%2FUacAphgotv1Ezx82UHkH6DxCWqF8mqdjb0vZ0FyGEfd%2B2noImDjo04Z8Bn8SLqw0Oc8fg3HAGP3TSp%2F7Cf5FRD%2BgkZj%2B7HHX1ROqHMIR0U86T8k7I9QIUdL5UcXFgkQBXthZvteKnKHIt%2BhqQdCcM9zpl5xB5XL1hDht3uei5jrGcFMje%2BmbZvcCpBKKPVhiKJQhrhJNYjZ3ePoBYZHEpnLRvrmhHVbST5I7JyYJTbS9ff6y7JpbXRHv4eMP6MtQE8PEBH8U16SKVqw6wq3BEhoHvE%2FnZjKz1wYqQy6pgj5D3rGPsboFV2oPsLARI7LonEEv0kORU1BSDPLsEj8DRWCBRPuBKOQgzryvSwltLZx2yFz%2FgVQry1es8x4IwxVgFLF9N6arL6XbledRT7Ce%2BW7gIS0RFDWTHxMA8m6D4DbUdx9KOEOLs1qs2OllCv3r9SAZlabcUwBDMYL7cXLtAGwRND1oSLTWzMxPMNK37MoGOqUBi2A1m7SMy9E1NU%2B4AJKHH9kPYhTtQg1K%2FCZcTOoJryaC444DfO0Kf6GJ4mhTENTNKSDjoEoBkilz9kCUNFlmGjmTRAGpGeEZcCQWS5aUSCBsaVExZRwyJcGvOfAYNoXwTKIKJuPXbkMx%2BGrj4FS9H52T63ZPO7mi8L%2B4B0bG7ljBY1uiiAFbKdphspPMaBEULMUfvsGS3SBJLZ%2FcDq0ClohiB3ig&X-Amz-Signature=2bee7debc08946abdc033978f2e9e5f970e88765d5b82a71dc232824ffbdd6c2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UA6XOPU5%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T044559Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHIaCXVzLXdlc3QtMiJHMEUCIE%2Fd6Xj4V5ND3ON%2FSmZzQCHtu9z8IRhey7odSEwf3kKoAiEA2eMxKQI3qNb6kDSkulyCkYZT51Hvh1D2Z93ReOMuHXkq%2FwMIOxAAGgw2Mzc0MjMxODM4MDUiDB9fGj0gzG%2FgtyAkPircA6S9uZ1SX9t9JS31d0not5CsBezG1L5ThhUVq3DAtyjqZYGjkhGgk12d%2BXP96NReTpb%2B7%2FSy4xiNsLI%2FBEGmFnWNoXMZ0I4FeHAvP5EtT7vyVv9Ftb7QVN2EIpR%2FBK%2BgXjbAnxeIZ4zJzIg1QDrZVWX%2FUacAphgotv1Ezx82UHkH6DxCWqF8mqdjb0vZ0FyGEfd%2B2noImDjo04Z8Bn8SLqw0Oc8fg3HAGP3TSp%2F7Cf5FRD%2BgkZj%2B7HHX1ROqHMIR0U86T8k7I9QIUdL5UcXFgkQBXthZvteKnKHIt%2BhqQdCcM9zpl5xB5XL1hDht3uei5jrGcFMje%2BmbZvcCpBKKPVhiKJQhrhJNYjZ3ePoBYZHEpnLRvrmhHVbST5I7JyYJTbS9ff6y7JpbXRHv4eMP6MtQE8PEBH8U16SKVqw6wq3BEhoHvE%2FnZjKz1wYqQy6pgj5D3rGPsboFV2oPsLARI7LonEEv0kORU1BSDPLsEj8DRWCBRPuBKOQgzryvSwltLZx2yFz%2FgVQry1es8x4IwxVgFLF9N6arL6XbledRT7Ce%2BW7gIS0RFDWTHxMA8m6D4DbUdx9KOEOLs1qs2OllCv3r9SAZlabcUwBDMYL7cXLtAGwRND1oSLTWzMxPMNK37MoGOqUBi2A1m7SMy9E1NU%2B4AJKHH9kPYhTtQg1K%2FCZcTOoJryaC444DfO0Kf6GJ4mhTENTNKSDjoEoBkilz9kCUNFlmGjmTRAGpGeEZcCQWS5aUSCBsaVExZRwyJcGvOfAYNoXwTKIKJuPXbkMx%2BGrj4FS9H52T63ZPO7mi8L%2B4B0bG7ljBY1uiiAFbKdphspPMaBEULMUfvsGS3SBJLZ%2FcDq0ClohiB3ig&X-Amz-Signature=ac3a92346d4ad2380caf76d133cd75f1fe0b56f3da48e3b75cc2ef18f5273e70&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466X7XARLAB%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T044559Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHIaCXVzLXdlc3QtMiJHMEUCIFcjLxbRARg6PsMotV1TpyKlR0lUWqTUbj0ziVhvJRENAiEAhYK6PXx6wsy7a8RS%2BuBXWOOVZWoUjrE0vjpICC79npgq%2FwMIOxAAGgw2Mzc0MjMxODM4MDUiDIRmG2p7Dtl7%2BWFH4ircAxeART2diRfGpNVw3kOUjSjbxPFFN7j6lwRyViQkngno3BBOhoRKiIZ%2Ba7gbSRqkzIEilvK3iyP2egNCwA8PXyebl3gT%2BaoFWM0E9ci9nnsA3xg36cL%2FShrBkmx9A7PPnv0uOnIzxzaqkR6foie4jvVQ31NYGF4aOM1SXomJDihjFaU2RNOdyUxQrN%2FguFFHoW%2Femj8HVOBDiSgYa0cGWYOGll1k%2BMmN1TJjg1MzCJpmFie%2FfM0Hp0yFSCDpyIZ%2FFpVszVheurQruN0pqrBkAhkQG3fQiev%2FTVAAMHnO71FNt43abJ%2BL66irhjekkGdsTjPOuiZVkzZxzMXGE1RGaMRILT1Ff0dk9qz%2FR%2BI3uGwtFD%2BNqPV%2B6NH30wdGD9guBVnexOV%2Bw3%2FHHd0Hr56f%2F7tkMYqMxXN8xjD0YIrk12JGqVKhsd5sQ%2B%2F%2FESZTu8N7ujs82BpVePnB8W8Eet1jXkuSkPVhocyb75NGhPSZwbJyLYk5pZ4HPwpbI5G3aed%2FNcpRz8ljtBs2KFQUHgLTAbCMrEaLypNzGgGiWcAd8O5cbr8k0j4ERkIfRTSdOx9I4QtSI5mRGocNWBIApxjh6KGclsj9z9AM0KFjIQRhKurL5LuCCjFMUE8R29djMIe67MoGOqUBdHe61Oza2NkqxriLvPYWW3JRX043tbNqA%2B8nFNfHFpuhJ4ajhaKkdLzRvNsRSzoC0S%2FtH2kyaR%2F7OkBjqe9z9iiEJaTVowljv76wfSBM8pMoQsU%2BPV854t4DkK3afPNq2j7%2FWpQL0OZ1LqSw6nUMsqzKgY9WY%2FxeGWgXZZ0qTKJHFyexG4Uh6NFTCZM%2B7vogiaxv15NZbzHY1eB8%2BGmRJQeGwzNt&X-Amz-Signature=63d2b3fced16bde6616066e89061ce2a3ed22a4ddd721f94ff625597605b9b90&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WLCB7MXW%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T044600Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHIaCXVzLXdlc3QtMiJGMEQCIFfTUd15YaXg6MRhCr00NdIA%2B%2Bz%2BCRHjZ%2Bu%2FJ90kiD6nAiBmwwR9jlzBEs5oLCG17IXk8LWC2s3984oPs4KTTclbNir%2FAwg7EAAaDDYzNzQyMzE4MzgwNSIMyvYnzk%2B69SHWRFSsKtwDVma2%2BP%2F2P2PIi%2BddDEDCT0mCaytfjuN2EWu21or5iO2nMKGuSagFRUovD1vAsIG%2FYwXnvcNIL5Ie51GWrGYMXbKrHq5bjqaJM6rl3x9pHA7kMcXjTtrCT69xroteXtmYNYkLqi6ZpWdzVTT%2BeLaNHwvZ8Be2KzQF10tX%2BF0Q%2BAa7OQgKX00C6Xsbv6hvJo5YU8PycIG4SUI1SQl38dL6xccmBYO1QiRCzjy%2BrxO3%2BMhFxhzkNGKUejHKDd%2B5%2Fhy5FcN3ilRDzAJjPFZ7vXSUmnXXjFy6AS8F027LnHkKDRZ6JevMzw97uV%2BvNESo7j4kiWgnLsMVa76hubmcpDRbPD3DpWV9zYfmhIki7yPc4YCOLQeONq4Qy1kt2%2FTLP5kwcSBIugG8H2oKeZMLWHmQUehUtdl7cKWpzFDSMZNvZSHgn5y0gZOjb9PJg88n493ojOAAydlG9dsUdUc%2BPTk4lKnsqtBBvW37x4%2BMsp%2B7DxSmbKcpBBlr%2FWl9uE1jKejETF6A1Bm3kFaAqKzq1oVzMzTeeiTxOLK5qTTmw7tX%2BmhpBI6e%2BwApmFJkgklacPx7FPkKjhQ1Q2iaWktA%2FDd3ZMmFek6cbO2D13DU1L0Oy0i9p8MAAXgNWJP%2B9cgwr63sygY6pgFIj4w9VE%2B0q6pqwVpCKleL1hZwxxnuNFyYPwXDDbfBcLo7cVWCaKWNv0VnK7zwMvAls7O86I5Ql%2BEuecninkbVJWFMtJpdE1e2sXihmGVLXj%2B1MbUDBy5J4QT%2BmEHXNVlzHhHSSrL34Dl1cmz9hGgzS2vxOBiluoB%2B1KdkqKzwMiwa0jAqTSnw0053tgToRd%2FdjN7VuHCX5fr6k7C4rUbdBxn0sioz&X-Amz-Signature=af2f6fa41e24790c1bd250eff5224f62a8f03c0df2395feba579e3a33b0adf71&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VDNN5CZW%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T044602Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHIaCXVzLXdlc3QtMiJGMEQCIFqH4dSB%2FGNn3CRfzh5sn4fFMWXovdOtH8VXkFJNJsNbAiBwL0WCeOXHDrQ%2BLSUC%2F18sZUM6EQ4hAhUw5hILOq%2Bh8Sr%2FAwg7EAAaDDYzNzQyMzE4MzgwNSIMsyIMN6gVTb9H%2FqRhKtwDUeqmZQ8F8oQfzg3UZbCqAeyIw363pxH19NT7j0GiLEM5uBesJWo2BRO0ic0NcNv1yZ7XaUSzwqrv8M6roO6mqlyDJFRuzbKmVRF8q5%2FCOuu7NzfaO0z5V9fzvvHhVEUeixaJsRF8PcGBvvObSFAfZSWFhSSlTnB87SApoMyokQYDmk6aMX6men7co6AwY7XqTWZJ23mrq0DCJeu8kZjfTuYv21aCq9kBBuBYi9LJrQnWP%2BNVhK567ArlTeCxI5S8YZaJCsiL6yZEbPU3%2BKVWwyQNI%2BjhhU%2BdHmGyC3%2FcWcHU3O9fDPOd9tvyhEMnEjkXQREOFTpENfldmW90Qe8lUtlJYkv8EAdXWJp3rQpdlBWYf3cNYitFZkzz68qXfQOk9rjp%2Bpn1TqhlA7dyV1Pf%2FWFg2ZkaG%2Bb7QURwhwUAP0o0XHLjyzK165cbwcodh%2BMJkI45cVLHPb%2F%2B7UaQOoZY1espb2V6k5LUZSYxztABSVuhTcARHvqA6%2Bmnh8zA8JcX7MX0v9bLcE2zYDNF%2BKym42ZFPDShtmO%2B6D0VAVGGDbWjOOG1L29aFMDHa9n4Li9xNAk0cUX9y6R1ePHbK2gIOfsbL45q3GY0IYV%2F0Zakv8XPLklqLdPhax1btG8wh7DsygY6pgFVQJpGpxdqvBhPAQ7E7ILp1yAB7pkMYTFM8R45sp6X1o1Gzmb7j93RYUhTeJ9O5Xth7SzP0DJ1EkFWGZFSdWulmn1oOGtxj%2Bk6X4Qt28AfmblBB2BlmH72W8w2FLmsJJWAimeKbKG9rnRZ2JNuXg2T9xjFjI9w9PG5g6WAUJoRC1CnU798vWExMeheXBb4ahxsdcLLoOFYRe7mInbkkmg7ttopRkte&X-Amz-Signature=ff3d6adfe573ece69c2f45969ae85465e6e868ad0501c8b9e0f635e7c60df0d9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UC3KR5Y6%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T044603Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHIaCXVzLXdlc3QtMiJGMEQCICEks95YRCSv1%2BfGWwBNxRlCLgIJPto79ySTp40GbB7ZAiB%2F8TL9FaIN6%2Bf7zQH5PbXvnba0MxHBAm%2FnURQejsmJ1Sr%2FAwg7EAAaDDYzNzQyMzE4MzgwNSIM2o3OIbtlFDzcygwZKtwDMe9I1c3yRHOAafJMkdtzQQp5mo5%2BvKdlrGSl92VIw%2Bwk87uddhZzCRQQ6JdUGX7VktWg4GiLtMTkTvJfTN3SwCRJZzZLypta2lxibQ6JOpJw%2BZDy%2B01mDtW%2B8B2E%2FnjW1wghOBfycxrgsortyO%2FEBigRLXOLm6M9GQfGJUg0q9Bzb63ikSZCCZxhV8YDrP7MWu1P%2FJgM%2BEMftLKd%2FmkAt3F5pG8FsWZVMq8GWkk6lsSxEBvvdCQ4%2FzZtI3NBr7%2F0fgK6Xu3dLjkpRIwj8o3nEwOpOHoIGEHyEBhHjf35v6cAyVPMMv00ia5t96neD%2FbRw7APp2i0ozTClI8yjnuats%2FBBpNx3gPQnWgL77A%2FUCBmFuW55EKATbSVEF5I6oN4Kn%2Bn%2By89GstTUMltHzq2LQppj%2FVw0y4FuqXUjNYjnLVWRwg2RmiRL9jV7B5Bw1etVw1UU9jXxetgZ9MzEw6qNi22NhZh%2FqrxYFnO6d6t4ZrbABatIl4lCtfVIKZcFYSSM%2F7prq9isVhG%2Fnrw3%2FzJBSTqSn933Hy3I48Y%2B%2FNLTGfY5nKIfGncAqA5W2%2BhPlbVoU4yVh6%2BAMtVu%2BVMdyxdhN8j8ECz%2FvzSYJdImTkpbtR41NZ227kA%2B2JD1dwwpavsygY6pgGUQLZl9TQHvBexDz%2FZ%2FkTLDZnT3UyhIj1ytQD4RHqhmgbu%2BKIpNXlVqy%2Bbf48FBLtzXoYA0yxEBS2vZgi0moU%2FHE6YU6p0rT5fhuaUAOYwUugeeAXbR%2BL1dhEBGX36JFiJ1LAZf0OSahrG%2B0e%2FTOaNbTQN3x%2BjSY8TSDQ1xQ1j6wVMkwNOqKMWc4n%2BNBIuQhjrY3zacKxJreH75SXdiCshsVP6Lcx8&X-Amz-Signature=97f494d6d2a09ff20a1864d2ecce69f2e3737a25f4a007bf87a675a64c33e6bc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UC3KR5Y6%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T044603Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHIaCXVzLXdlc3QtMiJGMEQCICEks95YRCSv1%2BfGWwBNxRlCLgIJPto79ySTp40GbB7ZAiB%2F8TL9FaIN6%2Bf7zQH5PbXvnba0MxHBAm%2FnURQejsmJ1Sr%2FAwg7EAAaDDYzNzQyMzE4MzgwNSIM2o3OIbtlFDzcygwZKtwDMe9I1c3yRHOAafJMkdtzQQp5mo5%2BvKdlrGSl92VIw%2Bwk87uddhZzCRQQ6JdUGX7VktWg4GiLtMTkTvJfTN3SwCRJZzZLypta2lxibQ6JOpJw%2BZDy%2B01mDtW%2B8B2E%2FnjW1wghOBfycxrgsortyO%2FEBigRLXOLm6M9GQfGJUg0q9Bzb63ikSZCCZxhV8YDrP7MWu1P%2FJgM%2BEMftLKd%2FmkAt3F5pG8FsWZVMq8GWkk6lsSxEBvvdCQ4%2FzZtI3NBr7%2F0fgK6Xu3dLjkpRIwj8o3nEwOpOHoIGEHyEBhHjf35v6cAyVPMMv00ia5t96neD%2FbRw7APp2i0ozTClI8yjnuats%2FBBpNx3gPQnWgL77A%2FUCBmFuW55EKATbSVEF5I6oN4Kn%2Bn%2By89GstTUMltHzq2LQppj%2FVw0y4FuqXUjNYjnLVWRwg2RmiRL9jV7B5Bw1etVw1UU9jXxetgZ9MzEw6qNi22NhZh%2FqrxYFnO6d6t4ZrbABatIl4lCtfVIKZcFYSSM%2F7prq9isVhG%2Fnrw3%2FzJBSTqSn933Hy3I48Y%2B%2FNLTGfY5nKIfGncAqA5W2%2BhPlbVoU4yVh6%2BAMtVu%2BVMdyxdhN8j8ECz%2FvzSYJdImTkpbtR41NZ227kA%2B2JD1dwwpavsygY6pgGUQLZl9TQHvBexDz%2FZ%2FkTLDZnT3UyhIj1ytQD4RHqhmgbu%2BKIpNXlVqy%2Bbf48FBLtzXoYA0yxEBS2vZgi0moU%2FHE6YU6p0rT5fhuaUAOYwUugeeAXbR%2BL1dhEBGX36JFiJ1LAZf0OSahrG%2B0e%2FTOaNbTQN3x%2BjSY8TSDQ1xQ1j6wVMkwNOqKMWc4n%2BNBIuQhjrY3zacKxJreH75SXdiCshsVP6Lcx8&X-Amz-Signature=dcf3f025dfa18c5ed6cce0a24051cd2af5daa8641ed2814a22d2dddc952d09db&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466T4NAFLMC%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T044550Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHIaCXVzLXdlc3QtMiJGMEQCIGdIKb6t8VG25ww0tilS9QleRClivhN5eHUFP%2Bp4G5w3AiA0%2FQdWxlhLhzgXCHfD5hwc4ANtTYLo9QbxI7r97yUGLir%2FAwg7EAAaDDYzNzQyMzE4MzgwNSIMlriA%2FlcnS2P%2BHVLCKtwDeeWpFbHX45YkeW9fkWd%2B9bB%2FWaXnw6WCxqG1%2FGRrZnoQiLw%2F4Yj7smDHd%2FD9fdohgx5vzx1dYtUV0G0ilmgW%2BopxwPuczJp8tLrPE7gm21GLSi1%2F8JueBTdbbKepc69uu7VrEGLWWDgaiqGkJQRn%2BqaKniIZZ4oSfws7PlW2tjTuGegEi5tyCBHJ%2B%2FIwUmaZzyxz9T2wx4TuBP%2B%2BRMXTvZP1h0E0AQYDOP1arpq%2BA%2FYsH48l0pgrwQCzy5nQuOrdSsl7kIcm37EdmwlJFtWhdGkCe%2BNmTC7UW9WytJsKtE272owSJwNT%2FJyLZNn%2Bd0dC5lzKhnajbkT6oFKyLWMBu6M2c2gjDbEE8h4bEj6WE1gG3GlRuOZopslnH1Wwdy62LhOOzBqt037wPqc8xGhZHhucnv9jOjLx1KNdwkdQ1jr8C5JUoXYekLg9vcggWzzY6AnK9Bsqlr20H3WV3kuTLzNBKx68Mtg4AqInqDGUVQgxnSOpnZX94xLtrSDPQ%2BjnT%2BUE%2BsQ2Hi0i3MatRgmro8P1ARzfiucf64e3dQ1FojPSBlr1Ei%2BZH1iu%2FOM9vQNaEuHlfVhi75JLYXY6bNDUDpys3J2y9LbvrHUbETRxtQ2mrZLQSSYHxZ%2FcHvEwgbPsygY6pgEziYV%2Fue013mmIXqS8avusoSW%2Fi5FDAOpmjVoVQQpP1c0mTsKG2VyNXAscvY6mVp5%2BT39x%2BTU89NJR3uoyx73kazFKCdobxffX9eqJlcOMtLck8%2BR%2BqasNozB55CveKNuLCHXx7Q%2BzTI7G%2FAz4rEX6waCnMW29g037NfO4vz%2BqU3sLDG0iS00xPQVz0XamFzcq9XGizlwwafZ9lcgTr2M0AwFKp6Rb&X-Amz-Signature=9d6dbd04fedb62acb355c3bb24b3875140b58e42d3a7a98c6c3d7bf9e1ef8b27&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466T4NAFLMC%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T044604Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHIaCXVzLXdlc3QtMiJGMEQCIGdIKb6t8VG25ww0tilS9QleRClivhN5eHUFP%2Bp4G5w3AiA0%2FQdWxlhLhzgXCHfD5hwc4ANtTYLo9QbxI7r97yUGLir%2FAwg7EAAaDDYzNzQyMzE4MzgwNSIMlriA%2FlcnS2P%2BHVLCKtwDeeWpFbHX45YkeW9fkWd%2B9bB%2FWaXnw6WCxqG1%2FGRrZnoQiLw%2F4Yj7smDHd%2FD9fdohgx5vzx1dYtUV0G0ilmgW%2BopxwPuczJp8tLrPE7gm21GLSi1%2F8JueBTdbbKepc69uu7VrEGLWWDgaiqGkJQRn%2BqaKniIZZ4oSfws7PlW2tjTuGegEi5tyCBHJ%2B%2FIwUmaZzyxz9T2wx4TuBP%2B%2BRMXTvZP1h0E0AQYDOP1arpq%2BA%2FYsH48l0pgrwQCzy5nQuOrdSsl7kIcm37EdmwlJFtWhdGkCe%2BNmTC7UW9WytJsKtE272owSJwNT%2FJyLZNn%2Bd0dC5lzKhnajbkT6oFKyLWMBu6M2c2gjDbEE8h4bEj6WE1gG3GlRuOZopslnH1Wwdy62LhOOzBqt037wPqc8xGhZHhucnv9jOjLx1KNdwkdQ1jr8C5JUoXYekLg9vcggWzzY6AnK9Bsqlr20H3WV3kuTLzNBKx68Mtg4AqInqDGUVQgxnSOpnZX94xLtrSDPQ%2BjnT%2BUE%2BsQ2Hi0i3MatRgmro8P1ARzfiucf64e3dQ1FojPSBlr1Ei%2BZH1iu%2FOM9vQNaEuHlfVhi75JLYXY6bNDUDpys3J2y9LbvrHUbETRxtQ2mrZLQSSYHxZ%2FcHvEwgbPsygY6pgEziYV%2Fue013mmIXqS8avusoSW%2Fi5FDAOpmjVoVQQpP1c0mTsKG2VyNXAscvY6mVp5%2BT39x%2BTU89NJR3uoyx73kazFKCdobxffX9eqJlcOMtLck8%2BR%2BqasNozB55CveKNuLCHXx7Q%2BzTI7G%2FAz4rEX6waCnMW29g037NfO4vz%2BqU3sLDG0iS00xPQVz0XamFzcq9XGizlwwafZ9lcgTr2M0AwFKp6Rb&X-Amz-Signature=c659419fa377cf668f9bb3fe37482ea85637e092f082f56eea43dac85f177d12&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466T4NAFLMC%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T044604Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHIaCXVzLXdlc3QtMiJGMEQCIGdIKb6t8VG25ww0tilS9QleRClivhN5eHUFP%2Bp4G5w3AiA0%2FQdWxlhLhzgXCHfD5hwc4ANtTYLo9QbxI7r97yUGLir%2FAwg7EAAaDDYzNzQyMzE4MzgwNSIMlriA%2FlcnS2P%2BHVLCKtwDeeWpFbHX45YkeW9fkWd%2B9bB%2FWaXnw6WCxqG1%2FGRrZnoQiLw%2F4Yj7smDHd%2FD9fdohgx5vzx1dYtUV0G0ilmgW%2BopxwPuczJp8tLrPE7gm21GLSi1%2F8JueBTdbbKepc69uu7VrEGLWWDgaiqGkJQRn%2BqaKniIZZ4oSfws7PlW2tjTuGegEi5tyCBHJ%2B%2FIwUmaZzyxz9T2wx4TuBP%2B%2BRMXTvZP1h0E0AQYDOP1arpq%2BA%2FYsH48l0pgrwQCzy5nQuOrdSsl7kIcm37EdmwlJFtWhdGkCe%2BNmTC7UW9WytJsKtE272owSJwNT%2FJyLZNn%2Bd0dC5lzKhnajbkT6oFKyLWMBu6M2c2gjDbEE8h4bEj6WE1gG3GlRuOZopslnH1Wwdy62LhOOzBqt037wPqc8xGhZHhucnv9jOjLx1KNdwkdQ1jr8C5JUoXYekLg9vcggWzzY6AnK9Bsqlr20H3WV3kuTLzNBKx68Mtg4AqInqDGUVQgxnSOpnZX94xLtrSDPQ%2BjnT%2BUE%2BsQ2Hi0i3MatRgmro8P1ARzfiucf64e3dQ1FojPSBlr1Ei%2BZH1iu%2FOM9vQNaEuHlfVhi75JLYXY6bNDUDpys3J2y9LbvrHUbETRxtQ2mrZLQSSYHxZ%2FcHvEwgbPsygY6pgEziYV%2Fue013mmIXqS8avusoSW%2Fi5FDAOpmjVoVQQpP1c0mTsKG2VyNXAscvY6mVp5%2BT39x%2BTU89NJR3uoyx73kazFKCdobxffX9eqJlcOMtLck8%2BR%2BqasNozB55CveKNuLCHXx7Q%2BzTI7G%2FAz4rEX6waCnMW29g037NfO4vz%2BqU3sLDG0iS00xPQVz0XamFzcq9XGizlwwafZ9lcgTr2M0AwFKp6Rb&X-Amz-Signature=c659419fa377cf668f9bb3fe37482ea85637e092f082f56eea43dac85f177d12&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XIIXJUAX%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T044604Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHIaCXVzLXdlc3QtMiJHMEUCIQC4NZlX1ABtPXE%2BfdNm0MHWbFAM16pZHg1EuvL2dVEDIAIgeiPsgWd%2BHaA6gK1duxxzCQANCweOTlM7ch5gw4hOqyEq%2FwMIOxAAGgw2Mzc0MjMxODM4MDUiDF%2BEd%2FQlwWB6icm%2FzyrcA7x6honPB9U5GmFw0gwe2gkYvS0WFIGpVJEHnudALP0kX%2B3AYLhnQICxQZFSQmriw7IMQ%2F4jddSDhmGYj3MtEdy58JNlUy0SE2rhGFDzFxCUmUO2jjYli3ggsg10TPRJVC3A6wq4WMk1GUzaWqmRC0syxlEHRRhSs9Tf%2B8JGbIfc9dcv3Qm9lk1I3y9WUxpCsWFEuA8kfBuEgqu4DiZA5xB1XkJp07uQ1EUTqkW0jIVRA6E0j2dutvCmIlSN4SzkOCkCxKpcKF2055csKVTca3PWHpKelNqutndAC430FizWoi8kYUZu0hHIBYhA42rQYIVEM1zt37esjXABI07FFMLP%2FV4g7xNicpmDEnmNr7XT9JJ5hl7%2BBmr99WDEwv3c7%2BEWFFkDGpJ%2B%2FUi1ZSvDiglTh00k6%2BakqiGfbODXxYNhWB8c6ATR5aNYqroJ7uPIhyXKB545hdVNV72V0Y8h08BNsJCaL1m8bRdjVxA%2Fuome2u5irzLcZglsBhPstZNA5H7tBriKuJdcWTTggnS%2FRXpc6v94X4EM9YfSme9oedTAKaPc7Xn3qnYEIrXcLaLQA7FfEyQsK3%2BczrNu0rvDbvMFORT8toY9LeuYPElczMY3OPkitkoefjzwmxsjMM6m7MoGOqUBupWIzcMZxi3biWlzeydf%2BlfRYgdTymV%2Bv25av%2BayAD%2B%2FzoQoyrL3cdZk4KGda87QCpNVSIr3eiLAUaz6Ist8CS3rO2tZli6uPDdRssoseewRQZTokprmGR6V%2F7zD6zsO8NAvgJUnoE2pzvRfWH%2BS5sdb%2BX0rSFeSuR8Un6vnqXShLYRsw7i4Ov6vs9FDKbGcfr4%2BoiJqDQokMF8Gdqatkxkf8aJt&X-Amz-Signature=66beb8d647ca9ba0536279a16e09575433624c11a8f93a62d7f480e9170e967a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

