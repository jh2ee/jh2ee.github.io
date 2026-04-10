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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TXR6VGJN%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T163759Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGgaCXVzLXdlc3QtMiJIMEYCIQD9upFNctggvBlzS1q5a7f0QOh%2FiM1yEapLWFxC7BN5VAIhAJcd5yMLkO8diwki8bjoOV1dleMX6ilqsA%2FBMQCms4dDKv8DCDEQABoMNjM3NDIzMTgzODA1IgwTurvBJ1eki9cxrU8q3ANK4G2nBrTjBJB%2BL3OpErN0iR2KuaVKrgyRf28QGXlY4i4wW4cCNz7SppOwZxoSEkOep3cZy3zJwOkDW4TqHYD0W6V%2FYvV3ZpAEcus6gBa%2B%2B3KLNU51yUsfbsCo79olGyLbsjwxt%2BNqkxIjJSrXJRAJO%2FgN%2BFh%2Bt8%2BPaZ0yHxOW7MYMcd39ZI7J06Af9dVzZlKKtGH7NMUT7P8%2FQuTcvansK%2F1KZpOIJAyi0yo3vtw6nRzA59cBJ0SDZhXJksP1NpMgwcruyj41InsoMaWt8aiaXLqgQWoaOAPzkY%2Fdr2%2BK8UHf1zzFxBf6nUKuKAk3DWoLDwiN6uIY4EUaBokSOYtRPaPyiM0AHJ2NraMGRhJlNhJzqwf64FFQdMx%2FstT7FriB8Cb7cqj2h%2FTrbpwvkstUKLLm%2FZv7LYa55XWo0YmAj1NSJ5jWGKVaYJk5HjTb3JmtOkoqJQE5%2ByWQVlYXVCv7lOsMmVvGvQ8b3qcAmIIznsNk6qnTA%2FtDhOEYyhFBPQh80xbPMTPSGWacsr6b3UkgcVPJ%2FF1ntZbHkH0n2wyBhRc2ZtpWgtj%2F07i1bo8Jn%2F43Bl1auNCVBC9BnjB76xDPKkSeBCMklaH1tDV34kQAlqIpVdPqI6buoFbGFTC5w%2BTOBjqkAUehSmxAVp9pUIJTLwHgiCr2%2BGZHWymYYQ%2FP4J3bQ76lhHE%2FRdLpEwxqk1ZGe7vxw99P24StHWoT%2FoBGn%2BSPh5Xrx1BY%2FRYOeYnb7H2h%2F61xat%2FD6%2BUnNaPfcPkU8g%2Fu5LGYx4mncnU1RFqZfuH5wkbCARFemISI%2Bq7zOoNj3YDYMML6Muv9GZNaeYxAXaTEEIfMODGaAqNEZAsbaJPhYzRf%2Ft3n&X-Amz-Signature=6186bd09bb8aa53695ef9017f7d4c29a896a7aed540e783d8423a9ba7e7b7f34&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TXR6VGJN%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T163759Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGgaCXVzLXdlc3QtMiJIMEYCIQD9upFNctggvBlzS1q5a7f0QOh%2FiM1yEapLWFxC7BN5VAIhAJcd5yMLkO8diwki8bjoOV1dleMX6ilqsA%2FBMQCms4dDKv8DCDEQABoMNjM3NDIzMTgzODA1IgwTurvBJ1eki9cxrU8q3ANK4G2nBrTjBJB%2BL3OpErN0iR2KuaVKrgyRf28QGXlY4i4wW4cCNz7SppOwZxoSEkOep3cZy3zJwOkDW4TqHYD0W6V%2FYvV3ZpAEcus6gBa%2B%2B3KLNU51yUsfbsCo79olGyLbsjwxt%2BNqkxIjJSrXJRAJO%2FgN%2BFh%2Bt8%2BPaZ0yHxOW7MYMcd39ZI7J06Af9dVzZlKKtGH7NMUT7P8%2FQuTcvansK%2F1KZpOIJAyi0yo3vtw6nRzA59cBJ0SDZhXJksP1NpMgwcruyj41InsoMaWt8aiaXLqgQWoaOAPzkY%2Fdr2%2BK8UHf1zzFxBf6nUKuKAk3DWoLDwiN6uIY4EUaBokSOYtRPaPyiM0AHJ2NraMGRhJlNhJzqwf64FFQdMx%2FstT7FriB8Cb7cqj2h%2FTrbpwvkstUKLLm%2FZv7LYa55XWo0YmAj1NSJ5jWGKVaYJk5HjTb3JmtOkoqJQE5%2ByWQVlYXVCv7lOsMmVvGvQ8b3qcAmIIznsNk6qnTA%2FtDhOEYyhFBPQh80xbPMTPSGWacsr6b3UkgcVPJ%2FF1ntZbHkH0n2wyBhRc2ZtpWgtj%2F07i1bo8Jn%2F43Bl1auNCVBC9BnjB76xDPKkSeBCMklaH1tDV34kQAlqIpVdPqI6buoFbGFTC5w%2BTOBjqkAUehSmxAVp9pUIJTLwHgiCr2%2BGZHWymYYQ%2FP4J3bQ76lhHE%2FRdLpEwxqk1ZGe7vxw99P24StHWoT%2FoBGn%2BSPh5Xrx1BY%2FRYOeYnb7H2h%2F61xat%2FD6%2BUnNaPfcPkU8g%2Fu5LGYx4mncnU1RFqZfuH5wkbCARFemISI%2Bq7zOoNj3YDYMML6Muv9GZNaeYxAXaTEEIfMODGaAqNEZAsbaJPhYzRf%2Ft3n&X-Amz-Signature=6186bd09bb8aa53695ef9017f7d4c29a896a7aed540e783d8423a9ba7e7b7f34&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UM6OEWGM%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T163759Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGkaCXVzLXdlc3QtMiJIMEYCIQCoTC657qPtfyuCEHZ9oZFLnsfGKaypnTDFsxYPeY1jlwIhAKUejNcG6yulXg%2FkjObmN%2BP0e40Ea2o975OKqDNYiH31Kv8DCDEQABoMNjM3NDIzMTgzODA1IgxETezyam8OObKt5Boq3AOa4JXTjneozlvgfSDRn81GdjbsUZsSuZw3uxSIwF%2FBfYe3%2Bx4UQXBBRT3MuR3R3KM8ZnpO5w4gNgxPRE2He0myBCMHtk7pdySrTs%2F5BkCbd9MBktlFTg2nHEAljE3Jae%2B12u1hn0uo0T0a5B24tFXhYP3Gcz%2Bhg%2BI5jqSIk%2BhGkniunhJn0VMQGMK1qmJTsHFG8Zr5jM2P4gTt8b7JkBxtG7PItuEnWsqerKP90RMAo5Etldo5g0%2FnoncZ3w3RBjIy5BVpVyeOwh9%2BdzLe81L%2BQfXB%2Bm4fJUh3lroqM0sTMv54fB%2BHckUzDqZv%2BvaA73cSp4ZQj8%2BXPCDy9mI5tIsgoM3wnQUrJ5WNhvbg96ImnGJPecCUzYD%2BiEyDpc0xtdAZ7L1vBlPN2%2FTgM8yeHKYGMKOpLKRPo5OyZ3rKOGv1NztNruxLnjE%2FX1Db0nO8HeWM5gAQw2yychPuaaG1%2Bv3woOK7vLIm95o4Dh%2BlS66nKr7pdS8f5GmitgGuvYD3eTL3Im5oJfDBfg12qfz04TrJd9%2F3d3xa%2FIr4h6OlUQYDXy6QBqVvCrzEsudgx3dLK2JGWQCyfIEhp%2FQ5pbfJXCm9pq%2FNEPj%2FhKd89zxthNt5%2BCxWoCHBP7hBZIY9GDD5xeTOBjqkAY6kK8JGbaNlJ99cTWXjAQJw4ERBoyhOCsPMNg8zetEmsGrx3unXYdwi0leK6sg6UQpuKtKxOm4JZX4xwkk2fWukj7NU%2FRCi0%2FkHL2f1msQc8Gwofj8yzx%2BQ5SSHcY6Gmm3mY1D%2B7PPuD6RhbM9hZOJfg2jsUtG5YPKfc6NQkwfzTH9Ntjt06mQ8DuUxHFc%2FvLliK%2FOc09IP7CBnfb4ENsjrRNTo&X-Amz-Signature=b99c3ef05625d21019b49b8db90f1b38a7db1898021e8a5cc41ad42bc1997a39&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46654FPEBWR%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T163800Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGgaCXVzLXdlc3QtMiJIMEYCIQCiGbejBltdfaSbqX69yQfwPr5qE6nnijBNYHNJCyMgvwIhAMNXT2qO2ZZFYGQmlz%2FS%2Frxt2kKoS%2B2uUj1OCS25AkM1Kv8DCDEQABoMNjM3NDIzMTgzODA1IgyXzxeRcHvg6MoEopAq3AMbSOYYnmg4hclKj38eR2zp%2B9TdAcxN6eovLtQVYDTBHyGJV%2FNGxeUi262jDc%2FDycE6EZjIProk0bAtz3Q2oY3Iw1wWVOggHuQCYe63jghfRumBxF50OuU%2BXYix5vcRk0v%2FMf0OsbSW6rjTiwtRSeJtbTzQJ2EiYh4xUmPi5DtftXWdoGdq126josZ%2BG7qE%2Fe6dfi6%2BSoADoFAxoZCnnEmmD0GCjcgXS8vl%2Fl6U8FTQQZt4uauF7UVkQq%2FvuhCst%2Fiz9xtdmdOunHr2uJeBYIZvuoK4ygtja5eFHTUWrB7QOisEVEAwquEli34SEjZdslACFUDMfT98FEp0tn061USYSX0x0lsCKZBXXxEDKnDi6j9jlX3BjI6z2xP1u3EFBAl4xedd1Z1RXr98Ol52FvetqlFixQtCipL1VZ99FLdNwfSnb1Jv6%2FsCjbcwxnHUphXvnvfY8Sxgb9xbWYRztHDI3lxluI%2B8q3YztujBRmSMxURkfWKet7uJfjnV2E36oJOEfW9DLtrTZUOdpV%2Fuz1rbrLZi9TIlAjSc2iSe5yLHQaRygrgLkDTA2RCFkv0jIclNDHavujsOxkbkCOSbobXr%2BD3DaXBpfx2%2FBr5j9LF%2BJ7sQHV5dC435hTCEnDDvw%2BTOBjqkAVP3pn02BAuHEYWeCeIm6WHHCIv4wIgeA61%2FzKnPNFmCedfEqJlREKYkXafnDLdWP5bMOFbeVntjyDfOp3%2Fon0yqky6ocJhSX6OwonU%2F11xwQ4YCDOPVg1xv%2Bs5O5TviqgmOgKhp%2FtKvJojv%2Fa00AUOwaKBtTX15DtY%2FyqcGlrbVWp02GKQdaggsLFW9nA2952a%2BLPKgL%2F1o6Wh%2FDq2ysXtWPzOD&X-Amz-Signature=9a3630801fc73d22171a676981f179e9d01179e1674005e755b3d984d6eb52a4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46654FPEBWR%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T163800Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGgaCXVzLXdlc3QtMiJIMEYCIQCiGbejBltdfaSbqX69yQfwPr5qE6nnijBNYHNJCyMgvwIhAMNXT2qO2ZZFYGQmlz%2FS%2Frxt2kKoS%2B2uUj1OCS25AkM1Kv8DCDEQABoMNjM3NDIzMTgzODA1IgyXzxeRcHvg6MoEopAq3AMbSOYYnmg4hclKj38eR2zp%2B9TdAcxN6eovLtQVYDTBHyGJV%2FNGxeUi262jDc%2FDycE6EZjIProk0bAtz3Q2oY3Iw1wWVOggHuQCYe63jghfRumBxF50OuU%2BXYix5vcRk0v%2FMf0OsbSW6rjTiwtRSeJtbTzQJ2EiYh4xUmPi5DtftXWdoGdq126josZ%2BG7qE%2Fe6dfi6%2BSoADoFAxoZCnnEmmD0GCjcgXS8vl%2Fl6U8FTQQZt4uauF7UVkQq%2FvuhCst%2Fiz9xtdmdOunHr2uJeBYIZvuoK4ygtja5eFHTUWrB7QOisEVEAwquEli34SEjZdslACFUDMfT98FEp0tn061USYSX0x0lsCKZBXXxEDKnDi6j9jlX3BjI6z2xP1u3EFBAl4xedd1Z1RXr98Ol52FvetqlFixQtCipL1VZ99FLdNwfSnb1Jv6%2FsCjbcwxnHUphXvnvfY8Sxgb9xbWYRztHDI3lxluI%2B8q3YztujBRmSMxURkfWKet7uJfjnV2E36oJOEfW9DLtrTZUOdpV%2Fuz1rbrLZi9TIlAjSc2iSe5yLHQaRygrgLkDTA2RCFkv0jIclNDHavujsOxkbkCOSbobXr%2BD3DaXBpfx2%2FBr5j9LF%2BJ7sQHV5dC435hTCEnDDvw%2BTOBjqkAVP3pn02BAuHEYWeCeIm6WHHCIv4wIgeA61%2FzKnPNFmCedfEqJlREKYkXafnDLdWP5bMOFbeVntjyDfOp3%2Fon0yqky6ocJhSX6OwonU%2F11xwQ4YCDOPVg1xv%2Bs5O5TviqgmOgKhp%2FtKvJojv%2Fa00AUOwaKBtTX15DtY%2FyqcGlrbVWp02GKQdaggsLFW9nA2952a%2BLPKgL%2F1o6Wh%2FDq2ysXtWPzOD&X-Amz-Signature=432e48427e15b7ca1644779951366a954eccf02bfbe66a6a0fd94b6e930a870b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QZ3Z22IC%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T163800Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGgaCXVzLXdlc3QtMiJHMEUCIBnrniSF4lWtpPLjgnqo86OGG45HnRUpUs%2Fg2E9SlH1xAiEAnPMzZpezSJYYyspD%2B2jcNlk0LpOFkdoH8VkwNTDavSUq%2FwMIMRAAGgw2Mzc0MjMxODM4MDUiDHyFqivLbT1sDDv0oCrcAz0AQ%2Bu7P%2FCYlc%2F4ZKmrnVycG%2Bu3Imu8HyREKga5GjDkZe9Ae%2FTUZgy%2B%2B2Wh461L1u9jvEbiW2CHEwHuET%2Bmnfl1gXO2e1mhAQXBAtPRMGsh6%2BHSPoilZ4tsi51pgj2kkboUyROSqdzwV8ko74a%2F0XNzLCPN65qBdehcfuNhI6f9%2BvwjqLEPWbhFPCCFn6yX6V%2BFILJmvn8rVrI7XaqQtngmnYsSiOWxg9B5gB%2FEjXECDUwDaT0WmOX0vKURnevN%2FB4Ak%2Bpv26zcRxcoAaHoFO3HJaSqb0ko4Fy070VVNfqI0jIQazbuCpwPxrxuNoYLjKU5BISTw4Woa%2BDBzBVGOPbzUlkDzMCiFxxQVZDzYvrGND0j%2FkPvc250NV6zsT8KpT8GglL%2BCHmD%2FX8CCPhD8H836a27%2FDjv%2B8FqK5D7e0nuzZbtIm3%2FWxiERoLqLwyHq4LvJIJK8IuSNZecGebvgw6KKsDiKTVXq2NDCB0QGq5k0CYcRf54yGXO29be0qnE5RDLaZw7IFWkKvLJ2ihgm%2FF1bSIKiOUnQgw%2BukugduOOd7J1M4cvyZZT%2Fcd2%2FdrcCXC8GaijkcyqhvgF3ydQp81gzkzUFyIoEEzUklX3EsohL6TJF7xiueqn1U5rMN%2FD5M4GOqUB%2F8Vx1qSABalCypOPB9dtGcM%2FdbabPX6pjt6A%2BgH8m7W6fNejpBLBNkRnqMJ7QzLPupoJrlA8odENvI7aYByxwh3kWY9mR0oTW5G7Dcd9LajBzglhl0YFibdD64inQltn1l87PAlfwDmXAmvcPtDPIDib0LIAVdp82%2BB5eQmKrPCuO9MqMr9eQlNBhrXP1Qsqiuq6txqRjLYBkZ4urQqj8mMyrAgo&X-Amz-Signature=9a97d88ac6c48cf96714e555cc143267a960e0ca2809477bb14de1fd00011daf&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46626CBU63R%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T163802Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGgaCXVzLXdlc3QtMiJGMEQCIC2uuG5UjBNJGuhcrTJa6w062hYJQ3%2FsXQXB02Z5o%2FgdAiAzwmggaMUdya5XjZ1cJHGTVBIiZ6287u%2F4SlhhmYlXoSr%2FAwgxEAAaDDYzNzQyMzE4MzgwNSIMx1j1M%2Bhaup0Ku1euKtwD%2Fb8h50kYABtneggPnx5Nkrz5fVA3toCxeqhcCvtaOSpgMV3nmt5cx8zM3ERS9WiU79cFhkSEiwEWFMSlgsh68aWwCgjTZna2P2J6HlcCIwdgSB2k0nNMt9mptRERDW7GXO8K5Zx3tPVZdHYZhkORhB7MGFtuUKlnP5jxacYjYK0400kYO5Zce%2FfFwQLS6cLWcYegOOGPX7aOQMXKv%2BwhhBRdAIxZmpUTVe8P4xC6U7BPpCTHIA5bPWndr55ARUpsYkCC3gYstH1ioTTU5EKkcFmuAuNgcaxZRbjvrqFvRMAwt%2BhNxKcr6cENtqpIWFm2B2wHj8chLLFS9voqMQwbceQAfoLfUxa3%2BXcW0UzR%2FXvUgVYrLooj%2FathcS4jxzy0J1o%2FE01MnOuxIGHyqCcn8Nqb3YEOoahs5kFCRZvzbTqmL75xwcmGzTMpNjtKRgp9Wlt4VuAdZH6FaCD34X5SeyYoLE6mo3ixC92MLG1cO0dlsIVpgICzYUR4D9%2FC04FBxVindJas2X6iNn44K6PEUVEEkcBFijPhnxgjFujeOJdxF3w9qpsb%2BY%2FRX%2BOt3mB1FjiDvDXnO0d8ayA47pVeyOTPsrRr4bq4AC5p%2BpGZW%2BYXdKTNkKC71PjiAmswlcTkzgY6pgGdhj0YgGdM29%2F8YugKWDfK3xGN3An9%2BTboGeYHqOWDv8wVTwH1WKMzxcuqgzFMsfbzCCygQQwKtk0Rr5z4bK0uGEMHW9uvrgSY%2F9859EsURpj%2Bk7fkJsxJtcRbzuP1RNQ%2F6rINnPM8slK%2BFqwsqrpR9ke%2FT%2BV6wW4kzfmV5cuR7Qxu1tR%2FdBSwgPE6KhfGKPDoCsvU8kII5gwf2xQSLodNenaIufLp&X-Amz-Signature=4d7cbd71cf01ff2a311b0656f918d789f4e0371b114817715b7a2648e793fb73&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SE2H4EEK%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T163803Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGgaCXVzLXdlc3QtMiJGMEQCIHhsuu67B2hFoikuVyunY9lpq2Bfs6LqFLLKdAWWu5SPAiB%2BVI%2FuWvw%2FxWGkGl1pNGwsCjw5caXCb%2B4T5c0MRUDJ9Cr%2FAwgxEAAaDDYzNzQyMzE4MzgwNSIM4gqr6ewdDKk7OqT2KtwD7%2FJClHKfPn%2B7%2Fe0tq%2B1wY8se0wnmtgvn6HI41lG%2F7xanxKuPNtg1UtItcyPxkQg32P9kbLulPFrWiPDSp8k4ibM8A6c5V5G8BEhiyebuCTdtotL%2FR6Xmg7nZ8Z2wR9NmwIqC27BkjydjVjq0sPeOAFFVb95DLct84Ve53jBGb3s%2Fi0ANWDtfC73kmCOEWKrTDTfXgePlqx1uOLMJ%2Fnfd7k%2F8XiKufHBkqLGqyzhMyNpkLQO7g4n6G7%2FecOwHwwqTwq0EwoAkzCRma60lUBXyk4Hrstd12V2bPwuN2E%2F8EZ29wetwNcVultwJjpDlzKOIlmE1KEn%2FETi745t5uFCglcQ7kRoHGkSek7%2FNEG8uv6coN1Ope3XPH%2BkYVFBS2dDlDgDbfcEnhovzipMFwJb4fUIVHQIc%2B4hc14ikwBu7xHLwrfjZQx53An%2Fi4Q4%2FU06Op2R%2FwFX85W9SEwLHk5gJ9eyUTNN06YobwYp11QJS05iv4YSzMySwI6HEa6Cah89n4prWIMPFRxgRiqqTCgebR5sFvH8wjGlO5WDRVBZEjErKCvS0f5Z8zebph7LOh749dt%2BBb%2Fjp9f6L4UHPV%2FoI%2FH5c7zLNcspIomslaHR6%2BWsN5s1VXdWigl9AujMwkcTkzgY6pgGvG%2FefgGdVAWFy0L8U6%2FtiuSYkmSjRmA69rvZyx3PEYk4Nr0zLd70NU2AIdeYGvDka9T%2FlUTv7NUcIPAWblqj0RhoDT6jFZSisp5lBqCujFEo05BT3xdJw3B6bnp85FhyPz19cnpvPt%2BEtC4Xh2Z0WUh3hIRCM6z%2BUReTyqnQAoLBlokCzVb9ZnD3UcEvS3VtGup%2FvCrlMJAnwbHCR48zA%2FciN68JH&X-Amz-Signature=56af406d36b39d6dfa0464f5330ef0a61d568c09794247e0c9fd5d9ad3450e6d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46645VUQFW7%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T163805Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGkaCXVzLXdlc3QtMiJGMEQCIHbujDkFf8B2j1%2FB434XS7IjTFWVUVGbJ2UVPobm1hTPAiAaC%2B4TmUcUmluT%2BZiPVq%2Flg7SCniTG%2FkleDMPyzXUPZyr%2FAwgxEAAaDDYzNzQyMzE4MzgwNSIMXFFClGLni9QvOl14KtwDnYjlXoc%2BSTvBJf1dS2E9D8HqcV%2BbTBR6G4VKrZY70lMDZ6FH2uULdHEfa5KIxFaZBiMPHBpbfEnvumuatueBo4F4qTithMFy%2FhZw3yQhK%2B%2BMoJLPzqWmzaomx19jgCHkQYqwIkK%2B%2B2%2B%2BchXNG5Ibgty7lMsTjEOUXaP0U9Z6%2FEajCd9A7jwGkvkPb2W%2BdGSvHSEAhz0eAnHCfhAI4XyhQGI%2B73%2Fq%2FSIgK%2Fno1%2BNCQ%2Fm6i2XdRjXWb5KXefMfMiENCmrWpkladTIQX9uigprUg1fO7eBjPsC%2B0TqLCcqacHhGfOJ4I5LeD1L88M%2BpMaGIbwfPlrpkU%2B7NWbVv2HsdZnutslRs8fDJxjSZr%2BXxBRuP%2FGy%2B75CUiIsJWl%2BG9D%2FLfXnDL5R2xp2ra2wCnFcOTscKd8n%2FiXjJJFJSxdBWRByKj6u7ZvsVxtPBpfYX4XTIfm%2Bq7ouLmcNBWzuuczX7hBZKvfUKxmRDYJ5oH4DLdMQjvoT7mrCCjBG5sQNtQoZQ7dK9WYm0pGVQlGlNyOqcaLIp7FfN2fBfiTMUfSYAI8YXzrqF7ccmhd6U8CtmkgpuN4CCSmFBtYeuIbdp8lJppsmeif9KMapEAmeIegtnvTsm5EMyTFYB8d9kLk4w78XkzgY6pgHj4E7qJFtIOn9hMl0%2BMe28QPm51GuWP%2Fw3KnUNaG7nwBkOS6miuYpQ3BDhwVjZLm20cwRGuoyRkOnMjb2JXuooH2p1q5%2B3OuTDodfIPzqlannMulJLSYbNhnVIRIdP%2BnMc3PCB9Vj%2FZGGdhYJfGB7LAjbeCq%2BPDq3ZI%2B4o44R1wwLmty6%2F9vo6HXlGDuEy8vCRl2EbXprXzV9%2FOuTYPova9FknCDbS&X-Amz-Signature=92d66c7120864e262ededf055f128e133dcac2f5f5aae8b8f5bd46e6ab6520de&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46645VUQFW7%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T163805Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGkaCXVzLXdlc3QtMiJGMEQCIHbujDkFf8B2j1%2FB434XS7IjTFWVUVGbJ2UVPobm1hTPAiAaC%2B4TmUcUmluT%2BZiPVq%2Flg7SCniTG%2FkleDMPyzXUPZyr%2FAwgxEAAaDDYzNzQyMzE4MzgwNSIMXFFClGLni9QvOl14KtwDnYjlXoc%2BSTvBJf1dS2E9D8HqcV%2BbTBR6G4VKrZY70lMDZ6FH2uULdHEfa5KIxFaZBiMPHBpbfEnvumuatueBo4F4qTithMFy%2FhZw3yQhK%2B%2BMoJLPzqWmzaomx19jgCHkQYqwIkK%2B%2B2%2B%2BchXNG5Ibgty7lMsTjEOUXaP0U9Z6%2FEajCd9A7jwGkvkPb2W%2BdGSvHSEAhz0eAnHCfhAI4XyhQGI%2B73%2Fq%2FSIgK%2Fno1%2BNCQ%2Fm6i2XdRjXWb5KXefMfMiENCmrWpkladTIQX9uigprUg1fO7eBjPsC%2B0TqLCcqacHhGfOJ4I5LeD1L88M%2BpMaGIbwfPlrpkU%2B7NWbVv2HsdZnutslRs8fDJxjSZr%2BXxBRuP%2FGy%2B75CUiIsJWl%2BG9D%2FLfXnDL5R2xp2ra2wCnFcOTscKd8n%2FiXjJJFJSxdBWRByKj6u7ZvsVxtPBpfYX4XTIfm%2Bq7ouLmcNBWzuuczX7hBZKvfUKxmRDYJ5oH4DLdMQjvoT7mrCCjBG5sQNtQoZQ7dK9WYm0pGVQlGlNyOqcaLIp7FfN2fBfiTMUfSYAI8YXzrqF7ccmhd6U8CtmkgpuN4CCSmFBtYeuIbdp8lJppsmeif9KMapEAmeIegtnvTsm5EMyTFYB8d9kLk4w78XkzgY6pgHj4E7qJFtIOn9hMl0%2BMe28QPm51GuWP%2Fw3KnUNaG7nwBkOS6miuYpQ3BDhwVjZLm20cwRGuoyRkOnMjb2JXuooH2p1q5%2B3OuTDodfIPzqlannMulJLSYbNhnVIRIdP%2BnMc3PCB9Vj%2FZGGdhYJfGB7LAjbeCq%2BPDq3ZI%2B4o44R1wwLmty6%2F9vo6HXlGDuEy8vCRl2EbXprXzV9%2FOuTYPova9FknCDbS&X-Amz-Signature=0c1ec417babc9f8e39c6313e9c04c7822b070e28fcf62ebd5bac8edbdc80fbfa&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ULZ6QIXR%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T163752Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGgaCXVzLXdlc3QtMiJHMEUCIQCwAWnRbWdVSfTtUqmRT2rXV3ciDO41N50BZEbCLLS%2B3QIgIdHdi1NUtOs1KLeD0KHihXZLGmOwcMhCquMu6cO0smgq%2FwMIMRAAGgw2Mzc0MjMxODM4MDUiDAaCliuPZOU%2FhWQXmircA6BQbgjfN5XF0%2FaV8bSbdK5BnzFbrraubQ6h2OcT2wYPLuGeT3tNu3S0DTR%2Bux9Dtwd6dMdhcOry5cpex%2BAUQE9F%2FBnAbnaoecHPPw%2FGVOZ1Uvf2gnAPdQgd7f161JR2GpFVS8HUy6wFDJwCyQlGZ13qnjqOCxS%2FL4QMWpL9%2B4UH1xvLCgfDJOpSo7KyOaBQcoMyz%2BGrWL33abOJPSneWNfGkeHBMx2ak63eDFPC4RJe3%2BT4Cr2t%2Bk7jZNoAIaaZEvHkQK3PysSIl0zDkA39rxCJa%2FgnGiIFXXgQL9z2NriYXOrz0aTGlqj4AJRDDoFEZDLJ4rQ5zk3xV9YXEky3svFq6MO%2FabcK%2BzUfY64m88z9x9qJbKnCBfOJ6iJLaQri7AJY1Z2qMywSWT8h5r4anVvnc1asnZUmN4Mg1Hbm2M9RMCXZKNZVQfDJIefY7l%2FmZm62c7XNr0octLCTzAcnjxn6g9VF%2BTmxIztp4SfQ34vIsgdrsv23TTNPiDuCmzOeQU8BlpSGJCyhZRuRD5SnhWmS4Syo5OUm7WVB5s17WRNsvB%2BoFQBERTh%2Bu593ONYwNyzkTHy8wa%2BPU%2FJHvWyzU%2BETwmu7sl8EXW4ZLDRYwgXBRxYt%2FkuCEmhWrBmXMKfF5M4GOqUBaAbiK7ahjDA66IhOAkAe3RkWufdFAWMhkFiTOHlBXRuMYVNb3H%2BMZiZYia59etG%2FWLMI5%2BOfddZQZDy0yZsV6YSI02k8ofGMIF3NK6Lhp9e8U1pqeziu5Z4fRp19gmtUi%2Fg%2Btmhhzv3zPmtK%2B8FntAzpxDVln8M3rdx0LeT76NrT1e2IIR%2FzpSNr55R2QzZQFuf1KW589E0ipqW1S2x5xa6grZNX&X-Amz-Signature=28daf59c1b26035ae9b7bcf5ce725a65afadadb308df55c42b074d1937ec6fcb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TV7X5OZI%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T163807Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGgaCXVzLXdlc3QtMiJGMEQCIB%2FrjrYd%2Bq2ShLKSXbbh0Xdk8lnuLBEr0ZEPdUrz36nSAiBIpw2RJxjn4xwbVm5GqSZ3ligQvNR7KsGd8e7wbXtpeSr%2FAwgxEAAaDDYzNzQyMzE4MzgwNSIMuN5mYxYi8%2FQJYh4yKtwDrwRHj7rDiqcuglrBsgciar6nc5lU11pkxqUJKGsP0rDPdsLG56w3koigYRIRmftpxE%2BgZ7PKm1r9QQLByIvAV9PfJm8nYGOmgd5M%2BtA%2F9CQc9sirRt%2Fmi%2F13%2FnnQ7%2BMi%2Bi4l8ytPCKh9mEJeUrQBYI6rK367bUWM%2FLQYsWW%2FLZKMrxIq5j%2F3CGR3E9mVjsinEeRVdHKLcuW22JEQ0Ig1TfYV0HizJ%2F3k4rC8XipLv8OFWprWfr%2F2clbCOZxGDWl9sNVAVOm2rWgvrm5xmQgTdYJn7hA8DIGzBmkT4fZwJCuqp5jgQmFuhgjMA1loragLX%2BI%2Fkgr1WJ2lRBGvtkvutYgRkqbsHbNcGGVo%2BL%2FKpg8xG64gqxhk3bJpj4uO0Y9MbmwQ%2BFGrHsPTDmqH0NrtVYzRh3fTzKhfGblKMAcapGmYkDp%2BhJK9XMSw60ecQ6pIP3ZHrPZkAFwUUQFn%2Fz%2Bn0ev2qX8zES0YkoIoumFOA6kJ7l6wF1ouobR6PcRGSXOY0gZHCLTx2TTvt0SOghRXN9U4z64ew%2FBD6T3esbcw%2BOKWxuLH5W7oKexvcVRoQWSuotHF9BPmwEhubC9QoR4MjwAJfrgO5SSqpM41nfnbnSgH1%2FMVZ48jbeyAr04whcXkzgY6pgHwkEbKXlYT9qECMp0cRKczHgGQ1L%2Fk9qSPPzL5uYZ5qUp1AY7qxksApj6QOD%2BekM2vqSUcvbnR0ewhGCQfedgl4s4GsUsFMhCi2YHfLIZNxsM5XclQTMdty0hAYVGI5cbXFcLvSnkD%2Fntbapp9ZQ1zpfHAkO9cFhSQ8Fl9X%2BIULd4UFen1vuOjlVYAlHIay1rmHv4zdV%2BEGdkV%2FaoV%2F4kY7OACWg6C&X-Amz-Signature=fb1172cf60c137515dfddd2e950730f90b2b24b58c110a35a3f12b7319dfdbdb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TV7X5OZI%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T163807Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGgaCXVzLXdlc3QtMiJGMEQCIB%2FrjrYd%2Bq2ShLKSXbbh0Xdk8lnuLBEr0ZEPdUrz36nSAiBIpw2RJxjn4xwbVm5GqSZ3ligQvNR7KsGd8e7wbXtpeSr%2FAwgxEAAaDDYzNzQyMzE4MzgwNSIMuN5mYxYi8%2FQJYh4yKtwDrwRHj7rDiqcuglrBsgciar6nc5lU11pkxqUJKGsP0rDPdsLG56w3koigYRIRmftpxE%2BgZ7PKm1r9QQLByIvAV9PfJm8nYGOmgd5M%2BtA%2F9CQc9sirRt%2Fmi%2F13%2FnnQ7%2BMi%2Bi4l8ytPCKh9mEJeUrQBYI6rK367bUWM%2FLQYsWW%2FLZKMrxIq5j%2F3CGR3E9mVjsinEeRVdHKLcuW22JEQ0Ig1TfYV0HizJ%2F3k4rC8XipLv8OFWprWfr%2F2clbCOZxGDWl9sNVAVOm2rWgvrm5xmQgTdYJn7hA8DIGzBmkT4fZwJCuqp5jgQmFuhgjMA1loragLX%2BI%2Fkgr1WJ2lRBGvtkvutYgRkqbsHbNcGGVo%2BL%2FKpg8xG64gqxhk3bJpj4uO0Y9MbmwQ%2BFGrHsPTDmqH0NrtVYzRh3fTzKhfGblKMAcapGmYkDp%2BhJK9XMSw60ecQ6pIP3ZHrPZkAFwUUQFn%2Fz%2Bn0ev2qX8zES0YkoIoumFOA6kJ7l6wF1ouobR6PcRGSXOY0gZHCLTx2TTvt0SOghRXN9U4z64ew%2FBD6T3esbcw%2BOKWxuLH5W7oKexvcVRoQWSuotHF9BPmwEhubC9QoR4MjwAJfrgO5SSqpM41nfnbnSgH1%2FMVZ48jbeyAr04whcXkzgY6pgHwkEbKXlYT9qECMp0cRKczHgGQ1L%2Fk9qSPPzL5uYZ5qUp1AY7qxksApj6QOD%2BekM2vqSUcvbnR0ewhGCQfedgl4s4GsUsFMhCi2YHfLIZNxsM5XclQTMdty0hAYVGI5cbXFcLvSnkD%2Fntbapp9ZQ1zpfHAkO9cFhSQ8Fl9X%2BIULd4UFen1vuOjlVYAlHIay1rmHv4zdV%2BEGdkV%2FaoV%2F4kY7OACWg6C&X-Amz-Signature=fb1172cf60c137515dfddd2e950730f90b2b24b58c110a35a3f12b7319dfdbdb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VWAE7HHY%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T163807Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGgaCXVzLXdlc3QtMiJIMEYCIQCO2vRk7rdOkMPlkkkjcKswlua6LKN2g8tfObMtCkHB7QIhAOuwf02MB7HbEg91%2BlRv8NMJmMMa5FzYXAo4FJcXwtZkKv8DCDEQABoMNjM3NDIzMTgzODA1Igzphms3TeTFMKyNfDoq3AP9OqrnZy4%2FST70vxVyryV8ToQ0VvlNAJVxl3aISNJS2Aytf0kFSbPBAN1AWLPWdb%2F3VLHgeqd4jd9biYAzInML%2FQl5xDKy44Grbocp8ugAkYCkrYTu%2Fodi7w9ajHMmXyA70lw86UVG2svguhKEYCtRgDT%2FLljGXbHq%2FIlzWvFgsUshXmufD8eK%2FaGXZNKFzI0OZxHUO8u4DyoXolFSbTrTFwoqc%2FbncgmbR4gm8WCGyWiOZBPAIVR94qVRruXFUAe6Go7kPlTFQBzkq0G2HdYPjgt%2BzqKz%2BuSCUFuBqn8YeTFBNwAw8KLGPir%2FXANm19C5KX2WxXWu7aT%2BsD42GpNzySKOrBSvN6VcCVusUFcN0xcvVlVu%2FD4v%2FYjvJOscaVHI6%2FsWWpLjRjcbfUed4qKq3slYkW3pGusL8lDTBmAwHsG95%2FAvdIDTa9ofTYQvP%2F5HciRxq0O%2BBRbS9OZuY4Y%2F78WpRZFQS3xtlpumyOWBdT%2F1n%2FoFFlzB9AQqzYnwHa6CPlbwPdWGGaz4AZDEiZw0ANLEuH7L3OaB9fEQDx7%2BkCpS6vLy80wluqg%2BZyO3tBniXuvy4TXHqIYAifH7wyxhzmmPIzIKD6H3TWmfiTueXx2M%2BkpaG7dPCFkL0DCvw%2BTOBjqkAYTpe6NsSrUQlBsrYFuHyrIlqm7j8e80quCTOLJ74wOSworl4ESOZp3lFGdx7bKBSbewguWuYGAt27yjlXujsO9i%2FaBJzPtKDpm8V1MzE8zxz1w7TjH7Hen933%2BU8aCQ7UtkO%2FcT9AYdxYgspwGeY3fBOG6xEW2tJKwQ1NR73cZb74HR3QyIVzTP2gH0LJAkoHxbc2F4qnjkbYCvN5XeoqeoLL36&X-Amz-Signature=1bff2c0bffe56d74476083e780328c34fba160e34d0fae86b78c465227464723&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

