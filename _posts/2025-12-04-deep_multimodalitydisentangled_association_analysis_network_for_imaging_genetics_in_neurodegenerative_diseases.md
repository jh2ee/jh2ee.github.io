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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662GXTEZ4R%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T221930Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJ7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCPV3f8MVBZWSfU2inAhoDhu8axbkaGNhSOgBB72CcbnwIgNLpCeWXxh5jKuQgUXBSWkMvlwFoZhrNklGHuNSM%2BpgMq%2FwMIZhAAGgw2Mzc0MjMxODM4MDUiDLb%2ByCvOsaEt3Z266SrcAx8A%2B85WuSxRftm5dMtda9ci1yNxy1Is7udIFZiRYfDQsJnDGivYRiVTxAlUP8j2QlhT782f%2FquH3kzVVTBb4io9XErlmh4PLYUQUirHJTQobtMXbobnjyK7eWdicvC6jG3T85u2ezNco%2BQHpYyNjirDL0h8vG0WCrJSKxJqacHouf285GHOW3qNFa2UM%2FqtXHzkkrQKuAviUIEt1VXO%2Bmy1PTwmaw9j3%2B1sOaod%2FyHwIwE8hxTLwr%2FLL8Q%2FIPHFxOV9Cg%2F3017yTMKKx%2BpQxd4ZMBKpkv84jbgO6d78esqt6w%2F4SLH6UGLfCgpWHGOQHKoHt5gCjCHNHIir%2BHsFhUtNOS4G%2BI%2Fr1emF9c2FyM%2BZGk7pERh03dFVGnoAFusGTjz1z7Xdf6em331Dm8EbymnjYb2JvIndr31OBxQe0YqzsgSSgcb3aQ4wzg7mVlhrkTACNWkLtrtblJ0g4vQ9WrgMI3Jw3K45j7jTuB4JxmCoSJez2wUxlAOjSf4q10OKyilymru3y%2Fda1PqVEwssNGGXCxMddCEFr2v2sfBhDt203TujeaTOHC1FjmJ396GqiofoGNcytmRLlxcjY%2FaxVBfmqFYYJp5nnyqe4nvTOK1PY050hh6ksU2ajg40MKeb8M4GOqUBJ4pdheFuzp08KwRQ%2Fruv3TAU0YJ5wgdC4Z88zcfGM%2B8vtSe68xyM4wN4StjD2sENfkRU4WqqXEyjIdU8USkj79sRKAt%2B531jUgd%2F%2BcLLkOfV8GxB7MJS2mICqeU3zDqGT%2BlRe9Hb4EgqKWdoPXm5e7sNVFZX7zWkNuN4t8adgM084bEv3lqbe0hOL61GtphOFqM%2FVg%2BxlBNU8zPj9Fw5VhOgdY6n&X-Amz-Signature=e764d1708208ca53faf3a01cb62508f606e36b46a1353574d632350aa5bd392d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662GXTEZ4R%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T221930Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJ7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCPV3f8MVBZWSfU2inAhoDhu8axbkaGNhSOgBB72CcbnwIgNLpCeWXxh5jKuQgUXBSWkMvlwFoZhrNklGHuNSM%2BpgMq%2FwMIZhAAGgw2Mzc0MjMxODM4MDUiDLb%2ByCvOsaEt3Z266SrcAx8A%2B85WuSxRftm5dMtda9ci1yNxy1Is7udIFZiRYfDQsJnDGivYRiVTxAlUP8j2QlhT782f%2FquH3kzVVTBb4io9XErlmh4PLYUQUirHJTQobtMXbobnjyK7eWdicvC6jG3T85u2ezNco%2BQHpYyNjirDL0h8vG0WCrJSKxJqacHouf285GHOW3qNFa2UM%2FqtXHzkkrQKuAviUIEt1VXO%2Bmy1PTwmaw9j3%2B1sOaod%2FyHwIwE8hxTLwr%2FLL8Q%2FIPHFxOV9Cg%2F3017yTMKKx%2BpQxd4ZMBKpkv84jbgO6d78esqt6w%2F4SLH6UGLfCgpWHGOQHKoHt5gCjCHNHIir%2BHsFhUtNOS4G%2BI%2Fr1emF9c2FyM%2BZGk7pERh03dFVGnoAFusGTjz1z7Xdf6em331Dm8EbymnjYb2JvIndr31OBxQe0YqzsgSSgcb3aQ4wzg7mVlhrkTACNWkLtrtblJ0g4vQ9WrgMI3Jw3K45j7jTuB4JxmCoSJez2wUxlAOjSf4q10OKyilymru3y%2Fda1PqVEwssNGGXCxMddCEFr2v2sfBhDt203TujeaTOHC1FjmJ396GqiofoGNcytmRLlxcjY%2FaxVBfmqFYYJp5nnyqe4nvTOK1PY050hh6ksU2ajg40MKeb8M4GOqUBJ4pdheFuzp08KwRQ%2Fruv3TAU0YJ5wgdC4Z88zcfGM%2B8vtSe68xyM4wN4StjD2sENfkRU4WqqXEyjIdU8USkj79sRKAt%2B531jUgd%2F%2BcLLkOfV8GxB7MJS2mICqeU3zDqGT%2BlRe9Hb4EgqKWdoPXm5e7sNVFZX7zWkNuN4t8adgM084bEv3lqbe0hOL61GtphOFqM%2FVg%2BxlBNU8zPj9Fw5VhOgdY6n&X-Amz-Signature=e764d1708208ca53faf3a01cb62508f606e36b46a1353574d632350aa5bd392d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XPBDMG2E%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T221931Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJ7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIHWYwS0NZAkMhwFp%2FeuMBZLKKKqKKLCx9WAAMm3NcXr9AiEAnEW7HyEN%2B3CeMXpvq7Xe9mlFpiJjIBkVeIejILsRBLcq%2FwMIZxAAGgw2Mzc0MjMxODM4MDUiDJgSEowHBD5Up%2FUWlyrcA4G8ptrPX4sWPKjRktFBoNU4fqdeswhhdu8Fk33pI%2BpdLWfqg1Wdn8BEaKG1xvEXMLscJ9XXENmFEUtnOFX9h%2FVllsj9c70yKmCZdP66%2FeCPYNE%2FzG91Kz8Ufw5wNwdxgEsxtN397hWr6Tyg9JIUZUvJrd4LjRhZF30P0UDfhQfxh2Nz1ha7Bwz2BWn5wBIn2S%2FDzOPDj7K8pQaZCp10tvmpQ%2BWqkzCShdCmkTdxfrk7tjMyz8wfQWBwKzRLiy3latV%2BFmVA06qDKzlg9kFtnitUEvcHffu3rqavNGCId3qyTwyE68CFQ3zfq86irkVREJke3sWsRWuu%2F13BLQIvu82wTZroZ0qCXnl1WAwpgxH1a0SarMf06WtbSLGZpNqPCD%2BLXUIYb61sfF5L%2BbvojYfxc1hoij7ilHtt%2FliajLu%2BnnwKhfdWhR5XCXne%2FbbIV4HfVzQ%2FcErTE5Qfxx0lvhcvGHFGkqB5v5F946t1cqb9rTRM9a1yHpsw%2FVVp4xhwDWfhEG1Izlc8U34RrNFDRWESJfSN1kcqJCgnUxHkQ4IdBQrzqGv5jm8DwFMAfuiXt01YslO4uHbFWxYctrn5AOkLnq9eLO0ONfFv8nCDzoHIJs6Z1w8HnHDMXt3NMOmb8M4GOqUBvvW5prYmtIH8ewhdVAxwvTDWx2A9QXCphcuPj7IATPNQMAhqKI4%2BoyqSVzTPQBRIhCzBRpU%2Bk62F4b0%2B6dJHu%2B2lAlR%2FwRvXZYwWxtQh9ocg8xUX6pKMoFCD9RUdEWsPSVEfVFIFmDPXqTMHESdj%2FWy%2FTXzHMHQEIOa8QdzBZAylnvoJGtuHnFcE2%2B0XjVRnLVBxh0ttgX29lgX06DTgbzhnP3b7&X-Amz-Signature=ba5222d873e338a3f1632f6876ce3f4205e0811d579a0aa3e0c5e0e46f5fe0a7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U3UPFI5N%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T221933Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJ7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIH9SV525Cg9ZUknYTD%2FCai4IiUSk%2B71azopzdCBoCIH9AiBrqUEUoOnYd3TkWKhcuk2Ytv0dALSIccU6c%2Bk7l5p%2BDCr%2FAwhnEAAaDDYzNzQyMzE4MzgwNSIM7wu8l4NSeyIMfFqwKtwDtVoHKRmoG27kosy9m%2FC0cFpXUcCEWCqEaP7Cxa0upIuEsTUJ%2Bx5Fe4Ro5moNWzxBhhgNfH5j7QRRfncr7tTaITTnXHeUVQOsUOAJ895pEkdoSdSCMebLWP1xYMZYirFV36rY4mGLvwEtGe4O8iD3P6SNHFMkR4zCsLRYxUMcokDZORAYwUealjI5z%2BP%2ByXPmR0n5NGEP0SItowrs8dK3GS3y9HA4l%2FOwB2ns53zdFmNZZbhpRcd1DThbbvWmbJXe2PXvpFOrsMPBwtkrDzF0iDirzWUibU4ZE%2F%2BhXdmq8juQmRDA62h9aFZgRG3jkp7fvrrgajo9cqeMVF616%2F5S1yHY3cLwbG272cIKZS7J0wHEjkA3gBWyl3ti8iy6B1mpLoCjDzZ898qjXj36qDKKZvF4lqXDVIamBoRmtAJmbzi%2Bvl2nVLHq6qt1v13sveehdODM2vpxFeuqgeOo9bSfljeUwq99Y1RU6puUCT1PP5gx7ZA8DDhYF2IThAGY70LD%2FslKpAMwfOGiOgXfJFdRPFSb2mEbkH3iRGZHhFhFuN5%2BEuGAaFutLoVD8aVO2Aj6IQVOWihjHi%2F6m4WWUOdQ2AmnPc%2FTUibYUQpYWszscxaLQ%2BIXxWrGKB3JvQ4w85rwzgY6pgFTm0GO1xA%2FvvXFQZd7CGhfrizfHOy37DDGDOGZLDQ%2BSoA4tld9jKHYQ7O%2FY5frkInUrfil9INUcZxCcz%2FoD9b2a25DV2jMZgIaHcD6mqmJj4l6vwrEymONCqiXKlBIbS%2BdKpqw%2BlHggk4jjSsOcAEmmGZ9BHzoEnJIClXJsG9ipsZQ4BeZqCipQ7D6lY9o6e4Bk1tVXftHx7alf%2F86k%2BhO1iAPmwFK&X-Amz-Signature=9ac60759169d3cbcfe9b5ba109247b89c99f49008e3e5f5f4f46b719aa5450e5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U3UPFI5N%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T221933Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJ7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIH9SV525Cg9ZUknYTD%2FCai4IiUSk%2B71azopzdCBoCIH9AiBrqUEUoOnYd3TkWKhcuk2Ytv0dALSIccU6c%2Bk7l5p%2BDCr%2FAwhnEAAaDDYzNzQyMzE4MzgwNSIM7wu8l4NSeyIMfFqwKtwDtVoHKRmoG27kosy9m%2FC0cFpXUcCEWCqEaP7Cxa0upIuEsTUJ%2Bx5Fe4Ro5moNWzxBhhgNfH5j7QRRfncr7tTaITTnXHeUVQOsUOAJ895pEkdoSdSCMebLWP1xYMZYirFV36rY4mGLvwEtGe4O8iD3P6SNHFMkR4zCsLRYxUMcokDZORAYwUealjI5z%2BP%2ByXPmR0n5NGEP0SItowrs8dK3GS3y9HA4l%2FOwB2ns53zdFmNZZbhpRcd1DThbbvWmbJXe2PXvpFOrsMPBwtkrDzF0iDirzWUibU4ZE%2F%2BhXdmq8juQmRDA62h9aFZgRG3jkp7fvrrgajo9cqeMVF616%2F5S1yHY3cLwbG272cIKZS7J0wHEjkA3gBWyl3ti8iy6B1mpLoCjDzZ898qjXj36qDKKZvF4lqXDVIamBoRmtAJmbzi%2Bvl2nVLHq6qt1v13sveehdODM2vpxFeuqgeOo9bSfljeUwq99Y1RU6puUCT1PP5gx7ZA8DDhYF2IThAGY70LD%2FslKpAMwfOGiOgXfJFdRPFSb2mEbkH3iRGZHhFhFuN5%2BEuGAaFutLoVD8aVO2Aj6IQVOWihjHi%2F6m4WWUOdQ2AmnPc%2FTUibYUQpYWszscxaLQ%2BIXxWrGKB3JvQ4w85rwzgY6pgFTm0GO1xA%2FvvXFQZd7CGhfrizfHOy37DDGDOGZLDQ%2BSoA4tld9jKHYQ7O%2FY5frkInUrfil9INUcZxCcz%2FoD9b2a25DV2jMZgIaHcD6mqmJj4l6vwrEymONCqiXKlBIbS%2BdKpqw%2BlHggk4jjSsOcAEmmGZ9BHzoEnJIClXJsG9ipsZQ4BeZqCipQ7D6lY9o6e4Bk1tVXftHx7alf%2F86k%2BhO1iAPmwFK&X-Amz-Signature=b4b60228921cd022b27a031b1db09f90c64a02e20200b4dc940e64865cdd8c20&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466T3S2BL5X%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T221933Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJ7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIGs7%2F6uenB0YoEkq1uIEcAsUD7dooMTIWKjioP9dy81zAiAqmxSjMfBc4fuYXtgMshzb%2FW205KSgc7VT04hliUGSvCr%2FAwhmEAAaDDYzNzQyMzE4MzgwNSIMEEAJhZIglUQx%2FnClKtwDKNMO%2FXMUM9wALyXB31P6ZgW7yXXHDxlXwZyZqFgX3vekSQACQBTU2BoLJyCBiCcimgQcMtTYaYq2ifTyf5VEa8XmchtrFQzKjSiNsfM072ZS4mcatSfcc3uT8R5paAToH2TvZagBMNKC47xIMg3WdWQ8T9stoFlHIbkMoCkx%2ByOmu4srnKUP6jOLINFcEguOt%2BZ7mwqHhuAycCD19gS08y2EtQk9O55hcLOOM%2FpEguE3%2BNpyf8v4GH1twaeaMP1rrcl6BqMfv%2FPHrZA919Uw67Y9nQQRCifr%2BwgarqxkkdMr9uv8Tj669JUq6VuY%2BJol1bZpuYhqmyldsv9K02%2BKHUEy%2FoHaiQA%2FyZWEgCJ4iGLgh6Y5KFtz5amaqbhbUxhOr5TS4iwmowfyT0SIiXCi93Y9nOG%2Fhsdsa9BP20QsriD5GJPIFTaZMkrUwTbk2Uf06laVxAaeUB%2FVch57pSNCg1CYPLSfB7Za2dSmGzTQyjgi4VseMwCnMFRWSu8UJ%2BWpc4JbakFTW6xbyAny40ewLaLb9Hq3GCEE75cMN4fMKrGbVNP0xtQaw7WVmnnQ%2BjxZ7cIji9nnrEKcbnWrtHiowM3SLNGsdohnbguFAIj6whyIUmLRaA5GwkN1WgQw%2FZjwzgY6pgFWLKCMVPlR9JGYR%2BozscnFIH%2BDJl8fOYYMi9culyDevkRiV6m26iOGFlcmR5Ino9zRV5fLpQgNmE5m4q6sS6XxhoQDpVfQNHR7gM47R3dgGEnrsIQk%2B7fy7CNqdH3hc20UHHaIl%2BtgFOvM0ibWSFz%2BPRl1oNrJ9aRxIYTJyh9LJd2Rf9NbEP0osKXoof8WdZ7BAIO55dnm6j3tpVdSQC5wv9SZ%2FmrC&X-Amz-Signature=5eebd37baa235464ba16b0157554a9ed08efdbbbcff76453ab6524b350bc1bc9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y5W22ZTI%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T221933Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJ7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQC%2FcN%2Bu0ckR%2Bhm0CFriHrvpvUSsNK20cyqK82aqXhTG2wIgbbfit7y9OSAd5aF4lKR93oM4ABatgqGYfLBK3R3T4zYq%2FwMIZxAAGgw2Mzc0MjMxODM4MDUiDGVlwv%2BkBO4xNlabUCrcA%2B3h02GY2q8F%2Fb6At29oT3IlLrGciwjc9TUoMAGWICqAGh4QzvTVXiJ%2F2iSsV8y6KfcWG3LO%2B%2BF2TQR0uzFITRcFo%2FfVeQtqJDhq%2F518ImK0enJZFZpl5prQ29cpUwBEaTWMjaNPBxP4iu21P%2FOqokgSbInjO8NhjNgqg5FBWwSi8XZRbYI6a5vwXOjecRA8G%2BHfVPGZTiPkHf0sbIMFgn07teAypDf5%2FN3hwTSc3GID2hmtoETMLswyk%2BuwdamFfgs%2FEHqXv4UfIt1urx7Dwk9hfOa58x76rBXBmNGYuMU2XOoTNH9zfR3igGzRvxqfJbcbOVSUEtpN1P%2FprZrPJhBR%2Beml8zOi1LryCzJNfNG7yZAi8K3pTTSjuAs%2FBAF%2FjJy95XxnX%2FbTjsa5hHvC247i6VrmuoJfcw5rZ3f06eOxscMbEzHJpRj3zibjPWm1g56UFWk2K6Op7tyRMmSPSMEjDsjX4EjApdY49GCTfsvsNVm%2FHNdhL43BuvmyQ5Hx%2FSF7NxkHWdHQv6k22V5MQd1dv2Fhq1FPuvdWL%2Bt7f9QycAjEFyW5zPx%2BOc80vBLd%2BOizoKvzlB5pJanIj8Zqk0l1xtpmuOVBlrOC7vjjNfi%2BZNnTI0B582NSlMbSMKSb8M4GOqUBErAogz7MsTVsW0uRpzWuc0GRlj8G3iEJdi%2F5PuDhCfILBndH3X8Q4G7D5M2nNKlm7zNmdfew9QjF3vZ01iv1y%2BiNUOtKHM4TpYyh6c0weWAQMPAZIy4YnppfnNSK8wWBFOd5oKp%2Fu6QhmUxxp4Zl4FzWmdFB%2FPUMt33gOIICKce3sS6GKDBlI%2FbyTVGmBh6uha%2FJV9rG%2F9wfl52vvjOT5XoTzFUW&X-Amz-Signature=32843ed1f3ed825a0dbcaab096461bb84cb2a994beb3d565751425ebc77ae084&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Q6RZXHNM%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T221935Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJ7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIBuMvWyUAGEqsMxBP%2Bu81cY7%2FOzD9mLE0TBIzEU5Ol2eAiEA65BZEkoukrWK0xF2bkMEG8WHt%2BDe%2BCjFN1p07kI9U6wq%2FwMIZhAAGgw2Mzc0MjMxODM4MDUiDDAyH0FE3ruk2LWdDCrcA5IuPF726YDfwXWVH4trp61qOO0epfQzN%2BALUpNxAkZjikV5L29JuGAO7K9zssqBeQpO9ZImpL1ESrDeb%2BA5ryibq0tXjwOvz2SNDS06vbV%2FICtwhkeZegIinUp8bDfYrUmAVY20xmUbYNzFIPLcPcj6wY1bX3RSALt8N5zbRn%2BWMssLZ31sd3uQg2xaAZLPhhSZgY4SbcYqlk5KYXkamWlujc3Ao96tqjcjADKfEhTbOWa4MX%2BMcDTYnro2mIBZLDSXJdYoYXOhE6%2BSCJsQv5FDAdfCFglbE2rUoLc87hfQOba1OjEDOzrpHnSlZgtQ3FGlr3LfXRyOR0DQB2nN3xjTqWM45iPv5xVpduKtSeffTht6oMVHa9rJBuF%2FW6K4N1imAl2mHa%2FtT8HRAAtsY859rrx6ADZXGcFE77c8W8%2B1nPm0qFD2COSF7hxOb0r7%2F0WGzMv7awfUMOUwN64SYyW4CzQ8qFwaMgwldXEUuVbHEQouce7gYc55aedTA67CttAi0EkFcuCrFednDNt1OEFVzVnNIxqeMCDlyASQDl8I4nge%2BqcESWghzOrV%2FkXenauV3jXGK2m3dFcmyUZgxZuFlqhjxJqdRXHDkhmdaA4nXmZkFVFm3v2ahBu0MKWZ8M4GOqUBy53GFEztbHHkLMhGd0VqMXhnEpvktrsaGtjV2Ayj%2FjPSViyzsMfmVR6oKu8HAhcRcWSzlvnKzzkS%2FV7eAKJ0qTrbJJF66nobBoKxOikQm3y14LtIjjRClwoqxihhguma%2BUPRl2xPp8LXJmRmP%2B8EehUA%2FCRVPUFJUcgPmdPTVcetTvCfZQ5NtXQTAJYZ%2FOE6Vo9B%2F7o4MbsHF9OQew3v2Nik2j0%2B&X-Amz-Signature=e5062e7abb2fa35f293c105b87cd5df6196305a63e6a7373397f9ff9f24e50e9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667OFGHYC4%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T221940Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJ7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIFc0PeWFnqEZrGvrrBGNjNqXoiD5W6r6BVFZzPVIeXxFAiAr5IXvJuCGCWFNclLabXGxaHwFH0WL%2FIOAAv%2BVPkrJJCr%2FAwhmEAAaDDYzNzQyMzE4MzgwNSIMijKJf0vfnLcWxqvTKtwDQv9za01qZtsKdcL1zJgmWYMbBkRuEVTbU3muRVEFd3Q10wWi04MACOEdRKXmKWBsNiTYP%2BTxUl7dU2XZyJ3wDYuYxjBNM%2FT80jMlDo5e4bvXYUjVDUoK3TtPLNw36Vh9bLfoKGiIAx%2B3LEtYAkEcu7cJhhXqcAei57fV8Vo2HtPcJwThvapq1H1G1r2YA8M%2B2MxD4%2FZsfagtgwyVuv5tiendCKrdF97ZTlRUmpYmutdmsTthApcfIQAM9Cv1TwsqEirPMXpGI9we%2FAetCY9aHvqsu05erFQfk45OoCDowJhGJaQ5RgTvF7fmB3HmF5uYS0WjrpeKK2sZbqZc1xVIuXtBeqA6nnxoxXBQYjw7SprMliEvtlAHnfNhUbO8dpWnRfak5tdXARMhKY80oK70r0XtgGrEDHO0v2zzIatI0XBZZV0tLAqGJGGuQvD1k34NVocDkEOqBOLTLsDJaPNWpr%2BHxw4uUuAssKWQETl8AtzN5m2s6DohdvXIkSxgKAgRuSSBAnQ8qiR90r0ADkSamUR6kPyALV8RC9ysUg9sMZLhBiVVtkwbpU35EaC5bPj%2FEQXeCWMoFhIzQfd06PgJXxHnn0Nvk%2Ffd3NmWbkqAC%2F7vKddC%2BE9l3mF9%2BqUwzpnwzgY6pgHGG1yGDOJVYGFevGM8bA%2BXjl9bGG815H%2BD21jzPWpm38c2FsXKfvlEokHCrtp%2Focz2VR9r81MdhGsHjVhpvbYn6HTnuIwoy7nDb%2BGC5h27NxbE1dYBn9NRqwmrksdm2z%2F0I4OyUum1XSzxe%2Fx8u9egTeiukD2Gh2sO%2FdWmomp%2Fz56xElCeXto7oIV0t50Ubg4pL2JGw28RyKFcyWVYOXc0dshfTX92&X-Amz-Signature=7982626d44bf1a14853ffaf4d10b494a554f05f6dd20a55bfc37dff6c4c7b0fb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667OFGHYC4%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T221940Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJ7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIFc0PeWFnqEZrGvrrBGNjNqXoiD5W6r6BVFZzPVIeXxFAiAr5IXvJuCGCWFNclLabXGxaHwFH0WL%2FIOAAv%2BVPkrJJCr%2FAwhmEAAaDDYzNzQyMzE4MzgwNSIMijKJf0vfnLcWxqvTKtwDQv9za01qZtsKdcL1zJgmWYMbBkRuEVTbU3muRVEFd3Q10wWi04MACOEdRKXmKWBsNiTYP%2BTxUl7dU2XZyJ3wDYuYxjBNM%2FT80jMlDo5e4bvXYUjVDUoK3TtPLNw36Vh9bLfoKGiIAx%2B3LEtYAkEcu7cJhhXqcAei57fV8Vo2HtPcJwThvapq1H1G1r2YA8M%2B2MxD4%2FZsfagtgwyVuv5tiendCKrdF97ZTlRUmpYmutdmsTthApcfIQAM9Cv1TwsqEirPMXpGI9we%2FAetCY9aHvqsu05erFQfk45OoCDowJhGJaQ5RgTvF7fmB3HmF5uYS0WjrpeKK2sZbqZc1xVIuXtBeqA6nnxoxXBQYjw7SprMliEvtlAHnfNhUbO8dpWnRfak5tdXARMhKY80oK70r0XtgGrEDHO0v2zzIatI0XBZZV0tLAqGJGGuQvD1k34NVocDkEOqBOLTLsDJaPNWpr%2BHxw4uUuAssKWQETl8AtzN5m2s6DohdvXIkSxgKAgRuSSBAnQ8qiR90r0ADkSamUR6kPyALV8RC9ysUg9sMZLhBiVVtkwbpU35EaC5bPj%2FEQXeCWMoFhIzQfd06PgJXxHnn0Nvk%2Ffd3NmWbkqAC%2F7vKddC%2BE9l3mF9%2BqUwzpnwzgY6pgHGG1yGDOJVYGFevGM8bA%2BXjl9bGG815H%2BD21jzPWpm38c2FsXKfvlEokHCrtp%2Focz2VR9r81MdhGsHjVhpvbYn6HTnuIwoy7nDb%2BGC5h27NxbE1dYBn9NRqwmrksdm2z%2F0I4OyUum1XSzxe%2Fx8u9egTeiukD2Gh2sO%2FdWmomp%2Fz56xElCeXto7oIV0t50Ubg4pL2JGw28RyKFcyWVYOXc0dshfTX92&X-Amz-Signature=738fb20f7dd0e5f4d61676bb768cbee5f335d263c56556ea8cb290dcc69db645&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662XDITZCY%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T221928Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJ7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDml%2FoUfUotv1oTFoV1ul3RzoQyuTii6bAv1I6I2yTx3gIgYjCqwb2WKkmmF2woBKuBMzEQJ%2Bag3%2FmaogV5rSNGH7Iq%2FwMIZhAAGgw2Mzc0MjMxODM4MDUiDBlO4ad4qxlB7nywSCrcA3E%2F0JSUwj%2F00XuZF16vxmsSHGd2BIO%2FAIVhNzsxDNQTq3duAa6glOaPbyJXGH%2F%2FP81DfIUQbDbQJ52Khijana6sWTiI6aivLzUk75TDSQN%2BvwL9dnFG3zCgvwfvWVOb6phyb%2FOyUVAJQbEo9fdudXVK%2BrYNrFXkdLwl1Ly4UvA3xi6u4GVEIwDoeqjUXHaMOau4Wkb4gutFXOc7PSm1M8Kv5LQ9zsOgcdwfzWA8hrMcfRjj5TOwgco1hg2xBMNmtvy3SAId2DQzRfTYsa9Ed9AslVmyUpWU36di5aiGvULMHI7Bgwe823H36Z5ZTbCppqVMhwzl%2BpBReBhTAOJKI6i%2FAj2hNQeBcDblkfsP%2FMhw6Ap7Fo86ZjDrR2FTwjtrWzLlTI%2FxZ4rZ7KOUfK2lSnPq7smL%2BHWuYxtYtRfcIgqultMrEHpGW0%2FGEF5k3esIINW%2Fyim5gKOH5nej6Oss0%2FHFJ8tysZFfT%2FonKvyaja%2F7%2BkpMO4jznPwuo5whjAUe5LuAQZTzo17bdBBoaKNtpeVx3V6bNZcBVcEYV8eCgTDkvVbzqmMhPjrXzjQ6b7V7S%2BmyN3Mm4ryr6DRJlzvaQD2kAfw3UYfxvlGmE0lZCYTMsS0IRSg1GSgUmK1xMPSZ8M4GOqUBL%2BLqpWKL8RLu73ZcGnt%2FQRgs0KRbk7A1g9Gi%2F%2F%2Bktq50W8HjINUrKo2vMxoJo9MaD5VWwh4cfbPYSq3ODZCiq%2Bj%2BJn3PxKd9INmICGea6bNueB2SYAC74pq%2FVuNDUYlwq12Fw52AArgq7VoXwZ4xohWwaD0D3kdp%2BWI7sF%2Flgt6jLJpFj8WFWOHN5HNNtmJ74Agv8T5%2F%2Fw%2FvgnGeWXHRx5%2FjkIiZ&X-Amz-Signature=260048282e2856b9ebfb3f599a0755c352d4ea36a99433187ee745b63794560e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S7K5J5NS%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T221943Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJ7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDZ3crGj8oWXP7igi0%2F0Cb97IQ2zRafi0JAe1b5aLy%2F6QIgYXMfearLhii4bTy3T8%2B00Lxk9ljfFmHJq0Wb8i4d8c4q%2FwMIZhAAGgw2Mzc0MjMxODM4MDUiDJMqeU7EIeTkshcBOCrcA2tq9G9JMQwxaXTKek3VNqQF18jeYJK9KGeolPm5nY41Pw7hDI9%2FduRG%2F0oe5xlcz1TKkpqWf197Y4ChvAf0bamoNXIa0ADFikH3d8U1q2JQ3Bfj0vyy4pmExQDjpUnY7aHdD5JMkudahGi9BmXE3CEInOi4ZvcKJ08WdYGbR6uphVQrc0b6srSbMXsklsVhn73sAfnpC%2F%2B3FJ%2FTCunWO7UJJjsVDrONyLIe4iCr1zIJTQYHx2IRKYajPCMPWcAxmGPaDMr2iUtrd4g3cGwEmm75BaiTseLBWkUYDY9OHRimGjsTZr8UhLsqPJvBRjBLDf7F3Xsjf9RxP%2FZGhoTO9owsd68yCGB3o14dhhGpHeim5MHoja9KSODYNMNlwhzYKfZzbVQ9V7V4hDoRmyCUWtdQTFV08VSma0%2B7T9ObCYFbhtzsalB7ImeDeY2%2FgRWj1O6D8rwMGGIMh1ZzGj895wUDfRFU67%2B0yA%2B0fa%2BmCQp00T8ZKhCYpBOh6OyKwH1EYOZOlp1qgoKItP2tFYq7PxxP5wqsOtlPYgtwJbBwfHLN3CJfn8KLTwO%2FqI76eCB3XM5Spb0lrH%2F6CAByvVPHe%2F4vswi5O1X45HFXquQuCc56yxU%2FfRkr0Ewpx6%2BSML6Z8M4GOqUBXvXyWntfGAYFrxxmCz3a86PpN1bZStH%2F5dmuPKkUhVk%2F3khN8%2FTwU0gzQezTfoiInQmTqciRczitG662IlpnjUdL3RiaPOQynbTv8SQHYxO3FUS4lIfkxW0bxtQFOq3a5o6mBluNJWgabRq%2Bw42kWqmxRzxHCXu%2FBX8aRqghqApTw8R3XXaAPjI7MtyL9X%2FrANZH%2BQJMFpM4Nkg2EZBhZ%2FuP%2FNHS&X-Amz-Signature=e83d41ba69d379018e6c0de1200c2ced0e56b18db16339a131ce131b4496b1fb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S7K5J5NS%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T221943Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJ7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDZ3crGj8oWXP7igi0%2F0Cb97IQ2zRafi0JAe1b5aLy%2F6QIgYXMfearLhii4bTy3T8%2B00Lxk9ljfFmHJq0Wb8i4d8c4q%2FwMIZhAAGgw2Mzc0MjMxODM4MDUiDJMqeU7EIeTkshcBOCrcA2tq9G9JMQwxaXTKek3VNqQF18jeYJK9KGeolPm5nY41Pw7hDI9%2FduRG%2F0oe5xlcz1TKkpqWf197Y4ChvAf0bamoNXIa0ADFikH3d8U1q2JQ3Bfj0vyy4pmExQDjpUnY7aHdD5JMkudahGi9BmXE3CEInOi4ZvcKJ08WdYGbR6uphVQrc0b6srSbMXsklsVhn73sAfnpC%2F%2B3FJ%2FTCunWO7UJJjsVDrONyLIe4iCr1zIJTQYHx2IRKYajPCMPWcAxmGPaDMr2iUtrd4g3cGwEmm75BaiTseLBWkUYDY9OHRimGjsTZr8UhLsqPJvBRjBLDf7F3Xsjf9RxP%2FZGhoTO9owsd68yCGB3o14dhhGpHeim5MHoja9KSODYNMNlwhzYKfZzbVQ9V7V4hDoRmyCUWtdQTFV08VSma0%2B7T9ObCYFbhtzsalB7ImeDeY2%2FgRWj1O6D8rwMGGIMh1ZzGj895wUDfRFU67%2B0yA%2B0fa%2BmCQp00T8ZKhCYpBOh6OyKwH1EYOZOlp1qgoKItP2tFYq7PxxP5wqsOtlPYgtwJbBwfHLN3CJfn8KLTwO%2FqI76eCB3XM5Spb0lrH%2F6CAByvVPHe%2F4vswi5O1X45HFXquQuCc56yxU%2FfRkr0Ewpx6%2BSML6Z8M4GOqUBXvXyWntfGAYFrxxmCz3a86PpN1bZStH%2F5dmuPKkUhVk%2F3khN8%2FTwU0gzQezTfoiInQmTqciRczitG662IlpnjUdL3RiaPOQynbTv8SQHYxO3FUS4lIfkxW0bxtQFOq3a5o6mBluNJWgabRq%2Bw42kWqmxRzxHCXu%2FBX8aRqghqApTw8R3XXaAPjI7MtyL9X%2FrANZH%2BQJMFpM4Nkg2EZBhZ%2FuP%2FNHS&X-Amz-Signature=e83d41ba69d379018e6c0de1200c2ced0e56b18db16339a131ce131b4496b1fb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664KB7DEL2%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T221944Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJ7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDz5UR%2Bn2VNnnQ3ARMI6ILQR%2F47NHWqxWU5GpQ%2FtpHxpQIgLjlFvt%2B5HtEvvSlZthqO5LRSwvER%2F%2Fyvj0%2F21%2BzN8ygq%2FwMIZhAAGgw2Mzc0MjMxODM4MDUiDAIvwypb03M7JHZ4dSrcAypvpLMPBuSlL0uHei4p%2Blpz6Znf4Y8232EaCi2vNjAshwNDmWBFcWeutfbxRnK6w2mzcdwX8c21gYHzb3%2B9tHD9%2BDmGmCecD09Ifhxyk8tP4w%2FtLWhazux1J5ZxWuKuDsRnc6zj3FQoyhR1FzNX5%2FUzk3iiydAtFEQhzA8zIXvNvUWnhRAM%2BRv9hBUQj4kKjaFCMZrL0FW6%2B1sQLZ3gCvtn37bOFC7fZZWmNjak%2FHL5n8E7K1%2Fy8mCILO5ghCJTi3eyJfAdfM3hWLG0jmfjpHwv%2FEjtkveeP%2FPNQfpp5WcsGrfGHGyVTFuDyjMbiCrtbkUwoqpB1f8vuhJux8Re3dBraj6k9rrZRH7jlTuSgOiBuZoJEZSWG%2F4Y6E1rMIfdr%2Fh76k%2Brq0SllgDQS41HvjeO%2Fi36%2BfF5y9he7ufqVNrapsrSqqUq0lyZ7%2BBuwdHMJmYV2QJx3bYbshBg%2BR2rHLR2hzm2xf%2BlNUpU8LE4Y7JFSMOqaWCmft%2BgQsz%2Fz9%2Bc5GfpJOLMUE%2F1NCvTM95MH3M%2BVmrdWgY8j%2FSvsdwrqEzDMV6a%2FV5gRCdgTHUnmvBO9ELDMqRyYa%2B6Se0unMK3XgQg%2F23NnoVzBXG4GoEnTXBBbAzrnOeuOeMYWZBIMMSa8M4GOqUBaKRjRU2psPTGcoU6lUP0ysMGaSSUsjASgiN3Ovg46fW%2FbK0FrSHc76UaSDq%2BWy2sefIIrVFSIKIaiXj74ORV7rmdRf2%2B4ZDRjkgyhZy1GPj8lPKIm6O8oSdOw1o92FWInYX9IC8KNmVF4LQkez8lc%2FoAyIlK%2Fw8FTRnE3CxyRsa7NjjtcQKpYDp38FmKENpuKoaGqKouB45VlaVe4Xk4KT3V5QAo&X-Amz-Signature=881e45a79945b76e99d5706a88bcfa10c37501e91c076ea9b9ca58dc302118d9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

