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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QSPKVRGW%2F20260413%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260413T160234Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIBOMKUjLMZUkjFMnlq%2FaG0r36jGh3NOiqGBWFRZ%2BLSm7AiBVe0EN0luJenIE0%2F5Ng4BOV3wy2LNVGnv5VWCyxFzxcCr%2FAwh5EAAaDDYzNzQyMzE4MzgwNSIMsaRmhengNAEbMdBxKtwDOZhzxK%2BVM4cm74hbDzrzzcvp8jKGIWfiy%2Fp%2Fm6gtfeIzSF3o8wPWFCHDW5NNR5AdntRGW3aXzgCgGQpLWaoHH6ZquuxWGJSibi%2BCRueMuANSssVeZ9LojzPNv96qXVa4B5bK0mBRkPCiJg0ZaPUya1L1Nl7K0Jqpbk%2FTVAp69%2Bfi9zfOHXUY2Wf5yRhP6lOCnMQ8QyBlO%2BhI7QBCM4aJNDKv2BBcMronYEsGtrJoxMtXgGE%2BZbIqhB5dLv02ywGM5BqUTzeb8N2VduDlBhcxywXZomZJrDraTDTBbqrLns7Jqcj6bvbm3v5OMOb9%2Ft3lNHuok3wX%2FLEa5PaEDmdhRq22nWQsfkUfxLK%2BNwgeQkcCjzgo%2BxS6uKOK6GieoL%2FN99SDc006VnLQViVNyODltWUjquTwoHSvMPj9k%2FbayLf8U1LTcipa92mqfbHUrCy1Shso6rPrEfwswWG5jdRuULGRPTnHwa6uU7FUXGKD%2Fh0KTw9kJUZYaocPK4zA07aepA0rAHWhkkqtW3t2WslPmqiG2G6Flsqd6RLgq4N0GAp%2BeZtkh0IXi4iNYi9Djo6ctV47bw%2FayWVdO%2BJ%2BHUz1DoyMuSUyFg5YCArxjRzVWkdxT0XGZ3U7TrQ5Rn8wvZ30zgY6pgFQlJ0jNFL%2F68cqH05llOUz7ko%2FjNMo014zRfjG75ADEjuRjswess2hVG1vi5iluKQ0%2FY%2FML5ckFvJ8AR5HYTobuS2mX0d7ljN%2FSP%2F3SE0%2Bs0S5IZR74zw3297yA%2FTn%2Bf5Wja5ztFxwuW6Kl0k30wvcudnX%2FJJ8hFJM3b6W1LEoeKG%2BjNXp6SeyDPi1MrRCwMbufaYVVilYi1nUlBnpv9SCU3BAJeW9&X-Amz-Signature=529c2ae4788bee65b177a191441490d110b995e54fbf13bcbd191fff7b619aaf&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QSPKVRGW%2F20260413%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260413T160234Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIBOMKUjLMZUkjFMnlq%2FaG0r36jGh3NOiqGBWFRZ%2BLSm7AiBVe0EN0luJenIE0%2F5Ng4BOV3wy2LNVGnv5VWCyxFzxcCr%2FAwh5EAAaDDYzNzQyMzE4MzgwNSIMsaRmhengNAEbMdBxKtwDOZhzxK%2BVM4cm74hbDzrzzcvp8jKGIWfiy%2Fp%2Fm6gtfeIzSF3o8wPWFCHDW5NNR5AdntRGW3aXzgCgGQpLWaoHH6ZquuxWGJSibi%2BCRueMuANSssVeZ9LojzPNv96qXVa4B5bK0mBRkPCiJg0ZaPUya1L1Nl7K0Jqpbk%2FTVAp69%2Bfi9zfOHXUY2Wf5yRhP6lOCnMQ8QyBlO%2BhI7QBCM4aJNDKv2BBcMronYEsGtrJoxMtXgGE%2BZbIqhB5dLv02ywGM5BqUTzeb8N2VduDlBhcxywXZomZJrDraTDTBbqrLns7Jqcj6bvbm3v5OMOb9%2Ft3lNHuok3wX%2FLEa5PaEDmdhRq22nWQsfkUfxLK%2BNwgeQkcCjzgo%2BxS6uKOK6GieoL%2FN99SDc006VnLQViVNyODltWUjquTwoHSvMPj9k%2FbayLf8U1LTcipa92mqfbHUrCy1Shso6rPrEfwswWG5jdRuULGRPTnHwa6uU7FUXGKD%2Fh0KTw9kJUZYaocPK4zA07aepA0rAHWhkkqtW3t2WslPmqiG2G6Flsqd6RLgq4N0GAp%2BeZtkh0IXi4iNYi9Djo6ctV47bw%2FayWVdO%2BJ%2BHUz1DoyMuSUyFg5YCArxjRzVWkdxT0XGZ3U7TrQ5Rn8wvZ30zgY6pgFQlJ0jNFL%2F68cqH05llOUz7ko%2FjNMo014zRfjG75ADEjuRjswess2hVG1vi5iluKQ0%2FY%2FML5ckFvJ8AR5HYTobuS2mX0d7ljN%2FSP%2F3SE0%2Bs0S5IZR74zw3297yA%2FTn%2Bf5Wja5ztFxwuW6Kl0k30wvcudnX%2FJJ8hFJM3b6W1LEoeKG%2BjNXp6SeyDPi1MrRCwMbufaYVVilYi1nUlBnpv9SCU3BAJeW9&X-Amz-Signature=529c2ae4788bee65b177a191441490d110b995e54fbf13bcbd191fff7b619aaf&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46642P5XQAO%2F20260413%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260413T160235Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIFqBzR1kAyyonSZAJnanqANcL42Fc4DUNYlh%2ByVlxvOOAiEA4esmLDFyQ54v12SmJS30VYdQx%2BTMIurI3CQxjLybdpMq%2FwMIeRAAGgw2Mzc0MjMxODM4MDUiDEGyKff%2FCWDG9Xim8SrcA581%2BmU44Bgjk9hjjVnZIT%2FNWKaC70TMHhjbAxuhJUfxbo6JKX%2BVofwwqVvS3QAqGRutWsOOEpzfVkPMX5pPmST6XMUDvA3JukvGtXaCCXHtHdmcVSnZUssFDZ%2BO8oAOQqNn7r5m4S7QsPzLYm9nu0XriEzeAZwjBX1sx8YsD%2BGLOSUKLxQMpJwyoizQNeL4c48B%2Blq7wB7QJljQdYgeHW2Ev8eFMcDi8x803VfBaBtv7RP%2Bo3Rtq%2Bh08Hpj78Oo%2BYX9SLfnM6OXlRD%2FtuQkiCgkEo5bxGo%2BYaxWF8pL9cWZ%2BHgD%2BRdTdbRb7QCbkoU1enMOXKcpmNp4jlOZTXFQBG1eZ0DVsiero%2F0kz1e7FqPIf52YuxkRXET2W8DONgLF5QTnv9urahrqB2zK8FS9brRrB0sfZ49uU0Ol4huOzcHuHuz1M%2FCp0MlgSDXXdq8ivJMvxe7Q%2BtbUVzcLJyNIYu3Ce4wzQWZGUjab8p7np5D1bgENrP%2Fb%2By2ZQrrE5%2Bn%2F5S30Jc5u2%2Br1MWKbzHdtRMDAutWiCdMMC5IfsVqzTbNq0bSR0ov02Xh87CCPrKMVI7UwPJWHo%2BPeP8k9P2EjKfmCtIIsNSa9b2JrxMeMu%2Fd297RCc423NEyrudmCMNCd9M4GOqUB65bps0LrrNoTiBuQEajVaQihEo7jYo586v97whmgm4vVKLyJ1nd0FNABK6K6%2FmYsDDKQ%2FExudI4QQl2pje%2BVOLxsSjJE43%2F9jv4HRK39aTaHZljyyDotou47ZbQXre8jzM6SykQikHBcxkI6j%2BdGIGZDCQCH9VerGsQaoBRlgpfDViF62owVnO%2BS2BC7vMnIKRaOc07DI4mtpG2eqlFMn5htf4Nt&X-Amz-Signature=20ee03293fcb07cd0799577b7752133b8dedd4e49cb635e8f5a5473073d8a0be&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664IY75SGY%2F20260413%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260413T160237Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIGvGvZLtkYnn0oiUjFqNyVGyhxQR5CyTdLKxpswfB7IiAiEA60eMjggjWeqS%2F4IV8lACaeCMfDerHsjUFY2mwerOMKQq%2FwMIeRAAGgw2Mzc0MjMxODM4MDUiDIvwWQODZOHe4LN4rSrcA%2FxvpHua%2Bv2BDHDPSt17H2GPgwtVSHbzp%2FJtE23TUTq4t6Mm79hwOsPz4aJ2A8HipOmF6FzEODTv0UdOvHMdiJMjTRqOr18TLmVMySleShmPCbdoj8slUPWfN4JGsxPYGyjX7FkI5UdK4iV4dPXj3kj%2FgyYrzCZXdjOX6EWKcqrl50ECsFPeRm%2ByN5PWV62%2BCJ0iu3EzgoOqr0B4Jq2sE3bZk%2Bn7PYlSJpS0vTu%2F1156bWnvPRePTS43DEy0SRlFvl0WzAUeA96Muuh3%2BX%2BbyskMg3Go7iW4bV%2BuY0lyssk2sPteCPB6SnSYp7ZO%2BUPshRiNGM0TO1O1Ah79XkP%2F5blSmJN1YVkzheaVCiuX9lwjfMdWp4VxXr146zL3%2BuqiYv4SnSYcJA%2B2RQ29nflTlyQksLnajXuGltabyaDp1pTNFoSOFinxI0NhsLDaNxx%2FB9CSV%2FAxY%2FynpDUcFC94FBgoItcrO%2Bf9d8dni6ZIMZKT6ffvIU33Nna7clyjsdVUNzYnGjUpvz9ihAd6eazo5EWJrhoo7AJBdxZCpFnIYnLRhJ7byP6XRKYLYduqYXbLs%2FInwmLvBOyu5810cSQmmCEzhGgx%2FTfX5GBwiamTobeNvqP6u3T%2Fvxud4GNHMKme9M4GOqUBZCAOE%2FN5nqdhdl64iZJOvQPIZcJSa02xo4hpH54cLmlUI4JXXKknzryjpdUxYKdzLw7jM6w02OeBZ8hQsuIwwheQXBJwjgNTKUhEsG3Zf%2BayDsxJbNxFIgdxj1o7np6iZFlY2R8ymunMdnSJRqMnc11UQTSgoYQHOSz5WyqaCzdyq7ZZAyAD32%2BJSGMYSnOdC%2F2k%2FCIULbCgcFcChPBcsT2YmIxX&X-Amz-Signature=7941530581a34658e1570e3223f289198fe5746bfa81d2d4436e368f568e11b2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664IY75SGY%2F20260413%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260413T160237Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIGvGvZLtkYnn0oiUjFqNyVGyhxQR5CyTdLKxpswfB7IiAiEA60eMjggjWeqS%2F4IV8lACaeCMfDerHsjUFY2mwerOMKQq%2FwMIeRAAGgw2Mzc0MjMxODM4MDUiDIvwWQODZOHe4LN4rSrcA%2FxvpHua%2Bv2BDHDPSt17H2GPgwtVSHbzp%2FJtE23TUTq4t6Mm79hwOsPz4aJ2A8HipOmF6FzEODTv0UdOvHMdiJMjTRqOr18TLmVMySleShmPCbdoj8slUPWfN4JGsxPYGyjX7FkI5UdK4iV4dPXj3kj%2FgyYrzCZXdjOX6EWKcqrl50ECsFPeRm%2ByN5PWV62%2BCJ0iu3EzgoOqr0B4Jq2sE3bZk%2Bn7PYlSJpS0vTu%2F1156bWnvPRePTS43DEy0SRlFvl0WzAUeA96Muuh3%2BX%2BbyskMg3Go7iW4bV%2BuY0lyssk2sPteCPB6SnSYp7ZO%2BUPshRiNGM0TO1O1Ah79XkP%2F5blSmJN1YVkzheaVCiuX9lwjfMdWp4VxXr146zL3%2BuqiYv4SnSYcJA%2B2RQ29nflTlyQksLnajXuGltabyaDp1pTNFoSOFinxI0NhsLDaNxx%2FB9CSV%2FAxY%2FynpDUcFC94FBgoItcrO%2Bf9d8dni6ZIMZKT6ffvIU33Nna7clyjsdVUNzYnGjUpvz9ihAd6eazo5EWJrhoo7AJBdxZCpFnIYnLRhJ7byP6XRKYLYduqYXbLs%2FInwmLvBOyu5810cSQmmCEzhGgx%2FTfX5GBwiamTobeNvqP6u3T%2Fvxud4GNHMKme9M4GOqUBZCAOE%2FN5nqdhdl64iZJOvQPIZcJSa02xo4hpH54cLmlUI4JXXKknzryjpdUxYKdzLw7jM6w02OeBZ8hQsuIwwheQXBJwjgNTKUhEsG3Zf%2BayDsxJbNxFIgdxj1o7np6iZFlY2R8ymunMdnSJRqMnc11UQTSgoYQHOSz5WyqaCzdyq7ZZAyAD32%2BJSGMYSnOdC%2F2k%2FCIULbCgcFcChPBcsT2YmIxX&X-Amz-Signature=7ed402b0ec8cee6cf9ab8a3d4313f51b490d4609dc795634ed042fce888ac988&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662HQ36BZW%2F20260413%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260413T160237Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIDbBchLErFCracaVv3aHsZYfbdS67Ua0EDEnFQva8CI2AiBL9MZ6GylXfOh5voKWwRTOSpJAVQEsVEYwnhpjgtl82ir%2FAwh5EAAaDDYzNzQyMzE4MzgwNSIMorrOIS54SMAisn9xKtwDoUApRHoT58FfQNy59q78iIouw5qQqu483RqGcg1c3EvzCz22fJfvGx2AD%2FioXlutnacpXWnfrCk85md53Ctes%2BXsZvhUnHoMxa3%2B85N53MclS3acw2lscpjB8SjHNVXeOfgRQSrNkPMT4qsv2tFw%2FDvhLFaUIx8lK46WYKZH8JRHeo4UU6N7%2BqkrjW4142s78IKpzBYm67B5SKbTCTDWXkrYvArlS7ZNOV0zh7zhcW3bm7InmgmCo7M30RjYRWo8lUXNANUuOlMDQMViSAQMkqZDq52h1uNRuU5AWIqyW4YyaBk%2FXvNA6xpOTVyu7nTrcppSCoAt4nKlbA974nJ4g%2BBfJ04j66vGx1eAGouWHntebBFf42yUY9SYBHJD2dmjGjQFqwy7whUzJ1QOeUmKuiE8ClH91yNnG9I4dp%2FoTY50Nd2FEOk4ehueT%2BnzdOUekGSstLsdvm5F9VIqTBdaU9ge157PYOowHYOSFdVbWSwXnAXUZByWjY2bbahNmccIGALsiN9OCT4y5syNnInjU1hGF7%2FfGYiu0BwS0Lh64R%2BieZCeH63EGDTiV3ZsIjkKCZxagCBR%2Fe7AOyWl5TcUZN5XpHfdqzSEu8U%2BbR6bzlxJBh3sC8ZYHBHd2nww0J30zgY6pgHGci72H11nF6PafcXOU4HKzRB2RSx7jqDAPDJXloVpfSZHs3SxgNg%2BHwC4k2yCEXFTfUB62%2Fa6QQaBvA%2F%2BIOjbXFjLREy19JF22XFdqv10dSe4i9lOiA%2FpuaLRY1tXqpdCiQPpilH1J3hY1MDQ7TDUkHgj6yO3Jyj%2B2lXds8lUPMwF68h33BMny7zGXI1odRxoKcLwR6rF58k4KvcsNr2i3HggXkne&X-Amz-Signature=1a48180fea93f93b00b254ecb65ca95fc84a765394be435baf5fde0f8192c3e0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664BUN4ZZF%2F20260413%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260413T160238Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCSpeka8I0hcqA47hX3JmoGvSRkdby9Et1qpg63dcixngIgZ%2BxxlGMniyPFf34HqAHGxsTgdYXoGkDL4ZedHC3zeZ4q%2FwMIeRAAGgw2Mzc0MjMxODM4MDUiDGtG1ZRk3C8lSRmjeCrcA4fPpwtB4jOZkQ0GKhJWkhyrCX1i6BK4g9%2FfDc72OgtGDvCEOzPN7SGC9OyQBZZof46SkIZGEMDAaNrxekDleKZakVe6n0BXfFhL9OCy5fpCggAgvvUJ%2BbaBAb0u5oA0QhPq0chYyUnGvRxhpAgNPQQlb4F59ERM7yyNJGTTEi7TR12wD1geAimQbmUspNJ4toNBnYL1ttPM8whQvAHIBMce1KSgpsA2%2FqRV%2BPKhVS%2Fh1OMf0JRPQAPwqWARb6kNh%2BkN84Xi3I9oL93lSvS%2BYbUxA5tVxZZ98nJP8%2F3oQRhMbEkMrtPcsdRdqvpDnA9O7Sume1PRPsHgg%2B1b2wOU9an%2BbOpmqNLoncVKIw%2B5wzhowf0tVZxRAy6Q7rRPGIJnLwIHFGMZGOR8D2o%2BvM2Wy2DrbmbRBA2oEt9zi%2BGpJ%2BhtAJIonpt%2F%2BE3GELCGeUyZSOtuPAQwcW7LLUckmEYcqNUvu93lrvAo%2B%2B9S69N%2BNVYhqJ%2BslwSCJe0SRRaqt03ssGp1T9Nd80ot5sqE1S45qdiNHYHBAUTzvUmKGgA0HyGZvr%2B7YVE8yvVAzPnm%2FMP5W7BBq95CDzFrNVBktHOFWK6%2FEOJD1%2BHeUQiDwX%2FpdhQ3FLm6%2BNGlATU4l6rgMKKf9M4GOqUBCbzZe8Kfn5iaXD49wd6vA5O744Y5UwEClXJb882z5T1HwOdSuuZNwjkq2rSlDwzMZTPrAJSCNMeSs6x6wWtSIKtHox431s0nrabBjIGu4Ea669cm2%2FYTVflBRyO%2BjweZKrQeLj9MU%2Bb5IbAOeg42n8RKdGM%2Bbmi3mYKCt12QdCR0X%2BHttRoorN3IqX8cvioO4yjjRtgAhU7VkLsl88fwLbTBn3f9&X-Amz-Signature=3c32085e0691eaf7a56020063280712fb4d90881c1a4232a51b89158c3f8c1a5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662FP2SM2P%2F20260413%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260413T160244Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIEejquUbBFLU%2FxSDWlG66gdSM9RhL3RjlEIvMEA8w0ofAiBUBICZ1DZzB3p9ubgux1EDKk6HZwpdOMuFwgA%2BJUkYsCr%2FAwh5EAAaDDYzNzQyMzE4MzgwNSIMvYIdXfZrJf5pY1WRKtwDvwI8E1uJtuSBRABHuWYVZpzGUDJP1CI8RkAh13ppqoEZOWFy7UC5bntCr8%2FbZ03KS2qrUcZXWdo%2FoH8suwSdu4ajm%2F6RIVGIVeWGLpo%2Fvw1TLAuRcjJIosiHHbRcG%2FNDwbJzxyyPVn1%2B7Yn9xWf7201pu6jKigMY4iOw0WSVOImWlDLKptGvO734Y7GkWO9es33AHaNldsPVkmjkn40PmB6q4qAcLtz907GCk0aiaJZP0D9NPgimBTEfAtSfeKXWO0vSh0S6vHjRSSL7xsQUEEPK0rsZMsZs5rUccOQvBDVIFi213yv3NX4qootXLc2oW2N8vlD4%2FDSceAVq04Nus4ZpLP%2FZvwi0fQrQ%2B9AJSP%2FQpJYVPq5E2VGok0lQKvJk75KPgQGWd9v3AmDQFrj5weSHEaoIX%2BL4F4kZ5GXgQxiW6gufbiTb6YlwX3LwU0bLxsuuUjmy17lkb5%2F8vONI9Io2XgSiZDRekhkS1HbnBuhbMp%2F39Y9Z7qiTAan4cJmKAGumM695hXex7%2BxR6Z8bF56e2Hls%2FQjDAkJFvpg4D1oOunAMx0S1b5Ftqdgs%2F3yYs0dhJXowG4H2RX9BXCy%2BT0DduhtSZ%2FMR3UaMrjE7yJCCBA1Tlc3HL16OOgEwqp70zgY6pgGPlGos%2FNUMrD4Lqv9R5VtdYczZcuPciW4gkV3F7n718cCL8TOrfbLn0TPeI%2F59m4%2BSOXwEEctInbX2Q1xF0d6sp4OfJiQj3tF8RueeB4YUTAtzZ0tBPoelvyi9LqInIMFo8Dg8ITkGlpZ8zV16O35nBf13fB58AxCnl9i%2FtYgYXX%2FXZdi897%2BKUiOulBbB5MHhJYsVibpytDd5vnZKvaj4iXPiVfOr&X-Amz-Signature=5b7d38bbdfd3540e79018ca82f9ae021500ed7b64349ae83e0087bf9fbb530ba&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665DQPKYXQ%2F20260413%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260413T160245Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIENtUA4o6JRUXU7LLAHeBb6RnayEhQ4d%2ByAOkYIhmK%2BKAiEA0O%2FQJhmQJO8P9Q3nbMEI%2FnUvnusiTFzMOcYQSuey3%2Fwq%2FwMIeRAAGgw2Mzc0MjMxODM4MDUiDBPd8wlxzaddOLTO1yrcA9hU7b6FwHf16P%2B8YfGDhXPjXZFejG%2BX9OuvqygAoCSPxfb6nfw%2F70DbaDvQ2JFtxTXpDye9VmqS%2BQ8rhgaLzRu3Br52lOop3c%2BHu2SHk4CU8rNkCVOcATR%2Fp3drnPjvM%2F4jx1ht9WYEJpu4RPudOP4KvY8DMNyh1DJxanZ15T8gz6Jcy4kG1zcgcKyh09QKN%2F3%2BaBw%2B78GUqquEfRuuFJIh6jcyfBj9xzyJDpgoF1pwPNt4RnWsBKzyHimVSqnKs0rFdUpVMo3HuuTTLf0BXIimWxe8pAJQxNZvrOPzWMGZm7NjCcCaTb14p88xJzbuqXMP06EfCGRFeklXNRds5Sjr%2Bdy6PLEGUYYDOYRbguuwVwlNC%2B8ZffEaPwoB4B1d1xmqDeSY55XqHTKL8WDvF8TspN5qNqLm5yDie7r%2FOBSaOgwTu%2BvpWRXZt743zt4S70jlYGw7p58orxTLWfp9QDhcDHWVdLeBvqKQH4xGrg%2Bfe7J7yB3dBGIs%2Fgm8KON%2FMP3J1Rtm56UHGVtffqeObUpmx%2BhwjdDXctiNFbJKoVuq%2Bh6Zwrrqt3UHEG6gz%2BvaoVoWfuN4CPRWUIpcgBd335y33%2FUXHm0QdAkKRhzZ8vl1BbmONqqOi98tRTqkMKGe9M4GOqUBWgGbKbIZUZEU4uDvXTwWznejo7wXnMjDc0GNcpUG2FHyoYHoou6D5QNHhFbr%2BelKSuXf80RvF2RDACl9ojN2DRW1OikRQ%2BEeG%2BeW9K9bCewCl7%2BD0Tto5WuaEzF6s%2FRJtxyqmsxSYbxu1RGVMzEBjtwSqsEwLMW9fi1UhaYvVQNNcXFM8bu0ijdB%2B0MVwU92gRccCfcoDnU05GyTn5OvbT4HZEH%2F&X-Amz-Signature=c5e181772b19e3089423f683f6c817e2af3d3ad569edceed45dccda3aaba820c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665DQPKYXQ%2F20260413%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260413T160245Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIENtUA4o6JRUXU7LLAHeBb6RnayEhQ4d%2ByAOkYIhmK%2BKAiEA0O%2FQJhmQJO8P9Q3nbMEI%2FnUvnusiTFzMOcYQSuey3%2Fwq%2FwMIeRAAGgw2Mzc0MjMxODM4MDUiDBPd8wlxzaddOLTO1yrcA9hU7b6FwHf16P%2B8YfGDhXPjXZFejG%2BX9OuvqygAoCSPxfb6nfw%2F70DbaDvQ2JFtxTXpDye9VmqS%2BQ8rhgaLzRu3Br52lOop3c%2BHu2SHk4CU8rNkCVOcATR%2Fp3drnPjvM%2F4jx1ht9WYEJpu4RPudOP4KvY8DMNyh1DJxanZ15T8gz6Jcy4kG1zcgcKyh09QKN%2F3%2BaBw%2B78GUqquEfRuuFJIh6jcyfBj9xzyJDpgoF1pwPNt4RnWsBKzyHimVSqnKs0rFdUpVMo3HuuTTLf0BXIimWxe8pAJQxNZvrOPzWMGZm7NjCcCaTb14p88xJzbuqXMP06EfCGRFeklXNRds5Sjr%2Bdy6PLEGUYYDOYRbguuwVwlNC%2B8ZffEaPwoB4B1d1xmqDeSY55XqHTKL8WDvF8TspN5qNqLm5yDie7r%2FOBSaOgwTu%2BvpWRXZt743zt4S70jlYGw7p58orxTLWfp9QDhcDHWVdLeBvqKQH4xGrg%2Bfe7J7yB3dBGIs%2Fgm8KON%2FMP3J1Rtm56UHGVtffqeObUpmx%2BhwjdDXctiNFbJKoVuq%2Bh6Zwrrqt3UHEG6gz%2BvaoVoWfuN4CPRWUIpcgBd335y33%2FUXHm0QdAkKRhzZ8vl1BbmONqqOi98tRTqkMKGe9M4GOqUBWgGbKbIZUZEU4uDvXTwWznejo7wXnMjDc0GNcpUG2FHyoYHoou6D5QNHhFbr%2BelKSuXf80RvF2RDACl9ojN2DRW1OikRQ%2BEeG%2BeW9K9bCewCl7%2BD0Tto5WuaEzF6s%2FRJtxyqmsxSYbxu1RGVMzEBjtwSqsEwLMW9fi1UhaYvVQNNcXFM8bu0ijdB%2B0MVwU92gRccCfcoDnU05GyTn5OvbT4HZEH%2F&X-Amz-Signature=59f67b9fc323c94691c200743c06b0c97fba5e71507ecf1b1298c61ca9e105f6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZKDHSKF4%2F20260413%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260413T160232Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQC3Z4pm7q%2Fx8TlaU23f8vTNr6NvlmR9mW7j%2FqVAqQE8IQIhAImOOfSTdFdx8q6YHNCd4d4IcTibQFrISAgyRJE6oVMrKv8DCHkQABoMNjM3NDIzMTgzODA1IgyBS%2BKFZHyZ8ylBKoIq3ANUz%2FKC56ofgOhuKWlxboPd8Ax1iGoGMEE08JTTfoQip2QJG2dtCWUmaaFsEE7NRKxQvWNE6evBPfbeBdJBs0LWuPFP%2B7D3zeNTXNK5EZivaiOrp%2FwCcn475mhvAqkjXHj7jbOoudp8AHb3i7%2BimC%2FfFXogdEVsOc7q%2FhuRW8xMXlTjrkU8kDd8Eybo%2FMUnoDjNhJrkbFQnmHoyeJ4GiJ%2BXL%2FzpFFvYbmfImoQHsB8hRr7%2FjKgdhaXi9VhugI8Dh5N4mGcwF6xSk2lrse%2Bquhxd4ZpNNN7HckA%2FohSW1A%2FPprkCEFfjtlAiMqvhMvnP5YgMMHoolOkXamKodF%2FByMFZbwVZbg9XE0jwZdevnz4NwRJg0vC2E9JmXtXAaKXu2jOB6a6KBVrZ68YpxfEFlD1abpqrNWROhpANKwrQ%2BJINbH%2FwP%2Bxv67NgLz25Jag8CfuAiMa1X39XMAP9%2F5DXpnst7jm72YKeD9hPY0VNmgpFeMqGoYfkqPTfKw84HQRVse3TPdLT0eLoZ4CwIYWIvRQMoqP7znx718ryd%2FESjB5E4uR4%2FStu6kSwAneLWgjAWAizT5pzu%2F%2FKE3bxHEXuE52lku03c%2F2tyDGVsaZUVCKS1lZCJNGh1xQeX0LHuzCnnvTOBjqkAcZDx7u6Kwb6reU3yRWi9LbA7dXCLqmcXPKZDW0c35OeuATYWBATeJXSqlK7KEGBVkFJYzm5iT8mr4B9UT415aqAetqWv7BAUmWvU5CK9DNHEh9zEDWUjOlBLi2k90eYqvorOnMkTgEyeZrkRke%2BeDBxcl1%2BCze2VGzZ2goyQ0npbs%2FQlGDChXpd06Wd0u6g5Wb%2BUVtVEWupPzLemRnHYpvVsLK6&X-Amz-Signature=9e7e9e5279909e3e90c73c3181a5d58b734d174a4cc111fea8fe45530901e728&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZM4JF3I5%2F20260413%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260413T160247Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIHR%2BCgX4lgLur3bzqiYFA5mSrTg3gHOGLL53jbgec3RZAiAYK9e%2FjiB9OpL7aP0v59k8ltOI6eXqTb2isdPeVdER3yr%2FAwh5EAAaDDYzNzQyMzE4MzgwNSIMSObmGU06cMM2IiRVKtwDmff%2BYN1iCEYU7ebEH775M0xVwnpPSdCNQSR51yaXUZH8cuyVTWzGgoh%2B%2BcNVmCFvoWU5GHu3BfPO9Dw3yfP6RkbjxIGW6hc1aFW%2FaTwcVHBtpw8aWnjT%2BBte2PrlWfleUn3Odp%2Bxeovak5SROBzpkvUn2228fSiSSZWjEyEIDvUTdQeUL6hdqNd%2FEmwqLYHrsnuhb4PnkaREdzCY7X1wdthlQSUgDE1khwf9KSZmq0BNF0GLIZO%2FEOO9RB5hbu7Eyc6xgeGFoc1JP0seqzfV90BXCY91v%2FbiS8190QE%2BblB%2BKrgsh87x%2FIV4CI9qZIkRgdo1s%2BUsvzXa7ndtUoj8LpzePo38D%2BVO4p%2FGEM0H%2BJ7SQurDhDneA%2FAw8ipoqvNUFr51ZWEUnLtSQqTZeZoWWDym3q5Srxpc6vurU9ZdphBvUhT1WWfca8UsgtUw5Ll%2Fc6HWLoWW06ZfPcYHCu9RoSeV64naD2WiRabb9w%2BcccbS4s5riadnfkz2O4pbKCImsUGkGUN3dLVb9wa2R4jFs1U5R%2BlnFLqWZZa0ahLb1bfVds6tTS7nbGijOj%2FwxCeU7JTw3ERjNkJ1a6gaJyUMA2KUERYW1MLyYmR4lyfwS0%2BT%2BNiAprcL4RA1JmQw%2FJ30zgY6pgGTboSIu4t4kvnpPZdJi9846BkChulzkdoRGFriaSwu6%2F3%2Bh9YOJgToP6oz464wjXY5Cpz7P2zQkR4Qlvr6cVSDAuN%2FdR%2FV6mbEKbbnDsCatlJT8BEbjNhxdc6XmZDV1ElikyYWNBItWoN9Du7z5j6AGRWpbz%2B%2FXXzKDuKqhA679ZIkGxpao3CWgjT5orzPk5USpm6N7bejeUBRfK%2B%2F%2BqquBdbM%2FUlk&X-Amz-Signature=0dc2563662afd00c380c81ac288cef9ab88aa1e50061bb44ca3e404297edb145&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZM4JF3I5%2F20260413%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260413T160247Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIHR%2BCgX4lgLur3bzqiYFA5mSrTg3gHOGLL53jbgec3RZAiAYK9e%2FjiB9OpL7aP0v59k8ltOI6eXqTb2isdPeVdER3yr%2FAwh5EAAaDDYzNzQyMzE4MzgwNSIMSObmGU06cMM2IiRVKtwDmff%2BYN1iCEYU7ebEH775M0xVwnpPSdCNQSR51yaXUZH8cuyVTWzGgoh%2B%2BcNVmCFvoWU5GHu3BfPO9Dw3yfP6RkbjxIGW6hc1aFW%2FaTwcVHBtpw8aWnjT%2BBte2PrlWfleUn3Odp%2Bxeovak5SROBzpkvUn2228fSiSSZWjEyEIDvUTdQeUL6hdqNd%2FEmwqLYHrsnuhb4PnkaREdzCY7X1wdthlQSUgDE1khwf9KSZmq0BNF0GLIZO%2FEOO9RB5hbu7Eyc6xgeGFoc1JP0seqzfV90BXCY91v%2FbiS8190QE%2BblB%2BKrgsh87x%2FIV4CI9qZIkRgdo1s%2BUsvzXa7ndtUoj8LpzePo38D%2BVO4p%2FGEM0H%2BJ7SQurDhDneA%2FAw8ipoqvNUFr51ZWEUnLtSQqTZeZoWWDym3q5Srxpc6vurU9ZdphBvUhT1WWfca8UsgtUw5Ll%2Fc6HWLoWW06ZfPcYHCu9RoSeV64naD2WiRabb9w%2BcccbS4s5riadnfkz2O4pbKCImsUGkGUN3dLVb9wa2R4jFs1U5R%2BlnFLqWZZa0ahLb1bfVds6tTS7nbGijOj%2FwxCeU7JTw3ERjNkJ1a6gaJyUMA2KUERYW1MLyYmR4lyfwS0%2BT%2BNiAprcL4RA1JmQw%2FJ30zgY6pgGTboSIu4t4kvnpPZdJi9846BkChulzkdoRGFriaSwu6%2F3%2Bh9YOJgToP6oz464wjXY5Cpz7P2zQkR4Qlvr6cVSDAuN%2FdR%2FV6mbEKbbnDsCatlJT8BEbjNhxdc6XmZDV1ElikyYWNBItWoN9Du7z5j6AGRWpbz%2B%2FXXzKDuKqhA679ZIkGxpao3CWgjT5orzPk5USpm6N7bejeUBRfK%2B%2F%2BqquBdbM%2FUlk&X-Amz-Signature=0dc2563662afd00c380c81ac288cef9ab88aa1e50061bb44ca3e404297edb145&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TCOA7MTQ%2F20260413%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260413T160247Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQC%2B%2FgtoVwKthqLnwWBz8rY6PoiZGfNFDU2pZq6Sd6mfCwIhAOKvWLVV%2FHrQSpzQzJvzKeKJ8gw5AG%2BjfPDai2sc2Ap%2BKv8DCHkQABoMNjM3NDIzMTgzODA1Igy6HaA3JXzWjRsbB3Uq3ANi2PLcdRRSqQ52DwoVR4jn60Gu2uXNkCJNdIE0QTHoK%2FsKZhItO1v%2FWY13PikJmXJ%2BgBUr1vIhQk58IlCXvhX3VLgDpaYGlzVP55Cdq7zZgicMscLtPG9G%2FQyRlvXJLb4DVUfSmjDw%2BH5udDYIz9rHl%2Bm3foTnWOSzjTevAyJsMxKLMqK4pmq9B%2FOcioka1uMzGPs2IqyPLnh4Ll1OBZ9tT6JXWRRTQ5MxwcOYf0nOoMJvF5s6wsJJThbw6VIRo8Rxn82pqfY1%2FnUJEaNDnu44fXfrD%2FaK1PTM3FyKXOeguPmUvpLlZAiykER5u0Vj1wjZPdTSb3zVEQL199qjuJa7EvCzYK%2FKzqzcMMNdQJVNTg9IEFQJCyo8quctyRlwiLO%2B6jmWqx%2FtJnvxmPUA6AEevdgfiD9D5y6iYsy3a6z6d8caRUzN6Eg6gYJF%2BnomY5zjCPGoFKB0nNNAVwWvOgoN3hfRRjxM91Wcp9wA1BijcnGzxHJyklntm1Enoi5EW0mgiVcLirzF5HgFVKX2ameCrgw6o%2FXYf8gNw4P5LV4F5HBTFIsYTwreina0v1MuhtQOF16a5P1WS%2F87O6f%2BpgmQITqtTMazSDIR51yKfCpZIycVAs7DcwSKgo72IzD9nfTOBjqkAT9RCF4sbXhIC4CdSEk7ArCl0K8P8ONhT3Ij52ujF5yOK9TVYqjAlG9XEIopjC6EaEfi8WhSxplnZN5e1oc5jptpf9w7r6A20vX1JCgqWycIQiYnco6c3BcrjSU3ts9nxQs8cT1mdY4Kr2dSje6vBcrDvkxpI23vTod0qyu%2FXRDYFRj%2FVy6wJ8joSjZTxmK8Zz3q7pcPzo3LKzbcEEXJBnK1FdK5&X-Amz-Signature=03ca86b1a0c6115297278b8d685b6cdb353ed2687503ef3fa332dec4ef07c365&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

