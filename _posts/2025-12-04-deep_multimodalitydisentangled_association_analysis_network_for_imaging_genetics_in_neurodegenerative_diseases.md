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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RU2EHICU%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T175807Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHEaCXVzLXdlc3QtMiJHMEUCIEuLa20fwWphiiXuZqArU0ghWuGsy90zwTCC%2BVSNkv3kAiEApJu%2FlegmQQl7OBomE0OS%2Bk92QtiNhlNhJWyNoa3%2BpIcq%2FwMIOhAAGgw2Mzc0MjMxODM4MDUiDJ7RbCSeDezRmf31rircA9e0vDEzRfzqrDP4RHB3jXfS0hHEpBJLoc7neLORMumv1Ap5XehyIe3Bs6VIvH9Pdfo3GkrfGQDToK%2FgaGvwnjjdzvzLLyZQinSWKiTLY5uWMOegBrj7B%2BByf0snEctRvwOZHvsyzewSdemp8NpKv3Gbl%2FJv4V9RqJhP3PZ3vlh46IRUyKgHJHfH8RcFpzSYvTrCjKCmYysjdQ09yi%2B6bKd4UaExplk4HsM1Phq%2BcGfSAXSpkTZj%2BF62G2I2Mw%2FprA10k84pv721E8lHdarlXUPZZmODSumQ1aSazTXc9TMnk5odt20Gug%2FDtxEImdoKNPoJPBBZPdJGgxaa6mj0wNt7DtCCrEPDp%2BP4pR28%2FNvvssqrt5MDlb1yIzzbKbLFIcE7fGgDAbt%2FjO0%2FL8eUC6SjooOd2QaOkPWN%2F7LZ4KVLLwlynETCsiou7fw2yhnCDrEZXiHHOJ85sqtfhEX0nzp185FYtogi%2BCYZxLBmMc8tFi2s7WpRQecrt8tKpTWEuhoOQjd7WszG4SwamQA9tthc1aaURk3dN4ylTrHGK8vq9087T5%2BUBQ4nnpjlLIjomEj7cFauB3RAm6kgwivhV7T%2BlOqyhWNFSMm1v12wWNCuVh1pwCcI2Qk5Z68WMLnYns8GOqUBQkiUtnkSxupXuzFSbP%2Bgl%2BXuIFaLEbwlJivctTm%2F0shp7Ulx3EJvetqlo99sb3tB86taQemh3ro2loqVn2afQkVAVbeXTKCKdNOeX6XBz7pPLdWe0UTs0%2Fl1Kj4JE6qFZ77brnl6ECStn9vJsMx%2FAHtrkuQRePOt6EKBslF5Jgsd7P7U8C1%2Bzsxxnhhiq4pvceUWMZ1S7xOcKyIszvmQt9cnHZkO&X-Amz-Signature=89ae2444fe173889520c2b063143d91cbfe21920be96c422e055fa49daec5db1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RU2EHICU%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T175807Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHEaCXVzLXdlc3QtMiJHMEUCIEuLa20fwWphiiXuZqArU0ghWuGsy90zwTCC%2BVSNkv3kAiEApJu%2FlegmQQl7OBomE0OS%2Bk92QtiNhlNhJWyNoa3%2BpIcq%2FwMIOhAAGgw2Mzc0MjMxODM4MDUiDJ7RbCSeDezRmf31rircA9e0vDEzRfzqrDP4RHB3jXfS0hHEpBJLoc7neLORMumv1Ap5XehyIe3Bs6VIvH9Pdfo3GkrfGQDToK%2FgaGvwnjjdzvzLLyZQinSWKiTLY5uWMOegBrj7B%2BByf0snEctRvwOZHvsyzewSdemp8NpKv3Gbl%2FJv4V9RqJhP3PZ3vlh46IRUyKgHJHfH8RcFpzSYvTrCjKCmYysjdQ09yi%2B6bKd4UaExplk4HsM1Phq%2BcGfSAXSpkTZj%2BF62G2I2Mw%2FprA10k84pv721E8lHdarlXUPZZmODSumQ1aSazTXc9TMnk5odt20Gug%2FDtxEImdoKNPoJPBBZPdJGgxaa6mj0wNt7DtCCrEPDp%2BP4pR28%2FNvvssqrt5MDlb1yIzzbKbLFIcE7fGgDAbt%2FjO0%2FL8eUC6SjooOd2QaOkPWN%2F7LZ4KVLLwlynETCsiou7fw2yhnCDrEZXiHHOJ85sqtfhEX0nzp185FYtogi%2BCYZxLBmMc8tFi2s7WpRQecrt8tKpTWEuhoOQjd7WszG4SwamQA9tthc1aaURk3dN4ylTrHGK8vq9087T5%2BUBQ4nnpjlLIjomEj7cFauB3RAm6kgwivhV7T%2BlOqyhWNFSMm1v12wWNCuVh1pwCcI2Qk5Z68WMLnYns8GOqUBQkiUtnkSxupXuzFSbP%2Bgl%2BXuIFaLEbwlJivctTm%2F0shp7Ulx3EJvetqlo99sb3tB86taQemh3ro2loqVn2afQkVAVbeXTKCKdNOeX6XBz7pPLdWe0UTs0%2Fl1Kj4JE6qFZ77brnl6ECStn9vJsMx%2FAHtrkuQRePOt6EKBslF5Jgsd7P7U8C1%2Bzsxxnhhiq4pvceUWMZ1S7xOcKyIszvmQt9cnHZkO&X-Amz-Signature=89ae2444fe173889520c2b063143d91cbfe21920be96c422e055fa49daec5db1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WN6TEAAA%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T175807Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHEaCXVzLXdlc3QtMiJIMEYCIQDf%2F0QX9NoL%2FbN%2BuDEUhcsst5ocMABSlpiTCdEgTsjTXwIhAPerjd1FfvgXkzIBYkx%2BV7PBKA%2F3p1TATKKB1cOGjnEuKv8DCDoQABoMNjM3NDIzMTgzODA1IgywHoFTFYIyg3igXCUq3APdhi8LGSeaZYDTvPjsqvEGT8bc4t10yiB4GxtAT6Q3qroiwTeWiHmC7oNyl77gqsGLGKKewiztepDc0LyJyoLZQTMg1rW5e7RUyjyDbInwm%2Fq2j5dDHDyOBscvsMzFKXR8GVMKNTAxU%2FTFNvNzZhsIllOD%2BMyMBKT53EQN1HVG%2FmnWBeB0VaEnEo76mX8mwa%2FBWXH2qcS2go6P7n70BhJOR32z8D%2FwE3wLe0EqFw7%2FGAZDpaaYldiBoFZwkXfOTammUQESA%2FmatV2cCapsn0YE8%2F%2FXHOxpOXp09KBTqngMVxeIyV6RS4NE8h3EzeOP16b7CGY5hskGiXnZ3bZ2t2i9b8Kz2%2BFf%2FKb6nOA1cVGHQLVxqhm8f7vXUEwhzBF6wxDdJvuH2ykNQoeOulkxdocOt1xl1opBO26ZFK9TtuxdguNVjr8y8lKRKfOyxEv4hAfmLW65wp5JK9jx7Xezhe6FUQuAZ%2FbYO5ZJqeQ%2FQcWjN%2BO7uZgo4iL4l2K5I9%2FKei%2FN5bn6%2FAZVa4oN%2FfxsR5GgBMLWb2dVGix%2BxCQ4N8Nn%2BdvO8fZrMrw0N3JBY69CtAtmD0bK9sEZ%2FhnXhKIaVnFxiaWiIvGYhWsSUWrme%2FTZMia2hlfNH%2BRS0EyO7TCV257PBjqkAQU1CEtyhNexJKsydOUKoPi%2BMls6W1ZXyNL73WOaegdN1eE7hPtOvEDx3xZ38OR9FQxGNis8fAW2tvpdboddGXi8X7bUljJiXeJ%2F5OpTfj%2BMh%2FwdRXNNlXcuLbqhB1Gbq0P2wgUNUJXuVDwtbl%2Bn9czslOCxI30DCT9Rpa1B9zT99aFII%2B%2BY92aQPvcoOUKqlK6%2BwCYOSkTPm%2FlJN%2F7Veee98z4m&X-Amz-Signature=a21f52de23ffbfef0741781083dd176b5b8d2364c9bb8f24a10dc88b71935627&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WKRXPN5W%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T175810Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHEaCXVzLXdlc3QtMiJIMEYCIQC3NqNA%2B3z1azZ%2BZPKHz0rkNQdHhjNpeKXbzQHDGHKavwIhAP9FYpapzwCtVDxz%2BDKt7%2FWo5Tl7LFvM%2FVvqZZdPcmXVKv8DCDoQABoMNjM3NDIzMTgzODA1IgyGpCFu%2BiKVZG8MdXsq3ANA0fq1Hs8OsNfCg0RniM9ISKmsLKwWqEjTb2VG8BLom2FoYeDSVEDgE3bkKdQOqoMkUDzbxKyL8CqJdGz3Z1%2BgQ1N6INtBzmMUhJ6I5q27AM%2BbdAjlUawfxA%2F04z%2FPDUmznJTnM5XMiO3gTMGU3bkY0Oq91sVArMTBz%2Bc6J3JXLr92bz19C0cAlwRwuVNgn0pG0xD2gf847HFEktSCinHxrU68n4ms%2BGY2LMbh3FoJR11kN2Q6DKiPpqeDOZ75h2CmNr47wYRSKfrWsMEhy9Xaa%2BlQv%2BgWVaGDt5WLe9qTov%2B8aHOI7obcFokDbS%2Bgtg2hMlwi4HGPvutQ4WU8iAImkPzdsNcxp2lT9gOXyaQHv6X4HTuDdUPLflPXjnqTsavW0pmghBkBBrHaE1g9k5BTPmObzwkgWlXmcW0hDBDeezprEr1StQ3ycx9Ae4r9G%2BVOM28DJ0dG7Rlrx7NOov4pE9bs2xTwb3v5FnzXt3mLKfnivTe4xyicdBEMaCX2VNZ77IjRzFUJXHut4maxdp0GRpX4GQMrDO7wpvi%2BwX0qfIUz0fw%2BJptOLjqWAX3LBOIlmEYHZ%2Bar5GCWgrzgXh8cqmItwSG1%2B4H0o%2FTx6VsQpF2IYTzCeFsm%2B8yENDDj2Z7PBjqkAZ5%2FJ1%2FIiUPyK%2BX20BWll%2Bo9pkMh4rHfOLKLo%2FNgZPvGsydWhl3rsElZ4oeiuPIB0IvKNmEr5gi%2F3Acbv9PwUTTAduo3gjfDrpwSNHH3BdZYo51EGvl%2BDS0Iwu1qyoExUFTRHdppjTpuihHY8RL83sy53IM4iyqVO%2FUV25rnlP6%2FsNLncNnCuDhdsXp4nGZsq%2FFm7kfHS9kOOle1gLBFUjgcF1ff&X-Amz-Signature=cee3c92f9161f73ad69657453291e6f73ca204af4e1eeb5a8da7274bc495b361&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WKRXPN5W%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T175810Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHEaCXVzLXdlc3QtMiJIMEYCIQC3NqNA%2B3z1azZ%2BZPKHz0rkNQdHhjNpeKXbzQHDGHKavwIhAP9FYpapzwCtVDxz%2BDKt7%2FWo5Tl7LFvM%2FVvqZZdPcmXVKv8DCDoQABoMNjM3NDIzMTgzODA1IgyGpCFu%2BiKVZG8MdXsq3ANA0fq1Hs8OsNfCg0RniM9ISKmsLKwWqEjTb2VG8BLom2FoYeDSVEDgE3bkKdQOqoMkUDzbxKyL8CqJdGz3Z1%2BgQ1N6INtBzmMUhJ6I5q27AM%2BbdAjlUawfxA%2F04z%2FPDUmznJTnM5XMiO3gTMGU3bkY0Oq91sVArMTBz%2Bc6J3JXLr92bz19C0cAlwRwuVNgn0pG0xD2gf847HFEktSCinHxrU68n4ms%2BGY2LMbh3FoJR11kN2Q6DKiPpqeDOZ75h2CmNr47wYRSKfrWsMEhy9Xaa%2BlQv%2BgWVaGDt5WLe9qTov%2B8aHOI7obcFokDbS%2Bgtg2hMlwi4HGPvutQ4WU8iAImkPzdsNcxp2lT9gOXyaQHv6X4HTuDdUPLflPXjnqTsavW0pmghBkBBrHaE1g9k5BTPmObzwkgWlXmcW0hDBDeezprEr1StQ3ycx9Ae4r9G%2BVOM28DJ0dG7Rlrx7NOov4pE9bs2xTwb3v5FnzXt3mLKfnivTe4xyicdBEMaCX2VNZ77IjRzFUJXHut4maxdp0GRpX4GQMrDO7wpvi%2BwX0qfIUz0fw%2BJptOLjqWAX3LBOIlmEYHZ%2Bar5GCWgrzgXh8cqmItwSG1%2B4H0o%2FTx6VsQpF2IYTzCeFsm%2B8yENDDj2Z7PBjqkAZ5%2FJ1%2FIiUPyK%2BX20BWll%2Bo9pkMh4rHfOLKLo%2FNgZPvGsydWhl3rsElZ4oeiuPIB0IvKNmEr5gi%2F3Acbv9PwUTTAduo3gjfDrpwSNHH3BdZYo51EGvl%2BDS0Iwu1qyoExUFTRHdppjTpuihHY8RL83sy53IM4iyqVO%2FUV25rnlP6%2FsNLncNnCuDhdsXp4nGZsq%2FFm7kfHS9kOOle1gLBFUjgcF1ff&X-Amz-Signature=824f56bc1b15785fca54df17a3c576dfb52690f35e3cf1f6cbcc284354163b75&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662VWFCCWD%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T175810Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHEaCXVzLXdlc3QtMiJIMEYCIQCYQfdwTImUxvPP24fXSI5OtTHRdTWwQHjn860bLG9OpAIhAKo8p1UndNZoUVuubLwmvprkHl%2BJb1sJMPH7pjqVv5QUKv8DCDoQABoMNjM3NDIzMTgzODA1IgzyM8bIdF9fWs%2F8LpMq3ANYw8s6yrTKRQEg4QT%2BlzQa1%2FB2RC4Syb8PrAAyOzA%2FGR%2BUFqa7J8%2BcWshGp5GYC%2BvK1T%2FRYCByOOLeHfmYJMmzWRpxKEw0bdEGLhoSm2tLiPvU%2BGA6N1qheaaJ6PH4njkSoHD7w6sA%2BmM1g4J%2BpZNFp1oiN1%2B4bvDZ5pfOvNeWR8%2FDS6iYtgmdaeixyZ39I0cUgNLLnew6SzLWw%2BRSzByr%2F9T%2FVi54hnUH55drwy4foaHrCLWuEtP9LkNqsYwPyLHylk13mR6tjc%2FL9i63w4vEpwYkWNQ9mT6kjkQb2ruPRKCWIQ8HEBua7gLnHrA%2FEJUq1drmbHzbysVyyTTCcRncSNKZQRVvrlvvy5g6VxnP2V%2BorWTFpd5sdpLzaen3TZFau2fzJrrdxkx4Xe%2FE3lEmm574BeI%2F3CHIk5EchTlQG3pEtmrLeJ1Pdv9wRTvoTTzjLL4TM3Kjd%2BfdijBeFtysJZLv9HPAiHF0XKbZ0k2nahtUo%2BW%2FlLTRa6LzMLjAEahXNbOgqIoJ3743VTuScy4CDUCG2fEVb1TsSDWohMWpmuVB2HBILIZxHtE%2BlFR84vRzi1hMoQ03uQhwLvKwyC0%2BKw71MWpAfDFOjWNaGNNWUjGDXi57ShO2KY%2FIQzDn2J7PBjqkAe7sQoeEnLCfLkgU8H5WeOvKSj%2BZLnsrLUBzZ8%2Fm35V7M6IWzYX%2FHEuMNRuOZF8HOha6HoqqU5frelELaVRpn6In7Cr8AZ8kbH355%2Bxdbj5P7JD%2FTsxqrdmp8JW6Y2S10h7rbVjDq7iRZDqbJQKhIbjh11UBmf3vIZYqmOx5aY4v5iU6NHi3C8bSuyO05LvBNucMp%2BGZCeVvb8fU8E9KBptLTGv7&X-Amz-Signature=4374c1ee0ae5476ab9fbc9a00302521ffae0416a03bf476b618475d6744a0e9e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466US7GMSSE%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T175811Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHEaCXVzLXdlc3QtMiJHMEUCIGJpBsEvwR6pL6NTi%2B4yAwIZj3IGnqOzZyenLnz5kHFPAiEA1T80PDOvs6uMtlfZEcQ9sv9gAMyulMfxulEPt0dYi2gq%2FwMIOhAAGgw2Mzc0MjMxODM4MDUiDDaqxPcu3G7E%2FAtqYCrcA1O70SCdH6qcrNFNbwYhBTPIh01h1Xx%2FDJjScPVvOEN%2BC8zWgGFM2VKrybZQP37l23m4IpUBXjZzzezG61NBKcbUPmYRQtUSxdsxRt%2B7laCauQCVIJRKK%2FqeoNEBpFnJ3UpvrC%2FHWEykeBD6bVJlzcL4kIlvArHIc21PB4RR%2F45eCLIt9SjwlPCUa6mAtitYIJrp11QXcEUEzCRiHEPT9dAQGQ1f8%2FvFyprG%2BtK6d8LLGqX0dkh3IwApoB7JsI%2FRjIq5KJ6Yv9FLe56GF09pSLwaVdgstRa4f7fo01hOqVJyh1jwAO9Ex%2FxrlSnHLkymmJPKPLoK6FE%2F%2FqKXBSAbSDiUANSb5I63Fk%2BnvKANMadq3PtluGTk0xlZKoOTTWGoyttwYJx6itAx%2B541Gh0%2BYbmwGXNAE77abwUojLKWVBphVFlOFlRJnhje8Wl2ZmNJHKKkkPQSFl61A2BQ0zrzIwbaupnbcMtOGxnbnMHqUKzM2ajxE4uLO7bW11wV6UIC3%2FPNo34HN0eGPFKWlEHidtnVgoXxAPsUikMlvizVtFPtyPFMpbndRXVOQ5vI96VnVZY2cuC6FSHfNBx7mLRc0NOo%2Fiy3IVrMFY1slqmhjKTzwyc9m6NMqIPT01%2FxMP%2FYns8GOqUBD6c8gUPkv3W0tVrQwzQ4hssLv7A9zpL11R2C9HDYMyn96DNGpRmpGpJOmVa59Vex0wfwjtGLvRdqbcwtY9bmXI58borEIGQ6ya9627NH%2Fn9jGiUmfrY%2BeoWUFhlsBIDxXKSrFuqv4tX2HqMwf%2Bqqj7myIJA7i5nTQDK5zgVEEy4nQ8L4AkI%2B0tkTAOa%2Bh7Qq6d4Wmf8LqFiFv3QK5rCs%2F31bXd8z&X-Amz-Signature=1acfece8b2537a6000c224c3b165964c35e15a40637416f2733f778daf6a90b9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667SAIUT6N%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T175812Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHEaCXVzLXdlc3QtMiJGMEQCIEopG1G3a2H4Bh2C2XEQkmg%2FvNfsjCPG%2FHnrvD1G7LEJAiB1k0rQTahuTeCzZeT%2F0%2F0rUXRFjGxDIpilb%2FOPpqMqByr%2FAwg6EAAaDDYzNzQyMzE4MzgwNSIMctRMiouYF2XaWuLZKtwD%2Fh3ZDCQHlSHb4xApHMOs3HIUS8Mbt6q6yuDO40BOxWaPuaUfhw1%2BJmfZlM5m%2B5UlR0b78g5wq5mOlKeRmaYgE2qi07zVrhj6JpCCRGWEprkPTEa%2FwZwJVtOKs%2BOzjH4t18NALUtneI%2F8OtgmMceRfQNQDpZoWVX7XMwrROBLFUpzQIkGrK8OkDxF6Fo12aRhhqF4AMsGUhXAdFUED2iXETgEoVd%2FPDFQJEcQIikgjXXvGdqiqHRlK09OCIAq82bwf5DDxEtseUORGVZG8FsYnEKtBnWuvLhHm0T6CgjEtTF5cgaMm%2FpqZbp0n8T0PQEE7PfK0wPM7VUmRXjlOp8R4pjxKuF1f1tGtoAc35K7FqZzNpkKSuL1RgI%2B0%2BNF8%2BRoqrCa7hffL%2FekgV6dEAlUpKHNfC%2FGE5HpJIqurf4S4eBtzMYynOMp3meOLwvQASfZbClHpplWWPdk3IY1jPfD3nGrjaAGjZgtx%2B8ovNzlPvkpExTbUduPlrLCJ7ZKG9iX0it%2BuMfOaLBNPPFTnQd3WPBbtEM3aAi214xQ%2BCVXzUvrsGF3sGMuOU15Rcf6%2FX3JirQ2XmawcyE7KML9TP7V6Hb%2BHJJtRVjw0G%2Fp0xNjVIXfL1qXXPR2lfaAdbIwqdiezwY6pgHnom3u8yX6whHNqVirMbw4tOPhkQXn4GMW8a2Jzb6cObxqqW6ILCstrwfhNfIt90%2BcUqhorqIPXAVlpb5p%2BGOsh%2B06L2A7twfiqHv1wiIwV6RDYppNoShntQYDNrOoKCieIQJekCz4QQ5ikLkMVYlsBvKdKERDB8tkQe2m%2BoBOjoAaTxszq748hgcHbY1WHuCmTH84sq4Pc4yBiBobub4Gi3hzw%2FZQ&X-Amz-Signature=f573c6317b1f2a034a3a832cb7ee8436d4dbffab80727ebed6e91a8b186b06ca&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663P3CLHOF%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T175812Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHEaCXVzLXdlc3QtMiJHMEUCIA3tThLH76WfR96wPUcfCY05nhqL9kQ1d9TAYLsE1ugFAiEApkVurZn2muT8uPwNFAnjco7FMsdmOj9HJJxNVQLti6oq%2FwMIOhAAGgw2Mzc0MjMxODM4MDUiDJS6UfcMXKqJ1JHOxCrcAyo6kr9qq3lZzfCRHtQtSLenfnDj%2BKfTOMehqCo3f%2FDSnkkdsUZSX%2BkYZqVnKwbtIUMf%2BcbCDzGeNE%2B2LU3PGD1PVetQPtoKndCAJdrwk69q1lXXlQO6LhmIIYEFl350tZqYtptGsiT9zBqWKbGWmh4gZmHpzRYDf9BjAoo9FpCOwjWjtpXHGFIaSkD77dhAfPTPsa7ilokKAev0pL2ED9NJ4bZVG2gS4Tw%2FWMMrN%2BHwoS7D4%2FN7qlI2HLVLm%2BV8YA%2FqvvQvIqlqEt6kr28kKawB3lUgvDUIpDz6LRBH5XN9%2B47U8bZxzIfayz5U3zE4prlzvOH%2FeFOJilFNm1wzBzJM4BnRMzBbPCYule3tY2tbz%2BmnJOuNZWPcrLh4rfpYqbfltf%2BGkAk43UMpSAZhhR7isdrAliOwXvT1%2BKp6dfbnrgRwa2lbcXLwPjkbKgwzFU%2B7EmDzIqU65TeZ9B4s7beRbBOj60CDIQep29TdA1p9hjRn6JoFhmrzJcWRRQ0VNHa3F0hIQiBHaviYD7qDoMtEI6I7fvBF2%2Fe2uTOF4dZ5zOiAb2KvhUXYMJxqT4%2FfElDeGM%2Bki%2FCGr42%2Ffj34iUpLMTqsVVp9MuEJRpzqOgidHQtF%2BFxqaR6GgBYzMP3Zns8GOqUBu5pSYLy%2FJFkAVEXBxEvxGVmOTpVK97iP3V3jQx%2BvxokV7JHvNvO1%2FSNPV5VY4RlbfeZiphmJsYenR%2FZlmAIPgcy5LE%2BGWhwuHoSvdpEFXJAR1tOqf%2FmhOcZQ4noDQ0oafL043kFv7rcksu8zkYUMZfzbQfJTFO7PgtT0r6%2BoO%2FKzeguk3OahL2Np1Crc%2F2k7qh8vAVc0YTp0uRxLTeOrmSCRVOPf&X-Amz-Signature=fa299ce837bd52046ba1a829c7834b9484b4e2a7f2875209f381aabc6b99b57d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663P3CLHOF%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T175812Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHEaCXVzLXdlc3QtMiJHMEUCIA3tThLH76WfR96wPUcfCY05nhqL9kQ1d9TAYLsE1ugFAiEApkVurZn2muT8uPwNFAnjco7FMsdmOj9HJJxNVQLti6oq%2FwMIOhAAGgw2Mzc0MjMxODM4MDUiDJS6UfcMXKqJ1JHOxCrcAyo6kr9qq3lZzfCRHtQtSLenfnDj%2BKfTOMehqCo3f%2FDSnkkdsUZSX%2BkYZqVnKwbtIUMf%2BcbCDzGeNE%2B2LU3PGD1PVetQPtoKndCAJdrwk69q1lXXlQO6LhmIIYEFl350tZqYtptGsiT9zBqWKbGWmh4gZmHpzRYDf9BjAoo9FpCOwjWjtpXHGFIaSkD77dhAfPTPsa7ilokKAev0pL2ED9NJ4bZVG2gS4Tw%2FWMMrN%2BHwoS7D4%2FN7qlI2HLVLm%2BV8YA%2FqvvQvIqlqEt6kr28kKawB3lUgvDUIpDz6LRBH5XN9%2B47U8bZxzIfayz5U3zE4prlzvOH%2FeFOJilFNm1wzBzJM4BnRMzBbPCYule3tY2tbz%2BmnJOuNZWPcrLh4rfpYqbfltf%2BGkAk43UMpSAZhhR7isdrAliOwXvT1%2BKp6dfbnrgRwa2lbcXLwPjkbKgwzFU%2B7EmDzIqU65TeZ9B4s7beRbBOj60CDIQep29TdA1p9hjRn6JoFhmrzJcWRRQ0VNHa3F0hIQiBHaviYD7qDoMtEI6I7fvBF2%2Fe2uTOF4dZ5zOiAb2KvhUXYMJxqT4%2FfElDeGM%2Bki%2FCGr42%2Ffj34iUpLMTqsVVp9MuEJRpzqOgidHQtF%2BFxqaR6GgBYzMP3Zns8GOqUBu5pSYLy%2FJFkAVEXBxEvxGVmOTpVK97iP3V3jQx%2BvxokV7JHvNvO1%2FSNPV5VY4RlbfeZiphmJsYenR%2FZlmAIPgcy5LE%2BGWhwuHoSvdpEFXJAR1tOqf%2FmhOcZQ4noDQ0oafL043kFv7rcksu8zkYUMZfzbQfJTFO7PgtT0r6%2BoO%2FKzeguk3OahL2Np1Crc%2F2k7qh8vAVc0YTp0uRxLTeOrmSCRVOPf&X-Amz-Signature=7bcaadd63a202cc977a9fa5e5675ede91fbbfa69ec300175888569e60e1220e3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WFJPKR6P%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T175805Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHEaCXVzLXdlc3QtMiJHMEUCIEtOC4W0KJMffltebE9eTZzPLQBZBk2pigb1iRQboleOAiEAt1fDVZxDgwgXhM2JnUkxqdISVKKaBufYis2zHNrt9Uwq%2FwMIOhAAGgw2Mzc0MjMxODM4MDUiDGJ5CQXimLCv9gC9iCrcA4zzPul%2B8T%2F0JwMBFz7PtZFNnYMU1DhfQmSKH%2F4wzOHupdY%2B0teBNxmaHX613F5%2BRNcbmzyjHm6qySmJcDzGTKzFRbnecKxfUhER6M5Eza1xX98NOICRwr%2F6xEI33ourcrWcJBEC42XMbtBnPu2NXFS7XOeSLnOU4xi%2BqyyIjJVUncLtJ3lANih8KEVB%2BKx%2B2rCOMjUj%2F%2FLlqcnpdKIfa7qVzjLByiMt4CiflE%2B7H2xXmyeSDCY8uCQiyg%2FqoSDrMSxxeF69t22rrw8U9Zi8qVqppCGb2lLM9MAlUHhwV8k8vYPDOdf%2FMVgHXyr7cTfhox%2BK9YzwmrqD%2FOPWFyjRfkS%2FXfoRq8IIP3fj0oErW8dtBrotIs5tJ%2FUJINpqiW1kqgGFgG8wx5WZOOmcccd6Vgh6BJotA%2Bp6z2gDpltCKOY25C291dm529lnn6xwUzepKzTF6bjzPA0ddFfBAnFbLgE9qOYSncZWgTEVh5ueRFmQypTLqPZ%2BVV%2FhLUZ8Eiix6A4%2ByCFvgapFY8CMlY5EELtnBKYiHmaLCUANwlY1o4MTCt0u4ZyjHtNpadQ3XKG9NJVVTXQ%2Bi1OOL%2BxVPsMTMvCa0MkliTGb84XizNiOAXVGQPIZvBzWHJD%2FcfpgMOjYns8GOqUB4l0EFBOyZRa0biar3s3mwKJV%2FFFhnhnfSYOyXRkVPNOZjOWBT%2FSCcJTEH9fzfHDeBnvPGtvTNYfbQ2H%2BwdCgaDznsBDLY1FDFembM6BvfwzDWcTmMBFBzOKPHMXtQbftVAbtARd5RQAR5B5msIUZD%2B%2FPVlddXsEzmISK9mBFhpZkj2WH5m9v1F5XkCXnp9iOswPgjAgZ43hqVboQLDQxaEMNLN8W&X-Amz-Signature=dfb5b043a5b5d0d52f47fbb3163d83aeb3e6225b9eccfe159bdfad4481795608&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YQKDPOHX%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T175813Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHEaCXVzLXdlc3QtMiJHMEUCIQDLidbwW7%2BCtsqe%2FkT%2BYS0XsLgK1Y%2BBibsl4m%2B8%2FWXp2QIgDFvBp%2FmqjDbQyWGnSYWB28bZ%2BpNgkM8GKWViSgytuZ8q%2FwMIOhAAGgw2Mzc0MjMxODM4MDUiDFafotMOOduR8Uqr%2FSrcA%2BX%2FZPNv3%2FIpiIa017KiBuaopfgAcpRsq25K%2B9YmE%2B0Oha7h93YtVIHhoyhMyIqcGMTmPg9jKz%2FhyH7DPYUwB3fNe3MbCYLXxFIRzZN1QOYPVf4ZZugufHBk5dXyR6RwDymztwdvH2TYm4u7nPURfnQz%2F7%2FT5PBo3ro1jIuVsXyU4eJEaVWMO%2Bm4VTt5kQukPWCYMoGZWI%2Blj1jM2Ku4QHxEB1SBOz2oyHVx%2FxQLArC7pp9LWUOSSphrnraC2asKnmcI6gU%2BZk4de7ulx0oZf5bx4Vu4r83mUGsy1xSZtzMBJsaRmzeM%2BNBhYLkQDIS8ahBbSJZCSShBFQzadQHO4hRti7Nr7BPme%2BIyJi742M84HsyxMgD%2FDj8%2FBr4fs5O1P4iT3S1cjB3%2FGBcEDV9E380hTzI9rlRleCrUg%2B3EEgFWs3thYLazmp%2FO%2Fy22OBgerSY5d5qW8Heqbj1UcIOUV%2BVLZ4Bl8vWzdhYbf4dRwwbqMxgGenY5u8mnqsfdgcFe9liqCO3iK%2FTbL18NSzhQ0%2FBLLl1FbXdJEu00w0ls4%2BruNNbxeichkd0pg9MpKapFKy3XfkXqppEBU%2BD3XZgXsTkSh3ldjkFPtvB33LL3CHdupogTK0efMj7FLe9zMKnYns8GOqUBWtZqjGMnzIb%2B%2Bu4KBvBTh%2BaNc7sCIQN%2Fp2Turqsab0GsvihS15YK7ZirNQQfF%2FuesK8%2BPlijDqJw2%2B1zgeVsOOl5BKbtXArFGmsntuPQcn4jGXZ6k9R%2FmPBWIr43OH02yOdoCGtA5H9J95tP%2FgGCTESfdFJdQpWguHl14uhnGOJyPozTswwO7UzmZ0hQHtu%2Bm8rOL%2FNFRXnLWgsCOSXIORe73WD1&X-Amz-Signature=cf68032c1428f7d24f1afe09b673d6801ad1cf6ef8f9973aa0ba094f56ae723f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YQKDPOHX%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T175813Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHEaCXVzLXdlc3QtMiJHMEUCIQDLidbwW7%2BCtsqe%2FkT%2BYS0XsLgK1Y%2BBibsl4m%2B8%2FWXp2QIgDFvBp%2FmqjDbQyWGnSYWB28bZ%2BpNgkM8GKWViSgytuZ8q%2FwMIOhAAGgw2Mzc0MjMxODM4MDUiDFafotMOOduR8Uqr%2FSrcA%2BX%2FZPNv3%2FIpiIa017KiBuaopfgAcpRsq25K%2B9YmE%2B0Oha7h93YtVIHhoyhMyIqcGMTmPg9jKz%2FhyH7DPYUwB3fNe3MbCYLXxFIRzZN1QOYPVf4ZZugufHBk5dXyR6RwDymztwdvH2TYm4u7nPURfnQz%2F7%2FT5PBo3ro1jIuVsXyU4eJEaVWMO%2Bm4VTt5kQukPWCYMoGZWI%2Blj1jM2Ku4QHxEB1SBOz2oyHVx%2FxQLArC7pp9LWUOSSphrnraC2asKnmcI6gU%2BZk4de7ulx0oZf5bx4Vu4r83mUGsy1xSZtzMBJsaRmzeM%2BNBhYLkQDIS8ahBbSJZCSShBFQzadQHO4hRti7Nr7BPme%2BIyJi742M84HsyxMgD%2FDj8%2FBr4fs5O1P4iT3S1cjB3%2FGBcEDV9E380hTzI9rlRleCrUg%2B3EEgFWs3thYLazmp%2FO%2Fy22OBgerSY5d5qW8Heqbj1UcIOUV%2BVLZ4Bl8vWzdhYbf4dRwwbqMxgGenY5u8mnqsfdgcFe9liqCO3iK%2FTbL18NSzhQ0%2FBLLl1FbXdJEu00w0ls4%2BruNNbxeichkd0pg9MpKapFKy3XfkXqppEBU%2BD3XZgXsTkSh3ldjkFPtvB33LL3CHdupogTK0efMj7FLe9zMKnYns8GOqUBWtZqjGMnzIb%2B%2Bu4KBvBTh%2BaNc7sCIQN%2Fp2Turqsab0GsvihS15YK7ZirNQQfF%2FuesK8%2BPlijDqJw2%2B1zgeVsOOl5BKbtXArFGmsntuPQcn4jGXZ6k9R%2FmPBWIr43OH02yOdoCGtA5H9J95tP%2FgGCTESfdFJdQpWguHl14uhnGOJyPozTswwO7UzmZ0hQHtu%2Bm8rOL%2FNFRXnLWgsCOSXIORe73WD1&X-Amz-Signature=cf68032c1428f7d24f1afe09b673d6801ad1cf6ef8f9973aa0ba094f56ae723f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SEU3MXUW%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T175814Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHEaCXVzLXdlc3QtMiJGMEQCIAhxe8uR%2F%2F6L3tvFVVq1FXdfSm8OgqYrkzXfYlaCp5eXAiAwM3hVFsFBvwXyIUhogQDTy9KXEk4NU%2Fo7dQLZ2UipJSr%2FAwg6EAAaDDYzNzQyMzE4MzgwNSIM%2BKKB09NvVrUHcZy3KtwD0Lp5YnSMYbZJZ4omTVXiJC1%2BfI2G%2B2a%2FWE%2FnIT9jJhqGRlOF8SoOjXkAF7WTI80D9pUz5fbmiaVCF6WXded3u3MKTS86%2FWSh3w0hume%2BX1HBmXUrSTyYe7qr%2BHPmRQQ5UoKhwGGSdPy0Y98RxF2v9afu5BAvI1bFrIYoxewDZ07nzY16DiEDrM3Na2RuxX%2FlS9yRtSLAh1%2BG70dJaWEPt0dze4Ytwbl8fycjo7lfvaZejXZVu%2BNTYNy3qx65VZ2eN9JWcrczgNkeH1cPlgbvfSH4eR3ggP2woz6owQ1gNGUQUUngVUfLA%2FC2rFbaLfD2SOHQmu6hRYKWutZZSk6RiWal%2BA%2BdC59qvnk0d6dciUhmf7tPWsl%2BOGH6V9x7mvPgEhAYMmD5sC4RRaqZO1r4HLhjhYUVrsOF0e05hlu6uqVM1x3ZfKfmRFmoOlEygbjYlrcFiPwSlzH4%2FutIDcjdKm5Z7w1vug4YdRu63etNrZpgjdgQ14rgwmq3bjd5VLICl30Cz19ESIFtcV6EV4SSiIOrDZX7trcQ0GGJm4xvRGWIGfCeh3FWFJ8idyez0npPyIwpbIWbtrd8K7cE7NyyalU6lGaJNz%2FfenedEY1uNONE3cdi3QtCaX8tQEAw0tiezwY6pgELC2IfezmQ0Bt50UVrZHK%2B1c88har7EwBlASob%2FB4TPzccdeL0lcKvektnuZMvSMBepXJxCYd%2FGRB24qnTsr3VIsiGp2bbbkiqJujUWaKqgi4IFF0bdYtkZuS9mOYX0T2WsjOtvzRom0IzV8BPSlttoUvc87ZX14HGaqjpFdRTW7cMmp7n1A0bey0vZYg0odzVpthnE9rJSrqcBJZ1oFHWTh7dJ0mA&X-Amz-Signature=18064a58055a4e29701d7166b43da5c6e03b37af5e467061409ce78e02dd95e7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

