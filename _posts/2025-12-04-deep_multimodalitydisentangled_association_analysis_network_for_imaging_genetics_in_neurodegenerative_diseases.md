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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662WRMHPMI%2F20260206%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260206T122646Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHwaCXVzLXdlc3QtMiJGMEQCIEo3nT6yUFoyRqAx%2BN8MfG9D1EewIMwTDce2n%2BZBMXSvAiAUWbnV7YgMwSiKRntknmGvODjYKTzi6rcPlx5EXadumCr%2FAwhFEAAaDDYzNzQyMzE4MzgwNSIMwa%2B3wY5sgMCoIfvyKtwD4rCBWtellu9i8%2Fp0LBrA7X3ty0abzZVk4%2B6Xdi%2F8sFIn1yY8b5EkTinBuEr8Z%2B3ZETxjLgSMcGsrbXyWbjjfmzzHAkhoobp9%2BFSAy1ZE1GCFdoVK2Ks8XO4%2BjGK8N5GyKIfW%2BZajQD7M49%2Fhr1eQ1eZ5oQKJ0l%2B%2B0BvW%2BY6VGrmF7PemPFembN%2B%2F3euFEYY%2FEGdovx39%2FLX%2FvL8yCmf6%2FWg6%2B5XMWn2D0fN%2Bc1%2BefUYywbcIVOLd%2Bdi29W2%2F7uNOOSlnDfBSL2zd3BWg5FcUkK4YMQKoR1QX%2Fsch3G8UEVT84Mll4yXJoY4X%2BlN10Yr36zghJ0Be14gnJ99cIqa2Sp%2BYI58ab8ETS%2FMsU1NdYJ%2BVGLqjOeLdD8TEdik02SginqlqRKy%2FZCkHFV6%2BNMm%2BcaHZs59MYeqUnwh9mqtIiGUtg%2B0lI8OqHkRWDWol7My8GfsHu2mAp6MPX9xrNGKjBRfBd%2B%2F66e8qRV5je7ptg2%2BmIwTuBQYM%2BdxA%2Fctu%2BKL06Jyc9Rg6SemQr4wJ57Aspl03vvIlC4M2H2Gs%2FskRp9laxQyaqOYsEsw1FGfW5K1WW5FlUUJ%2BUEere2%2BHTk41OwC3ZPzWeNXKK4SziYsrP0n4stZ8F4IMMKawIZAww6eXzAY6pgGvtavGdVhSPguoDe79WWNGnKslBUAXWBOL6ZjXUIF8kkcA7lmm%2BfEuaiJtjw7h1WVVLl4zX66%2B6fPhKBD0fBNiBZaIqYYyebCxzjtkRNTxxCeORRhEKCXn1i%2FePt1NHpG7By3LZmBLcarZAyeGJuhSIxPgUn6YvxONaRoSqno2A2p%2BRFtWkMVv%2BoqXRbtJTr%2Bj9J7qVIPJAQJxHnsFSK6ULcOCNtpN&X-Amz-Signature=1086ccd46bd1d70eaee3f115dca142b854e26da0f2a24a261d6703597e602761&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662WRMHPMI%2F20260206%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260206T122646Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHwaCXVzLXdlc3QtMiJGMEQCIEo3nT6yUFoyRqAx%2BN8MfG9D1EewIMwTDce2n%2BZBMXSvAiAUWbnV7YgMwSiKRntknmGvODjYKTzi6rcPlx5EXadumCr%2FAwhFEAAaDDYzNzQyMzE4MzgwNSIMwa%2B3wY5sgMCoIfvyKtwD4rCBWtellu9i8%2Fp0LBrA7X3ty0abzZVk4%2B6Xdi%2F8sFIn1yY8b5EkTinBuEr8Z%2B3ZETxjLgSMcGsrbXyWbjjfmzzHAkhoobp9%2BFSAy1ZE1GCFdoVK2Ks8XO4%2BjGK8N5GyKIfW%2BZajQD7M49%2Fhr1eQ1eZ5oQKJ0l%2B%2B0BvW%2BY6VGrmF7PemPFembN%2B%2F3euFEYY%2FEGdovx39%2FLX%2FvL8yCmf6%2FWg6%2B5XMWn2D0fN%2Bc1%2BefUYywbcIVOLd%2Bdi29W2%2F7uNOOSlnDfBSL2zd3BWg5FcUkK4YMQKoR1QX%2Fsch3G8UEVT84Mll4yXJoY4X%2BlN10Yr36zghJ0Be14gnJ99cIqa2Sp%2BYI58ab8ETS%2FMsU1NdYJ%2BVGLqjOeLdD8TEdik02SginqlqRKy%2FZCkHFV6%2BNMm%2BcaHZs59MYeqUnwh9mqtIiGUtg%2B0lI8OqHkRWDWol7My8GfsHu2mAp6MPX9xrNGKjBRfBd%2B%2F66e8qRV5je7ptg2%2BmIwTuBQYM%2BdxA%2Fctu%2BKL06Jyc9Rg6SemQr4wJ57Aspl03vvIlC4M2H2Gs%2FskRp9laxQyaqOYsEsw1FGfW5K1WW5FlUUJ%2BUEere2%2BHTk41OwC3ZPzWeNXKK4SziYsrP0n4stZ8F4IMMKawIZAww6eXzAY6pgGvtavGdVhSPguoDe79WWNGnKslBUAXWBOL6ZjXUIF8kkcA7lmm%2BfEuaiJtjw7h1WVVLl4zX66%2B6fPhKBD0fBNiBZaIqYYyebCxzjtkRNTxxCeORRhEKCXn1i%2FePt1NHpG7By3LZmBLcarZAyeGJuhSIxPgUn6YvxONaRoSqno2A2p%2BRFtWkMVv%2BoqXRbtJTr%2Bj9J7qVIPJAQJxHnsFSK6ULcOCNtpN&X-Amz-Signature=1086ccd46bd1d70eaee3f115dca142b854e26da0f2a24a261d6703597e602761&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TNN5LG45%2F20260206%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260206T122646Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHwaCXVzLXdlc3QtMiJIMEYCIQDp528znH%2ByjIOomiAg3sUbfMfpWZdcCXAt%2BOlXaywfOgIhAPwLEF%2FVPbtES%2BcW%2B7jeRKJBye6ym2LOQqf22RbfYJyuKv8DCEUQABoMNjM3NDIzMTgzODA1IgzEXttnn99UPq%2BPJn0q3AOgGlU39%2BbDKdfm8dRNdE1GVEuZXMWwCSSflJwtctEAR19wWWgmAz2P2okyVFj2dYyBexqDUNdJo%2Bve%2F8%2FpnDYfixQg9Pc873KWIFodXSfR4GcnjPxKbAfhChU5nwWCW%2FJSXeadTKyNFLeLjXkMt2RTbK8d9eLdS8MTHx%2B1SHIJ0EAhknVnOj9eCsVBMW8SamQ5hwVSQnQfscQNUniscoJ22JATruAVLdpxribidK9ApWYfnJ4odYnO2IcWZDgtXmIyXbEPG8SMrTgaD4aYh4JbtkDUf5D74OhlMpaUATrck1OKdOf0KS949%2BG%2B5%2BKidM7pCe9ttb4AoBDxn%2FFpRWSuDRmmQGozCY5fu70Gh2L6bYoll0rSHrigUMr2OFf8z6Vsx8w5rjEnh%2F%2FtbbQH0MA6EXaqhmEL084%2BYwXVOAcWP%2F6AeC6bh0L33Togrc%2FPR9p%2BcCQzvvrCqOdqsiQoCrFcC8uKjRr72VU4FHgZM9RBlEDEpmcRhG4MvLK%2FCLpYWdtYBsBhZ0ocVE4zeHcGANikgqRogpYooC33BZ0Xds%2FJJLdQtEJ0%2Bj%2FiGceVvCAyocbFZiKLNKJCoCGUR1Zg5%2FiqrXmAuH72xbVh%2FqlHftgR9RYf2gWUakv3lREmTDCGqJfMBjqkAS11tCLpZO2PU%2BxUx20mlOGj9Rl5rTlzKZ2R3Vtg%2FjECgycutR%2BE%2FiaPP8IOQy96msp%2BQyoYkIwLnHFNnI6ojSSxpRbPWU22q9mRVyEY%2BWxRm%2FpwXr0F4LPvMwGuYUjM%2BmUvAuGFkybX5xB9%2FSJifXQcknje5gxrSXdOYZDC%2FfS0QTLQxGj0u0%2FLM%2BUD1E0vguPIcBMqgGAMA9Zhn%2BfMAm%2FMSC1u&X-Amz-Signature=dc5cc62267105befedbbdc172281310db16bc5998fb9a4d0c144a395487ea3dd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667QDOJWBV%2F20260206%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260206T122650Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHwaCXVzLXdlc3QtMiJHMEUCIQC%2FZz%2BNalrxdPkaUxp5HPabhJwYCpZjr8gXWH9kIPZfLgIgcMqwUoMTfEuSk%2B%2Bwch3JUxyw1yd%2FC3RHQk9Nl%2BAD%2FFIq%2FwMIRRAAGgw2Mzc0MjMxODM4MDUiDJWnZxC0flFRXYJ8FyrcA34zEPu2a8w7A0Enp5tmX6uOeEtx0h5QlmcxWZpUc%2FFUxfDI%2B4zavGOvlEYzHYEstxJu6Z2YfQzfOXxQZ9n7JOUEceFUyoOdkFxaPGEAFbHQR2YcuqLK%2FiNvOwbgyCEGj%2BM6tnzNv3k5rZAimwnDIJvhuId7sk9u3h7ltXGJMOGTCJrqC2A9l2Bc5cVBhNkj64lw%2Fzjb7yT6BJRN3F20GwCilzFSNCYIlWp6S8TxKYWwxwCgxy%2BFL%2BIusbH00ND5gUDZNtBxHMeFLQygUBQBYXcTmmnnRLDn3a%2Fovrw%2Fxh7AM749G2Leo85JBxquwqf7yhdk7hFlg4qc4jO9BOTxmLUZZppyZcym6NFryWbyVB%2F%2BnqyE0gCH53htRvQ%2FdxUn5NnE%2BH02F86x4goCzzK0SZNGf3c8wfOXq%2BTqR6Q7bIR3EzUJNJnWUSxM1boqyyLZlmOp%2BDf3UZ9ufFD%2BuwpmNzOMB52CdlcHCK8rnX8%2FtgJDeIywr2TLl3vgrlmPocb5coYLshEql9cGXc3DFUTAgI3mFqFUF6SZqLbvK11ho%2FVx7ZX5Vep62iLrv%2Fp5ww6YZqFYBZsT1s9fJ75AbfoIYkhGLyjoUr5G4FathwRrwnnDL9Q86SE0erYygouOMIiol8wGOqUB451C9KyX91gRBAMEo1AEiS%2BM19eUCtr6pSm7a8zu6wEK6F14k%2FGZHpHyRODNid%2FyqjOx1zZvv%2FrkBH21dWWZj42e2qSO%2BvIfAipck%2BiY50VTHSoHFXvdGcUS3yC2sJtetAJ3L%2B5q0Vl99mqd2k1wbZ19W5ASPrDImW41K4pcmG9%2BTe1vbG2f2BtHz36ATqbOg0T9xkWUftSbtoUE0t5xF2nKo00Z&X-Amz-Signature=69307f2b6966143c3d8fe44c5e067aa1dcd24822d7d5b7f5eb514bf700337ed9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667QDOJWBV%2F20260206%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260206T122650Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHwaCXVzLXdlc3QtMiJHMEUCIQC%2FZz%2BNalrxdPkaUxp5HPabhJwYCpZjr8gXWH9kIPZfLgIgcMqwUoMTfEuSk%2B%2Bwch3JUxyw1yd%2FC3RHQk9Nl%2BAD%2FFIq%2FwMIRRAAGgw2Mzc0MjMxODM4MDUiDJWnZxC0flFRXYJ8FyrcA34zEPu2a8w7A0Enp5tmX6uOeEtx0h5QlmcxWZpUc%2FFUxfDI%2B4zavGOvlEYzHYEstxJu6Z2YfQzfOXxQZ9n7JOUEceFUyoOdkFxaPGEAFbHQR2YcuqLK%2FiNvOwbgyCEGj%2BM6tnzNv3k5rZAimwnDIJvhuId7sk9u3h7ltXGJMOGTCJrqC2A9l2Bc5cVBhNkj64lw%2Fzjb7yT6BJRN3F20GwCilzFSNCYIlWp6S8TxKYWwxwCgxy%2BFL%2BIusbH00ND5gUDZNtBxHMeFLQygUBQBYXcTmmnnRLDn3a%2Fovrw%2Fxh7AM749G2Leo85JBxquwqf7yhdk7hFlg4qc4jO9BOTxmLUZZppyZcym6NFryWbyVB%2F%2BnqyE0gCH53htRvQ%2FdxUn5NnE%2BH02F86x4goCzzK0SZNGf3c8wfOXq%2BTqR6Q7bIR3EzUJNJnWUSxM1boqyyLZlmOp%2BDf3UZ9ufFD%2BuwpmNzOMB52CdlcHCK8rnX8%2FtgJDeIywr2TLl3vgrlmPocb5coYLshEql9cGXc3DFUTAgI3mFqFUF6SZqLbvK11ho%2FVx7ZX5Vep62iLrv%2Fp5ww6YZqFYBZsT1s9fJ75AbfoIYkhGLyjoUr5G4FathwRrwnnDL9Q86SE0erYygouOMIiol8wGOqUB451C9KyX91gRBAMEo1AEiS%2BM19eUCtr6pSm7a8zu6wEK6F14k%2FGZHpHyRODNid%2FyqjOx1zZvv%2FrkBH21dWWZj42e2qSO%2BvIfAipck%2BiY50VTHSoHFXvdGcUS3yC2sJtetAJ3L%2B5q0Vl99mqd2k1wbZ19W5ASPrDImW41K4pcmG9%2BTe1vbG2f2BtHz36ATqbOg0T9xkWUftSbtoUE0t5xF2nKo00Z&X-Amz-Signature=4acfc77e8199b3c911e186e435aff7b50c6bf519538aa63404e1847d91ca52e4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QSOYGRYF%2F20260206%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260206T122650Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHwaCXVzLXdlc3QtMiJHMEUCIQC9Q%2BfKsunhfJ5ZIEgs%2B1p9BQDs0BVNm4NyiDfhiq597AIgQSeL%2F0oV7tj0MTHmItT2NHrtF%2F%2Fvttu6ouMVuen6uSEq%2FwMIRRAAGgw2Mzc0MjMxODM4MDUiDDBxPLXyc%2FR1ci0rbCrcA628JJ%2FiwVPxH2Pcqt6qlkxj7CvFjqy5OuHGvG8YNvOufcsg9ok%2F6qi7CfKlux1FBUIB4du19lxkF8A%2Br4meZ2rfTVJYjwqmlPC2lw8GtUjMnaTECKkFj01SDWGntcACVg49h8eiZ9upipaAAxJa2aazMIJyQCFTjv5XdHSt4%2Ff5fvw%2Bif2GcZD%2FspDzm6OCY3iovOh4hbdGJLidFz%2BtHzcESpDq7OiPY%2FdVVKrnyqeaXvttJFSaFRbPgcEDiaaNvVbRXcLbzR2ntE%2BQEeo%2BancAALWb7kRPM2IGFs%2BUTGoxyyhfNt4CwNsD7%2FI16XeoBQJgfvQpFCIz%2FQhOAzn7inLf6PO9z%2FjnGLGQX8r0CaaazDOkysEM2JJtfk%2BDcHUAqfQ%2F6dSabkg2b05ICGMi5JDmkcjhnZwLCSqPtVxuxUbR7to%2F2xuPUhAgp7%2B8Zs9GRcAJYKT2HmeYGREkRchZQwCxaOy5dopTCDWZ1GxCSBcK951fJF3rMmrmpcyQTfWUUazK3YPVRqPAQu5U6aPniXZtpjrQCmd3K%2BUG%2BI5JJjbNfZxF32VIDJjlq0W1e0RgIW%2BsRadHV0fG4NiizxwoFc0E0BEx58KM2jS3%2Ft%2Bqhon2y8SpX36bMHbC8a6EMMunl8wGOqUBSsNegkwkTXzyQTju42dcHTICvq8PbCYa9ipx3uI3UcT5Pvg69lJ5AkirlFgomRN16Mi8dNGpdVJbyIOEEs7BCIJBH84rqiXs1ei0OpF8463MRoOhhR2x0RikbJvkC3NeE57VBtdsluSBlUnTygx9VhyFocoqGLcWxZ4kiuUjBEuAlk6yGWRrHuCGySmqHag74xqcrRUagXpk4vB47WeLQuoejoMP&X-Amz-Signature=88c3a918fd9f0d8983ad61b270d7b03452a25f61bd3f7a0367590a0ed5f90631&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UKXRJUAU%2F20260206%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260206T122650Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHwaCXVzLXdlc3QtMiJHMEUCIQCa%2BJ%2BA4gXKLeX%2BXoS9puvEeiJmcjOFfBLC%2FR0eAH%2B8BgIgGksAMyCgtAju4NwIsyvBKI34DVuS0HwEotouodR5YrAq%2FwMIRRAAGgw2Mzc0MjMxODM4MDUiDE26F9KY7ilRWd%2BcoircAzJNLj%2FXc9039UtKWx2kGH9XT38Rlwy%2FZD7axEn4L18pHtM%2Bs0dVNittID5CFK%2B8ylDXgCjYLDVByYt1kDqgVtHG%2BOzfBzcOmkODJCqVGHzyyUVyoLVEJqhrOsIZY5dtxVvd9dXciRDcPsLcBJAxqhWiIhRreH7iQ%2BGO3TaYNkDymE3M%2BRkn4zPJABopGr4b7gHsCuamPpxZnqKjuWx3EGo4EFfVDdGVk%2BcHp%2FEc72irkIA%2FyWt1b3nMrZL%2FsV%2BgfC5UJLFrUWtieo3rAz4W%2BQLnkdMUiXYfI5NY2QyWvQMr673xUyhKIPH7Lskbf3hfzCGUDngMeX5v1ZiZLdMZq8%2BpG3xNLrER1Urpx89VBob3xRpjGxNTUqfGuYzD6cZhbU3QHcou%2F4q%2FVvU2rRteqwQlThnrocdxs88RDRRuuzFAlKDq4VGGmYkjblyh4LIWk7iz7VDHCKpub4Gwyuguxt1GGNVdui8TkKCyyXx6OUf2efN8xJlvZwBTCXIV9BDPsnwmifc09vbq3btWMJEMM4myx%2F1XMCfOqx9cHu4vMed9QDT3SPKWeH2sjBX0TLugKrkou23pxoO0fSQIgP%2B5ga9J440q0mIv1IHPOAOiE%2BluHRNbZk%2BZV1eMpk3LMIipl8wGOqUB%2BofwZFaWaXHTjZ3IWbZ3YrHLJ8X76PFnnE%2Fb4rwtI84RX0O1bgPBCwFqHKUi9JhaxoC%2BjT%2B4xEQvp0DBKnepnyqrNyAbUCsMkgn84rpex8diFTtQhHEB44vQTOjkk7vo0ycq11SKjO9sAX7MZ%2BxIhYWrM9rOqzFN8mx0iRdhBit15x%2BFKmfXZW8p0YxC2TKunxfJmyIdhn0aQDCTA5Gtn17cdKhg&X-Amz-Signature=45a716b9a601e3785f820014deb724d2904c36e7276feb0bb9c858a5f9ab4780&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YAREMV5X%2F20260206%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260206T122652Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHwaCXVzLXdlc3QtMiJIMEYCIQDO%2FS9z3uJBWpqXri3VjL%2FUUKpw6HHShzBz4XYH2Mqm3gIhAJkC2EHKQ5gyEOup%2BBr5DmG5KWK3bQtT9M4DQmpNgJS8Kv8DCEUQABoMNjM3NDIzMTgzODA1IgzBTFZBSPu0Kml1B1gq3AOhrul54jM7mj%2FQa2wDIcg3AM7wNxYmzIPeiW8JYCrk2SbigCRZJEVpT5QSZR%2Bi24X0e%2BLEF3YivnU3IkBBnyTpm8QfynD4QUXRZoBE%2FmcLONswh2qHkLoqJ%2BP2Iu9vnWSy%2Fx6vl5D4VaaNFLSaPN8QbdjNIS8iZR1KH7IzFFIVDdB1wg0utD7yEKv3Xd6QykdpH%2FN4Jrr3hZ9ehNP%2Fjic8iazpKjcInXzJpQta8jY4UPhgln02bvO0k0Seq2Ec%2BoXf%2Fq3wz8Arr85J1Yp1SVLW5IaO4POrCT2UiGgxM%2B9FX%2BFUDlXVbR4lrIWhQGOx3ZVxTdlhCVQptUGm6uzPo2I%2BxmQ310riecMwxOi6tKccGpmKgdWSgX5nPzwrIey%2BwJpxu52TZfsifwRk8I6iPnb00pA01VAwGVXYk45lcZGyi01HMUK0lKOA2iopWAHuLvL8fkGLOCKhniogbQ4%2FSQAlrkiucdQpsP2P5yq7HZ7k%2B%2F4cw8R%2FjZ9ukzqvpsV1l9X%2FkqcvKWHBNuug4Mf%2FWk23AS379UV93x4Vt%2FmK49kAvWdJ9Bs6KRXF0Wq3oqTSbfT0088hKehWQfk7%2FHhsRE81a8Bw%2FhHN3b7xga8%2B7St6kU7KNIiEu6P2r%2BmcRjDip5fMBjqkAdchlT2CtIqYZDR9X6FB3PF26SpGA%2BQgxbSjRhsq%2BcDq2ykQFaM9KuwDX3usQiE9pQw2MbU8SjzoF1N%2F3p5hZm3%2FChVMquF7pPEZGWCIjV6WTs0TcEh0eZaWdKt%2BUHMqA4Q%2Ffgkv0pOjDaDgfDTTOXFyE0WemSVZVoG%2FKclY2MDjPLMU7nXbuR%2Fvo8nSrGmFZtzzg2KIT2CUJnqtlqAqE9MVKpO%2B&X-Amz-Signature=23c13ca597b88d10057a2b2fcfb61a87a2b4c790322bad4c298f0010f824ea62&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667XW4TRXJ%2F20260206%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260206T122706Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHwaCXVzLXdlc3QtMiJIMEYCIQCxt%2B26RLhBbSoNPLd2SSglf1gy3q34cVWosTlcWf2mOgIhAI4QIM%2BBKYtUESOJA%2BQtlFb6DYv3w2D0QI04J6iAcpSbKv8DCEUQABoMNjM3NDIzMTgzODA1IgzKws9DH5VtUxLJIzwq3AMU7JzJtqjVyjIcZ47W5chaQr6ouMxep8isBEYFv1IfMfG563AHhJdrsig2zsJ4WWJue%2BUZ4fPUOUIQ8EqHG9N3KSGYFOIW%2B9wmEvBVeuiqNLyHBMbzMaeAkmsyuNq6QTGDsYReUQeT%2FZWHcME%2BHZcltAHoBUygk8ihqbyXfG55AIUEonscK1GUEoXQOVYPpWhKCBxiyG9NLLPBK8uIDVHneJC2XkLWE3SUA%2FhhPs2ogyYMwJwzziA8%2BnfvWUbbkHb%2Fypy6IhISuRi3nnAFVHIrHfuAyl0JIZ6QsLYv6kp%2BHl5dqtAMQJh9%2FZn3%2Fsj24vPl6GkBvM1b9dLL7NtatvdWHI%2FPDXj%2FWN2N6xNw9IW4R6LT6bI7MaqiyAiVfRoqoSfqZmeTODlJs2Qzzmg5uXeFemoRcFApgy9eyL1DaF%2FD0f5L1p8VNwkMbpPH134gbsGzfDZm0ObqK%2BB0sknhcBsyApNOm0cOJ%2Br6kS4Jaj5y2dkiZ2z9pC7f34T5sqpcJAFmGeLnUtNGuCdXWp83xuhw0Yhhp94SK3%2B9sZKztHjh9JjFdu7Ff%2FnSC%2Fhw2yNh9dly2RdgVi7v0aSZgZs214fH6%2Bon02N%2F5K0hC%2FZlUO3kPoAYoEO5x4FZMEY2xTDtqJfMBjqkAXgTMom0deUZDnJpAQbSoBKGXFOsMlZs%2Fl%2FsZDGWDODU9CEi0UBeI%2BAaj5wXeRvwZryTO0ZkuWjiLAzAW37wVzzIwpcIOXV6HMWaoVVJ%2FJEgUG2mRKkJIFxnDku1%2FIYU2euSE%2Bzi7g6MHiXP7cIKOJHZYTRoIh64YmWn%2FtdBQatuLXHUEwiKdemzVdyyqRVDv14%2Bp4BDK6kZG6%2FiFblwUqD9Yjsk&X-Amz-Signature=1922a1c884b9d43056bf87fed9e9c4538ee26993a27e1f400dc05a9098cfeb2d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667XW4TRXJ%2F20260206%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260206T122706Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHwaCXVzLXdlc3QtMiJIMEYCIQCxt%2B26RLhBbSoNPLd2SSglf1gy3q34cVWosTlcWf2mOgIhAI4QIM%2BBKYtUESOJA%2BQtlFb6DYv3w2D0QI04J6iAcpSbKv8DCEUQABoMNjM3NDIzMTgzODA1IgzKws9DH5VtUxLJIzwq3AMU7JzJtqjVyjIcZ47W5chaQr6ouMxep8isBEYFv1IfMfG563AHhJdrsig2zsJ4WWJue%2BUZ4fPUOUIQ8EqHG9N3KSGYFOIW%2B9wmEvBVeuiqNLyHBMbzMaeAkmsyuNq6QTGDsYReUQeT%2FZWHcME%2BHZcltAHoBUygk8ihqbyXfG55AIUEonscK1GUEoXQOVYPpWhKCBxiyG9NLLPBK8uIDVHneJC2XkLWE3SUA%2FhhPs2ogyYMwJwzziA8%2BnfvWUbbkHb%2Fypy6IhISuRi3nnAFVHIrHfuAyl0JIZ6QsLYv6kp%2BHl5dqtAMQJh9%2FZn3%2Fsj24vPl6GkBvM1b9dLL7NtatvdWHI%2FPDXj%2FWN2N6xNw9IW4R6LT6bI7MaqiyAiVfRoqoSfqZmeTODlJs2Qzzmg5uXeFemoRcFApgy9eyL1DaF%2FD0f5L1p8VNwkMbpPH134gbsGzfDZm0ObqK%2BB0sknhcBsyApNOm0cOJ%2Br6kS4Jaj5y2dkiZ2z9pC7f34T5sqpcJAFmGeLnUtNGuCdXWp83xuhw0Yhhp94SK3%2B9sZKztHjh9JjFdu7Ff%2FnSC%2Fhw2yNh9dly2RdgVi7v0aSZgZs214fH6%2Bon02N%2F5K0hC%2FZlUO3kPoAYoEO5x4FZMEY2xTDtqJfMBjqkAXgTMom0deUZDnJpAQbSoBKGXFOsMlZs%2Fl%2FsZDGWDODU9CEi0UBeI%2BAaj5wXeRvwZryTO0ZkuWjiLAzAW37wVzzIwpcIOXV6HMWaoVVJ%2FJEgUG2mRKkJIFxnDku1%2FIYU2euSE%2Bzi7g6MHiXP7cIKOJHZYTRoIh64YmWn%2FtdBQatuLXHUEwiKdemzVdyyqRVDv14%2Bp4BDK6kZG6%2FiFblwUqD9Yjsk&X-Amz-Signature=cedea7bea9e2a12e509d50732c168bb4f5648027361e300809a0e32e0397191a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RKPJQGDH%2F20260206%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260206T122643Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHwaCXVzLXdlc3QtMiJHMEUCIQCX7TnEPYi1tor%2BOApEnDfGleGqjU8w3cFs8xaKtBtpOwIgWX20q4uudq7GkqmjSa%2BcyyzxJMzGrENXIr9%2Fnhsd6QUq%2FwMIRRAAGgw2Mzc0MjMxODM4MDUiDApXq%2Bl7%2BpaMWZgBOyrcA29woRbC0a4NzB3ipqwa2MuQtGcOjojunaZosI1yAXRJrbq%2BvQz%2FIwCbNoTiW5QOxkKuChcgVgJOoJmJL%2FWxrEnWQqlGzvol22Lj6mDsLaIjPVRaDAQphEiGAmHpTpQQwgUMK74ezQSor5cAYnhV6qKDqfCVCtohS8HpcCK4qy9mOL066OQHLUpyc6zXt6ZqyYflQfR9e6ZLbaXn4Ub9ZiEUwbJ%2FRuQpd0Vk%2BxaOPTee4owmKYZQ6kdl5DjHVU8n4Ufx%2BsqJMylJqYmGiWB3p8Ll1NQOXEbNWril5afmCzgRnV5kwZ8xVg6XyZ9zkD%2FYo7E2vPeGd2YoZg6xKIHzR6js7FVDfyWLQcjspZk4aZNTVNCvqTdq0cDEG18IyTVdmNUx0hXkHk42vteu1st0MDOqxYgHF9acR6kHpjmAuQOhKDisZLITFmt61Y5BEiz1nlNRduplLndfWmuR3RFacXk%2BGJLFkaPH17YSMTvQef57gorlWzSoQU0usPN1V61L9qO%2B%2FdIZYYStIUM3quXnEZh3QXZpQeVMwcsT54zzZwhokHDNOhc%2F65jbXJg3KggTGo2z1F6N3H7lqRPOTVmPJPk2ZglEFM4kuTKEIxUHyCg9mcf2oe%2FUIeCPp%2BVRMJGol8wGOqUB8XTQU1rrpysSe75koyHB3N7%2FZGTRsiRosr13X0Xits3usciGTEQ4lLFIxSpdidLOmwGCJtU8nz2SuUYb50IXNDoLXyCkKbtnySZgexCSbEYPNxAbiOar73CQrSAQF3OCM%2Bt4ui8k%2BQBpg2gG4fH9u%2Bf0VaANSUlYLSbNB%2FsHZQyAS2W%2B18aqk0VKxPmUPLAnc5mZ9R456YnMqv3h9sE3zTJSrq7X&X-Amz-Signature=a06b1b0b087aee2e2576b2782573b4cec21dd3b380e0ff19c7af6616c2c0419a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UUSLASOC%2F20260206%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260206T122707Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHwaCXVzLXdlc3QtMiJIMEYCIQCH3EzTTf%2BJ0Ylgm2NLS4WBC6Qab5dptZrnfNYR6AWR0QIhAPyjiiyPm%2B74EivTC%2FnOF4P0YVEp02KNxH8mLE64JjB7Kv8DCEUQABoMNjM3NDIzMTgzODA1IgyjIm7MyvcvK%2FkyW88q3AOaaparJ5TtDtQw%2FzQ8y79f6SJe7IKYtUQjwSR3CK7Y7oo2U5ao%2FyQsuJCtWqCIF2wCMbNocglNNkwdNqZOTsPMpxJ4pjqCOXcLj5rZgSzCdS4Q9smK4xUDVXr0frSy1jmTuE0Nmxk2kRj%2FlICv8V%2Fqw01quJ%2FRimZX3UTJf9Oj%2BCHBIQEPIFYCwHVcZVzKXCu%2BiQcAoumiWr0kCiSorBHQw2aG16RNNn3k4VZPN4DATiQ1tHHVCRGPERUb%2ByVqZDvdlEoeSb56Mow7Rv1hkrElycwsw2aYuCPMul4usU4k%2BAhziaAhn0b0lVvejsHmc3z6vxYy1v5A8om2xyaOtPjQ3dsmXxUYI0%2FU5mtuwVc4j2xap4VZ4y%2BQ6UDPfxsOAfx0i5FU%2F0nC9mRClfvLwAtKI9YDgs9bR5ayeznqZPvn33Yfp1j2ecU0fydVhwF%2Fupgyh3k0HGbiXnXfz%2FKIuIy4%2FmlVtVCtoF4xpEMQDtr93PJoZh4qaxM8wybwu6LCr2QMjNOwIIh2hPeWjFwNn832S2W1lkZPEkM%2BYzFjW8YHeeM3RHFgi%2BBqUTVm4U0Tsp2SFGKBmjPBFBEA%2FX0VKsC3s5FfAzzVhTiwyOJYEeESu700wZr%2FjsG0Hc7xBTD%2Bp5fMBjqkAQb7ZxBqhb9oXLk4R8dvVPUeA6%2BUWSfNnoVPIJNwUwTx61ZpqLXlyvKd2Zt3VOlSb4Mr8fcveT7Ask3jcVL8gkB8o7qQynD4tCJcbdrSznWedqOIyIqDGtL5%2F416r5NHieiJx%2BWk%2FhZEHqAMb%2BsI1iOplrKiL1eYgy%2FILljdFGwZQpqOMqyolVQcGww9H9n5j5fGRyEvRgS3OiMHrNGS2FpeTOTh&X-Amz-Signature=6c1799e447b745f7c63469919bf07e652be96c3266b585dd5e0fd188eae026fa&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UUSLASOC%2F20260206%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260206T122707Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHwaCXVzLXdlc3QtMiJIMEYCIQCH3EzTTf%2BJ0Ylgm2NLS4WBC6Qab5dptZrnfNYR6AWR0QIhAPyjiiyPm%2B74EivTC%2FnOF4P0YVEp02KNxH8mLE64JjB7Kv8DCEUQABoMNjM3NDIzMTgzODA1IgyjIm7MyvcvK%2FkyW88q3AOaaparJ5TtDtQw%2FzQ8y79f6SJe7IKYtUQjwSR3CK7Y7oo2U5ao%2FyQsuJCtWqCIF2wCMbNocglNNkwdNqZOTsPMpxJ4pjqCOXcLj5rZgSzCdS4Q9smK4xUDVXr0frSy1jmTuE0Nmxk2kRj%2FlICv8V%2Fqw01quJ%2FRimZX3UTJf9Oj%2BCHBIQEPIFYCwHVcZVzKXCu%2BiQcAoumiWr0kCiSorBHQw2aG16RNNn3k4VZPN4DATiQ1tHHVCRGPERUb%2ByVqZDvdlEoeSb56Mow7Rv1hkrElycwsw2aYuCPMul4usU4k%2BAhziaAhn0b0lVvejsHmc3z6vxYy1v5A8om2xyaOtPjQ3dsmXxUYI0%2FU5mtuwVc4j2xap4VZ4y%2BQ6UDPfxsOAfx0i5FU%2F0nC9mRClfvLwAtKI9YDgs9bR5ayeznqZPvn33Yfp1j2ecU0fydVhwF%2Fupgyh3k0HGbiXnXfz%2FKIuIy4%2FmlVtVCtoF4xpEMQDtr93PJoZh4qaxM8wybwu6LCr2QMjNOwIIh2hPeWjFwNn832S2W1lkZPEkM%2BYzFjW8YHeeM3RHFgi%2BBqUTVm4U0Tsp2SFGKBmjPBFBEA%2FX0VKsC3s5FfAzzVhTiwyOJYEeESu700wZr%2FjsG0Hc7xBTD%2Bp5fMBjqkAQb7ZxBqhb9oXLk4R8dvVPUeA6%2BUWSfNnoVPIJNwUwTx61ZpqLXlyvKd2Zt3VOlSb4Mr8fcveT7Ask3jcVL8gkB8o7qQynD4tCJcbdrSznWedqOIyIqDGtL5%2F416r5NHieiJx%2BWk%2FhZEHqAMb%2BsI1iOplrKiL1eYgy%2FILljdFGwZQpqOMqyolVQcGww9H9n5j5fGRyEvRgS3OiMHrNGS2FpeTOTh&X-Amz-Signature=6c1799e447b745f7c63469919bf07e652be96c3266b585dd5e0fd188eae026fa&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TGZ34H3K%2F20260206%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260206T122707Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHwaCXVzLXdlc3QtMiJIMEYCIQCLBxoVyLpZa9f2bMJBhBURs01v2yWI1oLI6TkAJAmnwQIhALAkrupZbI70jXgQh6CoWAu7HANMQ8TVlPz%2BD8pzgifOKv8DCEUQABoMNjM3NDIzMTgzODA1Igyoi3sct6VFefXrzUYq3APSDGTySxpfN4f4HCpvGnUt3JJCVft0rbGSbEiGlZgJSGc6Fu7q%2FTO5kBwycMn49uX5UhmQ7QMOCXLQZwQ9RC1h1vu319Mfk9e6kWnTQPryLtbXOuecDoVkKbd16Mkoc2fpwyoxbKqIFCMFPe7FhI0mIgB84hRrEDF3ycNUKXoTnm%2FJEVNOCp3r0KbnQw38PXqL6oxQItrLHG1d%2BsDGjQiSejurZh0vQ121iLva%2F%2B6knmuhMxoX3RHN0gXJtdRHA5rfUvAfwvB9fk0yJPaEfttRjMqRWuFQHB7DiClPLaDoq8j317RieCRLO%2Bb4s0yEob3YXivDtM9kgGBjsrOQkgyHqDbG6ZGnJtJBAR44QuG9Ic0TGHt1scQv7S36xKsje%2B6KjfFB3pJED09ZHgOJNJFFLOZ1TNP21ZiSenUBxarMQlwwV9pqXUwNZFSIngCnYy7SCaBH2jyxvCroyAuYIlWWyjJqEX2IAVRbdk3eq1ZrScXf64MSxCzw89GKr3b9Y8bsPSFTkwbPCNdqr0rSFMEyM%2FkBJeeIjT8DU9qfCYdd6fIL8xLyDnRx5tjtMkBtPnjCAP5RK9s0bqIJFD3BF5ywlnj7D9DW1z5FzDhrzVvJObIYLxY1yzXgJvwr1DDrp5fMBjqkAU24YUourXHoaV8%2B1itzcHuym828wZy1erC%2FXlOLqTDjo9eJDVWh8i78bAlxNBVH8h9%2Fm59SR87ZfViBnEkZDKvzlnrotKxvxXHqb%2FK6bQRdVqaagxgaY6dofrN1q8IVm99qz%2BJpPU20%2F9tA9CKT9mwNWmNzTCDN5lY5OGWxcQihrI9PJ2xJw9Q1qdpDdMjTfaju5FT1W%2FgyZXZnNIez3Gh5wmee&X-Amz-Signature=d994bb65b12ef6a68c47a5a7ee4852afe4c373ef9b4fe716de637a0bd81d1843&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

