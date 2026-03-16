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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665PIEU5JV%2F20260316%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260316T184221Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBEaCXVzLXdlc3QtMiJHMEUCIQDP1wuiiiEuupSKj5E5spSjk9aG%2FYOwuIQeq4yeIIbwFQIgNFvB4GrLUZh8iCFYEv%2BgW1qizRc2L5XQLuRmDfcOd%2FMqiAQI2v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDAgid5Ajmz%2B1c4TjuSrcA9xdzVR%2BK2VLvG1tQYKROsZjU%2BxBTxBX8W0g1NNe%2FHw%2BrUAWwZ2na7LWoeHxAcaFkGXWey5S7NzRz2fzNzH1rh8Cgj2gpWo9cGm1jVmyMlh3I9rwXOCLeVAVb2Uc3t0iNslkASpl%2FOYB7uYznSlC02086GIxa3vHzJCwx1CINA0MUHMAnDKnvldxBgN8fecCXgDId7L7jpbQ9SWm%2FE5DfgbHbSeioNHC5%2Fq8fMJLe2KzKh5E00U9a%2BiL4F2QGZSjI1JpjYqSVq0E5HuGUz%2FDZR%2FEMD63eG%2BueY2Jmq1sr8zbTRGBcS0XgM59%2BNllex65JGVg0D%2FMw735GpvEg9MufGr3eVriPZYWDIkz2vwYf89%2BMaVPlh4xcPRrBy74GOI65ALrtpk3d5EWMeseInB38DQTupdMVmRXznjYe14tfuh%2Bn%2Bv4JBigMdw537qq%2FLGznVhw1ThsBkmQ4URW7A8Ge%2F0mJgJwlihvCm5lpvijblxbb1Y9BhFxzjB2IeHESbbEbg67mNp%2BVtmE23LYxfw20%2FJf3%2BTbugHosgrHTdpDfCeGQEz7uDxbJ84JkTCEav5VxxzbVMbCqTZA2zmrr9bTwxBMcOXkBY0VNOOAkSAF6N1GANo%2FWPoEmgvqsOaGMOfv4M0GOqUB0rTDvKquFZTU%2BwqyiN3%2FWZXJf%2BNGFfvTMS2bbhH3iDcbSZKSgbMyFb6WBFuACIhwoJC3P1xRnOXXNvc9jYFmJLtSmgaaneuqbxI0%2FXmEQX%2FOlkPzdBAZ6cjVMH5B5ES%2BvAf%2Bt%2F4qtF%2F%2BghTmXmqvYhsBKlnYCCiEX1jtsJmzIi%2FkNgWJ0jM2%2BmjJ656SgF1uKzVuFOlrFQFcoKFgfBInKfxXnE2I&X-Amz-Signature=121832873465bc8e9cda5c9357cc2050afc976ae240c0c6bd57bfd254e16f430&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665PIEU5JV%2F20260316%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260316T184221Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBEaCXVzLXdlc3QtMiJHMEUCIQDP1wuiiiEuupSKj5E5spSjk9aG%2FYOwuIQeq4yeIIbwFQIgNFvB4GrLUZh8iCFYEv%2BgW1qizRc2L5XQLuRmDfcOd%2FMqiAQI2v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDAgid5Ajmz%2B1c4TjuSrcA9xdzVR%2BK2VLvG1tQYKROsZjU%2BxBTxBX8W0g1NNe%2FHw%2BrUAWwZ2na7LWoeHxAcaFkGXWey5S7NzRz2fzNzH1rh8Cgj2gpWo9cGm1jVmyMlh3I9rwXOCLeVAVb2Uc3t0iNslkASpl%2FOYB7uYznSlC02086GIxa3vHzJCwx1CINA0MUHMAnDKnvldxBgN8fecCXgDId7L7jpbQ9SWm%2FE5DfgbHbSeioNHC5%2Fq8fMJLe2KzKh5E00U9a%2BiL4F2QGZSjI1JpjYqSVq0E5HuGUz%2FDZR%2FEMD63eG%2BueY2Jmq1sr8zbTRGBcS0XgM59%2BNllex65JGVg0D%2FMw735GpvEg9MufGr3eVriPZYWDIkz2vwYf89%2BMaVPlh4xcPRrBy74GOI65ALrtpk3d5EWMeseInB38DQTupdMVmRXznjYe14tfuh%2Bn%2Bv4JBigMdw537qq%2FLGznVhw1ThsBkmQ4URW7A8Ge%2F0mJgJwlihvCm5lpvijblxbb1Y9BhFxzjB2IeHESbbEbg67mNp%2BVtmE23LYxfw20%2FJf3%2BTbugHosgrHTdpDfCeGQEz7uDxbJ84JkTCEav5VxxzbVMbCqTZA2zmrr9bTwxBMcOXkBY0VNOOAkSAF6N1GANo%2FWPoEmgvqsOaGMOfv4M0GOqUB0rTDvKquFZTU%2BwqyiN3%2FWZXJf%2BNGFfvTMS2bbhH3iDcbSZKSgbMyFb6WBFuACIhwoJC3P1xRnOXXNvc9jYFmJLtSmgaaneuqbxI0%2FXmEQX%2FOlkPzdBAZ6cjVMH5B5ES%2BvAf%2Bt%2F4qtF%2F%2BghTmXmqvYhsBKlnYCCiEX1jtsJmzIi%2FkNgWJ0jM2%2BmjJ656SgF1uKzVuFOlrFQFcoKFgfBInKfxXnE2I&X-Amz-Signature=121832873465bc8e9cda5c9357cc2050afc976ae240c0c6bd57bfd254e16f430&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667OWPAPOV%2F20260316%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260316T184221Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBEaCXVzLXdlc3QtMiJGMEQCIGlL0bRatJ5EqD9stenJQIi5uUX8zSxid0xh3%2BTuB6FpAiALplt4m3Z5GDnSBHwnXhTUARmKM51Hp1NEGBtsM4XVOiqIBAja%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMX90%2F6%2F4XV3or%2Fc9TKtwDnAc2miB7qACa5WYBaiix5R3QGZscXClaWs19PLV7ybgZ4B799unx48KAtdMAPwht5pBsKzcBy3h654QGjL0cVrEA2ewYJf%2BTpTvie8dZPBTV3Hh3VT%2Bb7xKDkfgz3eDI7zKXZnG2k2zbI6R3lTD%2F1kw5KxEHH8KxJhEkgvYkCyQK50G9tT4d8Z5Y12OKV1B1A8pkq6NF9aNGzCDD8c5JXlQngpCjl%2BwB7jOTbVj7O3v7VX8RqEc1fKU%2F%2B7gAVLZWvBRlKx0twbhTwomJVdg8MHdovaJSBlmGO6BT4xXjhEg0pzV8r9lBfweWGIVNGRV%2BcvjeiBMo6PanZGJy55KbIBD2CX4nSZWXIsNbjd2G1u8DJangrJI4KEByLcxRTBQb9%2BiF4KIuYwM%2BySn4ScyAEvW%2Fe%2Fm%2B%2BIY5xZqXc0OyyKdcxNbIGut4UL8pe9uv6kvn1d2Dg%2BJcVZJGMiGoJN%2F2a1Va4VbD57v%2BXusLMg7f4pHkf5K0HK35OH8RHc8uR7lhrSkF%2B%2BfG71l91e6i5igv0EdDV3jtKmZsSBhJtmXV3XvcQ40sqavtOJlQDfZzVYJr7s3vsrhgfPAcAlIRRlXX8AKw5mN0EV6ODv%2BskILOuElWQaaV0KYzJl%2F8x%2Bww8O%2FgzQY6pgFzYqukywe9qHacJiHLGyJMXSMtEgeN41S9wPCqndeIDjK42iIMQ8QDLtHtzsEL2bR%2Fe%2FCHZqU5b4VTFpGQQ2EM9p%2FwP4%2Bhl7qhIKWHfWafo0cFdrf2hBoYkBbYUDkZSg%2FtTY65RiedV%2FROIUkibIFuPg483DN%2Bnt9yxNMo%2B8v9yVQcGQJoyk%2Bx1%2Bmnw54JqzHuK0CiQ3qBUZyi%2Fv0mAz%2BNeGLIiZJW&X-Amz-Signature=ad745db56f77203110c447ebcca87ad72b01a7e5caf1567ebe4cd921db7688b2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WPDHGYZU%2F20260316%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260316T184222Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBEaCXVzLXdlc3QtMiJHMEUCIQCKI%2Bp5qmK7lqmk3pycKHTJT7rJgEiiRtI5N2DTdKwTIAIgeqx2a%2BpO1LFu3B%2BRV2Z2KjSgesd21VFTss5QQjbp8ywqiAQI2v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDIBhpLBVW2rwMY5pnSrcA3xiKLpM0Hbkas%2FDiE0ehQSJoIpkopdbjjV%2BPs%2B%2Bn9Puc0yxDWsUZnu3tenTAftWUjME1C8wqv8yFB81Yy1DiPZ3lKS9Wyk%2F79ToYIyg91Ba51E6Ayi8JEtiDoPxdJ6wjwZ6hci4CnC9vxrk8efpctKXyAzDzK4YjfhATj0lmg%2F5urACHy7sNW%2FKUD8an%2Fh5UAc9e3bDMnJ4%2FLcnIQviv%2BKnIZnwRDzO532gvRifaemXac0BAM0Eown2%2BvQ84IZnmZ%2FYob%2B9Vl9JvECu4ca%2FAJVmtKY2XKJccRGT%2BpRksLz9fFp5R6WoYMXMTx2w%2FMitLqTEopDhJ3GQyteknc%2B2anouTQYgI2lo%2FMGXOoTOOga5PHXoG4bMrEnkjDSk1MobGgbtwJPGKlCvC8ZdMiN4CGX%2BM4jHaznOuADf3b1CjZDEqdfmowwZUNmVz2gZo5E8LMWyGBq0pTwYRTj5RykIRaBDOpQKS%2F43L%2FQUDB6MIj%2BUz72D4Hv9UPc41bRvHfNA5Li36hfac%2BH8M473kjZqkjJ%2FNja3fn%2BHbchhZVKYQD56%2FvLyBIC6U9gqyXd%2BCv25TBNhUOjVJJ4TTCACRogSkSuG2bN7vOTIkc5P6PNLYhd%2BbJxI9dZ%2Fl%2Fu267bFMP3v4M0GOqUB01wuvr8dQJONOioGhXCPFjrHnEYIhAVpeXDy2530krS5t3%2FQNfOvmZANV%2FF4I3kmyh%2BrCmRauuEe98pVnmhxjLf90Y1FMBHesfNM1h4LtVayixDoeOzbS9xd0IbN6LHp6Z0B90LU3Z%2BAbN0BBhtMQx%2BXXEKOyzjVFTIVQR%2B9FXCSn5dkYcsIaqHUqloiwpytgtLdsyryK18Z3ZLEHeAJgd72xZTm&X-Amz-Signature=9309617d389a2726da224a40899540b89a27f7aab7bd321f00ca4663dd71a92f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WPDHGYZU%2F20260316%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260316T184222Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBEaCXVzLXdlc3QtMiJHMEUCIQCKI%2Bp5qmK7lqmk3pycKHTJT7rJgEiiRtI5N2DTdKwTIAIgeqx2a%2BpO1LFu3B%2BRV2Z2KjSgesd21VFTss5QQjbp8ywqiAQI2v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDIBhpLBVW2rwMY5pnSrcA3xiKLpM0Hbkas%2FDiE0ehQSJoIpkopdbjjV%2BPs%2B%2Bn9Puc0yxDWsUZnu3tenTAftWUjME1C8wqv8yFB81Yy1DiPZ3lKS9Wyk%2F79ToYIyg91Ba51E6Ayi8JEtiDoPxdJ6wjwZ6hci4CnC9vxrk8efpctKXyAzDzK4YjfhATj0lmg%2F5urACHy7sNW%2FKUD8an%2Fh5UAc9e3bDMnJ4%2FLcnIQviv%2BKnIZnwRDzO532gvRifaemXac0BAM0Eown2%2BvQ84IZnmZ%2FYob%2B9Vl9JvECu4ca%2FAJVmtKY2XKJccRGT%2BpRksLz9fFp5R6WoYMXMTx2w%2FMitLqTEopDhJ3GQyteknc%2B2anouTQYgI2lo%2FMGXOoTOOga5PHXoG4bMrEnkjDSk1MobGgbtwJPGKlCvC8ZdMiN4CGX%2BM4jHaznOuADf3b1CjZDEqdfmowwZUNmVz2gZo5E8LMWyGBq0pTwYRTj5RykIRaBDOpQKS%2F43L%2FQUDB6MIj%2BUz72D4Hv9UPc41bRvHfNA5Li36hfac%2BH8M473kjZqkjJ%2FNja3fn%2BHbchhZVKYQD56%2FvLyBIC6U9gqyXd%2BCv25TBNhUOjVJJ4TTCACRogSkSuG2bN7vOTIkc5P6PNLYhd%2BbJxI9dZ%2Fl%2Fu267bFMP3v4M0GOqUB01wuvr8dQJONOioGhXCPFjrHnEYIhAVpeXDy2530krS5t3%2FQNfOvmZANV%2FF4I3kmyh%2BrCmRauuEe98pVnmhxjLf90Y1FMBHesfNM1h4LtVayixDoeOzbS9xd0IbN6LHp6Z0B90LU3Z%2BAbN0BBhtMQx%2BXXEKOyzjVFTIVQR%2B9FXCSn5dkYcsIaqHUqloiwpytgtLdsyryK18Z3ZLEHeAJgd72xZTm&X-Amz-Signature=4e9ed15b96b6bdd80b3e49b20d436acb3b1557d48fccc72390a747db84008ce7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WIE6I5WA%2F20260316%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260316T184224Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBEaCXVzLXdlc3QtMiJGMEQCICHOPLFq6qF859SzQLp1i%2BcTt8gbUaOTD9tEgK8Jb9OFAiBoLB7vjqfmTn%2BqQdVlvAvJV30vG7jWdH6pvyU6sCqDlSqIBAja%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMT%2BHr4FVcltpI%2B6vWKtwDLqhryY2prGSGMKTc52wbCuvTyUNtA9Dx8Ejvjptos61LkgIAEPwY7qyqTGFcTb3srSbgGAiScbqRevnRZM%2F8TJKS4JlB48gIyadYDfB%2B1BI9NMlYzWxDhBGfAcmg5H7KJ9qbPn%2FWfCOn3MCy0sDAluwhFyer7Kwy%2Bz1vdr9rTOZ0xUGfkDt1hkLTkgyE3A%2FoeRXPwXsQDf%2BtbzGiF%2BLZYZTh%2F16YsMqAuUF17uBG9ZuqKZC6337wyGPYIkwqaSCeT5R2mTma8Mn2o4NnTCDQjJPJbEnw5IC5emE0cTgkzoP8vQSeO2sF5sunTu%2BtpeRoVUImddveYdv19LUwyx5Hpz%2Fl4Fbq8Ubxh3wV5vtgpvw9XjCLCmoXhLb2xAzLDmowv6KSauqGaAoJawtIuyUkXd%2FjHHdEEUvVPTZrAeoF80rxSouKOGikd0UqXLZ3NiVw2LDN15IGUv6SqEV3B0nVlheBvgBDpvv7WQUuYP12X0WWzkYA8uKG%2FmREWY4gVlG7tjxQPDUNzlmu7MUFtkcNBMPUdivk2GqTwVm0VbCLp7EakMJxo7bfuuUVPULUbJJ8dAQjb1nv7fm5FhzbIFvQttCn19I7wmJzMlHkMUdmNq%2Fqpp90eyZe3tX7sZAw%2F%2B%2FgzQY6pgG75IPUwTUf9XWpAvTvgPMNT6WW5hGibcDGEnN0zsTm2OUFgLaelShC1G8zGu5iwUiuhWYAYVdMhOAvFcviQNNA99YIEXn9iYP5uHz4%2FiunifOJ2DqhsrWVi6KmSkLdEqQ7xi7iG2LBx3fcvoGwGO4ITqkq%2FwLMIFwTu7Q%2FqGwG13WBT7Us6E3QyP6n2t15AHcZdUElbxTyU%2FcpzOXkHsdMkCzHDzGq&X-Amz-Signature=9830241980658033b52abe8dd7328cf3b07b5fd5268354c3ba0737e0d2821eed&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZBTTNM4G%2F20260316%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260316T184225Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBEaCXVzLXdlc3QtMiJIMEYCIQDh%2Fpsi77UjCnE7Ic4qIVzYSseqKiW9BI6Ds9TrTD7DXAIhALu9M2nQAI4b3S5lEt6eZc%2FKPUV1BNaainNtEbLSu6KZKogECNr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igz2kSQikP4TLOX2okoq3ANXx4rJjiGrT5S87zl%2FaXIV%2Be6Er%2B9uRmlkddBVCt%2F1fA4oDEuWQwws%2FnEZlzliAt%2BFUM%2FyVOlhz2Y9SSnvSkO1BrmO%2FxcYWqflZLbVZEyh%2Bs5b5pwZXQqEJTSdsmXNm6c8Q4R7L2ijej3zUD%2B1drHgjc8p8lW5NWhdd7QuRQ0XnGV4TeBmmv2UuXAcXW%2FHLubeiRVvk1YMi3TsT6RViHWG4LFMzyr%2F7%2FP4Fb9cw%2BZ9VvgVS4zq%2FLDPGFU5fJ0PiCYP5%2FQ0cyCRzOgKqM42nJk5nhn5kI5sOz30NfrnTTZiu4Olvj9ZLfUqE2mQdDB6HP1KMWxnDHeCDk99N5Eu6lkQUqlZ8aUkANfElf43NOVsCkwMVCbqUIwmAWGhBcuhl5vCSrXdK4rVIbYp1phYRzzV6cHFkJm0P8QeNj5943rO4brgd2xy3OfbjmDsY5Zhn94b0B4tBPv8w21kH9mYJDq4d3ZQtauVVOdEGErXe7uaeFQtwLLEV5qNjF8r62Bb28AhhkRffTayW5b3TgaczBq4YUtVWhIiF0%2BvmksZg1ZXtvLL%2Bn0kUiecaLX%2FPfnjNE0vJJjMhv%2FT9h3BjWoPj8wA2%2FDcVnPM%2F2q9B1iXv9TqFBA9RbANBH7gIyduOTD88eDNBjqkASOAgwyyps4Mpn%2Ff61xLTtTpLPBjpuwbg%2BsXG%2F2xZeWX1uHnM9dplk3yFySaLTgHp24CBJhuM6y627iu3%2Fo%2Fbmd7uNjaDHvHpqDw0BF5vvxwerkGACUkBscveFZVqrlRrx5oOg%2FlXKG2tYgr522mni6xCbDFQjxWPKxiMvTn%2FFZ87pKqEIxYJG4i3WD6o80NBdtjparqxKEvjO323grsBBRj0OWa&X-Amz-Signature=604ae699b2a1d807ffff72c0a9e02b9a79a7ed4f3400de9ce49f2c81997b6643&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VRTPNRQ5%2F20260316%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260316T184226Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBEaCXVzLXdlc3QtMiJHMEUCIQC3WCp4McBRXzY6xre1di23UEvZJLbjMxqx%2FTH5rJJPwQIgeqkrMJe%2BNwq%2BfsZrnNGny61iHOlKAhn770WbXFPWvOUqiAQI2v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDO%2Bj9fb5Jfs7u5ObdSrcAwctIoUZ6s1FKrLW0HnoWIrM6zC5kDvBgisvIMjYkd8sxAHQwc22PbS8Y8jKLITwAUpcaVCwWJtZeh1UEe94J9quWzTJE5YccbC9am3kfSmHLhYNIbO9wvAZCX1RZ1wjVlJj9CJHWQaDeckMB%2BqD6yQ46blMIVcvTfk2SUaLwsaQRAEMr536lxWJblJwCzYa0o5%2Fyc2USY5L2X9q3zctTAbko2OpiCh7zQHLSYNMUrITiIzao1SXOHXs4XcSNNsfGo7%2FqYUxTg6Mbawr3G8Z4zWGH6f65SPrxkAB2JUgRWO4%2BZ3BJe9sdcAf26vSuehWZqtoJuWHbAu9aErxJmIIrg3RFsfUptNYu7UQcszPkPhKjNByBxcbh9AFnD59UwHU4nn%2BFnZFR3LNVR1DZPWSP18SDo7NkEpL46Il8Qx3QFVVeNAXUxoNB0PvdZiKf4yX%2BP6tBjTkjdsQhKLL%2F0Rs1FEcvQmDuBsq5UhNV5UV8NCorBg09qfdr7XfuT4Y61MFNKAnpnkpP6Wev34%2B9hi1Ji%2F%2BJg4sKk4FKqd4mCR3%2BtvyfMrjpbo9e0zKTGNjHsYxhA4zn8cfBwEtNQlEfCMRi71jqarmKGhXAUCcba5mu11B324R8ICkGG21DmbnMJTw4M0GOqUBXhh%2B2bLLIsv9t2aIc%2Bk7vPAGxezxbTCUGGIDaoIK9WYIlwXQsyq1uD%2BvhO3QwaEYntuPgqRAFv1oXzMF9vzynaFUO87uFn%2FA7dVmMYaTDZ4%2Fjfv4ueNvawecWHMSHQMr5oO0V%2BJKps95fPt856%2FgN85%2B8qZR5h8mvozLTSMs3Qg%2BImX%2FEBKgAWihl%2BRsQ8FaOIyjWRxFC1FCpfzlsEXvAyIektxc&X-Amz-Signature=954a9739e092c74a16f6c98cdb654cde4de5f827797e8dd7930ec7228647108a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QYTGDP5U%2F20260316%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260316T184227Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBEaCXVzLXdlc3QtMiJHMEUCIQCwStikEWrSnkRydFzJR0bqiHAxZvgkNZid3%2BAdxEs0KAIgRfKSk7yf2rGv7ZPxyFlQwwvARPJl8VKDMbKY21TxCmsqiAQI2v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDPH95i018BVI5u8HESrcA7namJOPsYM59C3V%2BJjCNHxhVwRa3RQg2ENloBmUcLjKAUQxkXkgW6Bd4BYC8eB6sqmzqqmWi%2BpzGZzfuzawGrHxjmLPIhyNzu3ztrd5sq0FCpNHgCsMG%2F1NbuAN2B6YZJlfSGkNeUVt8NKAJPneiEVS%2FAJ5RGF%2BkFbqODdDda7WDKbuL140mUBdHA5lpG0kOnCwR%2FajQWlFVJsZw%2F0v1pyT4ZfAHLbIvJnsJK5NfbUUQ4Rkbxu12iKElzECLorrGLzbgHrzMgRaf27pFJnGEfh0q9evVuUNnYIO51VodWV9Qba%2BX%2Fn9vmmysWOuoy3Vs5iiOoKQQFfWzyexGO0KId2zKSTE8bw4t%2FlHWklddTlz01rbpyyxYcz8UumYyPxOnlgKwicuLNk2YtSefoJkKfeyeCjMuZ3VUgqkRZ8xiC0san4yBdJOvCStgjbsSbZzO%2Fl8W9pjTHWMYFNW4qyJTFo29FgyABO%2FF5EdtY1SwA1LmzLQhArqZTjj%2BwL%2Fj6GUOEuM1969V%2Fp8OD%2BMvwIlANW1RJlOL6kjgsQBOQtGPhiRqdWi54K0Sv%2FFF4I7DefDrPGszq8VSEGwVyBdmMYoPgQLh5fR4FoiP7AGcr3ZwxwdxO0UvMskWMw%2BDcXcMPvx4M0GOqUBCaEDujyQ771gDzpadMJUrctdEC5lMZAnudP99A7A3GCJzVqhnRSOMddwxdS4KvjBOL33GBsDWA3FASLq%2BeaLgPvwC2emEFJkVWHQYL4HmuRHukX4kWl87tn82MmokDEp1LwNxKkp1lyBgXcBQgPA%2BTu7SMwInlX2gDM%2BfNrlOb8BECc5BjW1G%2BCVgo%2BwshMmBU1n06LUoXMTG%2BMYyYG7Wi%2BVw8ss&X-Amz-Signature=0b20279b132e23cace8bc7e4fa0c7fb1c31a3aa23ecd2cb6d86a66e037223ee8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QYTGDP5U%2F20260316%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260316T184227Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBEaCXVzLXdlc3QtMiJHMEUCIQCwStikEWrSnkRydFzJR0bqiHAxZvgkNZid3%2BAdxEs0KAIgRfKSk7yf2rGv7ZPxyFlQwwvARPJl8VKDMbKY21TxCmsqiAQI2v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDPH95i018BVI5u8HESrcA7namJOPsYM59C3V%2BJjCNHxhVwRa3RQg2ENloBmUcLjKAUQxkXkgW6Bd4BYC8eB6sqmzqqmWi%2BpzGZzfuzawGrHxjmLPIhyNzu3ztrd5sq0FCpNHgCsMG%2F1NbuAN2B6YZJlfSGkNeUVt8NKAJPneiEVS%2FAJ5RGF%2BkFbqODdDda7WDKbuL140mUBdHA5lpG0kOnCwR%2FajQWlFVJsZw%2F0v1pyT4ZfAHLbIvJnsJK5NfbUUQ4Rkbxu12iKElzECLorrGLzbgHrzMgRaf27pFJnGEfh0q9evVuUNnYIO51VodWV9Qba%2BX%2Fn9vmmysWOuoy3Vs5iiOoKQQFfWzyexGO0KId2zKSTE8bw4t%2FlHWklddTlz01rbpyyxYcz8UumYyPxOnlgKwicuLNk2YtSefoJkKfeyeCjMuZ3VUgqkRZ8xiC0san4yBdJOvCStgjbsSbZzO%2Fl8W9pjTHWMYFNW4qyJTFo29FgyABO%2FF5EdtY1SwA1LmzLQhArqZTjj%2BwL%2Fj6GUOEuM1969V%2Fp8OD%2BMvwIlANW1RJlOL6kjgsQBOQtGPhiRqdWi54K0Sv%2FFF4I7DefDrPGszq8VSEGwVyBdmMYoPgQLh5fR4FoiP7AGcr3ZwxwdxO0UvMskWMw%2BDcXcMPvx4M0GOqUBCaEDujyQ771gDzpadMJUrctdEC5lMZAnudP99A7A3GCJzVqhnRSOMddwxdS4KvjBOL33GBsDWA3FASLq%2BeaLgPvwC2emEFJkVWHQYL4HmuRHukX4kWl87tn82MmokDEp1LwNxKkp1lyBgXcBQgPA%2BTu7SMwInlX2gDM%2BfNrlOb8BECc5BjW1G%2BCVgo%2BwshMmBU1n06LUoXMTG%2BMYyYG7Wi%2BVw8ss&X-Amz-Signature=5baaca39ca4c38cee950f4007fc0e261f4c557cfe6149484126460beed59c86a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46634RVV4A3%2F20260316%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260316T184213Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBEaCXVzLXdlc3QtMiJHMEUCIQCrtXSZnTVpmDcdNYwvzbt1GzA8fI16iL%2FBU%2BPOb74ObwIgQzJCyAEkR6Mht6Dsf1Zol5Fc7uEExlwQXR4pJTkfluEqiAQI2v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDC4mXe79IUnGGSotdSrcA5rd6ofsv6JcLu%2BsoXZxZskU9SwTzrS4ZOJKa0%2BlwKnCMcXDu%2Fx30xixk55%2Bq5zqEASbZWvl0X7V3NjIJZWgubTmy4Gxp5VCgaHUT6IeGCtPhKzjUIX%2FRyEAM4lwFxRuWedpzFCiEdMvgsdTwJBQWLiiaR4uDUtkf6nsxaq%2BbbXL%2BEHM%2BZjmseSnUGsixMGAPmu4rmhTeipk4G4N2id36x4qSNYR2hLOa2iBDj481rjwn4ae3zlrV2LWUOk6bWK6ONKQQMGf%2By9thVWIvN9bpIspoxZdO4%2FplaWGxlrfL59uYAequiocgOP4HSSRu%2BPEMBvVxnd1TdTIjWg5Rv2MaKDGwW7C4WHOW2Z9DKksv46rexR9BgAqqP%2Bopl58RI6Mwc6GE7dZQC7TMslCdGosRkpvhH6kr6XqEDcer2KOeunFO%2FD0AmJQW%2Fy3kCR5dOeBux8FzAIP2C8sYm%2BJ2qGkbskUyqcEU%2Fd0cVBmhA8oIfinjwQ5ZBOEQApiByZtnk94x49zKYR9Ns8s1tTXSRPE7TJ3cTUZX3JDdCI71qQq3RuFInNtb85Tse31zKopSOUQx5A7PqhNRh%2BsvNpXkunxcERaog3lYTl2dD3hzZfASXnhf5B67PCkkniZc4l7MLLv4M0GOqUBTzOBZu25Li18RxEiFwf34jh%2B0f0OrCwnhkfTZ4haz54zu0fDoPZ16dbYWVnIBzR9Va6GU7Z6LUDaD73ElN1%2B7eC%2BhPzcSCwmBFuuFbYMNW3W%2B2AwsooKfxhywgfia%2Fpe6MIWP6%2Bzg4TFJ%2FGQhdWdXB36mtLAVfe49sMacgHdWA913XSXroW01lDlo5NdE918OyHh2NQD7imsHrL2hOFpj8HC2MLo&X-Amz-Signature=255e67764d0e771f0dfabd1e4e4ed5c131223948ad0230a2d39e6e00c12fa9e4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SW4MOHVD%2F20260316%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260316T184229Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBEaCXVzLXdlc3QtMiJHMEUCIQD%2FQO3ohqB9kLVOl5Sac3kKWW0vpW5%2BBl1VQKHB0i%2BGyAIgY27nVodWTYFHLWnaVaP0fQ8LOgqnSgzl6SkbrAQfo8oqiAQI2v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDHZUvCkdfQYsHdZrwircA0gWt8jrfAF8NV7L9R7%2BorenVMlqRdtdD880TQc6G4cAU3cEoVCnOVUSEfzAR%2BS1Zjd5386SMdUa83LHseSb2VjjVA6a7dgN0bcGUomEHZXDLt%2BETUJlLqotE%2FI1uAB1pD23W42FKPu04%2Bpz2gKJQRM8qUxT%2BOV6TI6l3MdpBSZG0myrMGpzB8BBUfPwJKaM0y%2BLflAiDv0Tkkw90%2F0odaA2XoulyXg%2FH%2BF8ZvFvmzi%2F7TSivtegxLLQi39KlYskh8Y7u6wkrPkZnJt%2B2V63FUWghdjcSdGS1ATzQcDlOJ0bC0m6SmwzLZeO11gtlSKXEwjBtGxKFNUpjvl2R9t1IdZ9u1%2B3Oni%2B%2FGMclAa8D1ZBUXzi8vCwH9cLZKcYvYgh9IAr2FOeOjZ5vO%2BRou4OKKQ9s0SGrT6bsC9VcyVq5F3BI8p9BF%2BV6rbM%2FdUUdtqTReZTByQtvu25fOeahXjJX7FFQ0%2FN0wBkVSf8kV23pGTKJPGgOCw0JbnJS1idu9Jtv05LDRaiaRq66chHhrerf8Xtcnh84BnIcqX4vDZYne546wNU1cwk0bjO6rJ9T3LMc%2B%2BM%2F3rJfrYG3CrBT3DNIk2egyMOsv%2Bagt3ps52eFU9B2PkirWibd3Ldey40MNHv4M0GOqUBJUCQ32YFmX2wncj9PiCzQwF6ph6GBIKs1zMwHRxSPlKAt78rsp0tfuxEQ6FuYgo%2Fd%2BUWuW1NGl7qkZcPtWDqNKqzbhOx9o%2FymJUAFFbw5Z5Lff2M0Gov0rkU5fFvXWacpWRzf2Y%2F%2FQq%2BIM0avfuUTX8QRB4aF%2B3gL0VBy%2BGj6mg%2BX4X1yY9XtyYt7Map2ChdiJHK4asVawWH3KPN3gLQaVImdijQ&X-Amz-Signature=2b20f32a620b79468a789799ee799b5b0f394efa3b564b784ae1ed9998c3507f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SW4MOHVD%2F20260316%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260316T184229Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBEaCXVzLXdlc3QtMiJHMEUCIQD%2FQO3ohqB9kLVOl5Sac3kKWW0vpW5%2BBl1VQKHB0i%2BGyAIgY27nVodWTYFHLWnaVaP0fQ8LOgqnSgzl6SkbrAQfo8oqiAQI2v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDHZUvCkdfQYsHdZrwircA0gWt8jrfAF8NV7L9R7%2BorenVMlqRdtdD880TQc6G4cAU3cEoVCnOVUSEfzAR%2BS1Zjd5386SMdUa83LHseSb2VjjVA6a7dgN0bcGUomEHZXDLt%2BETUJlLqotE%2FI1uAB1pD23W42FKPu04%2Bpz2gKJQRM8qUxT%2BOV6TI6l3MdpBSZG0myrMGpzB8BBUfPwJKaM0y%2BLflAiDv0Tkkw90%2F0odaA2XoulyXg%2FH%2BF8ZvFvmzi%2F7TSivtegxLLQi39KlYskh8Y7u6wkrPkZnJt%2B2V63FUWghdjcSdGS1ATzQcDlOJ0bC0m6SmwzLZeO11gtlSKXEwjBtGxKFNUpjvl2R9t1IdZ9u1%2B3Oni%2B%2FGMclAa8D1ZBUXzi8vCwH9cLZKcYvYgh9IAr2FOeOjZ5vO%2BRou4OKKQ9s0SGrT6bsC9VcyVq5F3BI8p9BF%2BV6rbM%2FdUUdtqTReZTByQtvu25fOeahXjJX7FFQ0%2FN0wBkVSf8kV23pGTKJPGgOCw0JbnJS1idu9Jtv05LDRaiaRq66chHhrerf8Xtcnh84BnIcqX4vDZYne546wNU1cwk0bjO6rJ9T3LMc%2B%2BM%2F3rJfrYG3CrBT3DNIk2egyMOsv%2Bagt3ps52eFU9B2PkirWibd3Ldey40MNHv4M0GOqUBJUCQ32YFmX2wncj9PiCzQwF6ph6GBIKs1zMwHRxSPlKAt78rsp0tfuxEQ6FuYgo%2Fd%2BUWuW1NGl7qkZcPtWDqNKqzbhOx9o%2FymJUAFFbw5Z5Lff2M0Gov0rkU5fFvXWacpWRzf2Y%2F%2FQq%2BIM0avfuUTX8QRB4aF%2B3gL0VBy%2BGj6mg%2BX4X1yY9XtyYt7Map2ChdiJHK4asVawWH3KPN3gLQaVImdijQ&X-Amz-Signature=2b20f32a620b79468a789799ee799b5b0f394efa3b564b784ae1ed9998c3507f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QYZTXBRY%2F20260316%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260316T184229Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBEaCXVzLXdlc3QtMiJHMEUCIExh%2FR00JJ%2FVTMSURNxVTCjrTRESTvrWQENPBuG4k2SnAiEA1azBpB32V7aaF2utIecqLN2%2BwrkGaDGsE3CEEJJwVtwqiAQI2v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDG5WcdRByJxmhYiUPircAytPFgpsCVQ5wxFJezEd2L%2BNF%2B5b3NRqrPrFhezCXFpYi30PG0e4ZlXZzIBmQzdC4OQfEzIPkwmkSWZKvTMZeDJU9UBHVA1yHtlPHCcP1n69uPr8dYyamnsUl30AdYQegnmgffsT9jJYPyzroiA99TWZfv%2FHrVOhCJe4%2BaAlR1rb9C8zOzp0dvR8icVfCdCtow7idrtIHa1dNI9imrn1KE%2BETAg6nPUnCCojQNFK6aY%2FmvAxSQ8CV7Q9pXV1s8IFrcixZG1RPAhr4FEK%2FhKrp8yEzXcqoQTPgOPB5qqtq%2FWw30BKZzSvx8eH6gYcQBR1eVeRHrIeoa8bU1TlTMNPmU0nOOjcyvdIbpTgdbaTd7dfQcVRODW%2FGD0yG4WKTVhlTD0HAO0Fx7V2qhFh80JwcOfAIuEU7rpj3pn4ywTS5%2BvXE%2Bxm7GQGYEhdNtastp3N99%2BgdK5mITgsAYK2GlClvSN9juNp9glD45A9HC8xvI5AwKO4MoA2eHkpNYB7kFnnKc0IE0yf9YNE4wFBzreM67Dw7Pxyv0lBee8J%2BD9y4tdWLPIW7%2F28Am1NpBtt6Ewy1J%2FRUOUNkwMQ%2F0Ts4DTLbARbMDJEzOshVNNswJjB5cKmKbiw59c%2BqkbpcCvuMLrv4M0GOqUB%2FQP%2FeiaecswzXxTk3Jf%2Bv1HqIQobRYwIij0IZoqD7jE61k0GsPoUxRJ5vKtLSIo85xkBy8PJNTThHjWjim8EqFC6r7FWuUYaZTb%2BpkyC0TE8PhKZ77LS%2FHkhqvajhnDAj660cyDwB8WTf4XrV1XFqlOQYP1d%2BCG9YzX9VXkKlHeGDbqIEINXNGr82f67iHkRNXHo7agmdRHopDBd%2F2GfH021QnyK&X-Amz-Signature=2a593a35f956307a7a1c4651322cf4eed1146392b5b0ee0e938cca437e88b84d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

