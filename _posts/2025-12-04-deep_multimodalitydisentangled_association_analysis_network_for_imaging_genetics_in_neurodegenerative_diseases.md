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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666HCMQDKR%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T162723Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHAaCXVzLXdlc3QtMiJHMEUCIGp%2F9Hat2G8b4UfnfpdeuounpwNgS6gRFQMsgYfCI9PGAiEA08i7yfWWnlcXljg5fom8SVxa5ejnzhF53ochoLyQ3BAq%2FwMIORAAGgw2Mzc0MjMxODM4MDUiDL6qBs%2F2xFYhNapmGSrcA2myGqKHpf6tofXZRszyt5NJKC4dG%2Bzpwo3lPUI9YosNsVqdCjYVsPn%2BLRQ3yWQekouARPRVRvAay0%2BNH4ubMDm3c9pQgfwDzLEzvR6Tl%2FhUlXa6nEVmkB5re0znQuUIs4tlPvhCFmU2xLmRJzB%2FSy8dIcqArp4EjMgmsrJDF%2FosFHjSuPaTbHDShCUBa6E%2Fz%2FYmpOsfpVgY15Q1NnA8Ueskxunw%2FXL%2F75yh07YBsHYMkY3ZZRp1yBlcaOWbGUSOFRIWVQtHkMbThmCiKjYAtNPfC451ZPHg5uFeIJMJ%2FcM0XMklb0WbR1etY27rXTaGZHIH4B1rUwCAFHAwMnneHLgQ003RlV%2BCT4jI%2FV5k9QE1YTjjG0wnnNWxTTXfKHaLO7MxI7MR3TW9mcnrTFILEmyfcysQzYQ5Wvx5qb0p4PsqTLPeIwgd8zOThx9L%2FqYTK9FvNYcdtlJBHv%2BvmOCW7j2qNTJ8OxNa5%2F8f26urpI%2FsDf2%2BDlalKBXIET23dSG2f5rGt3Pg4elagXHeWHL7xwp1lK3Wh9sKqMAT2%2BfcvibKDwJgkL%2FThG7nBbXFcMxwOp5vjRYEhYgzBl3tgloTYMDUEF1IUxzRNAsw7VJZq1ibSolUY9eSEMXLdT2PMPHR9c0GOqUBlTUZO8X1R0olA35oPv4EIXRBzz44o4%2B1Fv8UtVwEQ5p88awXfeh808PIea7i6TXD3bo73u6UZWsiwyKK7YXxlvzY8PaRBvvOX%2BKl%2FFjtJRtPtegh%2Fbbqdv%2BYev0%2FI2%2FJI6ZxwYIz4Vj3eFOMTqR%2BVPeVr1Dq7dCscOALuz%2BFuhW2biFCivmWPYXRECdaGJ1K4fkLAHO0F88%2BSBk5AcvlS3y5%2B7Dm&X-Amz-Signature=3464b3be15b0824a82352630d23321fd50d6ab12cc3e29decb6fa9a16b275fd8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666HCMQDKR%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T162723Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHAaCXVzLXdlc3QtMiJHMEUCIGp%2F9Hat2G8b4UfnfpdeuounpwNgS6gRFQMsgYfCI9PGAiEA08i7yfWWnlcXljg5fom8SVxa5ejnzhF53ochoLyQ3BAq%2FwMIORAAGgw2Mzc0MjMxODM4MDUiDL6qBs%2F2xFYhNapmGSrcA2myGqKHpf6tofXZRszyt5NJKC4dG%2Bzpwo3lPUI9YosNsVqdCjYVsPn%2BLRQ3yWQekouARPRVRvAay0%2BNH4ubMDm3c9pQgfwDzLEzvR6Tl%2FhUlXa6nEVmkB5re0znQuUIs4tlPvhCFmU2xLmRJzB%2FSy8dIcqArp4EjMgmsrJDF%2FosFHjSuPaTbHDShCUBa6E%2Fz%2FYmpOsfpVgY15Q1NnA8Ueskxunw%2FXL%2F75yh07YBsHYMkY3ZZRp1yBlcaOWbGUSOFRIWVQtHkMbThmCiKjYAtNPfC451ZPHg5uFeIJMJ%2FcM0XMklb0WbR1etY27rXTaGZHIH4B1rUwCAFHAwMnneHLgQ003RlV%2BCT4jI%2FV5k9QE1YTjjG0wnnNWxTTXfKHaLO7MxI7MR3TW9mcnrTFILEmyfcysQzYQ5Wvx5qb0p4PsqTLPeIwgd8zOThx9L%2FqYTK9FvNYcdtlJBHv%2BvmOCW7j2qNTJ8OxNa5%2F8f26urpI%2FsDf2%2BDlalKBXIET23dSG2f5rGt3Pg4elagXHeWHL7xwp1lK3Wh9sKqMAT2%2BfcvibKDwJgkL%2FThG7nBbXFcMxwOp5vjRYEhYgzBl3tgloTYMDUEF1IUxzRNAsw7VJZq1ibSolUY9eSEMXLdT2PMPHR9c0GOqUBlTUZO8X1R0olA35oPv4EIXRBzz44o4%2B1Fv8UtVwEQ5p88awXfeh808PIea7i6TXD3bo73u6UZWsiwyKK7YXxlvzY8PaRBvvOX%2BKl%2FFjtJRtPtegh%2Fbbqdv%2BYev0%2FI2%2FJI6ZxwYIz4Vj3eFOMTqR%2BVPeVr1Dq7dCscOALuz%2BFuhW2biFCivmWPYXRECdaGJ1K4fkLAHO0F88%2BSBk5AcvlS3y5%2B7Dm&X-Amz-Signature=3464b3be15b0824a82352630d23321fd50d6ab12cc3e29decb6fa9a16b275fd8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667SSSKTJ2%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T162723Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHAaCXVzLXdlc3QtMiJHMEUCIQDQSVSQp%2BHFJeqoK6XwhUSdEbvp64hDeqMb%2BakfvW24PwIgNmgqDYS7Cky%2FpiHU1MbUTnqNRNJvXPaGm0d2ehvYRB8q%2FwMIORAAGgw2Mzc0MjMxODM4MDUiDKgZkYUAOAsm6rlJeyrcA6%2Frn9tJovNNw8yRfTSS7%2FkRzX3rYF8kESqcScRW3L%2BnIl9wMwvWaIv2Sc4OGAceBkm78aQdfQTMn%2FGPXlTdMBWm4IL%2FMG3U1IpXiOJQXVkyyyY7dWHaS70abLy5L%2Boe6iNQ%2FtyVUgKU8VHOpsRN71NTpGMbWITIe7B3hfUJ1iC%2Fd5m4f0TJqnnKolfyI%2BGxteZD42xdRQUJAJjzsunZAkp4gdbm47RCCjOFCkCmvdKsjuCGhsLnWIlsepffD0tGE52DCjlPjBtmx7OUJrJ0gWY40RuIaBmZns12WWBOADJGf5FgbhEFM%2B%2BM9s0CGF2wIMEUTq2pzG2wUyr3zD9SgMgFnNTO0FkSsDfocihnfXv%2F3P2PU%2B6dy5zHs7ompSEaJxie3qZiQ6QN63ws7BvW3lYXGaN7toQQ3pfNy%2BWtm1L6UFV2ui9VY%2FBhD9mE0iuxBsQAVSE%2B87cyYgAQO20G3Q4Xu042WxPkp8vza6A3fw6ZFcTLIW4P9hEj9wFaLGj3IryR5ykqjLBGtTh%2BEtN%2FNunIoVFi0NMeX1B4MYLD92zvuSEdJYLFAupX2npzYF%2BrgmRQBgSc%2F1W2Bd7IKmi%2BVF5IiHkCNhduGr7aKGdamM8ev%2B8wNUlBNk2Pg%2F6ZMIbS9c0GOqUBE4UX%2Fp%2FR8efU0vah94Hj9XSCKQxOd4hc%2B3V9DWlUQjNuPABb9bDkf6%2BHYYAb9iv3EfCQavY9DcXNR13BoYpfxqhZm%2F5Ry32b9czlQkGjFE6wWrFvYSp44v8jNaVy08emUvpFtnZrb8L5JUlQ0JCCjw0FekpMQTecZvqdfRlyxu2YWFCtUt9LKCfOeR3ewwq18JV8x6rFpZxyZGf3e62ePz4MGepB&X-Amz-Signature=1a32c5510b14fdd576fab5c0c716f6577467582130e6be2553678eadc0e36b7e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TFN43WZL%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T162726Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHAaCXVzLXdlc3QtMiJHMEUCIFTGFZoJfgIpH1hz6GDDIGDOCubSROp7ERMMOzSEz2h%2FAiEAv%2Bya1ZrODqYS%2Fs24JFrtOBbUNFPctwfakm7pm7Pqkg0q%2FwMIORAAGgw2Mzc0MjMxODM4MDUiDCa%2B3Br8zUv76SqKCircA5dsyXatGENXkucJvqSmOnfhs5eQSDCbdkJzPbkQO9JeWfYL%2FTdDHKclzBL5P7rPCKb4GG8ll9H52W8hbdzmEWTxFU8qODvtrQ6P2KFJBzgKJX%2F3tmUIT8XU%2B5S%2BLB6yGg%2FZVg3ojgHcUiYS1hkDYf4YK2jqIdw7Fws%2BKJ8PfFRvxHYg5QAX3DaOlXGWnwaax8es%2BlXgkuUB0pEQ9jWPzF3Fmz%2BgFXobdJDzr7CC1DPtnBtpEHyKqASr8ggkAtRFEcu6rUCKeYI8nDccE91GCbq%2BNM3dB1pKx%2F9fcZV9Gia3BH00g9wGj0P912lehAf1GDEnODBrFtQjmb%2FrXOryX92u3zwR3xA9NKQjf920YO9MXt7pXzmaMK5I%2F4fjVkciNROKzP3v4pCvwybheWKvf1LXiJXo%2BKTyPuDIHp2cllOtOnvUTCVI89dYHQhvDbCfOQtBqQNfEuNHq%2FVaNJ3eqMmcCLZ1KddohiqJ3A99TrFKoL7ppC%2F4%2BQ09AgLQ0ctC4AQtGD5DpOpOTdDQAA%2FjZphCxsJRUUy61o2DLeTIA1LQSm23nyr1D4kiFccRFXse6UENvpYlc8uE0b2OrUvO58yiTmUMZzqcsCvD%2BsHlwdyL1Zd6GrFletRLPpomMLPT9c0GOqUBn819Eq%2FE5Rx%2B7%2BzU0MMd5uRLUc2mMDBzrkcFRuNo1%2Fvt7uvaYwbCn3XxC%2B%2FZyeQObEOTzeG%2F5%2BzuJfIUrUQILqHcmvGFOpxIReuSyenW4l%2BDTrOtch%2FNlxqQyP4sxq9t11FWfNicadF%2BTtHPg7InxvzdvbY3PbOiMItFAuyjXmhqlh02j%2BLVozm9I5Nns51VTykxfiON0ju9g9JYH1yaPfZEjEHD&X-Amz-Signature=12ba033e1c5a2243010e1887570c744d2b9f0d1bd8faba78848e2fea28959e3a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TFN43WZL%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T162726Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHAaCXVzLXdlc3QtMiJHMEUCIFTGFZoJfgIpH1hz6GDDIGDOCubSROp7ERMMOzSEz2h%2FAiEAv%2Bya1ZrODqYS%2Fs24JFrtOBbUNFPctwfakm7pm7Pqkg0q%2FwMIORAAGgw2Mzc0MjMxODM4MDUiDCa%2B3Br8zUv76SqKCircA5dsyXatGENXkucJvqSmOnfhs5eQSDCbdkJzPbkQO9JeWfYL%2FTdDHKclzBL5P7rPCKb4GG8ll9H52W8hbdzmEWTxFU8qODvtrQ6P2KFJBzgKJX%2F3tmUIT8XU%2B5S%2BLB6yGg%2FZVg3ojgHcUiYS1hkDYf4YK2jqIdw7Fws%2BKJ8PfFRvxHYg5QAX3DaOlXGWnwaax8es%2BlXgkuUB0pEQ9jWPzF3Fmz%2BgFXobdJDzr7CC1DPtnBtpEHyKqASr8ggkAtRFEcu6rUCKeYI8nDccE91GCbq%2BNM3dB1pKx%2F9fcZV9Gia3BH00g9wGj0P912lehAf1GDEnODBrFtQjmb%2FrXOryX92u3zwR3xA9NKQjf920YO9MXt7pXzmaMK5I%2F4fjVkciNROKzP3v4pCvwybheWKvf1LXiJXo%2BKTyPuDIHp2cllOtOnvUTCVI89dYHQhvDbCfOQtBqQNfEuNHq%2FVaNJ3eqMmcCLZ1KddohiqJ3A99TrFKoL7ppC%2F4%2BQ09AgLQ0ctC4AQtGD5DpOpOTdDQAA%2FjZphCxsJRUUy61o2DLeTIA1LQSm23nyr1D4kiFccRFXse6UENvpYlc8uE0b2OrUvO58yiTmUMZzqcsCvD%2BsHlwdyL1Zd6GrFletRLPpomMLPT9c0GOqUBn819Eq%2FE5Rx%2B7%2BzU0MMd5uRLUc2mMDBzrkcFRuNo1%2Fvt7uvaYwbCn3XxC%2B%2FZyeQObEOTzeG%2F5%2BzuJfIUrUQILqHcmvGFOpxIReuSyenW4l%2BDTrOtch%2FNlxqQyP4sxq9t11FWfNicadF%2BTtHPg7InxvzdvbY3PbOiMItFAuyjXmhqlh02j%2BLVozm9I5Nns51VTykxfiON0ju9g9JYH1yaPfZEjEHD&X-Amz-Signature=9763476a615510ac951bb9ae2371754b4ae675569363fa5d4ca966d74ac7ff2c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664UB2T36S%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T162726Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHAaCXVzLXdlc3QtMiJHMEUCIQD478%2BryCahe6xw%2FWACIHZpH31C%2FUz0ekx16FiujTMBrQIgd%2FAnjJfXOnh%2FZdgkjUwKg8QGE1SNTMFlG3WAkrClIA8q%2FwMIORAAGgw2Mzc0MjMxODM4MDUiDHHKb3NiSg%2B%2BDzLGHSrcAyBORHZyc1S1sTHUR%2B4BNE9zkYT2bb9Nkh1QbahpiYCU8Hg2in1HIyfT9ZOn5ver%2Bx4E%2FcKh0GFt4qLhDQczens4BIFZVFp%2Fw2hSOz879Jviq8y2tOcT2j161sxme5lXXX7XqJcOnvdieRh2CXPEWmOxqVs5WZFVGsAEghkf92kdor88QJpfv1qEpQLdhCKYve4s5zI%2BsK45NXRoW7%2FM6DkFLkLsM1pNpfNeJWogympdoyfyPmZxsJ%2B4XBkaAf9mvR3d0s51A7wmSkE%2BEjeKBVQIhSlJbm3qUeHM8p9Tc2PVomlEdNH%2BUbU8n8zyEgfLk%2FJIW%2BYInfY7IIPa5zG5Q2qQsNDhszTfgPzkL77u%2B4kOcfZ72bb3cnkRtfRuOCVCSX0YQwnn1r44r%2FaA8gfIZ20msViu8jq6pCiV2gaeFaImSWgnJnJ9JhJ4612G00A6kuqcLleAo4c3Uwdvhj%2F5yHXWAOZI4gLj58kXcRKiWgv8Cmd9PwMTSnj7wdMTnJbrORCfkR9oLJqyCpqz9S8S3ZMKz8hnL6oJ3L6Gn5Qv1I5ngcC%2BViGO0LHSPvr3Iw%2BkSCD%2BXpvWQd%2FYyp6FH2pGMnRTZZ3v%2FVlVF5TqAsSpgYiJTH%2F%2BlKZ5MnG1HgrKMJjS9c0GOqUB4uHbsFp%2F4F1cgj7%2B%2F%2BZE5%2FDWUAeCJt87sCcWCr3rGsoN1UluLs5MFVsaumsNC7pB2Mz%2FdCtUADZAJj3UkJxRamJSkiL5mmtYtthRcXp8Z7L6cY4Kn%2BcQQvhJanij%2FC%2Ftz62MgAdebRgvvfQksBylDlrvTYipNWTcF33qIVXOzDa3FbHhuNdWsjmcbOvzcJ4mTs9p9P%2FKS%2FkTYx%2Bak9mUIg4nK%2FxO&X-Amz-Signature=0ba5e03ab1f0b81d1425fd1bea31661ca33e51aa34995a600638ea1eac96da1c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SX6LJWQY%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T162727Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHAaCXVzLXdlc3QtMiJGMEQCICx3yIZWoLHVHPZ4N%2FE%2BV%2B7%2BJdYxad02SSodYllhtBe9AiBF4PIglX4I%2BxYI429%2FMpW1Tmh1frmvKq8RpocSI9Z7syr%2FAwg5EAAaDDYzNzQyMzE4MzgwNSIM16HexpIFRHaRMfVIKtwDT2P6gCvNZ9PuZkqOFRZpz13I%2FQU4Y4%2FPtk4PlWRyJAQ8lu9L%2FixYzONG55UeLKrlgbr2jv%2BTjJVZu%2BtDx3KfleRinE2P5%2B4VmU3%2FY0Dzs0vVnE9taFQjmK5va5snWsooLxpJxMtlwBgIHaWI7gYbs5IzoOv3Thg6%2FGAe3TilyS1wxbX6ASljIypQP4%2Btj8I2Kpj7q9F0G%2FtadBE1bZj1Or08wqGfeWPvDe3cOmDxIMufXAGKpN6vVUdyWJqZYtzzS9sswrv6pOkxDKQtvGJTZ7P9YCdnCbb5XcMciGz%2FkaI5P1VTUdcKI%2BnED6lLsWJd2RWBr%2FzruYPHmxyFDhllBFgYCm1QpH9N9kBIh2q1VoZ62wCfRTwnMtaVBtYfCPJm1%2Fcwr62KGPaU2uJGkcWHjTh9bHePHnGbjwircoK1Pwob0zMTrbzkEnfvEE9UIf7NJGeT3JcxFSm0%2F5OLxRSUki%2Bv%2FIARQ53ivwWTqlucFEnt1gZtWzEAOqAxoAlJtNXGOxkudMBSqsnCOSsI%2Bz409e4aRfFPgrILjvDZrTwNGcJvdWrxNRHmRANEAcv%2B1%2FYKDhRWL2%2Bhfk%2BvKa2brp7Mo27c1jjoDwAws5V5fbnlQDLvHpr4DCFedDD9bdMw%2FdL1zQY6pgEAmtPB5FcWrTW%2FeGb10TiVeqL%2BMkEDgZDfEP8eK%2B6Scd1h4XiwyLdy3ZcmXdBKEuYfkvwcRAzfFv5aMtLIVjSkaUiDIOWzosYss7Tz8e%2BPfu7HhGs8GHVe29mpIQOL9890RX4cL%2BSV%2FoEPa%2B5Q817cQMd0ligZaM3TA%2FY6QFw8ROfjy2iczolDCslT5M7NV7%2FwCjsmQTDwsvDXIm4QdFLyEOVCA9Ba&X-Amz-Signature=b319becc3a7692dbd182e494b03732668d9f979add84ebb19825bba4565e58d4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663FPH3H55%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T162727Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHAaCXVzLXdlc3QtMiJIMEYCIQCI9VXmPSKc0vDdtto5Z7M07LbyjJhpJ2CeuGEk8IaL3AIhAN56neJPR37ewJUH%2FkgKIVlweFZHX%2FzforBEpg35gQAHKv8DCDkQABoMNjM3NDIzMTgzODA1IgxbublEdxf%2BE9EX8VYq3AOa2DcXHASrtddA12ZET4Ykb2laSJX3DNk7%2BhYLXHM4EKCiQiE2%2BgzLNTtKW6K0W3hGQKG91J3eBjGDkgZGZ%2BkKc4eZKLL9qqGloLaXH5ZtvdPTx2t8qebm5mjLp%2BvJe%2B0Z51tGpI%2B81uJVtvSXmaBNrMV3v%2Ft%2Bi1u2Obrn6BMfjcfgMplVqb5lrognOtICv3fyGkY1l1s1VvTmZfHthW3byUwECAwOhbgbG81yPBDhuR%2FBh2m2Nwvv3DS0HIsFPacHOb76zb6YqyxUQdHcqClJdiAp%2FiolM7WYN%2B03aXQhJ%2F%2BYPdk9aC9DkCy3IHGAR1dgEogOZ%2BBK9fzFxcAKyMvTZk%2FuVn%2F89jlKUJ7V02q5VY8dGRIHVdYnPkPui0Va4LG5o4nB2BFI04%2FN7%2BDE4jbNBLPX9q4Q2q%2FIrPk9OX6iwJpSisjAQ%2BFuyzbOnOh0nsLs1rBy64Ji3V9rxKPy4AGguVTt0cV2nL4KPHHWCr4JWoVRLzXSt05sWQx2D4OD58RMJJb2AVDHFihw2mQTUKUPn5vUWnAMX4K9017OK5kdzsKGJ0Prmvi9zKkUCg1gJ3n56sHoiEdDTX%2BiZsAoRHgAI7PACXcf44EU%2FyrqWGsu5IwW07nOfldT4dyl9TCq0vXNBjqkAUi4Vvnji9Ji%2FxZggfcGSyZKpfhN0z%2Fbl59cQa7FDUnc9XBTZTCcYZSRrIiuJpcSa%2FIhjxMKd9I9aPtStKk1QU%2B5aQiRzyG5%2Byr5h%2F%2F8aMjGhYJtSlmW7wB4rHlLObYsi5NzbN2EWUYPnuqOWZ0qzPGYwTcXUOTfTe3Xt5bt9LYBrGzqVtgL9KSoMXyWGpukG9Y6BhVaybesre3I6Qv%2B9vyc5b3v&X-Amz-Signature=baa8baec5843409f7b610ea3796cf875c31ea1451b016768db0e52e015fb2e69&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UXNGGZIH%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T162728Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHAaCXVzLXdlc3QtMiJHMEUCIB5utVCBgblNHHmjovuJQk%2FsloZ4xq6BISSxa5jQrrTaAiEA0J%2BgFzTFa8H5GdqCk0zByltB40JiIfarfh6Jao3fnGQq%2FwMIORAAGgw2Mzc0MjMxODM4MDUiDHDbE2z%2BJiAxy52%2F2SrcAwc0sOpne9NfY2j8zN9dsg9zMM%2FtPL6xQJxjFuUeATXGDSnElMTjc3%2FNL%2FxM0fclRWhrS4E36JYSE0aew9OFTpLBpKYe47UkW3Fr08Mi05Zx4T%2FVe4xMvnkBL8BoLKwJgHb%2FtLnABA225jXuZUTYu5tSbdh3nQyvZE%2FK%2Bq9YDqYgJRFlIp3UekM9O5O2ytq8aOs6%2BNME21K0oYZWQDljh1N9G0s%2Bvl04IllwyV8QLsKzOEu8XqrdmB%2B9859szlKLILDmJX%2Bsx1BbKxpntj0D19retre5ItVtdph6V8UzkbQ3sP6BXdboU%2BK3fjbcNOKWmuY9ZGkvD5CPWB0hzBfd6lSPRUH9Loe4Ox5owzmwDOQhroDe%2BviSlBQMifUdlMvmj0UY%2Bp516yjbwj4wzqzsnDEHCWOpz%2FfQ1Dj%2Fq6tHN1ywN0kWlmPPQ8D0v8lqpSucuqnJP8UV3t%2B%2B6TlcuPwUgbpn3LMpD49on%2Fr6WvdmgLt%2BBDaMDp8bWDB42Z8kRIU2TY8B7vz3PQcFE7Amn9HXTiaOJqLg8M3kyKlqm9JZcm0sWs5UjuA6NTy0%2FNZPs%2FqdVtbKVY2JeX9BF8htvh5kkqsLhV3LHdxq09iYLFbtJx%2F8eyeTQ0hutDOYyGn9MLvS9c0GOqUBblJyuAhS9ax01O2bddMEzOLNbBRT6rkftKp%2FDxqrzTuP%2FlL2NsbDvFCzGPPe2ipHwzFZzsV2PvuHd3xgzfsWsIQR4gWSwq2YxAAP3jVAQqMrWC7QhetoF0fefoShv5iNUydOWAImuODWLe0gh42g4OyysNMK78arTqZFIUuExt95QJDRlcIyq3y0T%2FfsxnhVOQ%2BEqLGbfZVhWnG099eO6Njk6I%2Be&X-Amz-Signature=8457cae8e8649c009b26d148c08d8573bfe8c74c16df00e1031c4e9ac53d0bda&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UXNGGZIH%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T162728Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHAaCXVzLXdlc3QtMiJHMEUCIB5utVCBgblNHHmjovuJQk%2FsloZ4xq6BISSxa5jQrrTaAiEA0J%2BgFzTFa8H5GdqCk0zByltB40JiIfarfh6Jao3fnGQq%2FwMIORAAGgw2Mzc0MjMxODM4MDUiDHDbE2z%2BJiAxy52%2F2SrcAwc0sOpne9NfY2j8zN9dsg9zMM%2FtPL6xQJxjFuUeATXGDSnElMTjc3%2FNL%2FxM0fclRWhrS4E36JYSE0aew9OFTpLBpKYe47UkW3Fr08Mi05Zx4T%2FVe4xMvnkBL8BoLKwJgHb%2FtLnABA225jXuZUTYu5tSbdh3nQyvZE%2FK%2Bq9YDqYgJRFlIp3UekM9O5O2ytq8aOs6%2BNME21K0oYZWQDljh1N9G0s%2Bvl04IllwyV8QLsKzOEu8XqrdmB%2B9859szlKLILDmJX%2Bsx1BbKxpntj0D19retre5ItVtdph6V8UzkbQ3sP6BXdboU%2BK3fjbcNOKWmuY9ZGkvD5CPWB0hzBfd6lSPRUH9Loe4Ox5owzmwDOQhroDe%2BviSlBQMifUdlMvmj0UY%2Bp516yjbwj4wzqzsnDEHCWOpz%2FfQ1Dj%2Fq6tHN1ywN0kWlmPPQ8D0v8lqpSucuqnJP8UV3t%2B%2B6TlcuPwUgbpn3LMpD49on%2Fr6WvdmgLt%2BBDaMDp8bWDB42Z8kRIU2TY8B7vz3PQcFE7Amn9HXTiaOJqLg8M3kyKlqm9JZcm0sWs5UjuA6NTy0%2FNZPs%2FqdVtbKVY2JeX9BF8htvh5kkqsLhV3LHdxq09iYLFbtJx%2F8eyeTQ0hutDOYyGn9MLvS9c0GOqUBblJyuAhS9ax01O2bddMEzOLNbBRT6rkftKp%2FDxqrzTuP%2FlL2NsbDvFCzGPPe2ipHwzFZzsV2PvuHd3xgzfsWsIQR4gWSwq2YxAAP3jVAQqMrWC7QhetoF0fefoShv5iNUydOWAImuODWLe0gh42g4OyysNMK78arTqZFIUuExt95QJDRlcIyq3y0T%2FfsxnhVOQ%2BEqLGbfZVhWnG099eO6Njk6I%2Be&X-Amz-Signature=8a774f1b2a3ba4b8a577e30237e5ffd21b28a546e28384b21263dbc3833ef22a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667UJTDE2M%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T162718Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHAaCXVzLXdlc3QtMiJGMEQCIGJBOXTj9bL196%2BxrK7nTkbhhlPfv%2B%2B34FgMq9NzSzuNAiBUPa0VGMczNTIvmrIiC2IEyDKOBKCawXsz2KUDN1DmwSr%2FAwg5EAAaDDYzNzQyMzE4MzgwNSIM2v4yQnnU%2BZLfFWwLKtwDAVKyYc0X10vyHje6CvKf0Xhu4DrCRLODjV3OU7GCayd37XtgQ1I26794Jt17YBRNtmmtDr%2BS1eJjM6gRhYV7KQth0yByVVkvDvlWPHTK2%2BzpPbls8yzAZrhTLtaF9xYNdzC%2BsgzuGMb%2FKJyidyW%2BSJSjbqZ%2Bu%2FFkbaMYC%2BBSSlLJeYUOJpjvobEXa4aIxg9Nzh34ENnPtV2%2BDaSMx3%2BZg0BRNMek2resoxlu%2BwZU3wPMjkxJ8EAWx27UYZMdSqmNYINxQlwVzXRqbYzAq33ue7DhggaBLGCh6tfba%2BZLDMIrXWUeSoTVsojFkvFl%2F8fcZcCmNVpHNNYR%2B%2FIwOTWmbKWIOQpkZ%2F3IO7HEflFCyDnY%2BSImhYCu0%2BzYykXDuy1K7AHoyTY0OYv2o%2FI5kCSsMkdiRu9pFtlQTMcMcaSSIIMgDrfXMPVqsRpJ2WiLItfEc6r8l7nIRtkjRqolFW9ZSH3avTUAygEWC95hhEc%2FTEuuwcOHc38Hn4q3mrwSdLp9WwoK7z7pTsVmn%2B%2BoEBwRXC7OQ9cee4QqgIRo5IiZgUveKtKjbf5Lhuo7l8pCpgGePEdZ%2BWnSOwXDo1kyBUngpTvKnk6%2Fga1Xk62Aq%2F13hCB06R6Cx9XvVLbLTW8whdP1zQY6pgFxdTyOsjgg52g69WWFQnwDAGNQkwLQOHJD2wcxPs9ur965kcwoaamrxvKfNYe21go8%2B1jRmCxfPZdELgQ0eDClt5h6yTuuRCpnHKGIjMuDhJn0KNUFrfvQoHfpn3Yk1Cx%2BK2421%2FtZxi3iLMhtAe4OPZrrWrU8MyDWzGMTh08jKWUUZNn7wKYyh05c5G5zCqNmnw6hJsCtA6H883sQvrk%2BNbmebslP&X-Amz-Signature=9c60f7f564789f51f790a8823e82fb88794918fca2477c5cebaad7ce343bbdf3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664JCMWUPY%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T162730Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHAaCXVzLXdlc3QtMiJHMEUCIQDIfmoCpSB1loxtm47o9vFvFjBMX8pU6qP48xoNma8k7AIgDuw%2BX%2FuhwIPEZe3GQx0OkFbtyPQlAEA7pdpHgmLvUOsq%2FwMIORAAGgw2Mzc0MjMxODM4MDUiDGFNThnRbRbsUiLFuSrcAyN3Iw7t1KaTuKssUbbU7P605gyrxG9Aofk2Kbud3%2BPx3K39lA%2FXVGsUI%2BC4yOyPqTG3%2FiAfQe2jPzgKDK82FD6XO7CpkIjJ%2FeqlBgyrcW8ODGxB%2FsdVYVRaD9xk6Os1LYQgmD0tsvZbSz2JfLS%2Bheiw6%2B8VbkMCKeJtVTWQMfsSfo9%2B%2Fxg8FV5Ctq8fLOob9RNF8xiS5l2EWqQHuUuu2r8izGIW72rM91bnllrfMos6ui0bOywf15mZGPxEnLvnYidIaSJRSKEQMvbaIv%2BnUovPTOijaSk5IGGgap5cQ%2BxHCdadcDFROjPbtAdLrYoGvQseRYkr5C0B%2B2HpdbCDp2F02dlsc8EOwPjo%2Bd5O2XBJI4hBUhbP8M4hFkZi16b%2BM8HwnImRnsL60Kk02Ma0QraEaENSHvK8FG42V1TMP%2FgHaM2Ar4%2Bk4uGBUe1FeEZHAOdmi3shXlc7OBtOGZ9XLZyv905Y1qX96nVOR6yIHQvo%2FlgxHmMNcO23%2FmgQVkg7I9byYX9D9UGZgArw1ltNlz68dAWsvHXlKPLc9Rm56HMclwEo5SWL%2FdFrE%2F6I1Go9I3apRYSs7CIyK6xq6k2LK%2FopAQBShGk96CwRMg0w8uvIQEsLMWYOhFzkqtcMMNrS9c0GOqUBsGztxJeWllcW0OMmQmg38rxGgvpS8aVslv8tFbw7GEJNkxiJgli6ziOWdWVUtBRYrzG6KupdN1KOFMryA4VDV9y1YTTl7SA%2BMjUGAA4zFgfHYj5G12isjgZ3TuswdMX0%2FJng9mCiPAxq9CcAUkcCzAzG4Yed%2BY9h2qY0DS%2BKuZ%2BXWpqD8z4CWBHHeFAPZg5M0tGMN%2BryjzAwtWD297jyJYdkNBzu&X-Amz-Signature=c36b558f8f9aa8b4529302dc2597bd9a5a40395ed4aaea55a2560123174d13f5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664JCMWUPY%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T162730Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHAaCXVzLXdlc3QtMiJHMEUCIQDIfmoCpSB1loxtm47o9vFvFjBMX8pU6qP48xoNma8k7AIgDuw%2BX%2FuhwIPEZe3GQx0OkFbtyPQlAEA7pdpHgmLvUOsq%2FwMIORAAGgw2Mzc0MjMxODM4MDUiDGFNThnRbRbsUiLFuSrcAyN3Iw7t1KaTuKssUbbU7P605gyrxG9Aofk2Kbud3%2BPx3K39lA%2FXVGsUI%2BC4yOyPqTG3%2FiAfQe2jPzgKDK82FD6XO7CpkIjJ%2FeqlBgyrcW8ODGxB%2FsdVYVRaD9xk6Os1LYQgmD0tsvZbSz2JfLS%2Bheiw6%2B8VbkMCKeJtVTWQMfsSfo9%2B%2Fxg8FV5Ctq8fLOob9RNF8xiS5l2EWqQHuUuu2r8izGIW72rM91bnllrfMos6ui0bOywf15mZGPxEnLvnYidIaSJRSKEQMvbaIv%2BnUovPTOijaSk5IGGgap5cQ%2BxHCdadcDFROjPbtAdLrYoGvQseRYkr5C0B%2B2HpdbCDp2F02dlsc8EOwPjo%2Bd5O2XBJI4hBUhbP8M4hFkZi16b%2BM8HwnImRnsL60Kk02Ma0QraEaENSHvK8FG42V1TMP%2FgHaM2Ar4%2Bk4uGBUe1FeEZHAOdmi3shXlc7OBtOGZ9XLZyv905Y1qX96nVOR6yIHQvo%2FlgxHmMNcO23%2FmgQVkg7I9byYX9D9UGZgArw1ltNlz68dAWsvHXlKPLc9Rm56HMclwEo5SWL%2FdFrE%2F6I1Go9I3apRYSs7CIyK6xq6k2LK%2FopAQBShGk96CwRMg0w8uvIQEsLMWYOhFzkqtcMMNrS9c0GOqUBsGztxJeWllcW0OMmQmg38rxGgvpS8aVslv8tFbw7GEJNkxiJgli6ziOWdWVUtBRYrzG6KupdN1KOFMryA4VDV9y1YTTl7SA%2BMjUGAA4zFgfHYj5G12isjgZ3TuswdMX0%2FJng9mCiPAxq9CcAUkcCzAzG4Yed%2BY9h2qY0DS%2BKuZ%2BXWpqD8z4CWBHHeFAPZg5M0tGMN%2BryjzAwtWD297jyJYdkNBzu&X-Amz-Signature=c36b558f8f9aa8b4529302dc2597bd9a5a40395ed4aaea55a2560123174d13f5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YCVMXE72%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T162730Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHAaCXVzLXdlc3QtMiJHMEUCIQDoqUUVsOMXUoRgSRLQM%2BsfpkqWYk%2BZaYhFKsSw%2F%2B4j0gIgOPrq9UFU4WI7MQ48lPaakoW7tZg9DUcNXfUFy55kOPoq%2FwMIORAAGgw2Mzc0MjMxODM4MDUiDMOWxksIuBxDWtpgMircA3bGdfmypcvcbgp0ptlu0DHjNDHVoYWcjppzmeAeYACuNX0vRe3HZPfZdyFzgBeBkVC6Rg%2FGDWOsg1CyQbpktIF2%2FnPA3Bqzj17Xf1qNX09Pia0%2BX2CkscjCe69t4v%2B2jc0NjnyQ0PaQ3njXh7zJ5wq7x3Mxu3Hry6WO7RlsrVwYnjCKrR63uVb0Z%2F6xLEO1MowcLam4UGom%2BULZ7%2B53dXfT8Z2nG5sRa9bbDYaD59Yp5ITel6dS%2FEga9qFUbK1qDyWdDKIPG0L2iqhWeJg7%2BVq4oXIKJq4sfEXhkTXofsvBwRjFFr0Tmovew2yygx6k7H3BDtYZZlfK8VUnnT0p7rhJ%2F9MuTFWXkSYbecWxE16I9aARaENEOYoz%2Fn7osTnBoO7sn%2FVOk0NqQvOVGBxW8bMHeXU%2BKmmLhEGHA9rQ55lrFFx1umIyYKTMbibj0eF6YKY5Ijy2%2B2IHSjuzZkdF0sCPiE3ayafelqCs%2FKTXLyv4hU8uPxFdRl1ArLojC4iVe8sqgX65FG7Qg6E%2FNgPsgyOqP1RbtUdHoHteDo3OLcuqTHD1blQxE2qZpdaVlNFSpNSChVKhb7PddpoePw6OwUWYT3xuHpRWvRlgZP1NSQs2SockQmkYfjuB8KgUMJTS9c0GOqUBTf6U5%2BYmaUOMCDrkDIW8iow1rGCzs6%2FGEZaQ6YqQ6d7phdjLNDo6e%2B%2FLtZFzhWRxsP%2BSZIncHfK8KGzXi4Ak5n8XFM3gtTtopmvbm4fFr6cusBMx2paLXQs99jlTA0lyytV9jr3bRQPjPaT6ihJ1HqzNJq5YWG2HRMWqOlEGmCCJU9buOg3zl9pEjtRmwT%2BASJu1tUslwnM0xaW0neF4eUqjyWj4&X-Amz-Signature=28637a21b8c39b1f92f9380ca4f76a7a746560d5b26b7896627bec8f6d44f8ba&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

