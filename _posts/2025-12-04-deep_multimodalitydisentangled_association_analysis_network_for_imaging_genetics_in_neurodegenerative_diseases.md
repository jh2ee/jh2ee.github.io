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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667QGW5P6H%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T170102Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFcaCXVzLXdlc3QtMiJHMEUCIEJYVPASvTbDkEEC%2BRugFsv0Pd9ELTvTeB9uWtVVYm7vAiEAgi%2BFZa6%2FujeWQwnLNefxz23Mi8mhFoVudkEony4vozAq%2FwMIIBAAGgw2Mzc0MjMxODM4MDUiDJBCgQYV1w4qqE7C%2FircA4EA%2FyjiDy9U6JmcWvc9oO2U2TeqLgObKEyB91msRLoOu93743LLR1cXvCiG9EOmQjSKV%2Be1xT4nThvE4pNA8s2iZ424UHw6DQKms%2By6dbrtC2yTSJcG9TsYifQDCuuA8GHB4BX%2BiZ42%2BDYXMJ%2BCaJ4Ixhhq1JEYKsHUcJtdSdAyvQd0fR4p9PdNmNgHG%2Fk82oQjfoKXkUE3UAgG1wsZvy4z23FQ47%2FvaL4spsf1Ciaxx8E5fEOGYdQRSA8FPuzTJDp8%2B8SyKZo2MH9FRVl1U%2BfEKB3hQHhP7lZjOFHPeGB71%2B09EqkFXxDMOrUBcGNu0gIl3qUXKG9SnGvmS9I%2FPRjEjg8bE1RbaCRWHJ9nHakcJJvIhfjRn1dEgNE4trDHzU8Iv9NiW%2B0pI34h1kP%2Bzlj55OD%2BbElxu2Ge1JdMMySrDYdXAAHRANWQ%2BSMjR8qA6%2BrUdtba8jIveUC8fl36S1gS3uQK4sQ3nXKgBtUSe47tiNp%2FIQ2KFISz3X%2F%2BZaYmk7wW5ydqDMLuXynZNTMShc1ogjoTXfZPpUYBKbMQ8y4ZArYEbgFICtgn%2BvrSNzw0sQEE1dq3vCqLFM%2F6f29L9VodRCUcufV110j0wZ612BrB2R3ye%2FJCJBOcGsrsMJqDmc8GOqUBM7rTP7dJwosgOTz2J8%2BIol9fdc8yfMC6KJopP6iixBnp%2BWiay67gOp231j0S3aCPQO02RHI1uAboOgPHMelkWpv%2FJHSV866dpdiz7YhpcVqSTRm4JJXi30r%2FsKuHh9cvI4rgdUb%2BpMzvkK%2FOPvDyF6gN%2BnVurMn8tCPv4DcSO3E6dj0a2ZGOxYoAgd7OV47cHPr3SgPi7sdQG9jGxjKmX0lj88Tq&X-Amz-Signature=fdedafd234ac3def7961333437c3b1aeeb11ced5ea3995d8daf82e3acecb41ed&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667QGW5P6H%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T170102Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFcaCXVzLXdlc3QtMiJHMEUCIEJYVPASvTbDkEEC%2BRugFsv0Pd9ELTvTeB9uWtVVYm7vAiEAgi%2BFZa6%2FujeWQwnLNefxz23Mi8mhFoVudkEony4vozAq%2FwMIIBAAGgw2Mzc0MjMxODM4MDUiDJBCgQYV1w4qqE7C%2FircA4EA%2FyjiDy9U6JmcWvc9oO2U2TeqLgObKEyB91msRLoOu93743LLR1cXvCiG9EOmQjSKV%2Be1xT4nThvE4pNA8s2iZ424UHw6DQKms%2By6dbrtC2yTSJcG9TsYifQDCuuA8GHB4BX%2BiZ42%2BDYXMJ%2BCaJ4Ixhhq1JEYKsHUcJtdSdAyvQd0fR4p9PdNmNgHG%2Fk82oQjfoKXkUE3UAgG1wsZvy4z23FQ47%2FvaL4spsf1Ciaxx8E5fEOGYdQRSA8FPuzTJDp8%2B8SyKZo2MH9FRVl1U%2BfEKB3hQHhP7lZjOFHPeGB71%2B09EqkFXxDMOrUBcGNu0gIl3qUXKG9SnGvmS9I%2FPRjEjg8bE1RbaCRWHJ9nHakcJJvIhfjRn1dEgNE4trDHzU8Iv9NiW%2B0pI34h1kP%2Bzlj55OD%2BbElxu2Ge1JdMMySrDYdXAAHRANWQ%2BSMjR8qA6%2BrUdtba8jIveUC8fl36S1gS3uQK4sQ3nXKgBtUSe47tiNp%2FIQ2KFISz3X%2F%2BZaYmk7wW5ydqDMLuXynZNTMShc1ogjoTXfZPpUYBKbMQ8y4ZArYEbgFICtgn%2BvrSNzw0sQEE1dq3vCqLFM%2F6f29L9VodRCUcufV110j0wZ612BrB2R3ye%2FJCJBOcGsrsMJqDmc8GOqUBM7rTP7dJwosgOTz2J8%2BIol9fdc8yfMC6KJopP6iixBnp%2BWiay67gOp231j0S3aCPQO02RHI1uAboOgPHMelkWpv%2FJHSV866dpdiz7YhpcVqSTRm4JJXi30r%2FsKuHh9cvI4rgdUb%2BpMzvkK%2FOPvDyF6gN%2BnVurMn8tCPv4DcSO3E6dj0a2ZGOxYoAgd7OV47cHPr3SgPi7sdQG9jGxjKmX0lj88Tq&X-Amz-Signature=fdedafd234ac3def7961333437c3b1aeeb11ced5ea3995d8daf82e3acecb41ed&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZPW2NZLI%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T170103Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFcaCXVzLXdlc3QtMiJHMEUCIGJg%2FtXpzoe%2FvuKFlabRF3bHlvM2eJAuH8RXTTL73j%2BVAiEAzgKIBMXPbHvGHLWT%2BfVByjLa14XpQ4f5vvOcGqHohG8q%2FwMIIBAAGgw2Mzc0MjMxODM4MDUiDAmpKG6XeJSkhDdebircA%2F%2BPS%2BnqTto11HJSgtlqSh7EJ%2BnanjV39Dh62tZ8MGGMp9IHleJktt9jbh5LFqJhEL2vqeCcuyMDhQpr4u5PKuNZ5suQ01V5uXLzmafUfKMUQicDxG%2Fmpr989nnro%2F6FiNfR80lj3oMZ6137F9dt1fLz52nzYIqooIOuPo5hAZKw4IetjvAKjLvdE6LxJOB9NJdrqziptN%2FYqBo3l6tmJ7aV3LcI3qkQ3zaOHL4m3NG%2FGr%2FSKxbTozxDBUIhXU3rSSewibrGuUIYrfVZ7ziZdpnUkD66fG9nR6IIlD7fux58pgQDaijyiCeJoK0BuNfPZsQ0IroJqwYsp4TtHhscUnLamvUu5UfPpJVkRP2UZB6UvUa6Nmc8V%2B58o8k0r0H%2F2DVOq0tzPm8xD1QHlMmd4R26UFef7yJzsb6QAS7JMwTc%2FC4m1fqdI6S3rx8JxN7oTjZd5FNM9thExd9%2BLcmC4LDajDLooTJ24OwlvRfGtG3Tlc2se49z1gi8kz2k2VWUiG7h6m%2BU%2F42WEgUO4SfNU6RGiwuMPz5qEgMqqEN2sfPXC541xg%2BrdGdZcllzPW%2Fv8tsbtSdM4aa4l42L769MDjBTJDAy9r9JOUiiZqIqY42ZNOC6MOX0ZNlLKkQgMIiDmc8GOqUB79CdwGWWxkGwVuQoewj6dvgtbpYHlUFuGGjsGKkFVO5x749cG%2BLpFyL1P4nZHRNlb5YbF1iv60ZrlIh1%2FAtTyVwbcz2lVrlRPA6EQWyvu3PI%2B0uXAqhb5dyyl1%2BWFPrPBe0CU2R6BzevL7R87NDZ7GPeBkSRcBU6Oofu%2BLCvl4bgkNiuiOaiRsVDBfXA4nPA3N1I4fftLkZomg6qTDBdASO%2F0n9T&X-Amz-Signature=c409197311f101a8e2fc361f9f03119ab76c77b74164d8a12f64b67358240471&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UIRUNLW4%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T170104Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFcaCXVzLXdlc3QtMiJHMEUCIQD8uJGtzHnJJ5mDxQsiMveC%2FBNR2JnycggFrET5wkhC0AIgGeXjIGpm9XPBUPx5vqoLaDVsXMl0sY5whSt5wKaEkw4q%2FwMIIBAAGgw2Mzc0MjMxODM4MDUiDHWXIhZlXpR7ejdWmSrcA9kLWXL9D%2BpvW5ypOQmz2%2BtbBa0bpdzzQgbojNHagDAkn7gcXQk88vE5XpU1CqX9g0kEFAMV6R65MMQTJnRJYLyKmpbV6BP98arUMGfJ%2BKbLJMLphHbsyjgcQfmaoDlqlEgKiV3uCBiz7G35aQm26vg3vNf%2BeT%2Fk31SgMOFDQ64pDVwXRSkADeYiZ4vnxMPKo6vhrQAFsQVi9v4qiSiea77yIcV8DgD%2BasMbiRWqNzv%2Fi96F35KW0c9OXhKv9MfAhwpl%2BcOZVi825LPj4M3yM%2FK9YRgGPLwtQzN55yCmUBVOkuaB7w2ukagMl8%2B0%2B1762r58a709GzbpmCUzavz2nqgA6pBwSw41BRa7KtsM04BwgnYO6cSHZJ6%2F%2FXVwJ%2FM3pDqYh3DvPNE%2B475WvQc69jNI375jOXCe9lrenYHhv6OQZEZZMvldzBD41VSL37cu6WMUKiKa5huAsR%2BffP3EMRwaw643Xs%2BvfKt3t0iggOcPWwskqzxWi27vN8k9034U9B3Woyl%2BAaIqHFTryys0TaF3GL1WPMKUVJPftOxoUwZqX8TVicz%2FVIwnOHVcuL4LCxy52ln2%2FbKpwcY3MxV6%2BH5sR7YnuKSgWzQdHy632VmRJuFVXqAcUJUQdjGXMPqCmc8GOqUBhEdUjMa%2BY2ls8PEBAqovtvaMNJOqrpT44%2Bosg717xKRktRVz%2F9Vf3c12uDFZ3Fi7pjdhM9ZSPw1SMFvzu5o1a%2B9GVOQt5rUMExaAhNOpbtpEAqQiekIOHGYh2th86NipQEiHUmRFp68S3eVorDg3I1ZNEDv4WwuRVIc2AD9TAcCY%2BAN9sdBefV82m0rq%2F10UTEGALLmdbicX%2Fc8iQQ%2B1Ftj4wSh9&X-Amz-Signature=6361813f8da2f87a7c36fee9f13812c6f760276b8dde0b898874d1df4c444064&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UIRUNLW4%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T170104Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFcaCXVzLXdlc3QtMiJHMEUCIQD8uJGtzHnJJ5mDxQsiMveC%2FBNR2JnycggFrET5wkhC0AIgGeXjIGpm9XPBUPx5vqoLaDVsXMl0sY5whSt5wKaEkw4q%2FwMIIBAAGgw2Mzc0MjMxODM4MDUiDHWXIhZlXpR7ejdWmSrcA9kLWXL9D%2BpvW5ypOQmz2%2BtbBa0bpdzzQgbojNHagDAkn7gcXQk88vE5XpU1CqX9g0kEFAMV6R65MMQTJnRJYLyKmpbV6BP98arUMGfJ%2BKbLJMLphHbsyjgcQfmaoDlqlEgKiV3uCBiz7G35aQm26vg3vNf%2BeT%2Fk31SgMOFDQ64pDVwXRSkADeYiZ4vnxMPKo6vhrQAFsQVi9v4qiSiea77yIcV8DgD%2BasMbiRWqNzv%2Fi96F35KW0c9OXhKv9MfAhwpl%2BcOZVi825LPj4M3yM%2FK9YRgGPLwtQzN55yCmUBVOkuaB7w2ukagMl8%2B0%2B1762r58a709GzbpmCUzavz2nqgA6pBwSw41BRa7KtsM04BwgnYO6cSHZJ6%2F%2FXVwJ%2FM3pDqYh3DvPNE%2B475WvQc69jNI375jOXCe9lrenYHhv6OQZEZZMvldzBD41VSL37cu6WMUKiKa5huAsR%2BffP3EMRwaw643Xs%2BvfKt3t0iggOcPWwskqzxWi27vN8k9034U9B3Woyl%2BAaIqHFTryys0TaF3GL1WPMKUVJPftOxoUwZqX8TVicz%2FVIwnOHVcuL4LCxy52ln2%2FbKpwcY3MxV6%2BH5sR7YnuKSgWzQdHy632VmRJuFVXqAcUJUQdjGXMPqCmc8GOqUBhEdUjMa%2BY2ls8PEBAqovtvaMNJOqrpT44%2Bosg717xKRktRVz%2F9Vf3c12uDFZ3Fi7pjdhM9ZSPw1SMFvzu5o1a%2B9GVOQt5rUMExaAhNOpbtpEAqQiekIOHGYh2th86NipQEiHUmRFp68S3eVorDg3I1ZNEDv4WwuRVIc2AD9TAcCY%2BAN9sdBefV82m0rq%2F10UTEGALLmdbicX%2Fc8iQQ%2B1Ftj4wSh9&X-Amz-Signature=440a091d9ea27676c6b2daf0f7ced9fa04b43d33d8474dbd512a0b3a05166fef&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667JBXGAT4%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T170104Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFcaCXVzLXdlc3QtMiJHMEUCIH7CdxZc%2B8qLqEWSsKcKRF238sFA08r6SV9iecVRp%2FRGAiEA%2BK8LzHkiBhAOddJCvMoHoDcpAjrao7mEKl%2BHwFYPouoq%2FwMIIBAAGgw2Mzc0MjMxODM4MDUiDJ8NfYxhFqMfxOOwSircA1BwGVow78NHXpAfiJF7BPDZDI2%2B8o%2BREPtjrWUeDUSOJ2amJQ%2BOIaCRxI%2FXivWz0dpSFFJB9kbhVzZ91RwWhxvdAFDvMHeyLMBacqRFmlBU%2F7YtTxlI52XDJWXAb1FPxZaoXLIk6Y29gqb%2FcwrdnNajkO%2BUb8J6Vk2YEM21%2BYjXdGrMD9UxKz7QcKR7QaTIwcWJoekNU0P99B52GSSdcePiiAG9mCuyt3dX%2B%2FT5CxElYigOCXfWzropjdkN%2BADCVS%2F37H59bYCL497IuvhqX%2BEdxmuAoP5U6qTRmH4CR4sIQhVof%2BOewmyvO6Q10QzZsxSwxcEK7iaBOjzbEWhe5QvsLCelxd4rQtQ78Zvubx3AAvUysFgpFvZNh8NGbXCF8scCsp4LLeTsqe17LdaSmp565%2FDJKmSfOUMoyV1nfnc7u7Y7vawoS50z7oXKPXd%2FuRc9AnyG3OzNMHt7jU0FDO8dKk8xkk7l%2B%2FO2PGVeLTVPnNqItZLHizDPyXIBR6RvRx03Ba5nOmbsMOV8Ldp%2F7KRR6LFWE1XWZBG4IWOwZUKMtQjL6Dmjuu0Rxw8ZtjRYUWycqLfxYD%2FqhISK90YkyGdpqic7g67E8jpQIw24fa0DiWGnvGqCWsn4XdR5MI%2BDmc8GOqUBlUwenU5dpbqLGJWuu7LrOoGcUENSbR57y%2FxJwdFvZE1myxhCaL%2B%2Fa%2FTX1ORkmV5jMk%2Fg0AysNF1J9Yu4FLqHG%2BkqTJEtWEWbyLti0w80fEkMr4RHPXWVcR6QKRkFa%2FL1AmWMjUVFYNh8Yxx8PxRn6qqN4IyD%2Fw5OAdE2a%2FbmhM%2FPzWE%2F%2Ba%2BGIIzE0Ilc1JyStzoRCNusSQ9oiDsjgUgoOzdEYTya&X-Amz-Signature=a33b85234976372019642f6e0dcbf0faba7708c670e5c710cf15acdbb7192ce7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UZ4FXLBI%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T170104Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFcaCXVzLXdlc3QtMiJGMEQCICGN0wAEMLryG97VMofPBr0GJZXYc7Lzggw5FJeIDk8xAiBGarlYNSjVbnQehlQXZObM6vn%2BHhEwCe0h%2B46Wp3VMACr%2FAwggEAAaDDYzNzQyMzE4MzgwNSIMhZ7lFAgDoANusG0CKtwDjeAwzfAAoQ3WHevH8pTEAifxHRgRFfQ4gmVeQhD3jScK37aplhYWLIbC34N9K4%2Fn2jzdsV8k%2FyQMxlOIRl9y42ohbdlviA40xNsmsVPoKVcq6gyg6Q15enrKYbTv8v%2FctkVbkbR8cHYhfLSs7Zg4tKko20IA0v8WP%2F3XvT0Vbt8z%2F8qcacNeVV%2BMLnXC50YU18WxpQiI0HR5wNsoZjswY%2BaZnIz9ZwplqZMztX7pZTf16dw0nA3oEQQKGFeE2yEvqJo%2Bn%2FrqwmAKrHK607wWYwM5pWnIkVrKfgXTI7gUXPSsIlETzSgGkb%2FeAeGN0aSL%2BT6QsDFbjK%2B24oUQDVqvHql9WNlN7%2B01JlFxEeI5yDW%2F16T%2B4pTzoraT96aEc9hVAbiLyb7bckFWE2JwRgFHzYQAVVqilBtilqxD0lrifeK4V2O4cfdHp98j8IbEH7mwCu6DlpFQJdkryYS7Zt1%2F1gul6p7ZgFBlvVDFEdiMIPLCBLP%2B3XOYqsGYNwWPxIUcctyu1ZhEtgi7SAvy7NR%2B0DypgNM3rtP%2Biefh%2BmfADb8wwpGvGL%2Bsy4VtLayZZiJGcGoRf1VpS9qhtJszYax3Z9AA2B0zMkLngsG1EJot1e84lc9gzUlizmGcJzkwy4SZzwY6pgEemrowfZ3zbK%2FfUJ68ADhhbEmKpqpE9ASUyphRqO90N8yyceefL5Im0aeHb8LdmVLxqIRhhFhnEaqZbXzJuI%2BLwUH0HT9Dh3pvWorZhEDXVKrYO15%2BAcfhGircTwFv6q2qmMNtyR0hAE1zwsyEjh%2BnBfGO3v5b6Bwk7rhw6BlhPMqXZxW3yQjulZTTp2TVYidjdBc0D54DulqcM3ERqXuv3FTDF05c&X-Amz-Signature=4debca7c11a56eeb3bda9ebadb0c60400034f2004c17f4d18df713d388167574&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z7MKRDF6%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T170105Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFcaCXVzLXdlc3QtMiJGMEQCIAg5zEWIaZ%2FQ1yLFBqOa19%2Fuz7eVeDaCQlTQaj7JqlzdAiALwbC%2Fjck94YlP1ijyKb5xTlaOfbIyZhuGLNxBnuCsfSr%2FAwggEAAaDDYzNzQyMzE4MzgwNSIMy6hF0gsg1yBopiJrKtwDKhuesm%2Bl6kD%2FOSkcR9Wv99bx10EQeH%2F%2B7ITjCTbKYux2RMl7d5o2rft1AAKpl%2Bxf%2BoSR9QSQh4QpBCHQBS68d3uyUMwHQO0Faq39zQyZWZX2zTlCA%2BoKBCFD87MNLz65VeCW2%2BXmyqAbb8JxveI9Ezlt%2Bq%2FsS0MiSGYpnpOQJ%2BOpgiWVop1fHrqpvhgyHeKUcRfli12304oU9QAQuJKAXnKnNgM3k%2Bz7kEsJ7Bc1Wha3TcxLqdHcyJpVwfVLYXLrYEZAs27WST4m2ohi2cvQGHkDTnqOjICOze9eC5jUhmErUk6iwOVFzjuxNBkKhGu31jDjtfm7e6RaUUvmSmuADbXL93iBAMnimOS6pl37CdSMMh%2B%2FIju%2FeGwzFThCCj08j7lmD7npYS46NfEVcAubZmZ%2FA0yW8xqKoSJy%2FufQf65ohT5gUQ7Kp5uqyUOAHp7uQVw8MxzLV413JmhN7pztrnzMpfYP03cZVQ%2FAuM6hF1W4PBRYPf%2F2nl54Jv6d9jcmQz6%2FKsZ8WpHr%2FlPcjETbFEIJrd0EyJwKF0DwJSREw8VN2fYg2kQlIpb%2BNbU4nKEXqSnYm2wIqNDvQ%2Fpa5Srg8iNCko90zB%2B%2FqtrwFYEEObZBVfuKupa9zd1TeEIw2oSZzwY6pgHRSTkhdyCBXox7SZl2mX0cvks%2F0zaa5IruEruzbkyEfRbK%2BrbKXBpcp80EtinxyeWLmwbBtOctGnOonfaCCxZo0Mm%2B4y00GA6nS1yom3KTIY1hxcfmdciEL8mcRPXNYiblxuNMpo4sViRp4syRUEg7UyVYYBX5tnic7Pzw7E0ENmaMn3YHiL5ha6hUqVDgzgJoDJU2gKRa8hlbnTxi79cgDmO84v0u&X-Amz-Signature=d00c14df3cdf283e2445e45e79539b9b305b5a315fd88f2fcae6bdcd6051a0af&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZAORPRTK%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T170106Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFcaCXVzLXdlc3QtMiJIMEYCIQDhcl7cie3iLSXeHTuFHgb%2BYqAxCGCcQpiOtNc11nteyQIhALc3Q85THCZU7R3RKY2KqfX%2Fgw40tGP2ipXqS7dtUP0xKv8DCCAQABoMNjM3NDIzMTgzODA1IgxNodkOCb0olyWe558q3AOkYYghG90gI%2FYzfq1BPWevTo9XahO%2F2%2BlQ%2BBbt9NP3bCTLv77BqxwJ8rOUHfupZR3KKTds6WAdoTyyY2MS4dd5KQG52q6YOTq0zhwDbEK%2Fj1SxI%2Fx4qmlNPMvHfF8Bpc0epS4aUEP3lE9a5L09vUHUa2ksf%2FRoCy%2Bh7GftAQngQ7SmoChY1i%2FDVkXv%2BCvnH7yPzMvqJux7MXzcXzn6pTatHj%2FN0Myrs1UZIJP1w5Yb8k6gv8kQiv0bhgLD8oonUrbCrLCCjw95%2FeIPVyj8o5f744qDSDsPva4FadwiCg72verCEQgVRcp6aqjLcL1ll5JE5zrApKcwdahQ4OjY3NqCNpbrqxuyDPD%2Ff08ZUyBmxOw8kvxWfzkYZJeeI6kJKl%2FjgBTWwTbRIRt5SIGMHaW34oKbUbId4QQea%2FDhmgIb1HrvyGmea%2FMGWPbRciLCGjuVnauFqp56G9wC7D3JBwOu1mslR9d%2BadOEAS8tVJ3RZo3gDUedqDLfVdHO3Mx1LWbfX9%2FtFTJAS1TgctEiOEIT7BW39JB80Rwy84CV1oxEnOTkFZlkk1xLihNfrk6AqCFCF87DJ6Dy1YDTg2wg413eP%2FNPi4ZIz8Qjh80gswu3jzCTAYZ1qyljpmUr3TCWhJnPBjqkAYSdBLdLjHwql2l704C7N%2FZ0ax%2Fa64%2FPY7Tfj0fiSVik6uhq8TsrvAY5llEmd3U9XojxWrB7C6WroMjaBr7rdfUoGE9HO7ZS5n6AFa%2BM8oPJkoTl1h6BIkfm8DgD2O1Uvbnuj3oMZuwevxXTeW2JrAotgMXXL9J6%2FdmhxIFF2G3p6Sj7pfGQmAGETVRbsstnk%2Bes1kV%2BylpX6ttrjGskwJosT1b4&X-Amz-Signature=1fe7acf065185bc931552cc31b9462edc59e4d3cf74a76e7cb6f2d923647f676&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZAORPRTK%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T170106Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFcaCXVzLXdlc3QtMiJIMEYCIQDhcl7cie3iLSXeHTuFHgb%2BYqAxCGCcQpiOtNc11nteyQIhALc3Q85THCZU7R3RKY2KqfX%2Fgw40tGP2ipXqS7dtUP0xKv8DCCAQABoMNjM3NDIzMTgzODA1IgxNodkOCb0olyWe558q3AOkYYghG90gI%2FYzfq1BPWevTo9XahO%2F2%2BlQ%2BBbt9NP3bCTLv77BqxwJ8rOUHfupZR3KKTds6WAdoTyyY2MS4dd5KQG52q6YOTq0zhwDbEK%2Fj1SxI%2Fx4qmlNPMvHfF8Bpc0epS4aUEP3lE9a5L09vUHUa2ksf%2FRoCy%2Bh7GftAQngQ7SmoChY1i%2FDVkXv%2BCvnH7yPzMvqJux7MXzcXzn6pTatHj%2FN0Myrs1UZIJP1w5Yb8k6gv8kQiv0bhgLD8oonUrbCrLCCjw95%2FeIPVyj8o5f744qDSDsPva4FadwiCg72verCEQgVRcp6aqjLcL1ll5JE5zrApKcwdahQ4OjY3NqCNpbrqxuyDPD%2Ff08ZUyBmxOw8kvxWfzkYZJeeI6kJKl%2FjgBTWwTbRIRt5SIGMHaW34oKbUbId4QQea%2FDhmgIb1HrvyGmea%2FMGWPbRciLCGjuVnauFqp56G9wC7D3JBwOu1mslR9d%2BadOEAS8tVJ3RZo3gDUedqDLfVdHO3Mx1LWbfX9%2FtFTJAS1TgctEiOEIT7BW39JB80Rwy84CV1oxEnOTkFZlkk1xLihNfrk6AqCFCF87DJ6Dy1YDTg2wg413eP%2FNPi4ZIz8Qjh80gswu3jzCTAYZ1qyljpmUr3TCWhJnPBjqkAYSdBLdLjHwql2l704C7N%2FZ0ax%2Fa64%2FPY7Tfj0fiSVik6uhq8TsrvAY5llEmd3U9XojxWrB7C6WroMjaBr7rdfUoGE9HO7ZS5n6AFa%2BM8oPJkoTl1h6BIkfm8DgD2O1Uvbnuj3oMZuwevxXTeW2JrAotgMXXL9J6%2FdmhxIFF2G3p6Sj7pfGQmAGETVRbsstnk%2Bes1kV%2BylpX6ttrjGskwJosT1b4&X-Amz-Signature=ac7a6bbe3eb555daa5073a6dc884efde70a9b589d8ecdc07b2e43faf313d28d1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VMC3FQDZ%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T170101Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFcaCXVzLXdlc3QtMiJGMEQCIEjvm9Iy1rTOmWDuUkE%2Bwv0yT%2FWPDeyhwF%2FwKfkDwxJKAiBxieaWNF9K5504ARwYUZX0zDLChsKOgQiLEu46myVfHCr%2FAwggEAAaDDYzNzQyMzE4MzgwNSIMaKOKJSQJVJdBgQZJKtwDjZ18OUJP028I9S67C0J4i7%2FWtwlaekjOoBN0sKpqFCV2PQddBBguLUP3mwkItYLWy%2B0PeF%2BXUUufAmEbgfDryR%2FV3sXHwsVuaZqZ%2BT7xhjgeacB3ZUoUhKtp%2B%2Fz8An%2BBFLAH8zJUcI2lraJd2L5cvKvACQp%2FHpyofrA87H8q6FSLn%2BY1scDDL9v4w8FI4HeEphB6fYy2Tcf%2Ffcf7%2FKj9NoEtQxxSmq%2BsZG1qA2i%2FKBZ%2Bq8Rqgr5IUce8hknsmc%2FzLL%2F%2FsEIc27oCuuBRWw5GxhYeTyJHvqIr%2FiXMJj9d45635tA0YCFLInL%2B5ib3%2BZ3hn06udmRNsjI8onlAF6VcwnQU%2F71CMz0wxaCTOKPmeqnvhoT%2FJ8uKdMqTxYX2DyPLzercfOLp2%2FEctuqj%2Bki0seJP2qCOOzk2MvAQ45c1Ik2h%2FUJ6aUhw%2FUPiVZjFjwMygqADAenvufOy%2BZ77bs%2BJtQNxjC1ucBex601YgUMhRYvsaANcpp6mH9wFP6NLZAUIv3tqnfXUa4MkpULPqFrjebg5uUWHetz4Up4P5NlS9Ug1mlPZaScsH93bpo1ZGg6dHm7kb%2Br%2BoeToXqKk0F3URabyRGfZNsYJIfmrm2%2FQ5%2F6RWTegWO3yVcDNub8w6YOZzwY6pgGl%2BOyLlvzdII1Rkgz8Gs3loW0HT2YCunJAKYxl4vOCeckTb0rKuECx2dvWEuWZh0rRcEJJ2UQMxECh1fSalx3BCfGsQjvfpyv%2Fdr68Ow51QWV0RsvIzzw%2FdgJnniTmkMJ7LRdlUMTXlLRalIKUtANuXoVJbBKxTOcXORJROy60d0lkGMK55bvzyPeTR1faD0cVUv1SV2bnxn0hVPNolOKdKhv7NaTz&X-Amz-Signature=29e9803ba4938799602155e8dfd784a75b9f04f12602e9c1d1cd45c0c348bb22&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665AX6CG34%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T170108Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFcaCXVzLXdlc3QtMiJHMEUCIFo1KB5gX%2FiwEqFqxLICJeuOXM%2FdMIz7HOsyEHjZ%2BXDqAiEAqeb4l%2F2vJPUIrEKpy7tmVWq6IPn8Rj%2BkrZaUs51KK7wq%2FwMIIBAAGgw2Mzc0MjMxODM4MDUiDBaDVfoG%2FVHFqaIo8ircAx2jXRCFigNTxyJJo9sKUdNALn%2BrGGqdFtpIY60RhfLKORh9uOUbtXX%2BPLaTLVmGq1Tg7R0PTtoAfyVmKQsJiwDFHZQ3g%2BXjaCAzPLoQL4Fe5B9DCB%2BJXen8ykKMKNGzf4qOrVJdPHoWSB5OFDm9lNAsl02WVd305QoNPMQe7Wke9h9csHsYQfxJwDpHqhJaw0P1fm%2FPrXmO3mMckkt86go2J5oIserCvOh066MAjZliUm8ySbGqTSOg1PpvN1qQ0i8GKkiPBi25KfvrnQRXoWBw0H6ESsmXdmm0RZ4%2FlRTe26GcrvTezRB3qHgoy%2FD8VdKd7XuW3oZlWYE7iRHbha2nETORSNUYabRlWrPYgWf2hOMQJBLQKxboyFMlJFDHxgWFw5s2tnRJ7NZ%2FUwKFuaQPBiizFJ2TFt6z6X9poGRZcL74kZ3gO%2Fnr6c0IA3THr3yiMDDYqitWk61FTMfTnnEAe44CPlCgrx8e%2FC0R1%2B1tldHoUVYI3eNBeDTxyihgNqHGIRWi25zIbTTGiGfcEgMbBNO0ctlAYqp6UvCE9Bnmm7OjilOb0NDy3dfVVAOW2S4ifdOoe8%2B%2Bui6jV8R27nOv%2BQRzFRI4gKPruYEO4BD9HAzBcIwuLkHueCyVMKeDmc8GOqUB5rn8ibamzq9bZSaf%2FXzLi60txxgNF%2BlhvgWdZ8xHNXn1G%2BRbyKefmWBfGSQjeil%2FLOPYM5ipmizXDUEF51vR81SX74sRQsZx%2FcfhH%2FCQ2z09n18SCyVxXFhE%2F0At4RbARhDPnGZa95U0vxfE4WwzqRDnSZjvo3meyM%2BEWFOGN6JV1S1nWBTT1u6vl8TdAjHhd6KtW83kIpC%2FPy0LpIWSHMF6kvTS&X-Amz-Signature=91a319e0d865d730dc251078355a3673cf03704d2ca41e8b2396de800f69d0bb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665AX6CG34%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T170108Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFcaCXVzLXdlc3QtMiJHMEUCIFo1KB5gX%2FiwEqFqxLICJeuOXM%2FdMIz7HOsyEHjZ%2BXDqAiEAqeb4l%2F2vJPUIrEKpy7tmVWq6IPn8Rj%2BkrZaUs51KK7wq%2FwMIIBAAGgw2Mzc0MjMxODM4MDUiDBaDVfoG%2FVHFqaIo8ircAx2jXRCFigNTxyJJo9sKUdNALn%2BrGGqdFtpIY60RhfLKORh9uOUbtXX%2BPLaTLVmGq1Tg7R0PTtoAfyVmKQsJiwDFHZQ3g%2BXjaCAzPLoQL4Fe5B9DCB%2BJXen8ykKMKNGzf4qOrVJdPHoWSB5OFDm9lNAsl02WVd305QoNPMQe7Wke9h9csHsYQfxJwDpHqhJaw0P1fm%2FPrXmO3mMckkt86go2J5oIserCvOh066MAjZliUm8ySbGqTSOg1PpvN1qQ0i8GKkiPBi25KfvrnQRXoWBw0H6ESsmXdmm0RZ4%2FlRTe26GcrvTezRB3qHgoy%2FD8VdKd7XuW3oZlWYE7iRHbha2nETORSNUYabRlWrPYgWf2hOMQJBLQKxboyFMlJFDHxgWFw5s2tnRJ7NZ%2FUwKFuaQPBiizFJ2TFt6z6X9poGRZcL74kZ3gO%2Fnr6c0IA3THr3yiMDDYqitWk61FTMfTnnEAe44CPlCgrx8e%2FC0R1%2B1tldHoUVYI3eNBeDTxyihgNqHGIRWi25zIbTTGiGfcEgMbBNO0ctlAYqp6UvCE9Bnmm7OjilOb0NDy3dfVVAOW2S4ifdOoe8%2B%2Bui6jV8R27nOv%2BQRzFRI4gKPruYEO4BD9HAzBcIwuLkHueCyVMKeDmc8GOqUB5rn8ibamzq9bZSaf%2FXzLi60txxgNF%2BlhvgWdZ8xHNXn1G%2BRbyKefmWBfGSQjeil%2FLOPYM5ipmizXDUEF51vR81SX74sRQsZx%2FcfhH%2FCQ2z09n18SCyVxXFhE%2F0At4RbARhDPnGZa95U0vxfE4WwzqRDnSZjvo3meyM%2BEWFOGN6JV1S1nWBTT1u6vl8TdAjHhd6KtW83kIpC%2FPy0LpIWSHMF6kvTS&X-Amz-Signature=91a319e0d865d730dc251078355a3673cf03704d2ca41e8b2396de800f69d0bb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662TTJOYO7%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T170108Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFcaCXVzLXdlc3QtMiJHMEUCIQCSFSHJtCdqiz2cKiYVgmpcMxFCh1EEdY%2FkjVL9yE79YQIgc%2B%2FX37hb8Ehv1PPwZfaYmpTa%2FqPyZNRI95gDNQwTOTUq%2FwMIIBAAGgw2Mzc0MjMxODM4MDUiDNTBCCYqbtssOCyT5yrcA3j%2B46aefroRTt5vQl5mb41VJ0jYyEbHi77n6ZBikJpJbBZ8u3HeagDPU%2FRvNCOQMKjYsT8GB28fegxCbh9wOOjr6svRyv71xpH%2BZ%2FBOhWrXcKu5WKCuPeXNnkQE4tuCz%2F7CyVcc2NP9Q8zKfroQ8GoFyDKS202sCZ4s%2BkWmE7nPO%2F%2BOpL7iI67G9dN%2Fgda6I8BFvOPW7RxKHq3aXfMeMpwU%2FThFvVk3%2BTR35w7Mk1yoW4iLEv4t%2FzX%2Be3rTVD1Sv0dniQM1jn0XzEZLQUREuvOOcEbo9bh6CNOHk%2BldYl9pucOrYFFmfy6bakEWG1ikShzWWE7O%2BhRZe9UDUrK3UCGKlDHfz7OJv98zlftHtpg60jHBWMcvhqAmRwzQkKN6VItZ7bvweGFBsy%2B6thRUrSwgbEVBmqfeeXGXPCmza9Lm1h2YBntRG9EdXsdPMciqt1aQXS22vPmiRLFzcwQl%2FJpR8QOnVg4RJB0FNM3u1%2FAsDOkugoqtOE%2Fkpxm8ZyDlv3OehtwH13Zh1xFlVMZ1HXMNEcQsIbt%2Fv%2BDKDetarBqRP59%2F%2FY2qeCIbnAHv4RepKKSSNg59VUGY%2Fjstj2AZpgEpQAlpA9RcnDdvZgXQQku0kryAjSi2JA5VHsUSMKaFmc8GOqUBNAtZ%2FiT2GiPdflVq0Dql8BuqQvtxrn0tZotIM9defdSX5QVG%2FO8RgYzw5ubeag9JRdbBBSutUEnRnFI5TEmZ8GX19pGQL%2Fwali45jDiMtsIO0ed795kEX%2FXPu1O1QLrSevsO2ch7nLLhz%2FMpU5nsUxRyNXKRfVRtk9arzSqG1DPVzAgxrQQNA1stnAF11qN3KtYQqaD1cL67UkqED7YCpX%2FBNME6&X-Amz-Signature=45a147d9731e2a5a5ea3d6dea9fe6e926b0b54317306c2edbeae4b21fb7e1b63&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

