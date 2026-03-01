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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46626KN3Y6V%2F20260301%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260301T151042Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIDPFsEiQOiWY9bk8bovWk%2Fw8pBgoIIEbGtHbKH632m7NAiAa%2FGc%2F50AIOVdIQNpdP%2BfSvIf8r8ipGE%2B81hbW6WqSSyr%2FAwhrEAAaDDYzNzQyMzE4MzgwNSIMkARThnjustlvFAknKtwDzK%2FmSdV3JERXj%2FjxTJNw%2FBwDkMmQKIbFnvDu%2Fw7tt%2Fhfwtx6wKTF7%2F98j8BpZuTQF%2FITnOUTtiWOv4age0TmGbuPbleAfZgNAApEsFEjaW3e9Ce3ZjFt2rqlUtGpgj2UBJmHTFY3GU6LysEehP5vcdHhLbzTrZj4jowaehpxtGVNd2%2F%2B3a0EAXi7gE8aHuhYg3ky4Y8Lx3Yu4pGMTg5D82wk1R2BoyL2OMXE%2BCUXLy%2BFGQKFvGjgsSftcYKqsDXZAbuwWybvgEPnOqlRa9s%2FlbFOTXMF3WS2phjiBmMPbD84Ob4tOXWTpXUFR1%2Bc7aAPVgBJXawF%2F%2FY9zjTct54%2FjjD66NVqC34apzjROdyWWF%2F4gzcqqwdWnYA3%2Bxmmimo7k7CnUziVA7kQGSxtEiF00XW2vytw%2FoQooQn%2BKmW9OMcCFfGSbcjN8zg2l%2B451vrZhWRxmFtTnGA6VH3twtdYd1tIiQhSeqQg4rRacV9o8tGEQgrNQNqnHFceARykU6FQ4PPAsw79KV033p4%2FAXjFyk2NK%2FB1a1SGjmp6LQyRk9FwjM%2BOH8QWnKoR8msSS%2FTfXoXKI1x6M2cqIaEh6zIDaYBd41mdI0aUD8gbxaO2jOOinesHVXSR2s8oNtMwj42QzQY6pgFGJ8PqhMRN6ECVl3y16I3%2BkGNS94xOLEggqAMZz1fa2tCE%2FtHg8eg8Wuz4UUYpJI78psf7T4cBHnAoWdZUExpuNIHKXgT%2BIGvFH9tXMvk9kOBhDjUajhjlNoZpbGZbkH4YoksLcdPELntECUtv6W7iBbsQREsB%2BHqA2glAECWrvdk%2FHKA6WMGZgTi73KlErt%2F5QuWqBbbez53bFN0XZqfMj2xnL3s7&X-Amz-Signature=f68990b4a5d9b48b14f1a325297134fc5ca41fb69875c7a9f271286bae92bdab&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46626KN3Y6V%2F20260301%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260301T151042Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIDPFsEiQOiWY9bk8bovWk%2Fw8pBgoIIEbGtHbKH632m7NAiAa%2FGc%2F50AIOVdIQNpdP%2BfSvIf8r8ipGE%2B81hbW6WqSSyr%2FAwhrEAAaDDYzNzQyMzE4MzgwNSIMkARThnjustlvFAknKtwDzK%2FmSdV3JERXj%2FjxTJNw%2FBwDkMmQKIbFnvDu%2Fw7tt%2Fhfwtx6wKTF7%2F98j8BpZuTQF%2FITnOUTtiWOv4age0TmGbuPbleAfZgNAApEsFEjaW3e9Ce3ZjFt2rqlUtGpgj2UBJmHTFY3GU6LysEehP5vcdHhLbzTrZj4jowaehpxtGVNd2%2F%2B3a0EAXi7gE8aHuhYg3ky4Y8Lx3Yu4pGMTg5D82wk1R2BoyL2OMXE%2BCUXLy%2BFGQKFvGjgsSftcYKqsDXZAbuwWybvgEPnOqlRa9s%2FlbFOTXMF3WS2phjiBmMPbD84Ob4tOXWTpXUFR1%2Bc7aAPVgBJXawF%2F%2FY9zjTct54%2FjjD66NVqC34apzjROdyWWF%2F4gzcqqwdWnYA3%2Bxmmimo7k7CnUziVA7kQGSxtEiF00XW2vytw%2FoQooQn%2BKmW9OMcCFfGSbcjN8zg2l%2B451vrZhWRxmFtTnGA6VH3twtdYd1tIiQhSeqQg4rRacV9o8tGEQgrNQNqnHFceARykU6FQ4PPAsw79KV033p4%2FAXjFyk2NK%2FB1a1SGjmp6LQyRk9FwjM%2BOH8QWnKoR8msSS%2FTfXoXKI1x6M2cqIaEh6zIDaYBd41mdI0aUD8gbxaO2jOOinesHVXSR2s8oNtMwj42QzQY6pgFGJ8PqhMRN6ECVl3y16I3%2BkGNS94xOLEggqAMZz1fa2tCE%2FtHg8eg8Wuz4UUYpJI78psf7T4cBHnAoWdZUExpuNIHKXgT%2BIGvFH9tXMvk9kOBhDjUajhjlNoZpbGZbkH4YoksLcdPELntECUtv6W7iBbsQREsB%2BHqA2glAECWrvdk%2FHKA6WMGZgTi73KlErt%2F5QuWqBbbez53bFN0XZqfMj2xnL3s7&X-Amz-Signature=f68990b4a5d9b48b14f1a325297134fc5ca41fb69875c7a9f271286bae92bdab&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667H5FWEQK%2F20260301%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260301T151042Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDP%2FAKISsBxoflkYMD1EexB1Brsx4V2uwKZGFmnJdjUvAIgYDBP9EVBQ5YeBJtyUF%2BPzW0bTk4O0yJqYjaDcHXjaqkq%2FwMIcBAAGgw2Mzc0MjMxODM4MDUiDCXVs8F4AJQuKzzv8yrcAwbXFABzHrDWc1SBUgV2Hb2xr5X7LfuUPAMrmrk07n1tJMNC6c0qj2932dJ%2F60VdcWRCqppLiUXSy%2FFa1G6KFksjt%2B4C8H65JHaheISbriwcWUG5asUYkz8c6ndJ%2BWSTFDXZWkLtJmyh4MgIieeG0QL2Ur7teeezwL5xAzMekMzecbeFxtTCi094E3%2BinEQy2ONKlGy5WdNsHvRspJZT%2FfUaK5%2BSEwu%2BO3fuYajE4QqiRxrxn4HZPJEdL4lQbffQtFIcQyZ4cPUHMHT%2Fe5hA9WS5t9Awy0BMwZ5ZuP%2Be4WqZYObvnsS6lpEe4n6reTYDZhSFQuPfEMfS9xzCOGS1G9CAnRLelr71Wbfv4XCD%2Bk2RqFcWzq9gG5VG4Ss08TUQDXBXLjoFxAzSUOMpmn5S4FlzqH3ybQekFrKcrlTCuZFOyY22erJUWdjFfkYzUsaif2qERhWI2DD0LmC8cjsjk8VR39Qj3apf%2FYsYaPOCHG3FGhRWEqFlXV4nxU7%2FHS6fX5rZkNqnCAmbYqVRbR7Lr84L%2BBRoMYuyUhRFc46G2jxFxQs5WrwZJE7nSdbCTGlnRBocjSSBS2c4thdSvLxFmPRidkyr9G5X%2FWo46azVUiHefTqX2R7lde2tatG5MLOekc0GOqUBwd6plDjIo25ae59X%2BD%2B%2FQlXmroGtwHy6AA9P9P4OT4GjfnswpUNc1EmmTedlWK%2BuZA60u9TpbvKwQ8qwEYOUn7Pe7ZmZpVodzSiFyt8gfpGEjC6wnSACGzS3AVBVXlzqiLLR%2FqiELyFPoucB2xTP5jSui3UI3UNux5lmnWdgX1yd8Xyn9PdpypOkQvkc6Z71bJ60kcayrA39vA90esQA%2FS1G4hkv&X-Amz-Signature=55057d149bbd4b5deedc519d1aa70658eaeec888ef7a1c599e611dbbbfadd091&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666QS3LYXX%2F20260301%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260301T151047Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCh%2FYal1lOkLCDCDLME0GHyHpwj36F7pBKCQDeKgy7BLQIgBNzwrBMeX75Fc%2BXfBFnALCJmuMG3Aj4VUYGErOsAioIq%2FwMIcBAAGgw2Mzc0MjMxODM4MDUiDG4gZA0jcwGs9k3YdCrcA8r5GGmUf2mT%2BcV%2Fgjme18%2BIyrkxcOfvNDKzbiB385vvt3KI%2FSgAe%2F1qJj8yBN8FTuKK2PS9lUKcZou55sCJhRMAGQDYtZ5SGLIXJd0Ceop1fQEVvIIeyU1r%2BNAElSPeYcwO%2BIsP9Qya8Hn%2F8rW3TniQ6ajSP52dUScC5maCQv7641vHtU7jxGsCqYpZzwfinx00GFGReKhk9zwjqgJi68Zjb%2BWt4eOMDxfsoak1jMNQJaoig3EtvYgysYNg3%2BL8%2B0UxuqCyviiF0uVlj4Ea6HbJUDpcXv5PaKyohEM7CsPUfc0FaKBoWNb44we%2BUZZb2%2F4GpzWRKSrIr0uMT1XVIVmqG4bDsamLQ9xyK2SNo5qnzVDKUfynqE5zrxkadY%2B1WAPjtCJtjLcDyICbesueFIK34iLwo6RIL6PjXH9oQdVSCVGV9zkkuA3vF0nL7VkVlvXO%2BvWDC4XJwQh4h%2BPkL7ZVGzcrfqZdO9Yx3JmwfXFhpY18MOFNS2eAL1m%2BBB2%2Bgw57kBHP%2B5rI6PMTp7309bDEyL7n0mjcvKAScreWea1aqjN1uXmDHMemcaprcfhWQ06PYGXvcRiyLPpCVCyIFwN0PKhOPBRsk5Kg26l%2B0LyxMzHOtNKDYj4kZBEwMOmXkc0GOqUB%2Bv8eUNUaTw546HKkDxBHNMUBGkaOpcmAHWl%2F3IQxk5MHqjpcb%2FexoF5FRfwYnKibFKQDx7XfQddYEf5UShDTOhyya5E5FfTDeY3MFdTiOVN%2F9o%2BzbQqcH5Zrbbog3r9XoCeuwjI5o0LXt742402rCtsNug83fw4xF8D5kAHbkpHlXKGTxuCZMBejDwRnYSe%2BBYJqpttFNnJk5PLO4HOLuqcpXHjC&X-Amz-Signature=247904f0f87e2b58f421cf9e0da650410b26ad4dbb9ccb29a14f3a3518d998cd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666QS3LYXX%2F20260301%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260301T151047Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCh%2FYal1lOkLCDCDLME0GHyHpwj36F7pBKCQDeKgy7BLQIgBNzwrBMeX75Fc%2BXfBFnALCJmuMG3Aj4VUYGErOsAioIq%2FwMIcBAAGgw2Mzc0MjMxODM4MDUiDG4gZA0jcwGs9k3YdCrcA8r5GGmUf2mT%2BcV%2Fgjme18%2BIyrkxcOfvNDKzbiB385vvt3KI%2FSgAe%2F1qJj8yBN8FTuKK2PS9lUKcZou55sCJhRMAGQDYtZ5SGLIXJd0Ceop1fQEVvIIeyU1r%2BNAElSPeYcwO%2BIsP9Qya8Hn%2F8rW3TniQ6ajSP52dUScC5maCQv7641vHtU7jxGsCqYpZzwfinx00GFGReKhk9zwjqgJi68Zjb%2BWt4eOMDxfsoak1jMNQJaoig3EtvYgysYNg3%2BL8%2B0UxuqCyviiF0uVlj4Ea6HbJUDpcXv5PaKyohEM7CsPUfc0FaKBoWNb44we%2BUZZb2%2F4GpzWRKSrIr0uMT1XVIVmqG4bDsamLQ9xyK2SNo5qnzVDKUfynqE5zrxkadY%2B1WAPjtCJtjLcDyICbesueFIK34iLwo6RIL6PjXH9oQdVSCVGV9zkkuA3vF0nL7VkVlvXO%2BvWDC4XJwQh4h%2BPkL7ZVGzcrfqZdO9Yx3JmwfXFhpY18MOFNS2eAL1m%2BBB2%2Bgw57kBHP%2B5rI6PMTp7309bDEyL7n0mjcvKAScreWea1aqjN1uXmDHMemcaprcfhWQ06PYGXvcRiyLPpCVCyIFwN0PKhOPBRsk5Kg26l%2B0LyxMzHOtNKDYj4kZBEwMOmXkc0GOqUB%2Bv8eUNUaTw546HKkDxBHNMUBGkaOpcmAHWl%2F3IQxk5MHqjpcb%2FexoF5FRfwYnKibFKQDx7XfQddYEf5UShDTOhyya5E5FfTDeY3MFdTiOVN%2F9o%2BzbQqcH5Zrbbog3r9XoCeuwjI5o0LXt742402rCtsNug83fw4xF8D5kAHbkpHlXKGTxuCZMBejDwRnYSe%2BBYJqpttFNnJk5PLO4HOLuqcpXHjC&X-Amz-Signature=bb0a53681326605e01da37723b6a5218a4a2c90026fb44a83d4d1e317b7c1b16&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667KLLWKHJ%2F20260301%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260301T151047Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIC%2BFpdKQFU8a4xUzQpl72iW8G80tl9pIl8cfCB1M9enuAiBu%2FM8kxSv3jkrjeZthZviWUeh49L3bcV77Bqaq5FCypir%2FAwhuEAAaDDYzNzQyMzE4MzgwNSIMFzS4mh8ZR%2BtdvUelKtwDqvGe5ufNhJnIap7mwD%2BkOfaF2uMavOXGv%2FluHDINPTogaAH5oQxphmruHScFUf2JUqXR0Pz2APr35sVU2pHGQOjyhcFSwj2wZXvzipheF%2BFo7eZFgCMLHYduEauXVPKmEiE9MMymcf3MnyIEa1QdUcVpjPsIzeZB%2FENzLCUFYazOwXJdnY63LotKBoZhyYlZpoDU63PDb3PtW0ZhoOwSh5WckU7W40cOYOmZhXBj5q05l4wne1CesXB8L5ddkzjxtq8b7wS5wimkJegvnj7suv71dYrDzLOFVWTRdh4EmyE80tDgUCGI7B3TxoSbqiOA5IdBPl8WP3oZBKJJIuWlbcCXoXIfg8NZNzDl39KWr59t2HTLhEtvYtTaziHayHgZ18xdd66sIHYR2QzkHvJJCzMG0Xk0ZPsWb4jWU5MwWMEZBudCg24vr1wf0V0h9mgA3xVw%2BVawm2WDVfxZ1yWUbMoxcLtgQmNZADi%2FO4TPiQCVOPWpC4oDoxXL34W4VbR4Z%2BleKvePNqyiIF91dgZ8aeRnqjkyWwYjPoHeMRcOLcCs8rhzezQUlTD3Dp5HU80u3uH6Fvm7y6V%2F6CR%2FX1UGoM5VkabJkuQENgED%2F2AgHbA8rO4hLi%2FJEwW0W8UwyOWQzQY6pgGN2ozzK14AXtSMtr4KALUp4F4QATlyM4u7m2i%2FnqCN58y5NGW6EwhGFhRj1kSocwDBG9zVRzP%2BkxVeMFctSoWpSc7OSoZK%2BF1%2FDPateKDsF8RB4sPrSmNFOPpLHE2uwrMUwdrb6OP0k3U85Z2VWEatzyTdLhBDrpUwZhk70%2FzW%2Fk3XmoNTwz3rrTlwBZ0rl6mB9G88aotXkhYUAkThgG8xheQzFeTF&X-Amz-Signature=88a85277b703691f01ce5b138e6111aea834ac5533a6b72c6f1816fa5678acbf&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46647UEZOY6%2F20260301%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260301T151047Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIA6UFSSZD5WAvmJT58Fjb6GgLGOJKf29ux5wfZ3jp7SGAiEAzzI2aMvCppavlKAcNPhMK7acCyoGmrnQtJo4tviZB2Uq%2FwMIaxAAGgw2Mzc0MjMxODM4MDUiDGcEEff2l%2F3SkdPz0SrcA3Z7tnO2VjqT2hZTZF%2FNVFKGO4laCJ7SMRddXIx8JGI4gEd7sbYMl6DSTDuz2edTN11js0e2u%2BH155CaRu3S5Ezu6r4SGa5Zt0O2yWHpPIuCmiXv8Q25kqiBX1W8pzw9WMsQRRfp62pMZAmIhw9fupZO%2FbG%2FSoKtS%2B6%2BRQjj8B%2Fu6%2Bt8WgmmVAS3UXWkoLoyka0rN6ibu41qZ04MnPjOzJ0Q93bSbeSh2QytLiDu%2Fp1Zwm0No09RPShSaMCnJPsm4gVIHC%2FLsOqWizQVD0V5YYqBkS3cMZhP5nh9fzjqq1ZIrCw6xQuFxXkWQ7auPYWzsRYuHojxa1FhWf1o1FdG1NA%2BtXMlXXdjwx1HKkg9mij9TUwOklloby6J5GVdSkF%2F4T5Pn1vwPeDalUk9JnWjWd4tgZHxA6vUCKHhMptBJJ5B5JI4Pk8zS9IhSPWs%2FJcHs68o9aaoNRO24mz0OwD5L9whr25DHCa%2FjEMhhTCIDlrJoGlJLQ8xaSb1%2Bu2vIfSK%2BTtb3nIl5rhb7u42iHbb%2BWXc4VlbtNy6TF7WZY9oN1B9DZ0MwYv65Dc%2BxREIhR4pyExibKZOiqIykMQN9qzB5gW83HW87EWkXRD%2BNYbFQa8u%2BNgMIinuuw7Fwbl6MNigkM0GOqUBAXPV8eKKJ%2BAneM40vWo8tdOGyUrjQHTvrHpcasTe20A%2FfNKNWk%2Fu4516GDe7%2Flx8bPDtw6Sx%2Fe%2F59eqGNuJcxn1kKo7GyctL88ApHRpIhuTjKEYAGfWI8SLDwixgl97jApJAf5QNn5WqFaY1o93unCLqcTYGp6YKsvfwYUj7XGAQ71PsXM8HMlqbpa4RKO%2BsAhKGhI7bCr6pkQla23UJZvj4xrSb&X-Amz-Signature=25c3d7faf548276b3b3fced3c314c7ac94bf74bcd428656f580605d19c76663a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TNNMJWYE%2F20260301%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260301T151050Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCICRtu%2FjzbXKf0Rp4Hyd8Yd15Kdif934nt3OpUuvu%2Fmj%2BAiB73hN6vV6OSpRYIibT8F%2BIIvMzWESAnhBaQXvqp30wVyr%2FAwhsEAAaDDYzNzQyMzE4MzgwNSIMKuRibvKgBuaBsYKSKtwDoBKg9Vf5GxXydwOqVgLMGHg8gVqGIHk78kON82wLWpjkNytRAhPlW4pUsl0s3yTjuTQIDNmoX2YfT%2FAnD7%2Be1Ul7XoRjs%2FZQEDVxO4ZyeRx0QjVJ4Ei86A2FmvaLXDdx1BiS7BUQfBqNHGeiXOv2tReyxsHVSq%2BwxudXMKb92Vu09%2F2HrwfisvchrLrSkhdsktp0CbG2nU8nItdaa1%2BcBe6mFx0M%2FkLybikDNMWyENqQbjYE4hhU3oTxlvDF9CrkA4UBeb9dejbJsEbXspX8Sw2e2ZI%2BdW8nvT6aaok9vYKVEj1tV9sLdLE9Ym0NBdGVNTgup8678euDc2ITqOyfvht7wc%2BrxxzxTznaOF3fhuBok2wG5efoe%2FEnNRKeENK96NkkLHs0wVCwSB5BVFSBYKoBnSC5W3eQlIs5NAn91rXSZ1ZhPVGdl%2F1R4kEBBy9GHzmglqMBpvW4AbjOq6OVFt4Bb1rfwrA3Gv%2FKkF6aWaSpHGh%2B4oAn33u%2BSoddp47TrTIqhwLp9xyJVbMCUA5Ep3S5cC0qWFQU1kOynV%2F1oNwsygOj9mcRMhCx8C0htQJ%2BzoGKX6WH8RaVeFlDXj2KZGCpO%2FIQY0fIgdJdxEH1DODIbUvzepfeprDVrOwwt72QzQY6pgGeyMZ2BOHL8blbN%2BuvDJMpzWJZgRzV6R2LoiXtNaXtXU396qAI41RKmriq5zX1vT4SMXtaSvDDrKJxyzqfY9N9IHGo5FNbbH7cYq7U%2BAKGageAeqSKmaaGGTiXW4FDTzGFAUoUyc3JnVYZq22hnff0aB%2FV7FkU%2B%2FW%2BAWMv6H2w9vl3GeQ4zrCbP6VjGlxFMMScj3VcsT1zbN6RS5P9Jnwovbqbh9U4&X-Amz-Signature=e6169c6b5adc602235ff4fa5ab9260479058b52a7f4bd922921d9c2071da5b77&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466US3QJFGE%2F20260301%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260301T151051Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIGV6OuyRrKOJRtqjp%2BO8s08%2FySy7rRJXcnAm1urGaqcaAiA4pr1B9k0IKYAIfJ0R9mdBGfGbSoFH%2F%2B6z%2FD%2FZUBWokCr%2FAwhtEAAaDDYzNzQyMzE4MzgwNSIMdjvw5oHiXHs9%2FGi3KtwDT9enZdIhoHrGeTF8dKpVQcE8AJGoFcHayvV%2B1lmkzDdMRQXjRQ1ZsD7iXR5p4jDpDrbWXhI5pMCjH6%2BaHTHs41yMB%2FTjxlcbIdn4bGXpdfO5o6qJml6y2DE%2BX16sTJgcsqsR%2B2LtNPC3Wct4gvE12VUMPsgpMVQ6XcAAzYV2TcM6uDQ%2BjiSws9BVGDblroOrjB7tmZwF%2FLxnq%2BJiNYcEldnC0GUsTBRtGR00VQ9sOdRUEMpXHzK5y4EPvwpuk1hZZe3eHwPhQu%2B7krqGqkcfjyiqfGip%2BQ3d5Ar1ovMh9AoMQU6OAjY4Q5Azaq9IxGj3vGyHaJcQuxifxLLFJaGCcVfr9FVUvzd%2BAB6c7wgnJa%2B6uUZWV2qPk%2FJ3RGMKbh8D%2B0EHVRqllum%2FQY3X%2FAKwYayR3jrdSA1SFN7qT0Eea6CqVgfeJrX%2FpB7gOJoPppsLbYjN06MuXCDyGp1IKJdZ5WcUiig1Jr69w1auCGamcedl%2F9D2llpBqdnRbQgXgeu1Fxfykae3vHYiE%2FQVsYXS%2B12q3ZWGYSttFEomJ%2FJBoQNDj5M4ni5VmdvocwKJd7En2u4iAGs33Gdfz4y00tLX4bYDQP95WELUNp5wuRaH3CxOTV9529ZBT6ycv0wwqNWQzQY6pgGvuBPUpx3rG91YxZ%2FgWn4Ftt1543sZQFyPqa0k8VIy01tZyguQSkkFgrI53Z85CHeiuPlhmafZVPd0IIoDmHatYyG5jNF9ubAz7PBcXFoKufFGAYWQuQclWAzxqPCCHjT26nBdzTWkVKuiCIhZ3zBawEtKFaDjhvGZBufAwyuqV0ow1uZ3pIj%2FDikc%2BuZsiZGVNDzgITP%2B0yO5A8sQm9s9o7y3fTMN&X-Amz-Signature=a63eaf8fc00e526a0fc1ae6b777370b21bd9bf518ac61e702e0cc48b465895ff&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466US3QJFGE%2F20260301%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260301T151051Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIGV6OuyRrKOJRtqjp%2BO8s08%2FySy7rRJXcnAm1urGaqcaAiA4pr1B9k0IKYAIfJ0R9mdBGfGbSoFH%2F%2B6z%2FD%2FZUBWokCr%2FAwhtEAAaDDYzNzQyMzE4MzgwNSIMdjvw5oHiXHs9%2FGi3KtwDT9enZdIhoHrGeTF8dKpVQcE8AJGoFcHayvV%2B1lmkzDdMRQXjRQ1ZsD7iXR5p4jDpDrbWXhI5pMCjH6%2BaHTHs41yMB%2FTjxlcbIdn4bGXpdfO5o6qJml6y2DE%2BX16sTJgcsqsR%2B2LtNPC3Wct4gvE12VUMPsgpMVQ6XcAAzYV2TcM6uDQ%2BjiSws9BVGDblroOrjB7tmZwF%2FLxnq%2BJiNYcEldnC0GUsTBRtGR00VQ9sOdRUEMpXHzK5y4EPvwpuk1hZZe3eHwPhQu%2B7krqGqkcfjyiqfGip%2BQ3d5Ar1ovMh9AoMQU6OAjY4Q5Azaq9IxGj3vGyHaJcQuxifxLLFJaGCcVfr9FVUvzd%2BAB6c7wgnJa%2B6uUZWV2qPk%2FJ3RGMKbh8D%2B0EHVRqllum%2FQY3X%2FAKwYayR3jrdSA1SFN7qT0Eea6CqVgfeJrX%2FpB7gOJoPppsLbYjN06MuXCDyGp1IKJdZ5WcUiig1Jr69w1auCGamcedl%2F9D2llpBqdnRbQgXgeu1Fxfykae3vHYiE%2FQVsYXS%2B12q3ZWGYSttFEomJ%2FJBoQNDj5M4ni5VmdvocwKJd7En2u4iAGs33Gdfz4y00tLX4bYDQP95WELUNp5wuRaH3CxOTV9529ZBT6ycv0wwqNWQzQY6pgGvuBPUpx3rG91YxZ%2FgWn4Ftt1543sZQFyPqa0k8VIy01tZyguQSkkFgrI53Z85CHeiuPlhmafZVPd0IIoDmHatYyG5jNF9ubAz7PBcXFoKufFGAYWQuQclWAzxqPCCHjT26nBdzTWkVKuiCIhZ3zBawEtKFaDjhvGZBufAwyuqV0ow1uZ3pIj%2FDikc%2BuZsiZGVNDzgITP%2B0yO5A8sQm9s9o7y3fTMN&X-Amz-Signature=f6f6f77f820b725f6d9a213d82c0331f0dfd38b0c4e632749cf8978ce6825de1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W24R77IT%2F20260301%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260301T151038Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIEgtJjVx8tX1u%2F%2Bz8%2FV3OY2RyUpYWNhl2%2B9ulLBRiJNzAiBbNeKQnTpeDdQGueSOBrDLA%2Bq4Vrkgdy4x07Le5NwS5yr%2FAwhvEAAaDDYzNzQyMzE4MzgwNSIMfPGhNwed3L36PI2mKtwDwHPXQHD4ubR0s6m8zuczipuCU58RS4T1L%2FYhPFWzNsSIpp4JIK0hbhvoszxopwtI7vQz43rOfq5X3CA8kRJ4Sb7pewNGiz9yXDA5FF1nihOsghaJW2UHpQNxrhL3dQ2KKWvXoHNMHQQtcUi9RaxYOaiha7vcCsbZqXRa2oglo8WE8i2PgxcMpWCAj0Noz1p2cMBuF9EfIYpJJvyg5pp8yoW6H%2FjUyrwFMyWzPzPCTy4%2FOH6NpBivMTCF%2FcmeLy%2BI1q1%2F5e6nuR1vUkKytThej15U0ZMrzwwkdMy6vNx6D2Ql29%2BuNMEEc2gnjznmR2Q9ByXXxUyLz6nd9sKw6QjkXH6X8GkZOPl3zi5IRLkMD83odUnimDyskfkrrAHISsVPgTdBGiw3SgOJrxi4SwB7wb7frBIGRjQa1bHeZOjgOBURjK%2Bg3u%2F3H13iwlEsRAV8%2FvhshDD%2FTlhRaDr46xeJzJaLhmXyLIt41cHeDnJzvnIZwWONlcjDgrGgTsWAbTLAH2LYmNlEucMwmaCafy65uTm%2BjtWyW%2FXGuHXrhG2rtmwC%2FgFJm%2BRxdCcELdvMhQWkh%2BYFW2y2gceCWcmF391aDNE6gFweyyufTj6CuvZ8sZKeQ2xKoH7lwb8zFVcwsIWRzQY6pgHN5paj4BJHXYPeqgqf0pntiNupbfX%2FYje7zaU%2BA26YSQm5C8VImnZdl9vhQ1P7sRB5EzlVSQbg7%2F%2FJlZLp84ok%2B%2FvEdSJGGYES%2BiFul93blyLcYJHOEzCFG32RdQMdYg3aRaCeaUsmATr067nWX7fRGxBSUpM3FHMBEQgAmPmuDB%2F7FQbk48fkMOTXNCRKLa4x7C0Wl%2FpWCiLpjg%2FIp0HRSQanotMO&X-Amz-Signature=393748714f7f575180ab5e262c33bc6f48e21e8e517e5892ff41729403529b4c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZEKURIVS%2F20260301%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260301T151053Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCiQC2xnGf3Vlaf2HLelfHGSTz3GD3FqzcNEk2QYibTxgIhAPXn0EeRRUf8pxbdrUMtPGkowbRWBq28SVBk1oljqIpOKv8DCG0QABoMNjM3NDIzMTgzODA1IgxVX8aqBdT90ZPx1jEq3AP29Q8HlA3yo81CfSARIVI%2BzFnfvfhmmcWdAO%2FeaOFmbfYcnfuc3BUA%2FXCC7ZeoKkHlWZdtIbaNEU3U5M%2BkZ%2FIghcSC2y1TGrC0TkHtUEcgDN9OtCfytFLtKx%2B83IyD6%2FVj%2FOspYCi7Mo7reeYkdavbIIHMuY%2BRDl37APdXZCtFSRIVBXjBCKYiaZRQqq6sta3BfF78hbOzRTjzBbqn1DsrKi4DGv7HipFhevgmYsA1YNVz2dpJfluphSV6MljXXzIQ7uqf3%2F2w3G%2B4cV17OBQ%2FSAQ7f00KDie4HYLsqh9hTKggfHGuZ%2Fuo3q%2FrCScL7MSC1KkGsACXvCW%2Fpp6TG78I1zSIBnyHNIp0TYupC%2BTjaaGhXfkcE2%2FCaej3M1HlZR5QCjB%2F%2F7%2BlOQDeUSTrWAyosnm0DsJ8VZXQ6ULheKHa42nKSMsrzWTi95SxeDfA2%2FZNFDEDUX5GyYRpvHX5MXUg1QTMD22ZTpn%2BikN0R2KGYCNGaX%2BuXmGNIRgLuEKW6YNB3tlult%2BRb58j%2F4bx%2BX4bUpcNHZpWyYk%2B2mBP%2BZhW9gN%2FP%2FyUF5%2BR3NOR4vHZLxonmPXZxZWVFeAruP64QY8H%2F5pyzS5Y0HAhJfqmA3NLU6R27MkDfdLKXzNzvDCAzZDNBjqkASc9uAiJ3SBFPfxNAT5vUE8vs6JyECikyVqyxYcP5rHcUvRHkfLvUiEUh0we%2FB%2BnQpa325urEpva4QF68EI8B4QQ0dExhj2fGHw0EVMApiYzZ95Ko4STiNUAY5QOcUiSsd6siITxErtKrQ%2FR7dMCKRXA0ABDlvlQLDNoR%2FWczoZBrefKfCHnnq7tHBYnfulkZIW5T%2FOeYjCHEC2GB0CT7y%2BdChUe&X-Amz-Signature=41df49de578771fb0ebda1fa2ac0fa8bba97b5e6a5a420b0708e108b8ede662c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZEKURIVS%2F20260301%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260301T151053Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCiQC2xnGf3Vlaf2HLelfHGSTz3GD3FqzcNEk2QYibTxgIhAPXn0EeRRUf8pxbdrUMtPGkowbRWBq28SVBk1oljqIpOKv8DCG0QABoMNjM3NDIzMTgzODA1IgxVX8aqBdT90ZPx1jEq3AP29Q8HlA3yo81CfSARIVI%2BzFnfvfhmmcWdAO%2FeaOFmbfYcnfuc3BUA%2FXCC7ZeoKkHlWZdtIbaNEU3U5M%2BkZ%2FIghcSC2y1TGrC0TkHtUEcgDN9OtCfytFLtKx%2B83IyD6%2FVj%2FOspYCi7Mo7reeYkdavbIIHMuY%2BRDl37APdXZCtFSRIVBXjBCKYiaZRQqq6sta3BfF78hbOzRTjzBbqn1DsrKi4DGv7HipFhevgmYsA1YNVz2dpJfluphSV6MljXXzIQ7uqf3%2F2w3G%2B4cV17OBQ%2FSAQ7f00KDie4HYLsqh9hTKggfHGuZ%2Fuo3q%2FrCScL7MSC1KkGsACXvCW%2Fpp6TG78I1zSIBnyHNIp0TYupC%2BTjaaGhXfkcE2%2FCaej3M1HlZR5QCjB%2F%2F7%2BlOQDeUSTrWAyosnm0DsJ8VZXQ6ULheKHa42nKSMsrzWTi95SxeDfA2%2FZNFDEDUX5GyYRpvHX5MXUg1QTMD22ZTpn%2BikN0R2KGYCNGaX%2BuXmGNIRgLuEKW6YNB3tlult%2BRb58j%2F4bx%2BX4bUpcNHZpWyYk%2B2mBP%2BZhW9gN%2FP%2FyUF5%2BR3NOR4vHZLxonmPXZxZWVFeAruP64QY8H%2F5pyzS5Y0HAhJfqmA3NLU6R27MkDfdLKXzNzvDCAzZDNBjqkASc9uAiJ3SBFPfxNAT5vUE8vs6JyECikyVqyxYcP5rHcUvRHkfLvUiEUh0we%2FB%2BnQpa325urEpva4QF68EI8B4QQ0dExhj2fGHw0EVMApiYzZ95Ko4STiNUAY5QOcUiSsd6siITxErtKrQ%2FR7dMCKRXA0ABDlvlQLDNoR%2FWczoZBrefKfCHnnq7tHBYnfulkZIW5T%2FOeYjCHEC2GB0CT7y%2BdChUe&X-Amz-Signature=41df49de578771fb0ebda1fa2ac0fa8bba97b5e6a5a420b0708e108b8ede662c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663RH24THK%2F20260301%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260301T151053Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCyqI6%2FNRomJIZNkK84G0vpOyfcE0ELBhh9yk8GsrNfKwIgZ%2FegWfca%2Ff%2BITbwK1dyNCt%2BZxPdNM4wc5V8y4XKs0qwq%2FwMIbhAAGgw2Mzc0MjMxODM4MDUiDM65x8eRO%2BuOGEDspSrcA824Xq2n9P8UJc7Vqez2k%2FFTYXeAyC7vUmsr6Y9qPD3SZj34ijELsfKvfhobOBxPtMCOp0NulPRWBSnsYpcZErwU614Vbps5xhBxRRVSLWzEbokBuE0ZyA35z28RBp%2Bnjlus60UezpChKJLHYY7HUSA7z10W8JwzWejCupgF%2BeRJooVp7e9LciUYtMIJJaAQhb5LLn2rSpKgNG5d%2BC09Lovxgug8vW7PAr8pC1OTU6fonkD2Re9e%2BzIcjWo1w5l7KcPMVYuTABZGjMb%2Br0M%2BmGy%2FIbBBTZw%2FrMlcKuCOPlh%2FxIIVTfatUOEL4E7UjXmFIDDS0mokz3qe3Os4R3IBG0AuUR%2Bh2SvoSKBPCtO6rH37jU96o1UR1b1DMgA5cFBHWSjiMPnKH6LBZXLneRYvmW7bzrXW3LKI0qAxaxGtixsZWP33PkydeLncNHT9FWSBAsGnoagtGna40UrZ8PBk2on2LMUV4mLDjmCIkJIZGz1pdggK9xJWokxKPlLsIFS2kRvR9XFItZl%2BfnWumI0Ws54OCSbt15iwwMBRhUwiJA3rRg7RJLNc4g3mtqJa4QKia6wljJS%2FcDZuaOwPRBE9vcib6PxPtYavf9GYuyx5%2FVqV4dzfFm8YKfGGvmkHMO75kM0GOqUB4fZgvcz2L6L7OG7Bv9zLzBTK0nefrYqk3XFVTDfymtMc2MfvYDOmhWmlR9lHDOnm%2BmN6JfP5XqpnhZtz1l9IwJfVLS4UaR%2BiE45b6XlUQ0gA9R%2B0fzMjw0R744jawo5aJllosrCItZg4wj4wNdaalmLRn6PT0NZgTIo5RtOlEVXlAyWsTQ7ZpnzO0pInRgZFe%2B7HDinAOrT8Y1shUDXPb5aiNNn9&X-Amz-Signature=c924cce27597e603fa64eea43445bf2dec24ad46c3ec31d1ac8331e8ff47c8d9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

