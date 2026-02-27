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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z6QGJP5J%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T172329Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHkaCXVzLXdlc3QtMiJIMEYCIQCo%2B90eahsL0k8%2FYCWJTp7jJEkOto3XLK9T39I9NEkZQgIhAOBXtq1bd9yXNusVjvjTa3lj7ip92YuBgB2dhG%2BHiTctKv8DCEIQABoMNjM3NDIzMTgzODA1IgwsYusltdqoqbiuOAEq3AM5iyOuU28aVZ5SlHmFqA9bDbNAcgWwLbu7ShfpJ1i86I0D7ho%2Bh1Y6ABunno4GSOsMMXTKvhfxKlyT0WPr15Fizhoox%2BsQuc7GCEKswZHCsSzaEkNjoJ0gfVObwTa0Gr3cRdSIU4wzhE9G7zjm%2F4NrF8N15gt4%2BpHSKfnI0Cgdj847nL9RmNCJEsTYf7R3IYOyOELw6EE9mmYiuO1chXTQNc8d6q%2FjUN7X%2FtF6ToP4WD3O1Rc4obD5ixNZ%2BbA%2FhafvSp9lAAY6MCAkTrbhQfn8ZeZdAX%2FNohJsZMr4YR9f5pQzz8jb4hCEVIz%2F%2Bpd6wRF9pCOlqpDIVP20yVLXC8fDxMp%2FhC%2FIZ52SNXhuMqXIvNt%2FkI27m24isoPIlvqxIA67W2GdPMIV2QgUGjJDOC%2FsShjJSOgQ%2Bc%2B2G9ZfSnz0ztMnYf4MJXctesqit8HXB2FxSp1oNu8JD82vqjvy9R%2FHy52eF1iAq8q%2BAsjmrrD0eL%2F9G%2Bl8fbUC88LhLacMHNiynFM82ZoJ2smamqH5SzPK0cYEbtgo%2FrGfOsZCUb8n2DTQvXm4XzIV3OmORW9ge9Abxyc727PsQgBHBmN2ZYyLf3hG1nhMMtaBq8qFhnUxivEwLhtd8Nns3MgKRDDyoIfNBjqkAbsoJbuMNWksN3x3%2F%2Fn%2FaTlxnUsg0sXdziNWMrxRaWWl9dIKF4tRKb8Z%2Bk1XM9HLe6nGZ2RtN48AOIE19RToukqR%2BbcGF632EJVpiRxGBM3vwNFYMb4d0BDM2fmUpJsXB4L0P3xHNqGfYLkiG47836yBA5YHmIBNuDvauoqA47Jb11X51cx2iKF1QGoNKk7DBVKtQZL01s6ef%2F77tKMK1sxbddP3&X-Amz-Signature=01ee88541474c4ad220dc9dba17559478887acb99b10126ef2fc36e1b41b1f87&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z6QGJP5J%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T172329Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHkaCXVzLXdlc3QtMiJIMEYCIQCo%2B90eahsL0k8%2FYCWJTp7jJEkOto3XLK9T39I9NEkZQgIhAOBXtq1bd9yXNusVjvjTa3lj7ip92YuBgB2dhG%2BHiTctKv8DCEIQABoMNjM3NDIzMTgzODA1IgwsYusltdqoqbiuOAEq3AM5iyOuU28aVZ5SlHmFqA9bDbNAcgWwLbu7ShfpJ1i86I0D7ho%2Bh1Y6ABunno4GSOsMMXTKvhfxKlyT0WPr15Fizhoox%2BsQuc7GCEKswZHCsSzaEkNjoJ0gfVObwTa0Gr3cRdSIU4wzhE9G7zjm%2F4NrF8N15gt4%2BpHSKfnI0Cgdj847nL9RmNCJEsTYf7R3IYOyOELw6EE9mmYiuO1chXTQNc8d6q%2FjUN7X%2FtF6ToP4WD3O1Rc4obD5ixNZ%2BbA%2FhafvSp9lAAY6MCAkTrbhQfn8ZeZdAX%2FNohJsZMr4YR9f5pQzz8jb4hCEVIz%2F%2Bpd6wRF9pCOlqpDIVP20yVLXC8fDxMp%2FhC%2FIZ52SNXhuMqXIvNt%2FkI27m24isoPIlvqxIA67W2GdPMIV2QgUGjJDOC%2FsShjJSOgQ%2Bc%2B2G9ZfSnz0ztMnYf4MJXctesqit8HXB2FxSp1oNu8JD82vqjvy9R%2FHy52eF1iAq8q%2BAsjmrrD0eL%2F9G%2Bl8fbUC88LhLacMHNiynFM82ZoJ2smamqH5SzPK0cYEbtgo%2FrGfOsZCUb8n2DTQvXm4XzIV3OmORW9ge9Abxyc727PsQgBHBmN2ZYyLf3hG1nhMMtaBq8qFhnUxivEwLhtd8Nns3MgKRDDyoIfNBjqkAbsoJbuMNWksN3x3%2F%2Fn%2FaTlxnUsg0sXdziNWMrxRaWWl9dIKF4tRKb8Z%2Bk1XM9HLe6nGZ2RtN48AOIE19RToukqR%2BbcGF632EJVpiRxGBM3vwNFYMb4d0BDM2fmUpJsXB4L0P3xHNqGfYLkiG47836yBA5YHmIBNuDvauoqA47Jb11X51cx2iKF1QGoNKk7DBVKtQZL01s6ef%2F77tKMK1sxbddP3&X-Amz-Signature=01ee88541474c4ad220dc9dba17559478887acb99b10126ef2fc36e1b41b1f87&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VZFERYDE%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T172329Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHkaCXVzLXdlc3QtMiJGMEQCIApe8O4pKOY6%2BxN0AoTC%2F8Eb7%2F5qIbkVm8ZTKiWuhs%2F%2FAiBAY%2FWZuVeJgOQKlcDJSw%2BEX%2BYAyHJtMg6R8Bn%2FvbEbrCr%2FAwhCEAAaDDYzNzQyMzE4MzgwNSIMEBVuRIWanh3Q2%2FYjKtwDoJ6H7dy0YsYGj8oU%2BKmp5oiixcGP2fl7%2Fi7AFwoOLIjijNz0FepMpBRdl3T6V7dE%2B33hgBHWY8ccQRcnOXlHQyL%2BwjpsEopB9ob8cd7XOo5AJacxvA079uqiTsjuHdaVqeZD0NYutRBsFmo5qJwmDAqcneJ8TUOQrE6ldcMoo4aCA%2BuRvYDuPmpOOGRWUjn4Y2djXdlkE0Vg%2F%2FpYTFQmdcFp%2FtT6SRE6pELhqUehs%2FIzRqTplQ1sdnCZShcvF70O%2BJ0eqp7KPpFskIdzHs876SAsWTnY%2BzcGAP29iYzFA3ppF3ymDTUiA%2Bi5tmrADdrrzh7%2FVko78WPTLe9D0IpAzRWNrwKXGqsfB3rcgrlWTy%2FcilgI78wQiLl8YFKUvNs1aUac%2Bm3VT9XHOkipPZnZEqkhGVAdKSkU7CEfKTq7vcIKsJf8Se8G%2FID1vHrDpaZZ7qoB41BHwCVBD0%2FqHPKpSfLeKtsw54kcNVykvUGAhIL4SHVCxfsfEJqIGtwYLHWCeLnd%2FcFxtcHPaCoKAze20zGfXO%2FA5hkZ%2BorUxWPAANnp916QkzwBXFF7J6DEAxXjXcFF0MI5TwEYRwj987shaVClG8PxKMFk5m7WAMEI3ySIHSms1%2BHuQPn9bN4wraCHzQY6pgH%2BBySygsBv%2FKmqk3MAvS0iUS8du40c4gz8XAOjQBr5aitd5a5PG12id316BF17YHOebbIleLMUkC25fDdkLwno1H3cpMSkjMvruIJGulhzyg9112glZ3HQ5pIA68kbWEAQNPpeBZhskR7UFD%2B2axB9rHeOGaQvVUQ%2BUF%2BrSo5BMyC%2BT7%2Ff9q4PTiF49irLCumyKzdoRST9aT21BWaAfSGKvjh6t6L%2B&X-Amz-Signature=a86687b1dcfa76cb2e1c6e121637b7dbbfdcb729f24339de39ed1c66330c11b2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XEMS267X%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T172333Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHkaCXVzLXdlc3QtMiJHMEUCIQCUCfpEGyMuOQQaIND5sTYv4UMamKJir9aHbl6MalXu5wIgS8A9khoYlVHOpW2eOornTwBjjPT%2BNrfR2NRe004ekIwq%2FwMIQhAAGgw2Mzc0MjMxODM4MDUiDKcHwtGm%2BNqodGJg%2FyrcA%2Fp6B%2F2QKdmd6IeLqpg55gNpjXDBosVv%2B%2FN84Y9mqgN3Yfr01Bx09aGpa6%2Bb7Sp0xRNYEgh1VoQS4p8LLCIdvRUot1ITz%2FQGk8xyC9go8R6xGv2D5%2FR0sgJsguXGLy5Uv9Q4Rcd8ZDFdJPGZiUEnfdnG6GHUonyBMu76%2Bmr9%2Fdlw86PPP%2B%2BShurw5qt09Nb5dHAfoqNDzah%2FIwsQu7o2vCoaF4hUNSTYINIolAo3%2BDDWNSqAZz0oHm9TBO22cw82Y7ms2USqMeBzSUeRhyVpAkKRlhmRky9%2FJsxTQ8z2%2FSA%2FEO9HhRnh%2BGp1bvEFkZSyaS4Yp5dz6Q7E9%2FTByEEhCp1gXrGmJ6HDoguE1gC%2BcrwCDX8zKEzOI72EVdWQ704Vb2EPMXbjzMNVimrZup5UsNUP9Z1zTP%2FmblHddLvJ6iWM4ZzOGrCVkFBCzlMHGpkt218gtR857WDm7QXZGET0%2BeNkmEnuyRDLOU3H8gYRugiopUVEwWHBO6QZneEsiPplvlAOIhW2gRnx1zgf9e22MQKZvypDgtckH5WxX%2Bc8J%2Fp84bPPYkAQSyUnqTyIwCsI%2Fk4LNzSARkiiys7LtKLQZa7LkLlMuLZ6aG4tVH992Cxf57UNl%2Bw43VFA9l60MMihh80GOqUBLjPYGVIaYqPckp0t%2BpcWTf9snR4A4UbtQSDWH7KP0XMpQCro%2BFdEHqP5e4ontf3uwYAf9m1S8WqOmeUOyWnrDZfKH6mwKFtDrnKW6BtLGVe1NQnaX4kaHyPKCt6Cy7ye%2B1k3vGlIjzLfLRjnxAUw0nE%2B4dydpoM2iusM2gMXh2fErRILnpwEEz%2FOrmtzq8EQhsi3CkIrWSzYKSScPuk8qnZ8AhUr&X-Amz-Signature=53bfbbd9c5f3324d3aea67a2feb33a7cad4b3db85461c7400708361579dd04a8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XEMS267X%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T172333Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHkaCXVzLXdlc3QtMiJHMEUCIQCUCfpEGyMuOQQaIND5sTYv4UMamKJir9aHbl6MalXu5wIgS8A9khoYlVHOpW2eOornTwBjjPT%2BNrfR2NRe004ekIwq%2FwMIQhAAGgw2Mzc0MjMxODM4MDUiDKcHwtGm%2BNqodGJg%2FyrcA%2Fp6B%2F2QKdmd6IeLqpg55gNpjXDBosVv%2B%2FN84Y9mqgN3Yfr01Bx09aGpa6%2Bb7Sp0xRNYEgh1VoQS4p8LLCIdvRUot1ITz%2FQGk8xyC9go8R6xGv2D5%2FR0sgJsguXGLy5Uv9Q4Rcd8ZDFdJPGZiUEnfdnG6GHUonyBMu76%2Bmr9%2Fdlw86PPP%2B%2BShurw5qt09Nb5dHAfoqNDzah%2FIwsQu7o2vCoaF4hUNSTYINIolAo3%2BDDWNSqAZz0oHm9TBO22cw82Y7ms2USqMeBzSUeRhyVpAkKRlhmRky9%2FJsxTQ8z2%2FSA%2FEO9HhRnh%2BGp1bvEFkZSyaS4Yp5dz6Q7E9%2FTByEEhCp1gXrGmJ6HDoguE1gC%2BcrwCDX8zKEzOI72EVdWQ704Vb2EPMXbjzMNVimrZup5UsNUP9Z1zTP%2FmblHddLvJ6iWM4ZzOGrCVkFBCzlMHGpkt218gtR857WDm7QXZGET0%2BeNkmEnuyRDLOU3H8gYRugiopUVEwWHBO6QZneEsiPplvlAOIhW2gRnx1zgf9e22MQKZvypDgtckH5WxX%2Bc8J%2Fp84bPPYkAQSyUnqTyIwCsI%2Fk4LNzSARkiiys7LtKLQZa7LkLlMuLZ6aG4tVH992Cxf57UNl%2Bw43VFA9l60MMihh80GOqUBLjPYGVIaYqPckp0t%2BpcWTf9snR4A4UbtQSDWH7KP0XMpQCro%2BFdEHqP5e4ontf3uwYAf9m1S8WqOmeUOyWnrDZfKH6mwKFtDrnKW6BtLGVe1NQnaX4kaHyPKCt6Cy7ye%2B1k3vGlIjzLfLRjnxAUw0nE%2B4dydpoM2iusM2gMXh2fErRILnpwEEz%2FOrmtzq8EQhsi3CkIrWSzYKSScPuk8qnZ8AhUr&X-Amz-Signature=d943ac9695e7f535015ae9a1b22823f4d097c756556fd50cfb8c54f428a70438&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZAGNZ3NO%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T172333Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHkaCXVzLXdlc3QtMiJHMEUCIHSHsMTyJuX9%2FZqYd2JPivQ3fo42I%2FI0cm7pB9sFXJ4nAiEAifPnyuc50gQ%2F47d%2FWZ74SZPbr7bEwoFR9%2BupBt4IwTEq%2FwMIQhAAGgw2Mzc0MjMxODM4MDUiDDB9X6vkorPdw19WASrcAypJn1PwYrkt%2FhK1f0n8eNgUiEb2i5VTkxcI4M2OnfDcGd1%2FQrmFJju7zoCn38mpdVNiDhMIxmV5OSzdEeDrG5qy0ZQLppu%2BsBxKHcQWNyYLO06F1FSKRDgw%2B14meGAC70Ra5GYBlu8iqQQ3G92SzBweSr4SBD4Mv%2BYZlr4eJylO0I5abB%2BStvZozB6f45fq%2F3nqXSvlSsZPOyhaAOPYAzPsYWDaASmHuVk%2BeTUd8aKfTndPlYMcTULR1Mmon%2F7wsWieQonI0l3So0Aw9xHr8He9dnS60oxhdyfgT0Kg9EuyKD7WAvp64w320ioCGSaELbtyHrluBS6ZjD9S5w%2FKc5kFv%2BJTwXKXL5jZ9ndVJjJs7FsVmU5wraiF3UwlPF07s9H76wcFKXVheKWP%2F7d2h717uL7F%2F1ADi0kC2nsKktkDTDOM3inESIBgnAHRmsD6a7cdxj4ouXg8eBUJck4m5t6AidxBZcqJvjB3sYGu4b5TBRO6UUhrOARE21QISRee9PhKbSWLq8A%2Bezq7S2aljvzGbu9G762uFvpo0bXIXotWPazsszRhXmskWj4850FkQFp%2FmM7Ifw2vyXSSJGfDRczuy6lKn9SyYHIWpCP9CQPacbW%2FxuGBFNQEraSHMLihh80GOqUBPpPzJhUS2SC6YOXiXBbuY3JjgBzM2jm6WHluEVHBAFtY4wa9iLv1b4%2B1o%2FyvWujLvmwnAxKWqhpxp7GN0oFlJwkW1py6aTppYOZujJ6lGSGA0ADiwo7CBMCvxzhmfo2%2F8SPHUiFb%2FAk3sbxOA1MfuaErBxapeC6Ap5Whu4%2BZCJ0XmNf1f20eoAUDiZl%2Fz2DEIOxefJqkDdGAQ1fXB5j5WgwNFW6e&X-Amz-Signature=effd451ac264ce6b29d7ae8e7ac2bfa8463b5ba3be5f8fa552cfa5bdc2362c7b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664PEXW2QY%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T172333Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHkaCXVzLXdlc3QtMiJGMEQCIEZ08sIxvxcQH5iqKxTXjYCfNwua2tN56UhrHesUKkjrAiA4%2FZX%2Br6rWhDgTY3buwlZSJZdRK5WFnWPmgPMzdGlQXCr%2FAwhCEAAaDDYzNzQyMzE4MzgwNSIMbXJwWqsLmCZPGLV%2BKtwDdexySApkXeyr0PW01OdFwMQVY0T4r7iDclBDrLIgoZdNedHyNIwV%2Fu%2FFi6aO7oxmXG8G9Si76z44OQQOgtMcswJsUHH3aBAiSoCI5KakMMyaNvckdWXG4kLTa73of%2BZvqy%2FryMIjy8Zd8J%2By9C%2BR0W5dCADOmLIgo%2F6fI3CQ2%2FeCUmj%2BtKsdTpSv38GLdj1uEJYk5RDyHNzR1OZ962yJcqiIxhBk%2BjE7NYYWqQ8UX6MWQfFDD636H99qauj9t3KDzvg1FbO1Ti7EpDwziLxmSrbcgZ3VmeiDgQlY20N%2BIJYYjtttgvESTRjW2C%2FZ3CCvYklCO4acwh1J008dEoCyDAl%2B%2Fa3aUyvsy34X3ZhPTncd%2FeQCONPMsaXdpysQAZ04xzE9eLKd%2FYSpglvzEbnmXJtC%2BoCSgq%2FOo%2F4cr0GOi0ap3ttqsr%2F1pk%2FTEikyjoFV%2FtDefGYulnQRs3sG%2B9PbGX6LlhxzUwqS1mhRGazYqL62pg%2Fd8Vi1QujsCvk5vknCsADeq82FaQW9Ata2dRv6kB6mF0d7K9UQG4xsfHXMlIyPxWQD6J6bR6Sqk3BOrnvJwGWTKDn6%2FZrob2quJCp0N5yEiLkRtm%2FPnD0bTJ60uQZ5wMLDVWpGyr2eihAwkqCHzQY6pgFj7d1rn2lcXrGjBHON8nSsqdkWymqOn44OubwnoSs08sYYB53BxDTzCsND0qJnNwS9Tbnsx%2BbOxD%2BsRJzW4FTdt4uIMEPSlB3sgH92ika3Ey2y58G5%2FR31sT%2BQQEKcJcOJD5HMZ7XwuOLI%2FF4i%2F1ZtLV9NxLN5vHYKTrTX4GFC4l0Yvlv7Pokk%2FGGUBapSxzKF%2FLuS9T5bXJS3gXC0N%2Bm1IcC0wNaC&X-Amz-Signature=021e6d345c87d289195192e240094db104f9b957623180405f885a8178d991a2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663ZRT3RFL%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T172334Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHkaCXVzLXdlc3QtMiJHMEUCIEi5CRHj2bKECqA%2F8m3JNlZtOkMPd7KWXecOzRcoAAqUAiEA5FZ6WAzWUo8bbmSB1xdaB7uKdnIOYhYjNDErAR8gpiQq%2FwMIQhAAGgw2Mzc0MjMxODM4MDUiDJPjV789Pr3I9xL1uSrcAw0HdOGwPHKwg7Gg8BYkKibvnmX5q8YLwAXllCNVHEEdQlhKOIp9MoDrUYDJKdVwe7nkEv%2FILrl6YhZ2jQkRJJTct3ygF2H40afdQaUyUL%2FiAQ%2F4U5NXqNEiNfiFujqXnlvfoIxElHzdrsNuGcTlW2sFoDcjnJgEgRmLTLofcJkgYLWGErVCODaaUQlrjIdHNnGHQ%2FQ59gTimx8NvhRefOBloHGqZJ%2BzEB7cWgGD4AGTPR3TLU4OHq9Q0kLP1yayERvaPU1Snubqh69uHdZYKi38p8VdGqMHC4zki9n3ouRPYAsFnn7%2BxsZPTZ5zifASBo1jZ4aINItrRWm4Xn6gdb%2FfnVp%2FjxPUZAsRPAmQVZPO3fU%2Be7RzafopMVvFB%2BMLhMlZKJiu1BLPdWuFXWhLDqPEoUmiwYmrNwyGjDOufyQoqul90sb7UHHldJB%2Fh6BP4TNYS8kZAgW7ussFnEtMKVhUzAHt5%2BUzdqUM9NzH0ODoFZFr0dA62O4rKt9u1ZsjV2KkQhh7c3nnuY4pXdAl9yj2Cb0FUXwgjRrqxkf0deD%2F5bejKwr5VvUpezlVwr8P5zwhH%2Fg2XrLMyAEtL5FiXdTEIIVXXOSeIvqkdXdG6avKlW1PMeI0Xj2cTl7oMLagh80GOqUBoKCJh4HHlEBkCQp24Ri3UY%2BE6RlOegweRQh4M3YCSwFVm5i%2Fgja9%2BVi%2FAp4MynrRI%2BoQSnKXrtGMiMwNnUsRUaYz7I%2FL7y7MHmOwF8fdzglH33wiGHO1NNB65K%2B4Dkt15hg2sUjv19WSd6PKWJJNgrOUZ4EArQIlPgnBrRjjJ2joNTqIK4%2FZ8%2B4%2FdeRUm1IZtgrZf7CVlYZNj78H%2FUdOQ0cJTvTr&X-Amz-Signature=d2f4183ee1396cb7ece7a0e16234c797870e2a6457cf19151dfda29bfa5f0a06&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TBFMQOOI%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T172335Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHkaCXVzLXdlc3QtMiJGMEQCIG3xyrfGzfrel4TioeiPpf%2FEsd%2B05gz5NxaO1nUOaJ3FAiA5vapcvqS%2BXxUG0laPLOe8nrvCKhtvlBTg%2BQWRlhKhAir%2FAwhCEAAaDDYzNzQyMzE4MzgwNSIM2VV0O%2FMA6WzBgwNgKtwDa%2FZKBLHlLN7%2Flrzil%2Bd2zhJXS7kgDiX%2Bq6gUhpNssPldVTln2dnGSXkiICX3VsdPQBTQR7a26VZfGNgwCRRLfd%2BcGxMHI5D%2BBoLvy05ruUVA1N3M6fR93sCK2dOypqoMYCa4BhguAvYca%2BhKf6pUE0fZSsMRksIJsJ5ibUtLynTsFaBX9%2BJCv4Wp3o2fh2iojDwLF9FdJLwahdw%2BFWsma0vmtJpiSUckBnRULD09kGengzeIngH2i8F%2BRItEp9PAbS0CA0USRcygQAOVovqijVASyJCD64oZoG9%2B3bk2knE40CY%2BGaudKbjt2bCpJapwpbt89qo%2FF%2BRt7jHFiBf%2Bhavz7MFtkOQU%2FOOwti3Gl8TreWNa5tEB210f6WTiN43Ke5FvzvFdDk4F3MToUqPsnxuauyV8yn04mCNDibHbQAXC33WA94MjLydvMBkV1%2BUKIwdG%2FWOaN7HpM6KKqsLs2XXpvjN9wxBJgtU0ksFzpSRW2I5hIepgqsbxiu%2FTMKK0oXyl2HCrhwa05pWyQkyQDkNsyfQut7WwmD4YjQ7KDr4hBaUQDHSKGFbb2DHumPll%2BleI1XutvpxcVkDvp5dbvzcEXQM0JJGFMo2CAT0aeb%2BnfC2MAQBJWZr2HMgwkqGHzQY6pgHKvWVOHydVLsWSXF53fu4PkHqjuyv0R2rrFdTXCFX2A8sg%2BwYGAxXvPlxa1ofky0ViV2qUbJk%2FA2%2Fn2oOGyGPRISIGr5Q47jmgLSrL%2FkkLTDjdndSuvgpQpfE0IM5OOzxYnUcB3lup6Ng9n4Tx9LLMhQ%2Fxle%2BpfS%2FTgPEYqRivsKw5XQ%2BUJuJWFaUvQo%2B4JfjiZnCXcrLKXkq5XTBS%2B4P33Gvtabra&X-Amz-Signature=c6f0101f24d3a046acd54107b196347327da8121ab5cb6ff1e5e04a97e1ade8e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TBFMQOOI%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T172335Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHkaCXVzLXdlc3QtMiJGMEQCIG3xyrfGzfrel4TioeiPpf%2FEsd%2B05gz5NxaO1nUOaJ3FAiA5vapcvqS%2BXxUG0laPLOe8nrvCKhtvlBTg%2BQWRlhKhAir%2FAwhCEAAaDDYzNzQyMzE4MzgwNSIM2VV0O%2FMA6WzBgwNgKtwDa%2FZKBLHlLN7%2Flrzil%2Bd2zhJXS7kgDiX%2Bq6gUhpNssPldVTln2dnGSXkiICX3VsdPQBTQR7a26VZfGNgwCRRLfd%2BcGxMHI5D%2BBoLvy05ruUVA1N3M6fR93sCK2dOypqoMYCa4BhguAvYca%2BhKf6pUE0fZSsMRksIJsJ5ibUtLynTsFaBX9%2BJCv4Wp3o2fh2iojDwLF9FdJLwahdw%2BFWsma0vmtJpiSUckBnRULD09kGengzeIngH2i8F%2BRItEp9PAbS0CA0USRcygQAOVovqijVASyJCD64oZoG9%2B3bk2knE40CY%2BGaudKbjt2bCpJapwpbt89qo%2FF%2BRt7jHFiBf%2Bhavz7MFtkOQU%2FOOwti3Gl8TreWNa5tEB210f6WTiN43Ke5FvzvFdDk4F3MToUqPsnxuauyV8yn04mCNDibHbQAXC33WA94MjLydvMBkV1%2BUKIwdG%2FWOaN7HpM6KKqsLs2XXpvjN9wxBJgtU0ksFzpSRW2I5hIepgqsbxiu%2FTMKK0oXyl2HCrhwa05pWyQkyQDkNsyfQut7WwmD4YjQ7KDr4hBaUQDHSKGFbb2DHumPll%2BleI1XutvpxcVkDvp5dbvzcEXQM0JJGFMo2CAT0aeb%2BnfC2MAQBJWZr2HMgwkqGHzQY6pgHKvWVOHydVLsWSXF53fu4PkHqjuyv0R2rrFdTXCFX2A8sg%2BwYGAxXvPlxa1ofky0ViV2qUbJk%2FA2%2Fn2oOGyGPRISIGr5Q47jmgLSrL%2FkkLTDjdndSuvgpQpfE0IM5OOzxYnUcB3lup6Ng9n4Tx9LLMhQ%2Fxle%2BpfS%2FTgPEYqRivsKw5XQ%2BUJuJWFaUvQo%2B4JfjiZnCXcrLKXkq5XTBS%2B4P33Gvtabra&X-Amz-Signature=92b0165377e3192760f289d384381de28a4fb9101233def3c17452d16753e66a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665FVD2WQI%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T172313Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHkaCXVzLXdlc3QtMiJHMEUCIQCz73NrYo0m4rGq5bDKIU6Y1bUfHlmkmvMKZdBqXtywdAIgWVk3nq9UQbXW61yAJZ3v1sAtDu0AXuk4Omo9fOXbz18q%2FwMIQhAAGgw2Mzc0MjMxODM4MDUiDMmc2m25D1yi6EGc5CrcA0k4vyTZDqi6MI%2BH%2BU%2F%2F7MeQeHFb2zbSZRu%2BpDqBtFEUnnKrvVDupRsf2z%2F5uujW4YrGlf0GyIzI7yQnrP%2FUBwPoItCSYFV54drvQ6LCYAWNq6UKuHkdTBs%2FwIKsx9A19K%2FxYB5xv0RvFNfrKzwEmhBYpNeTzU3VpTP%2FEjnFN1nmmD72flr2C31wb6bB3jKU%2FVhwBqrMaYJLnWLWk1a%2FWIuEb45QAKdO633vC1QVTmMXwxzwmrd%2Fpxxs2TNmOyXY2IshpjvoQn%2BVe1eqYVyjbxLbh6pGogp329FA6tkxYTLrm9OmkXG46Bolf5fw%2Bj5Xbq%2BxO2w5dSyTxSZ6trUkEupJhyilD6H2VvwcFGrqqqgtls860f4V9wlm2jqi2nbSDI9SIYcHdu%2FfCbmElbsWlT5tUlzJuVfWRRnKtJ1N%2FnC7wHWeeeijZ5HVE5pdlx8mLf3lEhS1dznDAS04Gp%2BADFoPNA4hJK1VaRvvhiNwNkxIoB%2FHj3W%2Bw9mgaR8Tsoh6uqMm7E12DgxVOWAWoxzMOldoRSVLuxc%2FQtKreDdhDpuXo6bdyCbUVIoaVIgrp1JNiNWKbw0dlND9Yz5bVXwt4vRJGyq4Vtdt0k%2BZVTu1SNveIi3fv5jyKYN8PCruMJqgh80GOqUBPdTPlLVvObta%2F008F4dAzv2r1XEkrIRYBe8Uj7MAQpGgOX1shtD0SPcLqlMyeT4q4ZgrOsdbE2RjYW768BcHbRCBhhz76V30s7FSAYrrJC88GSSl285R%2F%2BHzfOmaX0RsKFcl3tnKVlAC9SZBHhYY9AifFF61qOMloVhe2GozHY2zgIESqsI0%2Bv5Yv1f2udOuQSY8cYdYnGMMHH3v8DRMs7ru1ltB&X-Amz-Signature=46744503b1d5c733f89418ab15f8a861f1e52e74da8de0ec319c0a82eedf3f87&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665JOYEIOA%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T172339Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHkaCXVzLXdlc3QtMiJHMEUCIQDZ6qb8KuPMf4SEQrG%2FAOoLbMp2V%2F8BYyiYGvqjuIaiJwIgGSlZS%2Bwe2xD88E7ElL%2FjJxz7Ytm5TW2abv4Hcx69AdAq%2FwMIQhAAGgw2Mzc0MjMxODM4MDUiDAhngFHxRtC0RiHnSSrcAzu1vJ17CozkzSKKGst0g6VioEB3%2Bhhbl4xniN4Jl%2FPg8wQiuVRAXmWzJdPREMRTlmL%2FMwp5KqGXj%2FQFA%2B4egKEPfOERmbLt5VNfZ%2BDWW0NLm%2Bef4g2kV7oYqRn3z4JUv4ZkvJ%2BycXo3d0Zd65Laczb%2BIm3DIcHa8poRkLxXgkY%2F8iEMPLXYITX%2Bi9%2BOZDP97LzVQG3MPISraq8aG%2BeIaLVZHspXxjAYaaAGzMmCClXGiF0fX8tuXZ81Gl20vuGykcDZ2fIdeLH08OHN3R10HMSDV7MX1SoHO1TGRz7sGRpdlGHFo1T29QOcI3yaTbg9vV419J7%2Bp9A04LywxltnnLcDrSGhyl6qonma4gk3BWvM6KMvNqxH0JU%2FyzmmYZeP0UWWDHvNNwG7d1E8%2F7q%2BQp%2FRFJ%2FYEDoHWmO5eWUVEefDv7ofFdWUe15%2BuzN7lpjgk0wW6kU2olvN3F2CN2rnAD5COgVFDEWI5WFl4SdeAffCaMJhuJb84yCipDo0MzWRB7UGSxYOQKxlbZhChhhdtLfCdrnuAwBp6BKvMv4ix9OKcQYwU2bXGhjMCftPaxknUuRNHgUh%2BZL7pUXuaX3EGTenmCGM%2BJXOJitLytFozobmXT4CIixw6H7ap9uTMKqhh80GOqUBIGDLy%2F9uwjP3DE7tyPB7QJUNgpSbfieC9hGRMftuebj23%2FMuLt7skXpwEOqWglGNB2jEJDv9vpoo3qpn07pe6daoA%2BPgv2TumlTpefkIQo%2BBxaLsINHDVU1qm%2Fu7AGsvkhM6aFmjZc6ECMaYtsCsoV1jWTBxtT5FU2KvZ%2Fjnw%2FPnYYKIcdWvzQMMupT929lIXnV2S6CCFQq2QojpiW7juRTTtpEj&X-Amz-Signature=a5097e69bb99e103a21105419c9e719a75ef05182f94d0358bd4df5a36ee06ab&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665JOYEIOA%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T172339Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHkaCXVzLXdlc3QtMiJHMEUCIQDZ6qb8KuPMf4SEQrG%2FAOoLbMp2V%2F8BYyiYGvqjuIaiJwIgGSlZS%2Bwe2xD88E7ElL%2FjJxz7Ytm5TW2abv4Hcx69AdAq%2FwMIQhAAGgw2Mzc0MjMxODM4MDUiDAhngFHxRtC0RiHnSSrcAzu1vJ17CozkzSKKGst0g6VioEB3%2Bhhbl4xniN4Jl%2FPg8wQiuVRAXmWzJdPREMRTlmL%2FMwp5KqGXj%2FQFA%2B4egKEPfOERmbLt5VNfZ%2BDWW0NLm%2Bef4g2kV7oYqRn3z4JUv4ZkvJ%2BycXo3d0Zd65Laczb%2BIm3DIcHa8poRkLxXgkY%2F8iEMPLXYITX%2Bi9%2BOZDP97LzVQG3MPISraq8aG%2BeIaLVZHspXxjAYaaAGzMmCClXGiF0fX8tuXZ81Gl20vuGykcDZ2fIdeLH08OHN3R10HMSDV7MX1SoHO1TGRz7sGRpdlGHFo1T29QOcI3yaTbg9vV419J7%2Bp9A04LywxltnnLcDrSGhyl6qonma4gk3BWvM6KMvNqxH0JU%2FyzmmYZeP0UWWDHvNNwG7d1E8%2F7q%2BQp%2FRFJ%2FYEDoHWmO5eWUVEefDv7ofFdWUe15%2BuzN7lpjgk0wW6kU2olvN3F2CN2rnAD5COgVFDEWI5WFl4SdeAffCaMJhuJb84yCipDo0MzWRB7UGSxYOQKxlbZhChhhdtLfCdrnuAwBp6BKvMv4ix9OKcQYwU2bXGhjMCftPaxknUuRNHgUh%2BZL7pUXuaX3EGTenmCGM%2BJXOJitLytFozobmXT4CIixw6H7ap9uTMKqhh80GOqUBIGDLy%2F9uwjP3DE7tyPB7QJUNgpSbfieC9hGRMftuebj23%2FMuLt7skXpwEOqWglGNB2jEJDv9vpoo3qpn07pe6daoA%2BPgv2TumlTpefkIQo%2BBxaLsINHDVU1qm%2Fu7AGsvkhM6aFmjZc6ECMaYtsCsoV1jWTBxtT5FU2KvZ%2Fjnw%2FPnYYKIcdWvzQMMupT929lIXnV2S6CCFQq2QojpiW7juRTTtpEj&X-Amz-Signature=a5097e69bb99e103a21105419c9e719a75ef05182f94d0358bd4df5a36ee06ab&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XIY6DZ6C%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T172340Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHkaCXVzLXdlc3QtMiJHMEUCIBZean9TAaQ3LAWza8LLbRyCc%2F6Gqc5dxtHijpr4twu4AiEAuVBanwTG6ZSRpGcp6%2BHACuJZzc%2BVKjxT6BJTpBFAx9Eq%2FwMIQhAAGgw2Mzc0MjMxODM4MDUiDJQ5%2Bw0%2F%2FiBRONUM2ircA6S%2BjR5VsRJvS0xw7zhUtcLyRAgofFxSe6o2ikR20xUyts3SQsgJUqodVhs8DuOUn7O1WCTkqRaidDSxhQLptCZOClPbymeb%2BmjnTANJItSs0krtq29IAP2QDVq8zTyOUJsPu1JhR9vx6FcB18nHQtVhslxj0f%2BhS925MGRqDv5k%2BG73ygAzsNzxJCsrGJuvs6f%2Bc2wNakCiwfAxdAibFvFEsm%2FAghFFbUIngzfu1iohRWVm8%2B1DnxbeRXs4pji8cODVS6Mle9xl05QFeR%2BOOLXyPzI5wQuzK7sUuJHUmNvNpqBYsO6qcsknOfC9lAawGWKWuHoGALdxQckDfBoDzGcmLQxzQ6hXNOgT7OV6ycH%2BA8xshqNn8KDwzjDZ58eZz3%2FOqj%2F9XamgwWken0s4KHf6%2F%2FgLws4%2FBhUmf5ipelw13Q4KANLFOqslhwqGQ%2BqnOnZ4cO7mGFgUf5UJpACzkTZQjUiw%2Fm6ACrNqmW%2B1DAX9SKoPmiVzZioJprCAVxPgz1fEUui8OqXh%2BcAlW2S3jjs2rdZQpStE%2BkDdcXfQ5sCHlxpYSVawdNKbi%2Bny6qCNX3pLQbvBf%2Bcw3PZe9CUcUZPjwojhj4dZE%2BYrRCoWxYGl3mDfEz3xJONhsy2AMNqhh80GOqUB4%2BgrXtvFgcdUSsULZrlrRYA20r4%2FSZ8EEfPoXW0aAToKMrhwjopBFrrzRQ0%2FTbTmF6GMfJ9mOUrFDYvG%2BtrFK%2BtiYQ7rWsV8M75lVirkP5XZNeXoqra1khMT5kPQipEOvDHCBVnHDejKa5wuiYUAjvldBMxZUviNN6ObyAocDt8358zmXitIiNnMCvlh3TwRG5Py5nbOcpmNkmN7b7pXZ3w%2BBMtH&X-Amz-Signature=1d08c3755bd50e017080213451986fba7283d51b847e998d10ff13288a2d432a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

