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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VTQ6SPUU%2F20260427%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260427T175639Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAIaCXVzLXdlc3QtMiJHMEUCIQCnWOX%2BFyovFBfEREjeDWIqYUPfHX1TaQ5GhBPotAOsHwIgFJsKtm6NMExcBMAUTkHLmfq%2B6Z4BVDJ7pE%2BlAcRk8bwqiAQIy%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDIcOwCQR2O6MaO1yMircA5Bq%2FzOhVcrBccQb7DmOQRBNOo19rh7Q1EWaIoLkCB4uefUaJOL%2F49BH52W86U3nCDGYcvmBBCwDrUBUiGpG0NLEW0gUHlgaVeQMYq6SKWwfOozvyxQJDcGR9clJt%2FgC1Gm43EkYmeWQjM6HpUSM%2B24QYRySezrKTHlhyyROEoKzKhZYM07QPJa%2BhfKgg08RcyrDFPdowOvDB0OozvcHXUiB2UV5w4Xb9j%2FvXVhgUlOSrhOn4%2Ba3b0uIwKnN99HNcbEbAfxZL8jIXhH1V11bjT4WFT0Nu%2Bx%2FIu4rl0FpuSW3yhpfSZ00MfrmdcMDm2Rraj0F8xY6rCDcFSxNfwSAp7%2B4TBZFm3xwKX2%2F7ChiwCfPE8r0dEu668x55bcfyO6ptdDnMAjWSGq9vbm0xmU8kRdD92hqzMPNTZgfXWTxxH0cyqwuRJbJu53529s3x%2Fwikc%2Fj2QKTntwBYZVPoe8cegYcjTU2dno3k%2BfvCPnBBUul7DB5svhyjSWyMPbBmsG2qlUdykZSFQBeZ1LK1IgWPL%2BL8NGG9tC6WAiqlwqp99OSi5iLR5B6YjHJZnbYGMEVl7z%2B0i0yOuWeE5yZNPJhtwWlhYNO2ZDYilt3cbHockgEQIvHsEDX7tZq2p7BMIfBvs8GOqUBD8ND8Jh6cuzH6%2FAGws7vIjmZcu6U9GC8EeprVqwInWjgKEVtdo1ViXq8fqJJFw%2FRMvtON6EZJhhpI1Cp9pvu%2BJk1plzKJyQkSHb44WoehE3LR63ow60dQAGejdzFBtgaXgIbjcg7NFmwwCkRcnwAIJeFEgOSbiJkwqYcI5InCjy%2B0%2BXVc%2BzwfToPT2Un0ZbcbqEfNjMMW6tOFoEoFrXVKY5qwkos&X-Amz-Signature=1c71ae5e0112fe8118cd0cefad242eea0edbf9f17ebde489b1bcbbd8e5cfba9f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VTQ6SPUU%2F20260427%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260427T175639Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAIaCXVzLXdlc3QtMiJHMEUCIQCnWOX%2BFyovFBfEREjeDWIqYUPfHX1TaQ5GhBPotAOsHwIgFJsKtm6NMExcBMAUTkHLmfq%2B6Z4BVDJ7pE%2BlAcRk8bwqiAQIy%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDIcOwCQR2O6MaO1yMircA5Bq%2FzOhVcrBccQb7DmOQRBNOo19rh7Q1EWaIoLkCB4uefUaJOL%2F49BH52W86U3nCDGYcvmBBCwDrUBUiGpG0NLEW0gUHlgaVeQMYq6SKWwfOozvyxQJDcGR9clJt%2FgC1Gm43EkYmeWQjM6HpUSM%2B24QYRySezrKTHlhyyROEoKzKhZYM07QPJa%2BhfKgg08RcyrDFPdowOvDB0OozvcHXUiB2UV5w4Xb9j%2FvXVhgUlOSrhOn4%2Ba3b0uIwKnN99HNcbEbAfxZL8jIXhH1V11bjT4WFT0Nu%2Bx%2FIu4rl0FpuSW3yhpfSZ00MfrmdcMDm2Rraj0F8xY6rCDcFSxNfwSAp7%2B4TBZFm3xwKX2%2F7ChiwCfPE8r0dEu668x55bcfyO6ptdDnMAjWSGq9vbm0xmU8kRdD92hqzMPNTZgfXWTxxH0cyqwuRJbJu53529s3x%2Fwikc%2Fj2QKTntwBYZVPoe8cegYcjTU2dno3k%2BfvCPnBBUul7DB5svhyjSWyMPbBmsG2qlUdykZSFQBeZ1LK1IgWPL%2BL8NGG9tC6WAiqlwqp99OSi5iLR5B6YjHJZnbYGMEVl7z%2B0i0yOuWeE5yZNPJhtwWlhYNO2ZDYilt3cbHockgEQIvHsEDX7tZq2p7BMIfBvs8GOqUBD8ND8Jh6cuzH6%2FAGws7vIjmZcu6U9GC8EeprVqwInWjgKEVtdo1ViXq8fqJJFw%2FRMvtON6EZJhhpI1Cp9pvu%2BJk1plzKJyQkSHb44WoehE3LR63ow60dQAGejdzFBtgaXgIbjcg7NFmwwCkRcnwAIJeFEgOSbiJkwqYcI5InCjy%2B0%2BXVc%2BzwfToPT2Un0ZbcbqEfNjMMW6tOFoEoFrXVKY5qwkos&X-Amz-Signature=1c71ae5e0112fe8118cd0cefad242eea0edbf9f17ebde489b1bcbbd8e5cfba9f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VGHEQHQ3%2F20260427%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260427T175639Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAIaCXVzLXdlc3QtMiJIMEYCIQCz%2BgFxHg2sEVeTDbiok84kfyah4jZqyy86lNXrxKj%2FSQIhAOVlVPiTaxSVCcDxjSYR2HmFPlnplwMihoc3yrblQTjiKogECMv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxH%2B3K%2FmP99ZDeD19Qq3AMeEljX9HnBAM2s6gyiQ%2BZfMeVgH4WTUEJFCL8PI4%2FhjkczlnpXAJxH1GKK5eERusdUpGeV%2BvHqhaTI08aa4U6SbEQ26LDl4hdUOMmv8tZdJZIjrrCBdlRIZdmdi0TPBxFQsb1VSWIlhszZsilH6vMa2ZkufyLhKXyKK1k03u9KR9u20uJU7mJ9gtgCW6p4EOJEVYGun1tWE%2FzoENq8Uhcn8%2BMpkG9I%2BaWsSJmbIWWnXS8CT%2F%2Bn0pzK4uLOyKeXs6oRG2Z8up1p4NLjSXdmxAaSDfVaFhQIYPuIJJZXQ1mk4LZDwo7JfUXDkR8dtvTN%2Fedkve7%2F%2F5CII8%2FgqD9dXbedAA81lhQE%2Bzsdma2ZGzoZanDlvM%2FZsjKY8rfm1Nymvig%2F5tBv62Y6uUFvWfRSERfbV0Gi%2BnTMkkbDY%2FJYY3Dav3bbTzb6VuLrVIR8X5aQBQdRVcONX4rL1bw7yR8DBk9YQrQaCJG22wBdgbiayI3Ix%2FvoS8PUFLUHdPMqfFjhTpzJoWkdRyRmV9w320T6BjtuMJvokdBYD7dBZgnoiU4I41OBK1sfLecTivv2v1eVPhzMPKC%2BfdqKkc9wJXKAPCEpLIvyWL6JhicOWFKfpeoOI9%2BCyy6pcaWmSvInVTCUu77PBjqkAb96VSDotIvPUn6tygz2jSjqu2mchnIU%2By1FtKEz1HGEmhLLVjLINAXOenPt5a%2BNJ2DJktwVOL2aWbnZQKR7JpzGWxZLhLGlqrCx5HfZMjuk5ZkInYMhTFCuqt%2FFYJQeT3QuG7zqUUHBqZzP5gnezuBUQFR%2BKFsWQMsmWeErGgkoCm2%2B6OulXQS4x0FGMY2tCBCuZaWd3uMXgfSneune44vB8Qys&X-Amz-Signature=7881349adcbaa7ef24e804b78ff9f64f893f671ad8bd93f5d9335d95f825fbdb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S2S3SVVP%2F20260427%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260427T175640Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAIaCXVzLXdlc3QtMiJHMEUCIFvVh8aQUA25byWo2wg39piXY2jC5FqBvoR7uPsw9CdLAiEA3t70sjojCP642hbb45n4nwDw1j3CNty6vx9y9GIfsnYqiAQIy%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDITCMss34jRzz%2F9MOCrcA7LzGp4aHFp0d3WIT%2Fd9M54VItyXQqwuxaOhYTzPjnwjNm5GTKsI8SioztZ1C9xINUxKBBDwj6uZ%2Brioy74NWC22nznoWsyZh4wez8mEYDzHuU7jk7g0SlSMYdictLUaMxxplUpagHTBNLzURAU3pCkZEIut%2FKDkJfe%2BatKaIygvMJ%2BkoDIdRV9tDI9FUqteLRJDg0Oj%2BbHDdw8j8LyrHq%2BMYZrXKlIAbK4ZAGZ3%2Fo9ksvrXDN2Pa2BqwTBVQaznsvbMK5UDK%2BTYAUiVXaMvvfs5Yod9jMAV5p8zWqJLy2%2BY0PyrwKJEn2wEqQMqcUVgSDA7qHmj5uJrsI03o2n7YV%2BDqBKpP6p9GTrBFwv3ShjUKfh9xXdsVv1ASl90epMTqhuqwbD7bj2Uls8Fl2toIRR1f%2Fxz03iUe49JcVqwbP6taW9z4FHRbDAg3C5Zi3ew5btepm3%2BNOmdzvkbuEXAXGhWzWQNS478DOexdoCtC9nFCz34t1qe7O7Gha3V4ctogjJrAij56KzuLxNR4I8hZuN01zmTYIfhRWxf9SxC1xoYCnshRdppTK%2BXRxmT1F1jLhu4oQOluknK0gO2uH0KYu4HAxckNvOyHVZdZzrpDqi8gYGDpub5nAdxHzuMMP26vs8GOqUB0WkmnAn5i%2FixXVQW%2FXdb6Q4ydsZ%2FjNQ3au1qFPKZ7DiiEDrrLA8GF4WZA82SYb0izb6hfKmLcLKVCfB%2BU1O7%2BxbNQepG3a%2FctPDYD9gXMXsuQisLdLrPCpxuZ7sy6MtXBJnNhwSHzIVMp1YLSxGo6SAANfP9mQaZZGDJh9h%2FYZ6mjInhGKBjuNWgLZHgIxXw13%2FexKkp9vYgrP13NptZ3hQt78Pn&X-Amz-Signature=d863b5f3b8e35d9a43ad946a05aecabff951fc3ba0c61335b2e42796f1746e06&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S2S3SVVP%2F20260427%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260427T175640Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAIaCXVzLXdlc3QtMiJHMEUCIFvVh8aQUA25byWo2wg39piXY2jC5FqBvoR7uPsw9CdLAiEA3t70sjojCP642hbb45n4nwDw1j3CNty6vx9y9GIfsnYqiAQIy%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDITCMss34jRzz%2F9MOCrcA7LzGp4aHFp0d3WIT%2Fd9M54VItyXQqwuxaOhYTzPjnwjNm5GTKsI8SioztZ1C9xINUxKBBDwj6uZ%2Brioy74NWC22nznoWsyZh4wez8mEYDzHuU7jk7g0SlSMYdictLUaMxxplUpagHTBNLzURAU3pCkZEIut%2FKDkJfe%2BatKaIygvMJ%2BkoDIdRV9tDI9FUqteLRJDg0Oj%2BbHDdw8j8LyrHq%2BMYZrXKlIAbK4ZAGZ3%2Fo9ksvrXDN2Pa2BqwTBVQaznsvbMK5UDK%2BTYAUiVXaMvvfs5Yod9jMAV5p8zWqJLy2%2BY0PyrwKJEn2wEqQMqcUVgSDA7qHmj5uJrsI03o2n7YV%2BDqBKpP6p9GTrBFwv3ShjUKfh9xXdsVv1ASl90epMTqhuqwbD7bj2Uls8Fl2toIRR1f%2Fxz03iUe49JcVqwbP6taW9z4FHRbDAg3C5Zi3ew5btepm3%2BNOmdzvkbuEXAXGhWzWQNS478DOexdoCtC9nFCz34t1qe7O7Gha3V4ctogjJrAij56KzuLxNR4I8hZuN01zmTYIfhRWxf9SxC1xoYCnshRdppTK%2BXRxmT1F1jLhu4oQOluknK0gO2uH0KYu4HAxckNvOyHVZdZzrpDqi8gYGDpub5nAdxHzuMMP26vs8GOqUB0WkmnAn5i%2FixXVQW%2FXdb6Q4ydsZ%2FjNQ3au1qFPKZ7DiiEDrrLA8GF4WZA82SYb0izb6hfKmLcLKVCfB%2BU1O7%2BxbNQepG3a%2FctPDYD9gXMXsuQisLdLrPCpxuZ7sy6MtXBJnNhwSHzIVMp1YLSxGo6SAANfP9mQaZZGDJh9h%2FYZ6mjInhGKBjuNWgLZHgIxXw13%2FexKkp9vYgrP13NptZ3hQt78Pn&X-Amz-Signature=153eac636e1a74f38d6d91bd0a31c80cb2005617e80d39490910f1e4f44c7701&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667PG2TCV5%2F20260427%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260427T175641Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAIaCXVzLXdlc3QtMiJHMEUCIQCnxJ8VXGJsruSqwIN8AkR4KvVwd6tsuw35B3LtkoLmsAIgCMkZ8n%2F0mturvu5g7lkCmrMawISwuRWcA7xJC%2Fh6NykqiAQIy%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDCsI1G1yl0SuyCqZJyrcA6Qy%2FJUwoVXmAU7s4vVVbMCPgBOupm9Ci%2BqgpyDaUIBY0mZvniKHD7pclIGO71WSjVOc3RRwij5B%2BgLEEDSfCVRBiatoAvjKeJNpy%2F5vDQC6Uc0XNGYh3ziKi1EBG%2BIgjsoST%2FhqutcOhWkWNrpwofwIeFD7l%2BELlLhzH0o%2F%2FEjxyVIW3weEeznXHxjMXw%2FGiv5duKyDA5LkHIfTpyGVxUr3BdoTCD1pdubaeXgkPpTNZCwc5S5RUoWGxhkKCfZwv23Ciucr9w8bdmCAW4cS5A1zQ9TIl%2F9Jf9hmOHjurlw%2FEMdHtIWi2LGa5hcKQIkzH6coL9mCWaMshoH2%2BCmIX25ajsOG9rCnCvqudq9Uo28UdFcHhtcs1OHsZRWVtpBFwjIxSBIuMdqrg90Hhm1ddxYSjzq1uYGzDmZb%2F0I7LrIwiHjiDb9JTOzMJiRFY8%2FkTClRJmUcQcC7BT%2BitbPYrZIE1J7LbM0%2B%2BrR9TVZGqeyqsjZvNPvHeWlHRpjQlXKctE9KESZBbpwNVf2jbdeFAoRlxjK%2BdyxNXTvSXvW83Nxs4oQOdsAKvG17o8Q%2Fv4YK%2FZberb%2FB3axnBLfmq58H1U6r%2BhZ1AFpqTzwHu72ErZA%2BLXWjhktdt2jQwCiEMN64vs8GOqUBDMz466%2Bx9bt7oGG3TOMgYeitvrIW8zoXPqylKWzHMknY2BbPgLgJWBMJeW73hPgjUgwhMD0Gy4PFQD7beCXyxZalT4KNYz%2FpacWea2GOZdhNm0CmWE6vfrRmq%2FEBKnwX6EfMJvYxwlT8y%2FbZHEI6hZJKrJTNAn5oTiHL7tAH4OvoE2Mv8bnFjXllUR3moGJ8OFpk7YRhWOB%2FM4DclHqLYvYztfkL&X-Amz-Signature=84f324ecb79e4b50ff94bef63348b87c55de95c62c1e2467dee4b0eae53449c8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664XM34GVD%2F20260427%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260427T175641Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAIaCXVzLXdlc3QtMiJHMEUCIFMUcu%2F%2BMxqhiFc4mG0xsRyMr3zaBNDrXxpSU0SG6hQmAiEA%2FYec%2F%2Fsei%2BIMHoCpofI1AlBHu7kyoNFStg01ql%2F1TmkqiAQIy%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDFrXYokHSxPpufZJEircA154keKB3VRVvK7BO%2FrSjrPZlUSd2V7LF7Rx2ppAAAT1CmxsXkWHFYTigaJZWfXex9Z6B%2BtcCpro63ievl5F3VmMGNmWc21R6tPS%2FuqwBYxlk2PvwRRsFYROh9mq0nIvczAqQgqliEKiouZ3wbrhebDkYanp8AZ2JaUFw3uZgSaEhj7Yh%2BnfB7FPCQ6xXO3dXRmaUM8YzngULpkIG1stLU200JeedFi%2FVmnTXI04Gotnn%2FXBTlHjcBelGxSwIWfyjdW5KLqaAXhS0VjnJls6oMxnArvV3Ohu725WFHidg5%2BoqM3AZh4VKAd8EMEvFj7ksSCgSWpy5uQ%2BZtLR4f4gsXMg8PrEhl6GfOb9S0fiKEzQAKUxUBD177fBNlAfkFZuv42SUdkR6JNhuyhqjS%2F6cm6t9ygh%2B08wXThxskZyLKnYoMQ%2F1JVomhdQyxGtKkdz07pvv1vXxB%2BgNOuGb%2Fu1EGBO4dvYm604S9iePAgh0II3Hno6vGW%2FdufB9qJDHEGTOHPT0%2ByOTLo%2FsUM7GWyWa9mFIJA%2FwPP7c1Y4LT1qCoPysz9BcX19vSmB3%2BFWR9vwKlh3gxq93U24KsiTnA%2B%2FxO2QlHg%2Bs34VIWT4MHSX%2BgXDZCRHZzBU0BOAN2RdMLm4vs8GOqUBBvgjLPLdtyJQekTj9DM8SKXFQm5cRnCX5IYnQag7OWdZUZn7d1AeuPHt17ipe2lqdmWe8y3vKG%2B3ctHZg%2BEft4hxt5NKQePiUlln4YIK8KvmcxYpTBJuzdPcwen5oBlyu2pLXHM2g2yNc5JiHeKVS%2FHr6DNePB3RuyUEsH9%2F3uMd%2BsBZvY3d8BK8ZgshAC8wW1Kz85Rdq1EpzuhbvWSya7%2BCGvCE&X-Amz-Signature=202f31b5561c5553205db92f70d83d4b1e18a43ea1a9f0f77adff2a5228186c1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VXB4DKT4%2F20260427%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260427T175642Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAIaCXVzLXdlc3QtMiJHMEUCIQDObQr2Flfn%2FT0YHow%2FWlM0aETWyVYbS6MIxxxFejxVXQIgRAsVW6LARHSjQ5pLmSwd30OwMOAQT4963NBxA88FbvAqiAQIy%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDHYottDKOFVxqg0BhSrcA7l1PMW4Ba%2BdnVLGI%2BpRWgvQymsHQfGlx0ixtIexDu36JEDDyRh267iRPyIi8e1l1jG6DASkRfW21ZXdGnb8m5TOzGu6On5tqA9TlXMJ788tV0D1fKHLWANWP7yPqm6hO4AAVboKSVZD9FcZ0vKL7dQAZv%2FEokqxfeaMRK0mRijXKD7nG7h82aeHUXMM%2FxI2I5Gex9ioQxNx6JFk3ydSA16ea6Y9ZXCZ%2BOTIXlA%2BxX%2BXcDfr94SsufgKOTEvbZ9ASyho0vwb15%2BdeQX2vPWqjBoXo93WvULZYVcbQiek%2BFfBePrjoZnuY2kkLQztyky2Q5tGvvd8HmtVjAw%2FAKKaKE8fFdV%2BiBk6ZQfW%2Fl2%2BxOcWDAZtwmxHAiC9FgN74Kc2APuNnw0iSUnddva0Edd4A0BV6puJ0pd4n3R%2BDRvE8AuLCdlAKtBZbV%2FeE46pLIjNJJu2YwylMB1gvaj3QWavunzAmWv3Jng7DrZH92SP%2BWa8167LEQnQXIUlJNQ4hIPugHamSoPElEC9%2Bg0SwB4LwWqIj4crXUzrlrWgolINiOLiy3McTyDLVKuRKsuIj9vOpKqPU39HIfiEYtdk5ds7y5RHgq6jTpQEHsVxeRx6Ptk13Fr71nbmMfhQh8X8MNK4vs8GOqUBMcIyfVc6K4dXOO3fpDuhGw4F83EtsUrHw5wSHFvy8LVwZrNiY0Jp0XwH0lkY8JA5vZI6gTvgB4ETGOB11mEs9QtK90N0Qhsab6qgGDyXtYqjz4LtgMGegUwB3Wo%2BWqP%2FDmAPXWOxc6xLOqkdndl4klIFkjv4VERHSIJSGMWMyKzIxV4mVSCZO5PeIJoeLKLgT2TqQ%2BWkCDboBaWpJXf0y3HITejW&X-Amz-Signature=3e5d7b04b02c514cc0306749e8b725c3d77d2c9953fb21729368a17e983e9cf0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZXIQL5N3%2F20260427%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260427T175643Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAIaCXVzLXdlc3QtMiJHMEUCIQCIAbZMazoKB1438FvibEWUqdmHfWcczqFD4YmmFeiz0AIgSUH2xaJTqYnx4MW0xtyuj7ha9Hsx0OJkbtRHJImpGXQqiAQIy%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDDMUCwogHJxARC5x6yrcA0BI18W9SC5NKPA9%2FXqdKqr0s2fC2zH3Bc2NzAtrL2eHc%2B5lkaI0CB4VpuPNK%2F8pzlaFHbPToGBCIhP1oYhnOmvnoliCHAXsfx2Hjig9%2FDhLwKSt96UjXknVXjJBygjCEp2uN0gfmrnvqDRV9JFkm8S%2FZkhDKB2T5Us01gSeCK7HBI9t3yrFkHbn8Rk2h7fjRtDHgzsdGCluXYn8V%2Fmm%2B1kCiQpkBUjfO00JXI%2BP8Eehl00aEusDXuEsuZifS8Rh6HmtGxMc8dcTuzKHa%2BK6U35fd0g9iQW2982575GgQNARBdwkS1RSWITyVHb%2BOfZjgEUK2%2Br7eP4OpYEL0hz4loS81tmQzQlOJb8UAevYXNiV3tCHScomZxlYwNvcs5CqzswKKKRDrVdsb8qOofR6Negvc5xjlrdPIJyiyYdklnpikPJDauHHHLhJ0flr6BTnb8gnGF8a%2BOHZLZlbSwCZvAsF614i%2FVhaDhDIXbBn8gGofL8%2Bhbck2JzkyK8Mjjx8rhyYjpLzQ%2Bpqnu7q%2F6S4XZd08wKaqMzihk1yqo3CCIymqpImWMTKJLH9hKkTIIPDkFTB8M7puAFNsyKmBlRlZs%2BNgTOgSpFVgnBXKnjNvzcjv%2FxKQAE61hnvpASYMOi6vs8GOqUB7OdtfAlkJRUPIbTv5RcaSV62Wss9B4xXuWlDLgpwwTofrg1%2B9Y5%2BSA5XpO1pBxq76WHqx1lUjci20VBJAzJmlNP3Q%2BZ0wV5qmdFh8HUNlS%2BV7ig%2BANDl0lBpANm0u4zNjDPfnknop7PwGjz%2BBaZmvuE%2F0gQky12FSWiaP7YDvAotB8zoeMhIaWhPbuchGAPxBzDz0jev1x0t0B4ZYbfAfNOiOf2J&X-Amz-Signature=a986fb2cb7d997f29df0688acce82b6be1773cfb2c0cadff9d8d35e8fa760c04&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZXIQL5N3%2F20260427%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260427T175643Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAIaCXVzLXdlc3QtMiJHMEUCIQCIAbZMazoKB1438FvibEWUqdmHfWcczqFD4YmmFeiz0AIgSUH2xaJTqYnx4MW0xtyuj7ha9Hsx0OJkbtRHJImpGXQqiAQIy%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDDMUCwogHJxARC5x6yrcA0BI18W9SC5NKPA9%2FXqdKqr0s2fC2zH3Bc2NzAtrL2eHc%2B5lkaI0CB4VpuPNK%2F8pzlaFHbPToGBCIhP1oYhnOmvnoliCHAXsfx2Hjig9%2FDhLwKSt96UjXknVXjJBygjCEp2uN0gfmrnvqDRV9JFkm8S%2FZkhDKB2T5Us01gSeCK7HBI9t3yrFkHbn8Rk2h7fjRtDHgzsdGCluXYn8V%2Fmm%2B1kCiQpkBUjfO00JXI%2BP8Eehl00aEusDXuEsuZifS8Rh6HmtGxMc8dcTuzKHa%2BK6U35fd0g9iQW2982575GgQNARBdwkS1RSWITyVHb%2BOfZjgEUK2%2Br7eP4OpYEL0hz4loS81tmQzQlOJb8UAevYXNiV3tCHScomZxlYwNvcs5CqzswKKKRDrVdsb8qOofR6Negvc5xjlrdPIJyiyYdklnpikPJDauHHHLhJ0flr6BTnb8gnGF8a%2BOHZLZlbSwCZvAsF614i%2FVhaDhDIXbBn8gGofL8%2Bhbck2JzkyK8Mjjx8rhyYjpLzQ%2Bpqnu7q%2F6S4XZd08wKaqMzihk1yqo3CCIymqpImWMTKJLH9hKkTIIPDkFTB8M7puAFNsyKmBlRlZs%2BNgTOgSpFVgnBXKnjNvzcjv%2FxKQAE61hnvpASYMOi6vs8GOqUB7OdtfAlkJRUPIbTv5RcaSV62Wss9B4xXuWlDLgpwwTofrg1%2B9Y5%2BSA5XpO1pBxq76WHqx1lUjci20VBJAzJmlNP3Q%2BZ0wV5qmdFh8HUNlS%2BV7ig%2BANDl0lBpANm0u4zNjDPfnknop7PwGjz%2BBaZmvuE%2F0gQky12FSWiaP7YDvAotB8zoeMhIaWhPbuchGAPxBzDz0jev1x0t0B4ZYbfAfNOiOf2J&X-Amz-Signature=2d44f44b5e24bfaa10ff3f2248c57463d6a3ac857a213cad4ea80e4a377d8861&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S534UPRE%2F20260427%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260427T175637Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAIaCXVzLXdlc3QtMiJHMEUCIQDipACWtwRjxuG7QQ8C3y0u13WQ4qYUz2%2FRIXTFV8uG1AIgQJc60gDGR5OQ4OwHKYNefN%2Fu%2B43276ZC6GNbv8qnIGUqiAQIy%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDLkKW2kPfWsv455eNyrcA%2F9f9Xz8NsY59IMCwAgdelr%2FJatb74LObOrGBIJWAJdAfcX2H8TXyEAewUUg%2B%2F3RNHBRQ%2FfhdATIE2LBJskQfYQhMSazJC7rL6FPq5yhYP%2FeWN2cXRf19xUzjixNjmQvZcml%2BwKR8ElRmlV7KbCdQ0RAyTIlCLytH%2BtjSXYaomW3oiq%2FjPlzN8c9oZe9R1KgMs%2BwilQ9S8NcqYTUyqh%2BS9xwXlaS6kjmA8bfLQP1CFey%2BNJQV3QtG2fDhJUmhIWR%2FEpQh2dUg%2FmT9HjWQ3yilE%2FNF4YCcKnvkZvwDro6dGKgrypsxGRPSJOt2Eyb4dUfKg3YhiVbitWJLDT7RFm5zpHokaCrYFvhvcPkiExuE74T2GkcX0aVNf3CGFugKwQmvGK3q%2BDZP3ocu2s2l4BSFtIMybaDQvuXToEbXt1TVb6EFqtJRyFSXMRlqgUawEKaEaKT8ishpTp1dIIOTvK7UB9jbRU3bbt1A%2BfQtdw2y4%2F%2FZ2095DIkEhbLUihApC7e%2FAWYHkUh%2BikpEaAm3XeTJvPR7GKfcWcQctJRWwNZBIltVvIAS%2BdcmC%2BAc8EoNPrmwDyhAyel6g0E2SLrupZo3yk8GPOp8rSJ3JmV%2FvzCBxb%2Fhei%2FFh40%2Fj7Z%2BdcVMJ%2B5vs8GOqUBx84l%2BN0jZMCRdmX14IW1Y7YcN1lPdEztprlkdGZsryf39mGZKmUg3MctYY%2FvRMVyZB3tANeUH7DwK8zv0DSMTTf52jokRcuD3vNB8fTUcjo9kjiI9jtmvvEVctQeiEcxYvKDl8n9pg49GhL5B3TR8arBOHWIJt8jv%2BzwHQdi1Trj3%2Bfh0dAI6CY3slHFFiar6qptysFaKwXBKoOvk%2F5K7QyvRQsq&X-Amz-Signature=2e0cf8b27de5971ac48bd544c20d5209267d2227e1a309c98bdfb66a5f9e360c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RFFVWM2A%2F20260427%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260427T175645Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAIaCXVzLXdlc3QtMiJHMEUCIQDmCE57qQUAolptPf%2BezmZhMaMsFtFOM2sVexyljItlFAIgKfVgbzSw%2ByQQTG6P7RysGuZIC4sIeqDMlcpxt%2BDtA28qiAQIy%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDFRf9EaPJccn2vNp8CrcAzNPVFflWyVnjfiSno87bJCePmziLmo%2B9%2BxpfmBW%2B2Ldf5GAmv96t3vHJs13m6%2FVFL2XaI54fSw9ab%2BjXvIr99wXd6OXI6nG2auQQDXVOloN%2FfnZrqyDvM1MdozwkUADZtkSPAYtZw1%2F5NBN9livAwSst5p2D2pqcEQDNbHiyxY6v1012Ck9zLwIHlstOKB9lV3nxDASK4u47kr1ayN3EwzjekFZEpi%2FIle27t%2FAX6zYtqxEPx7iWrJG6q5eQ99BdhCJDb5UiDiOSgE3XTtELtV%2FA9GfBKV6SiF%2BSPBoLEbhKolwiUz2OHl6rkQrTgLHtaS2rK9ehmt18KQFFZoG3ZMGn%2F63xDTJ9D%2F4EGHXaVF9J2SSh4MFWDLGM3oO5yDWwl%2BBIloCwqUlDbqmtOt%2BPL61k7QzyW1kFjrl41jlqatHgf7Hp7qejTdGvJiBYfmOXEHr0ENo3JjFurUyJ7wqsfIyq5nMH4qZ7sTYHUip9XU2eKtLEveVSFOPY3lqDRp09Hb9B52h8Eo9XOw31xm%2BI7hliGgheHFUd42fsZArFSgCVbm%2Fy33SSC7chVfsVcmGzD%2FelrFxM3L11Rq0nGQkuBYLlmTLoQGkXxrfkTAidqgejgXjs70ASRzkeKcRMNG4vs8GOqUBV%2Bvgmp9NPSI8zEU2jjEovMfNvF3%2F4iYakuLwXtAZSTX0ZpeZH0%2FEEANoe%2BELfsOfB7QIjRypYY61rCET0K9wBQC1URFq3bZrOQDf6PzEu5IPpVFmseH4DiN8WVt9oI4tIZUuIg0w8iLpEavFldnJKLMsnfJpNYgfTaE5l2Tv4HqYGAiQ%2F%2BYX19x2WYk8dWMgptsgGQ7TdBxRWAlAU3iaJkPd%2FdEK&X-Amz-Signature=63dc58a2ba0dc1c46bd17129a0be7c179dd46c58ec8bcb92da54d3e543e8e337&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RFFVWM2A%2F20260427%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260427T175645Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAIaCXVzLXdlc3QtMiJHMEUCIQDmCE57qQUAolptPf%2BezmZhMaMsFtFOM2sVexyljItlFAIgKfVgbzSw%2ByQQTG6P7RysGuZIC4sIeqDMlcpxt%2BDtA28qiAQIy%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDFRf9EaPJccn2vNp8CrcAzNPVFflWyVnjfiSno87bJCePmziLmo%2B9%2BxpfmBW%2B2Ldf5GAmv96t3vHJs13m6%2FVFL2XaI54fSw9ab%2BjXvIr99wXd6OXI6nG2auQQDXVOloN%2FfnZrqyDvM1MdozwkUADZtkSPAYtZw1%2F5NBN9livAwSst5p2D2pqcEQDNbHiyxY6v1012Ck9zLwIHlstOKB9lV3nxDASK4u47kr1ayN3EwzjekFZEpi%2FIle27t%2FAX6zYtqxEPx7iWrJG6q5eQ99BdhCJDb5UiDiOSgE3XTtELtV%2FA9GfBKV6SiF%2BSPBoLEbhKolwiUz2OHl6rkQrTgLHtaS2rK9ehmt18KQFFZoG3ZMGn%2F63xDTJ9D%2F4EGHXaVF9J2SSh4MFWDLGM3oO5yDWwl%2BBIloCwqUlDbqmtOt%2BPL61k7QzyW1kFjrl41jlqatHgf7Hp7qejTdGvJiBYfmOXEHr0ENo3JjFurUyJ7wqsfIyq5nMH4qZ7sTYHUip9XU2eKtLEveVSFOPY3lqDRp09Hb9B52h8Eo9XOw31xm%2BI7hliGgheHFUd42fsZArFSgCVbm%2Fy33SSC7chVfsVcmGzD%2FelrFxM3L11Rq0nGQkuBYLlmTLoQGkXxrfkTAidqgejgXjs70ASRzkeKcRMNG4vs8GOqUBV%2Bvgmp9NPSI8zEU2jjEovMfNvF3%2F4iYakuLwXtAZSTX0ZpeZH0%2FEEANoe%2BELfsOfB7QIjRypYY61rCET0K9wBQC1URFq3bZrOQDf6PzEu5IPpVFmseH4DiN8WVt9oI4tIZUuIg0w8iLpEavFldnJKLMsnfJpNYgfTaE5l2Tv4HqYGAiQ%2F%2BYX19x2WYk8dWMgptsgGQ7TdBxRWAlAU3iaJkPd%2FdEK&X-Amz-Signature=63dc58a2ba0dc1c46bd17129a0be7c179dd46c58ec8bcb92da54d3e543e8e337&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663ZBMQ5SC%2F20260427%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260427T175645Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAIaCXVzLXdlc3QtMiJHMEUCIQDhq2GnSDZLyNnNrI7w8L1iJRNRkDDeeSamVpDu%2FvmRwQIgR1LcooZuom8ow0glvaqxnKmiVAmWIYAeFlTLRfYaNBgqiAQIy%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDPueByy12fDZioWylSrcA9PAdumHi6msamc%2Fj1oLBPXhaVZQzKdKlZ8dbd3S5Ox6rJA2ylSs3S09%2BD4CWSgKh3S3DUc7fAb66%2FdlmoCirxKL7hw7KjbcEzzb8t4FDTr%2B%2BNTWHnaB2b97NEfDIM4JH4wIxYupvK9kGvem%2BKvP1CFatgae%2FrXDlibhTmfMTnRCGqu230%2BT3BErWDkoml7UmKYcZ%2FzzmAkRbsx2S1aOKnhN4Hx1FGrpLo5F3f6W3zV6wgswmimxT2LTwIXagzAoLWKGKEHKOAb582j6KykmrFi68c5DncFIJ6hFcOUjXL0n8ZEohR%2FnQVmPa%2F9ZFbqtnQ%2Bg1uKwbxpBF%2Fe%2FXkcBtSEXdplyZFv68Q4vIUjTjzpTh5BBxwQsz1jeu6mPv2OrCUMUEuiU86g%2FzcsNenbE03zJq5ntM0ALgZWkXZb%2FlG2HV74o49GaYDLx0N4YMUWodorl39ZGmwgcHloPQvIhXP041RmiYGCuI37SZMDcVGvqqbFa742r5W70Lmx3SJyVnymmYJr2EkoODiJzm9J7bjP%2B%2F6N1hpNyQSZiLml%2BJlQ9B2cQZoAlrUT5Ror4%2F0cwUVOlXcOYoNt6AJ2iMfQBcbBq9LWc3S0YEN1hWyskhZWZlnC%2BH5kT76bfiob5MPu6vs8GOqUB2aFSM3hG4lJWlL%2FZPgQsipj1wcSohDFie8J6v234z1vSPeX%2BFNwbSFjBKYks0tq2NAGB5oarjvJ3K4g809j7rxMT9n1OcMh8KMfOiBTVzaW0%2BJWYHPy3KZiHirPFeBFYEK%2FXem1CarVieJ3Vcwby4UDzUzWdV9EO2zRAL5G%2BLGiyCw8tRWmgsouSMXnU6slaq2BnA9n%2FqlB7sKFACmnNh%2B6k0fn2&X-Amz-Signature=e3456a41dec8dffc1c0608101ed20c32d2b62866d640af6de9e7343a98505e0b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

