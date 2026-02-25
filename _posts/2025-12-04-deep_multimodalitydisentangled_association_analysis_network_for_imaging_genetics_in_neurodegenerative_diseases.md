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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VOD5L5LP%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T093903Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED4aCXVzLXdlc3QtMiJGMEQCIHdLkWFdYluhDLXaOl54w7W%2B7F%2FYEn6dZvUofrUWn0s2AiAZ2udDVYXi9r6%2Fj%2FGuzQ%2Fpq9Yy%2FWyBqbNB6USj9GYNbyr%2FAwgGEAAaDDYzNzQyMzE4MzgwNSIMehD4u7zp5j%2FbV2HiKtwDCtlKUmT%2BD0K8rv3%2FPeZtMVpJcAhxpIwbPcvBdQamM0csnOkF2DjHxZW98ovktmBf7LAXmgSGb%2FeOKQpmvuJFrNt5L8vQR66wb9%2BZN3beRysbDynotsuFczzBbMBMjNmV%2Bul%2FC%2F9BMNAapM%2FtMucsMRYERmh16IC6QdBtKZIn0PGvluLx3QakwpA7lKlSKJGhsfobmgDA2Dd583vuYvO35wsSvcvMYCdq5kqKzt7ndHPH9lCiXeZ8VlbXk692fQDK6tV2INviSdvtzqlRxpv8xzplNJ7VY%2BOHpljhOfzf7AKmbXUOdpVQD8SnbMI0Uuag7Hrjy0uMbefri0EA2fooZGxclxKRyf%2FiisirTTPoQEjb7pu75HrMk7GRjMuAk0SNNqonj5E2%2F2Cf7qOf6nzXbV7mzNBpdlZ6bHHbdklg6u5q8dVcThFakYNp8XDCMIumATff%2FIrdR8aeVoc0O5M10cX5C529BhZPGxnr9y%2FFJdlU8U8EsORJxZy0Vp706IJZXm1kh0jfQNpnKBu0uCl33u5U0VhrPB9P1V0F5CWXSn%2FO%2BGrIK%2ByvXYlgi1z%2FJO0Vy0qLV0l8LsrxMzRLS5j0k3NIZ0h4%2FLa%2FA5TuCzOvsMnlGA%2FKUd%2FqJLHUXx0wqYz6zAY6pgFVtjsB7JTmHK3bWUqYtOIyXDyznQrws9brLhhwCK4PMII9qEyjVU77XGGH9JMxC1KRW23Lo3VOVBGJC95c2%2BIT6Pb6rcrVWhTj8yKapIe9ZzWGsTlQy8VPD2vG%2Bh4HyI5193hC4kPINCNM11DlH6u7QHhQbZ4wpQKcEC40dGn5g%2FbRbM6zN0xOONaZj5wMD1xJhCSRIzLfyIXpcCyiH3AWJTwS1T%2FH&X-Amz-Signature=7366ea35b21f54adc9aa42555af974d26b45b21ee4c864aa25111792f74c6c5e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VOD5L5LP%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T093903Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED4aCXVzLXdlc3QtMiJGMEQCIHdLkWFdYluhDLXaOl54w7W%2B7F%2FYEn6dZvUofrUWn0s2AiAZ2udDVYXi9r6%2Fj%2FGuzQ%2Fpq9Yy%2FWyBqbNB6USj9GYNbyr%2FAwgGEAAaDDYzNzQyMzE4MzgwNSIMehD4u7zp5j%2FbV2HiKtwDCtlKUmT%2BD0K8rv3%2FPeZtMVpJcAhxpIwbPcvBdQamM0csnOkF2DjHxZW98ovktmBf7LAXmgSGb%2FeOKQpmvuJFrNt5L8vQR66wb9%2BZN3beRysbDynotsuFczzBbMBMjNmV%2Bul%2FC%2F9BMNAapM%2FtMucsMRYERmh16IC6QdBtKZIn0PGvluLx3QakwpA7lKlSKJGhsfobmgDA2Dd583vuYvO35wsSvcvMYCdq5kqKzt7ndHPH9lCiXeZ8VlbXk692fQDK6tV2INviSdvtzqlRxpv8xzplNJ7VY%2BOHpljhOfzf7AKmbXUOdpVQD8SnbMI0Uuag7Hrjy0uMbefri0EA2fooZGxclxKRyf%2FiisirTTPoQEjb7pu75HrMk7GRjMuAk0SNNqonj5E2%2F2Cf7qOf6nzXbV7mzNBpdlZ6bHHbdklg6u5q8dVcThFakYNp8XDCMIumATff%2FIrdR8aeVoc0O5M10cX5C529BhZPGxnr9y%2FFJdlU8U8EsORJxZy0Vp706IJZXm1kh0jfQNpnKBu0uCl33u5U0VhrPB9P1V0F5CWXSn%2FO%2BGrIK%2ByvXYlgi1z%2FJO0Vy0qLV0l8LsrxMzRLS5j0k3NIZ0h4%2FLa%2FA5TuCzOvsMnlGA%2FKUd%2FqJLHUXx0wqYz6zAY6pgFVtjsB7JTmHK3bWUqYtOIyXDyznQrws9brLhhwCK4PMII9qEyjVU77XGGH9JMxC1KRW23Lo3VOVBGJC95c2%2BIT6Pb6rcrVWhTj8yKapIe9ZzWGsTlQy8VPD2vG%2Bh4HyI5193hC4kPINCNM11DlH6u7QHhQbZ4wpQKcEC40dGn5g%2FbRbM6zN0xOONaZj5wMD1xJhCSRIzLfyIXpcCyiH3AWJTwS1T%2FH&X-Amz-Signature=7366ea35b21f54adc9aa42555af974d26b45b21ee4c864aa25111792f74c6c5e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RZB66OD6%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T093904Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED4aCXVzLXdlc3QtMiJIMEYCIQDMpngl2K%2FG5gpGkMw3zLE%2FFqJZNOXi3jm5ZoOb%2BrtcEAIhALcUz5OkPlD1en3clWjjd%2BF4l0icQyBxBVsCNlOY7N07Kv8DCAYQABoMNjM3NDIzMTgzODA1IgxB5cZUyPtIjeGp7asq3ANK6Fu1q%2FtNWtC%2BTWgvsnY5Fu8Rzk4xUCKlu4Hlv33HXHlMa3fq9xDV%2FjBrtRDI1hVyBAKN3GQg0A9BljQbUdvsvupFZw2J%2Beq4fDL7zph1ovltuHbozBVM3Q3Ct9Mjqk%2Fu6ilZ5LF1LhodC9sWKXwuDrmTytQi8uI7tVUKqoKn1O48H1AyU%2FQgyW77jQPSU%2Ffb6d%2Fh%2FCrYVn5TZfPQXEvzEw67eNiUQfFlqsSMCxMKZkhbYHlOMCoeyXKRH2mnUYoX5aftkui9jSdD7csDjAqENCc7qmbUfBuQJDvxwJn52TzHa8XPl4AAlRcu6d7%2F6wql5%2FirLZPgU6SVK0uXV8sy6xR6RCZ0MvJSXZHJxxjq9KJYVTD4sCFqONR%2FqNMNmR%2FL1E4avSa%2BwCGfUZH9reXYl1s15xgDpXSngrT4DCL1QmGhvt%2F08gx077oejwYgNBEFVZVeZ1Je%2BN5VNvuNvrTppc0x%2FatVtmgfeMl82YHj87Hq5t3OrbhAWb6q6LE%2B0XO%2FWfMbzWmYw5jdUrZi7WDukCnYskmvR1qHFkDAtiXzJncTgKRp3deL8CWtaIsZmCiC7P26GNODnfd6LXNSbCeMB9NINHGgSoI6oerWBHIIqW7Y7L5cYs1g91LaejC%2BjPrMBjqkAW%2Fiqfpi5AMN31oOqUhwVXU99uzD4lX4dMxHSPIPIidV8VSLgTR5o29plDnY1NIrIVgewX84Ybq2U%2FX1Mk%2FnJVCzMLjRyrmLLa7cPA2klkJ5xd%2BopPj%2B4acPFLyNVaJroda2ZC1yHVyNQuj7FjzpWS7FVJAm0L3iwUsKObGz%2BA5sKfQ0XrNNYgdyxuTs5WCy%2FMrRNcQghvgToTari5nbNG0aNP1%2B&X-Amz-Signature=33bf73e66c30192aa5fc10230c514b688ce5fc77a296a41b912fe06208c59217&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665WUUDIRZ%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T093905Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED0aCXVzLXdlc3QtMiJGMEQCIBTubJzdJ9Yf8CSBRTE%2Fq5yxzkF%2FO7JhhN9Hk19ubyViAiBN6QBSzsJgCSNsOsX%2FyutO3EZhn8TkRnGv%2FXvubuC%2B8Cr%2FAwgGEAAaDDYzNzQyMzE4MzgwNSIMDHpRRS0UopWoaKktKtwDZ9m4O%2FHRP1L1Ex9cHZA1Mfg36Va0a%2BdirbhCiSi%2BzGSw%2FGp%2FRqmDJ7SWlgl2hna1HkwgBD0A%2FZcoXj45E89lUAG9um6%2FjErRAPCk8Z71WLgq%2FQJsBe8QAVC4e8DmS0V1%2BLqE7pCfOZkz7MlRPNpYVFmi31VMQB6EVPUR0kMZqB8Zwc1q%2BEUnDNyWOcFK8KPCkGeRUPu7kosnGdd%2BMMtoj3j4NmBJCY65CNRm%2Bp0a75r45M%2BkxOlEAs51P8f1Cs8df5IN6Y%2FUyUSCqrD7C7H5ECVg3hHFwVKSZ6J%2BwJgNMSIGZHTAlhubKYxMccqjW5lXqbFchhEzu%2FH5CkI58i1lovDAc3Z%2BqugnbFguXIwa4hWHoI9F8wTqzq%2BDA38WlRwUj0dQZs7wqmcLEDU%2BMP5azri8LFPqRtd%2FjPfIgfoUAY%2F1IVu0GcTGd6tQxR1H3ow9HrSC5PaxzTglmt7io%2BPqggrmbCMwIWfOFXBywJbbJNayEaycbHQRqWt0e8hsedqMJJWG5RzlOC9jhWNTYfi6cwdBKGXnsFNzJj9gJVncb4ZXbqn87eKoPklHRigezTD7TZ1HSyeLPgFmWqcg2w%2BmZsJ1Y%2BFxrLXhYtj7F3vsRhkDeeGbjoDHoxY61aswlov6zAY6pgFpAAXyZ5xI5XBymdOVBt%2By1qpvlyqWRi6Q8yx02wzpr6N8jQSgvj6cdwXU%2BEseUGmMRNq6%2BvKwp2yo4Hr9NHkBoK3a%2BSF49I4uSiRw%2BIrHlp%2Fo%2FtKIlktiembFDSgX%2BEa6iUHgZ%2FlxDi2yshTX%2FPyxis%2BI1jbsDn%2Bz%2BTzUTVGSY1kgjUMvJYKF6N37iFsOGMi6G6BBnjeIzNkQvCQjzeN58xGBC50n&X-Amz-Signature=9615140035b7758e39c8e8cd83c3d7a235a6ba2b48a87b69f0867c21419f735a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665WUUDIRZ%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T093905Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED0aCXVzLXdlc3QtMiJGMEQCIBTubJzdJ9Yf8CSBRTE%2Fq5yxzkF%2FO7JhhN9Hk19ubyViAiBN6QBSzsJgCSNsOsX%2FyutO3EZhn8TkRnGv%2FXvubuC%2B8Cr%2FAwgGEAAaDDYzNzQyMzE4MzgwNSIMDHpRRS0UopWoaKktKtwDZ9m4O%2FHRP1L1Ex9cHZA1Mfg36Va0a%2BdirbhCiSi%2BzGSw%2FGp%2FRqmDJ7SWlgl2hna1HkwgBD0A%2FZcoXj45E89lUAG9um6%2FjErRAPCk8Z71WLgq%2FQJsBe8QAVC4e8DmS0V1%2BLqE7pCfOZkz7MlRPNpYVFmi31VMQB6EVPUR0kMZqB8Zwc1q%2BEUnDNyWOcFK8KPCkGeRUPu7kosnGdd%2BMMtoj3j4NmBJCY65CNRm%2Bp0a75r45M%2BkxOlEAs51P8f1Cs8df5IN6Y%2FUyUSCqrD7C7H5ECVg3hHFwVKSZ6J%2BwJgNMSIGZHTAlhubKYxMccqjW5lXqbFchhEzu%2FH5CkI58i1lovDAc3Z%2BqugnbFguXIwa4hWHoI9F8wTqzq%2BDA38WlRwUj0dQZs7wqmcLEDU%2BMP5azri8LFPqRtd%2FjPfIgfoUAY%2F1IVu0GcTGd6tQxR1H3ow9HrSC5PaxzTglmt7io%2BPqggrmbCMwIWfOFXBywJbbJNayEaycbHQRqWt0e8hsedqMJJWG5RzlOC9jhWNTYfi6cwdBKGXnsFNzJj9gJVncb4ZXbqn87eKoPklHRigezTD7TZ1HSyeLPgFmWqcg2w%2BmZsJ1Y%2BFxrLXhYtj7F3vsRhkDeeGbjoDHoxY61aswlov6zAY6pgFpAAXyZ5xI5XBymdOVBt%2By1qpvlyqWRi6Q8yx02wzpr6N8jQSgvj6cdwXU%2BEseUGmMRNq6%2BvKwp2yo4Hr9NHkBoK3a%2BSF49I4uSiRw%2BIrHlp%2Fo%2FtKIlktiembFDSgX%2BEa6iUHgZ%2FlxDi2yshTX%2FPyxis%2BI1jbsDn%2Bz%2BTzUTVGSY1kgjUMvJYKF6N37iFsOGMi6G6BBnjeIzNkQvCQjzeN58xGBC50n&X-Amz-Signature=9a23fdc7ebb3edb342ec2dce6be3dc657a3c1a5c3901e532710d367c03dc61c7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665AXZH2GU%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T093906Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED4aCXVzLXdlc3QtMiJHMEUCIQCRqJOTSatlM%2FlqY5XTcOGgvEIMhZHFtOMFaOjuwF%2FysgIgWlqVO5rq9V5%2BmuGp9QKMtHSKA781yTYRg02L%2Bda53Nwq%2FwMIBhAAGgw2Mzc0MjMxODM4MDUiDLOn6S1FdZQbAHkI7SrcA4f1D6U7bGYQMHJqmOso0s4XiLWuysVvGkYvODldlemFbYQFLCDH8JHr989RNuDSqw6k5fFPUh8gfYcuHrrBvRelgV%2BeaCNIvChUbJ8vg%2F6Kovnd1jCL5SZFT0920AbOolIXgNkOHIfBfcpsRYI7vwMwx8L6zc%2Fj1VlRPgsjaAVKL1znQ8j3ldLmdHmEovsjt9TMOZKcGPoOnlQVRoujt4SL%2BgupFy7t5z%2F%2B4dzQ8DbutLeQcGbSEUkIWcfzou8wGiM2aHh5ZFizlMyWMdCL9CNUkt1ACDbZXjJN6E5OpEQVdksnwlZPCKh%2FMtZDx%2BA0lx8hV8d6zQbm5G73lF9mHGGUXpGgDcdqxkLIMR802NCEDcFzanSTNWq1%2FdNs7%2BdhjXUStrhXpG3AgcQi8ywXHhYZiO5K7euXtvoJTJkGcvVHyWH%2B2xMd563ASJUnZvWe0BWK2zML%2BslpjJvqF%2FlwwvS%2BP7s1qKdST%2BfRLkrVcbeBiHgfd5Kr3XTvbI1%2FElVUw2H8IE6e3R1EyC%2BlUQgV%2Fwo3s9XqGnYBdzhhfmQQlh3NeIWfug1ZrSWbXqAC0mhMggaFT9DgomYmhCBvfYnn4wdcsmnZAcS6sQqPj22sDdFCjdc%2BYAya2BKgedV0MIaN%2BswGOqUBQT8RBMe%2FSlLrG0AY672BzBFP7NZ6Qh9pofo0tyHOQja46qEVYbIyPftBIL%2BHAtnBn8CyrzW0XkD1DXHGTXfLabTAQOyb3HG2ucXPs0HdMukP%2BR3f8SZgVVKdfdKhfPFGYOjZgx3u6xeK8raEjUKRO4u%2Bl2dM1VFQtDvjzB8t5TacI2%2BDljgpC4bdBcF3swqUUP7bX8HeLWj0sz69XAlp4h%2B5fi5I&X-Amz-Signature=cb5ac9706bb289d13ff37cc94f1be11362ca538846c2aa689b9272504123ba5d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663J6EQYTH%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T093906Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED4aCXVzLXdlc3QtMiJHMEUCIQDzUNimqAOUjLWy9TEx0h6Ejni9XLzEKu5jpYCrIr05sgIgYwRo8g9dLXCTushB28TJeSKXP4VlL4zVI0fkAM3IjRgq%2FwMIBhAAGgw2Mzc0MjMxODM4MDUiDKlXpMHMxic%2FZYM0bSrcA0TtGjvS57pnYHSOVtLRqiao%2FtGa5gOvCdlrsm37XRjR7i1nR8UnZawq3CYggaPFH8Nkyc82IZyZyyxPFqci%2BVDK5UFF4zfl5gHnDJvgu9WBlWUQXqrSN9PQbyfvysi67Hjp%2Fc%2Ff1zs3XxVv6LDTPP%2BOQbCCmaXE5IXGhfU5obj%2FSZQTg7uMFtfnvsyVFNTWOcwn3rpePmymEm3YHF%2FjK39ryxPMjC6c8ne4HE%2FO0xLS%2BP6y%2BSbiTMfnxrbXM0Rab0jN3uk2Vby3BMP1LGzpc9hcSPLbvOXFEIFmfsymmPaas70ql8suGSrDsEta5ZGGX%2BWvnN0RUE1xfE%2BpJvaLwqlFrn4PCDZLeO0UU5LAIaW7m8uTVpNDE%2BtcQ7DBrkUfWzd%2BiHFnIfw9%2F%2BFfMUQ%2BEvVniaPI4pp1KqNrcmg%2FToAx9tdJ4OfWIRGXKS2cSLrnlrglz%2F5bLl5ISD7lMRwh8GRN0O8hFbcd2iyUh%2FSKN3XxqOhi5ZzNofq5CE3a7u4g7zdmgw%2B27j4XyRqrtWhGj1C%2FV4LmnOUwyJAzoCidlpX8q6Gy6xl6KxM4w3biiIgFHjPFM8aQZQ1yLxEXiYUQnqZxNXf1B8tiHdHa2jaopa8lQRN2s3bME163RN5nMKGM%2BswGOqUBZQhQOYWEhlhghe9%2BPzsAPmKUTTVav%2Fww8EmYr47PiJDgAqAma1Z94TTonm6FDtr03ZE%2Fp6z%2Fpu8D7JBMCs1gv%2FTiic2Sl8ipkHumD5P4VzHzKkAJ1P45CtTG83u7bw8ANdUONFhLjcf%2BXbos2SQSdqwuBrnVDR%2BTPFAtGQwf8NnIjgrtUSHCsPiAW3lLoSbmajkPHNxy3yxQz0%2BJaU3qdRXPgvA1&X-Amz-Signature=ffb4f9947d536befd9163f0eac09b5f92ca532ce7dfbf4adefc56b735a891d5e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466R5PTVJUA%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T093907Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED4aCXVzLXdlc3QtMiJGMEQCIEk00THLgt4Y9oVd%2F7yZvDxy8vsg4iz%2Fz2aAkMu4XTE2AiATk5z3Bf6%2F5sU0F9XkzGbs3gAauNHoW5HzcADNNPGGVCr%2FAwgGEAAaDDYzNzQyMzE4MzgwNSIMCqSBKsvHqoUOEZKTKtwDsLW5lNKt7emy0EqFYbY20LnIp%2FDhqh9n6ZWZuM%2F70ZQ%2BLF6YpnYazdFwlJ6g8yro56HAthQaMAJ%2FXuHBuweElkSxqg7r%2F0qNwgHcPUGg5xuSzquQleN6DA5gYQnSTXa1BlPceK%2F6rFLFb0XF3pxjd066PzmA7mSWJlunt1rWJ2lMnWu9L9QrQ59kmIG4unqDd%2F7Izrcp60qkwTCL2R25HgpmuRt895rw4pR2790YoyQKhVk0ohzBWzqkt16WNtxJ7spQZLOU6V37eyI%2Ff0VDMigxzt%2FIDZcRblYkyVpoPOIpDYSGtVqjpl%2BSaganGanO53niE5eICddhuDHv%2BoM%2BtTP%2BzkxHMrVt%2BSo2V5%2FlGEXq%2F3boutmIOlhL2cc%2B5IRxp8c9l69gH3THlAPxd5x5%2BMD62IhnmYCHnO0KTcMZfmV1k%2B7r1e4r9mgbSDLB%2FR0tS0BGywgkrSXIjtWltITbtoqWcjTALnfITgZmAfSIsEwrmEJyABt%2B5pijpnZhzSC8Ovs3L%2FOeJtTF1KEpqhq0nOSyOkLR%2BLT4nTn8mx1t35LgqLoU0bKtIH2pNVDrDes%2BRuwoqBdGMhpiYmK0ARxN2OK88TtpNtasfvUGO%2FvumwUFT0MUbcyxn5rf1N4wvYz6zAY6pgEDaxOWnZikC%2FkSB3dvXIcCeNjSznqRCdzy3dSbJVc3Y7f9TNaZKcAqF99gVd9ggicJotVzcfpslJSUGgx7AUPJO5gTAzyGdlLeu5P8%2FDNYCNjNM0rsnpgQgzF%2Fv%2FNN9VyEAtKtij3lRMSsgegzmcZN2aFvea5b9FDfYgtS5zvWcIWAnHOPlvIb%2BTQLJdr0hURKlrQyllDm%2Fb6u%2FfDOKzK9Z2Uk1cTS&X-Amz-Signature=1e937417f181f4c225b9e8b6d22f942098ad808af7529ee9c2ce60ba34c53e2a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TMVBZWED%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T093912Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJGMEQCIFquEe3yky4%2Bc%2FmqEyrM84PkB5baMjaqL%2FgupLQzQcxqAiB64TGv0unkYkLTYXbFJXmnyhDC0M74fzrxhNg36JfGTir%2FAwgJEAAaDDYzNzQyMzE4MzgwNSIMIloJO2Pwil%2Bp8EsaKtwDIa%2FsC6IZItI6shiZeRYJ6fyK1Ob0IGSsCZIjQhCz4V5zsx%2BNY0kJ1JbJzh59ID%2FhGIc%2B10L19mWfoLNcN2HtoLi3V8JHRloyxEQbkdozzraBcgNQ0OjLBLP%2FTSgV6w6iZ1hJr8FDeJN03d2FvSi7YB%2BmHpZuZVIQPMFIqnHzxTeqjzUpgj88%2BKM7J7YLeJ31Tnwax86dtdA9NBB%2Fd0YK%2BkTuqmwt%2Bx2IUvjFAwJForcQ8midYcMrA17FmTV2LHm3UwNEC01SeROjCnxdKruFR5KGTK5m6l2W11X0W7JKFoYAqWdN1ZmBYzzeeFN48delwEbeHaqK63S48iJequnxmwx23og%2B%2FbopNwuk080ZfscZAlJSnTvfK77VZlLTWqV%2Bd%2FY%2F49F7VXTgD8%2BvwvDma0HDyjySxbqK95mwzdXlcQRi4ZvnCeMGK2iz6y1Ydm4aggAbA47OeW00Z15jtHrr990NJroxANpYIXSqM36DzHKEn2JAJkBx%2Bi%2BKKxraAR27vlbzO%2FmWyZS0hUwBPEHcsD85PrhR7dcYL8j9DVnFnuOcNozt5cPl741QbwYD6nA%2BfcHYzCBs%2BcAWCsMGPlJyUc6Mf7Sr6lI%2BTfj1HbpzyyOlIqM8jA9JvQpysr8wi%2BH6zAY6pgGChbJxONZN12XagxqcHKhHLnHwTDl%2FbMxFNgKGwFkgXKSzJsrVbpPX3v%2FOaDYke%2BuXDvYAyqkEjH3%2BTefOmEFY4vyudKgHbKpAhC7cpeQKxvQitDVlBU4ca7TaIcDDBb2nKTxC1CVQOcMb%2FQ50hCjUibOUQQgXahtOZttngHT4F770HTiiKcS%2FTDPeDZjkRpDxeZVG%2BriAO5FIvAysIP0xx83WVTnS&X-Amz-Signature=a0507f223375e6a4d78c442c9b8d9a934f8fda79687629d5fde0d21618d1a709&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TMVBZWED%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T093912Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJGMEQCIFquEe3yky4%2Bc%2FmqEyrM84PkB5baMjaqL%2FgupLQzQcxqAiB64TGv0unkYkLTYXbFJXmnyhDC0M74fzrxhNg36JfGTir%2FAwgJEAAaDDYzNzQyMzE4MzgwNSIMIloJO2Pwil%2Bp8EsaKtwDIa%2FsC6IZItI6shiZeRYJ6fyK1Ob0IGSsCZIjQhCz4V5zsx%2BNY0kJ1JbJzh59ID%2FhGIc%2B10L19mWfoLNcN2HtoLi3V8JHRloyxEQbkdozzraBcgNQ0OjLBLP%2FTSgV6w6iZ1hJr8FDeJN03d2FvSi7YB%2BmHpZuZVIQPMFIqnHzxTeqjzUpgj88%2BKM7J7YLeJ31Tnwax86dtdA9NBB%2Fd0YK%2BkTuqmwt%2Bx2IUvjFAwJForcQ8midYcMrA17FmTV2LHm3UwNEC01SeROjCnxdKruFR5KGTK5m6l2W11X0W7JKFoYAqWdN1ZmBYzzeeFN48delwEbeHaqK63S48iJequnxmwx23og%2B%2FbopNwuk080ZfscZAlJSnTvfK77VZlLTWqV%2Bd%2FY%2F49F7VXTgD8%2BvwvDma0HDyjySxbqK95mwzdXlcQRi4ZvnCeMGK2iz6y1Ydm4aggAbA47OeW00Z15jtHrr990NJroxANpYIXSqM36DzHKEn2JAJkBx%2Bi%2BKKxraAR27vlbzO%2FmWyZS0hUwBPEHcsD85PrhR7dcYL8j9DVnFnuOcNozt5cPl741QbwYD6nA%2BfcHYzCBs%2BcAWCsMGPlJyUc6Mf7Sr6lI%2BTfj1HbpzyyOlIqM8jA9JvQpysr8wi%2BH6zAY6pgGChbJxONZN12XagxqcHKhHLnHwTDl%2FbMxFNgKGwFkgXKSzJsrVbpPX3v%2FOaDYke%2BuXDvYAyqkEjH3%2BTefOmEFY4vyudKgHbKpAhC7cpeQKxvQitDVlBU4ca7TaIcDDBb2nKTxC1CVQOcMb%2FQ50hCjUibOUQQgXahtOZttngHT4F770HTiiKcS%2FTDPeDZjkRpDxeZVG%2BriAO5FIvAysIP0xx83WVTnS&X-Amz-Signature=d43e49a58385a4c966e9323bc5b52dedcc90ee8f74111e32fadb6bc7d9175781&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YOL5B6RS%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T093900Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED0aCXVzLXdlc3QtMiJIMEYCIQDV6NrbyXOkfgR7vZ0UAd%2BnNr1rhVDbKWgkYBlPXrorqgIhAMSmoGyCsO38apE7SnvULRN7W1SkreK23HHsp4MzMyHsKv8DCAYQABoMNjM3NDIzMTgzODA1IgzgfR8QSPX1EHDUEE8q3AP%2BAVzsWDGmbx%2B0f7ivLIiWM6vduXu4KNF%2B406Mw19iUbpIfO2zwbhwsWFqMY8vf0EijsbQ04l1yYViSgM%2FaLdyIZeaR4HdY5qyedXdBmAGkBV0DKmzf69uprjNm7eiZ8bS69QX0oty6A%2B7YqG4bT%2FUTo5sbw4tR0xyc9IsOlcSRgTPFtpRxXGuu7xlhmr%2Ffe%2BigxMz5SF0MMhU5URLjFY%2FDbc%2B8ESWEeF%2FyRtaR4McdnToiRpP%2B%2BFUxHoLrvkhWrTcurnkQDqjW5BYwJ90TbbXGHartLUuYDY2kxGRvHPpUzFKT64mMjRII5Pc%2Bw5uZd4UE8eEy0YySzVHSWCEDjKPcKS%2BNciW9jhx%2B%2FornHZo%2BGoLlVPfr9uChgqCkZKKkEG296e3INEGwtTP5UQ6fX%2Fu6934FXd%2BiZtXLAXIdDJxTNzlkLoR%2BdwwibGwGoP5VGiDbSR6NPlSywNuTerLF2TmRXpm%2FBEp%2Bc9KIhvvtKFZRqEzklvXymAotWYeXyyROYK6W2fhdNfTm4U%2BKxYDOtw8CO26rWpTW9dbOkNRt8Vw1za%2ByXTxplIK0S6X%2FqDhirl5gHrpbBQXQwnydD8ppmg4xu7QO9CHAb8cgEC1kMqZ71sMCIJi4ETbTD7bCDDUivrMBjqkAabysIvSerm%2F%2FxBqlWejyT%2FlFf5mw2Afw4yNsMzK63vnukccm4%2F8rQYTxoJkaOR8fqyEmm8IIUftESVLYAsuYXQ1eElGFA%2FFl97oOQ4UBDuhPRt397SjpDl%2F8TUPg1RnH55lY0KLv0W2DCNkawmcemg3A7g8rKFeZmMwec89G0XvIPvRMoBH2r4%2FERH0Hp1K5EjM%2FZEuAEHzKHm8Dyr2%2FE20XtmC&X-Amz-Signature=dc21bd97051b4dc7313f7a067edf7697cb1f543aae261740c360ab78a52c9787&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667ZAUCIJD%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T093913Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED0aCXVzLXdlc3QtMiJHMEUCIQDml9l1Mw3fOPUwavN7w7i7YukSd53UZeO2nhybt9cbUgIgOGgBU6o7MzJaM%2F4DIHXdT2yRs95jfF9hu9xWYNsS%2BD8q%2FwMIBhAAGgw2Mzc0MjMxODM4MDUiDP3vhyZDkJGwBD7wMCrcA2jPD016ZLEFSORPTK7dbB0gCGVvFQXMmwaS%2ByvidnwprpgJi0xklUV0rkzv28G8sNBiVmtdZSXp8866va5pQbe%2BoILVAbePiTIZNQxQlU1ncH1sWVZFkNaz4mnQVHDsA5fd1U6LGhZeFwCOrWAOelm0RTkRs09ap54DkyMG2hgidt99ArksaU399vDcGRh3MqwHi0vO9L0P%2FmA76%2BYdRtlkiIFzd4nUjkeDEJSmpEO7QkuwaI8IDsPevb1rCoDIX1QjA9dPZhNym7878AVPeBvpLhFTgb6o2L1WVHGS9OPAF0biJ52nEE7WuxFexL2t%2ByRqKAFjqcKAyne2YrWP2fKabiev0fZTosAQXMRdDWsmm7xH0Nnmn35NH3v64Ub9qy2WNvPBDdi9fAnNYp1b0F9aUwsNLfPnsHytDUUsWfqf1A2COleWJkssizi8b%2Fj9rpK%2BWxRlP1t%2F5Z8CgPWbHSq3BkT8mBdH18OucOYda3zFOPrPDQ9oUkzva4dJlHO5ea%2FdMzMQ%2BlDyqg2hhqXrXa3lsURrHUN7%2FtRHUFNcM0FEzf9rqg3BFaQ%2BD3akMBW%2BdqUsYa2yYj%2BF4dk9qypYPBhmn2%2FXgaCl%2FdZysOVpT4FN8tyeOB1k9LBokTLrMJeL%2BswGOqUB9FFeSFBx0i3Gbzq2ax8RNOixTZork7JuMtHtMtAcRu8i9%2FrTu7XADDZ4VtHoTw5yk%2BLtW7Rs4fkYyx1qAIQg%2B13kqjHcU6qWJ3WnF%2B3cbckWDCi9j7mm%2B219usoGFiNg2v%2ButrNImf%2Btl9Z7OfgXCG0ze6EMbU%2FfDCeDsRpuWKIsllxrI4hDD5z4oWvhpmPEZGAsApJjU9r0bJlvThfqXq8ddzYi&X-Amz-Signature=833c54c5eebe2368e9dce828d3ddfc33309480381671f18b8cf3b475ca969f9e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667ZAUCIJD%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T093913Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED0aCXVzLXdlc3QtMiJHMEUCIQDml9l1Mw3fOPUwavN7w7i7YukSd53UZeO2nhybt9cbUgIgOGgBU6o7MzJaM%2F4DIHXdT2yRs95jfF9hu9xWYNsS%2BD8q%2FwMIBhAAGgw2Mzc0MjMxODM4MDUiDP3vhyZDkJGwBD7wMCrcA2jPD016ZLEFSORPTK7dbB0gCGVvFQXMmwaS%2ByvidnwprpgJi0xklUV0rkzv28G8sNBiVmtdZSXp8866va5pQbe%2BoILVAbePiTIZNQxQlU1ncH1sWVZFkNaz4mnQVHDsA5fd1U6LGhZeFwCOrWAOelm0RTkRs09ap54DkyMG2hgidt99ArksaU399vDcGRh3MqwHi0vO9L0P%2FmA76%2BYdRtlkiIFzd4nUjkeDEJSmpEO7QkuwaI8IDsPevb1rCoDIX1QjA9dPZhNym7878AVPeBvpLhFTgb6o2L1WVHGS9OPAF0biJ52nEE7WuxFexL2t%2ByRqKAFjqcKAyne2YrWP2fKabiev0fZTosAQXMRdDWsmm7xH0Nnmn35NH3v64Ub9qy2WNvPBDdi9fAnNYp1b0F9aUwsNLfPnsHytDUUsWfqf1A2COleWJkssizi8b%2Fj9rpK%2BWxRlP1t%2F5Z8CgPWbHSq3BkT8mBdH18OucOYda3zFOPrPDQ9oUkzva4dJlHO5ea%2FdMzMQ%2BlDyqg2hhqXrXa3lsURrHUN7%2FtRHUFNcM0FEzf9rqg3BFaQ%2BD3akMBW%2BdqUsYa2yYj%2BF4dk9qypYPBhmn2%2FXgaCl%2FdZysOVpT4FN8tyeOB1k9LBokTLrMJeL%2BswGOqUB9FFeSFBx0i3Gbzq2ax8RNOixTZork7JuMtHtMtAcRu8i9%2FrTu7XADDZ4VtHoTw5yk%2BLtW7Rs4fkYyx1qAIQg%2B13kqjHcU6qWJ3WnF%2B3cbckWDCi9j7mm%2B219usoGFiNg2v%2ButrNImf%2Btl9Z7OfgXCG0ze6EMbU%2FfDCeDsRpuWKIsllxrI4hDD5z4oWvhpmPEZGAsApJjU9r0bJlvThfqXq8ddzYi&X-Amz-Signature=833c54c5eebe2368e9dce828d3ddfc33309480381671f18b8cf3b475ca969f9e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663J3P65FX%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T093913Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED0aCXVzLXdlc3QtMiJGMEQCIHrDVc52KsMx40%2F%2BA3J94e5mwp3NCNlj1rBUiVc5f1MqAiAqz9IqM1V8PzlcV9cW6M47Vgbt49qsbAQxEtq1yIMBNSr%2FAwgGEAAaDDYzNzQyMzE4MzgwNSIM%2BMS5SRtMqwV5mDKwKtwD%2Frk4UiiDc2%2FOWRj2iH45sS%2BsAo6HzOs6hnpoIaMwDkJmy3tVSLWyVvDHCSPRJ2JM6%2FqNLWefozRBDMXxTubJq5pl%2B4OSyWf7YUN651FTUePvGrW6pwnV66FfUWl5RUJogMSYNoodWNybbSlN9RbSDhfdoGsCcNoJLXq7cQ6PPy4SOBxIft1WuE9zGiiDGxU4JrR49vMOSqt2qVKRfCIOIR1JpP1mT6wrNF9yVfSpzmOkdbq1auIaFW8Tdel8xnIwUBqtrFbpdenONLPstoZsuxGbbt4XbxpmQrZ8S8OWSnOtNs8ti57Enljmqh5ejHu60ORSVTJKjAagE%2Fm4QbXB6gTp5P2jgk3xWg5L1ruKNvCXbDrGotuKrD5b9EXtHUeH7lp9nycGdj8FghS3X08lIVj0KaNGNlyZkQgpqioN8qB5CbZzK5aEXCtQyToGXncH1i76ENzTdrtip7ANlKQtoVu60Wmo3Ha0oOnA22P%2Fvzuu06QHGP12FxelmbTIQgR51gw6AX6qZybZr4fKL2Cm%2FBSq%2BjdgGlO2Y7N4QEjfFEymZKrLrn1Utw%2BtJ8W0jwOPkYXXAupm8fPRtJCTdv%2BwL04RYILZf9uvxLyB%2BwUSHXSQbnOjb8X%2FuqCz4sUw54v6zAY6pgHNP%2Fx93FKvtbJcQ28J4kaQtcqLQGnbzjfVQ6BfZ3rMT6Kwur8sSjZL1KXtWkqJVZpo7ILO1oaMutM5Nm0ySI1u7y1oub8ZfQueGdznACCeV7O8iI0kMFy07fW8sQOhI1%2F13tZeGpIPGZyPqg5fTe1sxbiUAjOVNNd5cPEfefpNQugYdP8XhcHjXiTT0YlQ3E5PHWoDILu3eGDOxc453EbbUFWI8N%2Fl&X-Amz-Signature=75ef53b41276b83f6c013e784eb033ef583298a7a3a718f0cfbc630eefd295ec&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

