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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665EANSXYJ%2F20260403%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260403T153017Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCICrQbiZ9bEIKhcHoLxS2OEjwcDWTn9UfDJyfC1LZPN%2B6AiEA%2BkCwUvIkGex2WD14K5%2BpUjhqUHKdgbk6UXyGYHgCIjQqiAQIh%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDFBC7i4wjGyY2lQi5SrcAx7naDphq%2BhHXngGyHiKBpr77y8P1yUZPbaxdLfRhkWm9luE5IgOUw8pykNwE386e%2B1VGmgUKHJV4zgIZpyz04WLj7z5vso%2BrUPfXhvqTd%2FUf7oEGiaLWQQ8F%2B3HxCir5RH5HXXDV3bgpLQqWNTXesqNg%2BXitulkr4FDJgOXDhgUrKzth%2B6QkaG%2FXoksf8FBWO820SseLMYcVLlAQsec8yXypNiVcghC8hluDR%2BIzRZqfIAMKLzphvX0LAsT4mE5NUdO2PWZjhho4nl7I7VwKTHN03KCFSqvm1%2BJnOuz6KYtmdxd78iUqk9kBmo98ume0tidPKDErpswBj3jkilF7%2BjIQVq0h3AgdvGiMMDohHEX7LHb81sq1azsYNsUAmUUnSJOAHHt56JYTixEYCxJKNxLY0OhiREkELKgksi5%2BoUs%2FlnolPYteWOd42QFqlQy%2FuyiUuoMVCjYcsbFeovv6nHm4gJGNUGcu8Hp%2BVGYSP2Nt5uG%2FQWM0yDNzcHjTMOQft0lijOfXZZif8L2FU8ZHXJ21WV7s4gU%2FieCfGOHHD59q2RBoWrwl%2BkmhHLVWdQ5Uz82iYjdd0Hn4WSaw6px%2Fp6CKqLq76nx09Ibkm1T25Ng4xaFvgQeVGU1EowkMPyZv84GOqUBPGyfI7Ts7452Opwrim04o8e8%2BkHeg0bihNZ4G4LJ4Z2icybp4pVFmq8D1ElXakrfkIfFQMRF6fmQgy%2Fo%2FTv7idrblapBA0NtASN3ctUkMz2U%2Bek75EFx7nvyAkuX0Hb%2BBpmHlx323tTh4gpmkg80Nj307Rk06gWd7KzZ9QyGxhVhm%2FL4Mh%2Fe%2Bf3Y1uz2tYxAaOJgJ1WiJ5JR79NUEPOc%2BD4qJwQH&X-Amz-Signature=8b302c52afb1403dd7e26b1f7143296b41788ec17aebb423344f058d91a5b2a5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665EANSXYJ%2F20260403%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260403T153017Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCICrQbiZ9bEIKhcHoLxS2OEjwcDWTn9UfDJyfC1LZPN%2B6AiEA%2BkCwUvIkGex2WD14K5%2BpUjhqUHKdgbk6UXyGYHgCIjQqiAQIh%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDFBC7i4wjGyY2lQi5SrcAx7naDphq%2BhHXngGyHiKBpr77y8P1yUZPbaxdLfRhkWm9luE5IgOUw8pykNwE386e%2B1VGmgUKHJV4zgIZpyz04WLj7z5vso%2BrUPfXhvqTd%2FUf7oEGiaLWQQ8F%2B3HxCir5RH5HXXDV3bgpLQqWNTXesqNg%2BXitulkr4FDJgOXDhgUrKzth%2B6QkaG%2FXoksf8FBWO820SseLMYcVLlAQsec8yXypNiVcghC8hluDR%2BIzRZqfIAMKLzphvX0LAsT4mE5NUdO2PWZjhho4nl7I7VwKTHN03KCFSqvm1%2BJnOuz6KYtmdxd78iUqk9kBmo98ume0tidPKDErpswBj3jkilF7%2BjIQVq0h3AgdvGiMMDohHEX7LHb81sq1azsYNsUAmUUnSJOAHHt56JYTixEYCxJKNxLY0OhiREkELKgksi5%2BoUs%2FlnolPYteWOd42QFqlQy%2FuyiUuoMVCjYcsbFeovv6nHm4gJGNUGcu8Hp%2BVGYSP2Nt5uG%2FQWM0yDNzcHjTMOQft0lijOfXZZif8L2FU8ZHXJ21WV7s4gU%2FieCfGOHHD59q2RBoWrwl%2BkmhHLVWdQ5Uz82iYjdd0Hn4WSaw6px%2Fp6CKqLq76nx09Ibkm1T25Ng4xaFvgQeVGU1EowkMPyZv84GOqUBPGyfI7Ts7452Opwrim04o8e8%2BkHeg0bihNZ4G4LJ4Z2icybp4pVFmq8D1ElXakrfkIfFQMRF6fmQgy%2Fo%2FTv7idrblapBA0NtASN3ctUkMz2U%2Bek75EFx7nvyAkuX0Hb%2BBpmHlx323tTh4gpmkg80Nj307Rk06gWd7KzZ9QyGxhVhm%2FL4Mh%2Fe%2Bf3Y1uz2tYxAaOJgJ1WiJ5JR79NUEPOc%2BD4qJwQH&X-Amz-Signature=8b302c52afb1403dd7e26b1f7143296b41788ec17aebb423344f058d91a5b2a5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UNHW3VM6%2F20260403%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260403T153017Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCICuQwvzrDW0fh0XHf9sbJX%2F2ciLYLBq5lCRBfV0aVshGAiEArtB8upcZyXwhO25BxK9S4b08AbGHjwq0qMR5oBqjDCAqiAQIh%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDC2low%2F2Oq5yPcW8pSrcA38SiaOaYiJ2R4u0qgGTWq1E4hItALkZDjHYdNl%2BgFZ213w5sTOJky%2FtpLolx3r9TKHNCmaY9663Kr5XNRKSnE7n9N3wfRAI73iWmJrx5JduwB5LpMy07DJyKyxpF7E9Aii04VvSFURCN1RLueq3R87kcozqM7AZVS4ZhOdGHEswrJ0jcaEjMluXzwvbByDhCbqpfsKE1p%2B88S%2Fkcd8c0UdLoKmmiGiFke3jzlybHPVqnhMXnJO6223qcMeHJuO6RduC82LEEOnara9LeFcypVFcZP0IfcZPudoIenHunERqV28vK7uAWG75zEvXlacTC4Q1YP36WhVOhPlGmtTvotPlZcHoeWGTzyteYFH8W0nnEkD8G1GB9QmvshXTKFLQFiIo5j5NGBXl%2FLyaFUsnmYLROh0sJvyYeKz3pBn8EJ%2BHkctcIk4humbzKA6p759KgO9PPiysekSIDf7%2FumbccU72LR82ZDYSZ%2B%2F%2FYkxMFBndBL9OAtbVuPq1fT%2BAjNW%2BSuklt7n01CTgcnb9uPdd83YArLiNO6qsn1oauUjWuG2bROga4%2F0zVeEUk5Vih060O4IDN90m1OtOWXQmCWyvUoZ4WGje29U7lI8DHDAZ1wKOQ5wLcRphFLUyGuHnMPCZv84GOqUBWmTZuEtvPE%2FH51kNqn7cwTvpCAd3D3K6aJmNuLbJFStSgKK7qnoOdMMa31JLJvvLR7CrdgmBr%2FUpS8ZRFGWF8IRYnbtM09oobtyjuMadNbHhexYzQTKI6wN8XqIYsUZcyg94VJv%2B3DxthfLZ7IRNa7ADkmWGWJYYKK8WER1jWkN%2FHDisxphvebQFU6C9SdJ5rxGBczAJsPwBlOqSgY%2BoVp96JPgf&X-Amz-Signature=2d6443c53d964d4a9f6487ea265be2c3e2ffb9678a8757f2d529650873ba520d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666WONH7OS%2F20260403%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260403T153018Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIDsiK3HT2%2FbSB%2BbWEgLGfU8adnYmvGM4mcE0pbk247acAiEA4HrHoqCrJR38%2FK2zhXqZC8Thg68RgDMd9eG9mpyAeeQqiAQIh%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDA1h2J6%2FdMdKztWVsCrcAwyYPuWBUuYM2O0yi8UzLsk%2BghQqUYa8y7hRlhYKp332H0wQbUU0R%2BKM0iZ5%2F8DnVw%2FDwTEMzBRH97e9WPuK4Zt4aoPtFdS7jOjyEGW1j2yfugDz%2FlGjmqoakoIJF%2BK7g7OTV2XSmpwOA1WT5JOE6%2FXRVZqLhQiOfzteSugVemF78SaI3rIyW5sAun%2FGe6a%2FssP%2Bs0%2BDr8Cx%2B3fc39tPEn9tisWvqnKID2L5eBcX5%2BqscHFvsNWFFinNMOmHEN90s6uxyvypJ7KnwhaVGZMcqyooNHP1z4d5xzuhdinzetebndp1ZpqK3LhZhUivAYFKzC36DPXuTcT0DL9L4cUO7LCPEur1LotYfjOiKjwCgfMBDKbIdM00l65sVXehIdfT5QpXS%2B3KCfNsenG7k3cCsC79a0AOv1u33jHiZdXVDB8aR0QOop%2BxEPBzfgCzjNRv8KtKE8TLnSX%2F%2FV2u4Yh%2FpuMeB%2B%2BK0IgOYh4cXBhYFHARTz8hW2qs7jl%2BIl7u%2FCwtcpEUFKfuW83W3cPmxYyxB2slS2eRfT2GaduvhTXyUcY0C0nM3twOCvnUke3sbiuCQPMJmz8%2Fs01ipESREC%2FqmbW%2BV%2BgH5LC7C0%2FnF0TY4e645KkP1y7fZU%2FeZuTTMM6Zv84GOqUB2z1qh5ndcjShgxupGD8axTmaFW0ldxh6S%2FaIDMuu98qSPRuczzycm7YU471C3d64ydaIeIxnui75BbKj%2Bo5OZkzgNqT275Ga2A40P1tFDSZbktFjoxDUz%2FY%2FHRTnv4%2Fxqz%2F7BPtF%2B6U7kRGgUux4pcouN%2BHU9JB0MwmJ6BdbHoDVh2XxAr51WnFFa3oeZtUGVxRRLwU3WQLO7ja3adytRLCLExBV&X-Amz-Signature=30281f38c3ada9d77e82993bcfb67fef6f255bc5e5edd426367df226cf3374cb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666WONH7OS%2F20260403%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260403T153018Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIDsiK3HT2%2FbSB%2BbWEgLGfU8adnYmvGM4mcE0pbk247acAiEA4HrHoqCrJR38%2FK2zhXqZC8Thg68RgDMd9eG9mpyAeeQqiAQIh%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDA1h2J6%2FdMdKztWVsCrcAwyYPuWBUuYM2O0yi8UzLsk%2BghQqUYa8y7hRlhYKp332H0wQbUU0R%2BKM0iZ5%2F8DnVw%2FDwTEMzBRH97e9WPuK4Zt4aoPtFdS7jOjyEGW1j2yfugDz%2FlGjmqoakoIJF%2BK7g7OTV2XSmpwOA1WT5JOE6%2FXRVZqLhQiOfzteSugVemF78SaI3rIyW5sAun%2FGe6a%2FssP%2Bs0%2BDr8Cx%2B3fc39tPEn9tisWvqnKID2L5eBcX5%2BqscHFvsNWFFinNMOmHEN90s6uxyvypJ7KnwhaVGZMcqyooNHP1z4d5xzuhdinzetebndp1ZpqK3LhZhUivAYFKzC36DPXuTcT0DL9L4cUO7LCPEur1LotYfjOiKjwCgfMBDKbIdM00l65sVXehIdfT5QpXS%2B3KCfNsenG7k3cCsC79a0AOv1u33jHiZdXVDB8aR0QOop%2BxEPBzfgCzjNRv8KtKE8TLnSX%2F%2FV2u4Yh%2FpuMeB%2B%2BK0IgOYh4cXBhYFHARTz8hW2qs7jl%2BIl7u%2FCwtcpEUFKfuW83W3cPmxYyxB2slS2eRfT2GaduvhTXyUcY0C0nM3twOCvnUke3sbiuCQPMJmz8%2Fs01ipESREC%2FqmbW%2BV%2BgH5LC7C0%2FnF0TY4e645KkP1y7fZU%2FeZuTTMM6Zv84GOqUB2z1qh5ndcjShgxupGD8axTmaFW0ldxh6S%2FaIDMuu98qSPRuczzycm7YU471C3d64ydaIeIxnui75BbKj%2Bo5OZkzgNqT275Ga2A40P1tFDSZbktFjoxDUz%2FY%2FHRTnv4%2Fxqz%2F7BPtF%2B6U7kRGgUux4pcouN%2BHU9JB0MwmJ6BdbHoDVh2XxAr51WnFFa3oeZtUGVxRRLwU3WQLO7ja3adytRLCLExBV&X-Amz-Signature=5c8d2d424923a4d15ad7d8376427fc58f049c04c913692b0c8affd4fb98e9652&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663E75BQDX%2F20260403%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260403T153019Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIEB4nOjVQvqhFz%2B1DbO5AmvexMvkvEtSzhZ%2BslaEV%2BBZAiEAzob%2FJjqt3tOdyK3KXqCm3lRUqtbmV%2FMwKVAQTyCpAu4qiAQIiP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDHWHaeGz3%2BAMoxVxmircA5%2BCmmHabHgPQa9zyIzy9WknO0bAlXQicyB1FFbk%2BvynXViQquDxAoLRF%2B0Is07DP7EPKg46TQ9bYHWUCb38vDqwcVkoNQ8U1yXVkkhCUCw0jXseO3iYcKbAfR0kZf5qcpNvw55EdcL%2FA3EeSuiq2AC24q8cmpPLvFKhk3%2F1rIzVVepoKwrPH85kRZPgY1fSDHjUd9U8aMaHhOZ26oJiK7%2F%2FTICPWMuGI7Pcs%2By1Tac%2Bhr52xmxreSWaN%2FizOGRtLv1HgkkFd4vQGzt2yT0n0dF0dw3gib0MMXhFY4wBw%2BzEuzbOXDkL5MzWPWQvKf4v%2BmNAVXJl3ewS0jed627dMUG3BPBtdwP6T9pyiGNZISJqETQava3egjSgR0avVN2W9X4z7xzV0v6VoBlgiSUwMwD4WEGPyucuTdc%2Fu5CXJ7GPc2IC6KnxUngDKmppbcRUTvUOtl0TlvRJnzk07teZOAehT%2F0NaFXU7T9n6%2FDlHaLwx5au%2FVWVhDfrL00YqINJeqG3CJpeRMJDGnHAD%2BFCZq%2B2lARULdxtqq1yvQd5CLKEYD1VqdwYUaNezPGnMERyGtsaOqDoU3kk2JB08nk9oahip6clpChMbp%2BUzrnp1Z38jUzuWifS8EG%2BKNjzMOycv84GOqUBTkkuVbqG4nwMrL%2F8kUycUNfbTgxvKR6QsCbHaSDE1jxB%2BIz%2FxNlwx%2BsNtulhxeILD88CdiKHvgUlODb614%2FI%2ByBaLtZtj96ItgGPEGGYs2Lg9mObXUpNGg3PKVad2uawEpwNrLc0jx%2B5JuEgUcgoU6hmxE82x1yLhNZmHAqtqT2YVvGhOCBHKsDAZ%2FRmHyhUVpW5KOFCtH3vbb1IpQA79uMsGsHG&X-Amz-Signature=9d5d21e6a675a7820617df4b830c2a710fc1c0f72470182c2a59a8e6e46c9396&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664RZMSJRN%2F20260403%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260403T153020Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQD6j64OUtpx0m1dHu%2FfR6ADLiqacFcJYgmkrqINt3IgEAIhALY5Qc8Q6Aq9BPQH%2BnPgIur9uNsWP%2BaFDGiw%2Fdquw%2FmUKogECIf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzQg2BFuok8%2B%2BonbXoq3APlTatE%2F%2FsGTHu9U6jcQ67Q01w%2FaXJF54HpZsNbr2It3N5UAvI42cjycUuLSg8a3PCFqcJuDvyKrHID1uMBRPxi8nMoyNwHtxb3vt4eK%2FSvjcf8wCYQO1sRI9d9bBmMQWTgNOAQt96YAq9vJIC1ewCcbwWF0LbJyI66OErNYSXCFIDo8Ecu9a167NibD3mBhCNORNSc5foI6MOdSYL66VF6VpCefpCEEB%2BQ%2B%2FGmB1BaP%2FiibiwNynLN%2BQQr7Ud%2BpYxFqnxDbn2%2BJnqxnuC5yBFKGSVI8Dk1JfbhINHBYlbJkGr8oDLgFMcNOgrUucXB6RC276nIMzZLlwZv5JYItlpmfEyur1BZI0mk%2FDZtaACtpGLHGeCl%2BdyEEB77cDntq7kAKvKx4fPV6iM0G9P5hnnMttvSUVi4wZJn5aWI9ZgZKaKESjheGGME3wIvJZauEAKS5Ljvi2BW63%2FoXz4RxDVL1uw9rJ%2B8O22%2FBQ8vtY1svU8uCwiFkblluBkJ2W8FYetabwSk8aU656bDC%2BuWvhzm4XACoLuMhnz3s1NoC6jFIOMOyqt6gGmINdXm2xXcKWOQ8ofrTNxz7QtRZzKosTWzYgnCza1MKNRhVQ5YM%2FXkdOG%2FtedfbGTrZD6KRjDYnL%2FOBjqkAWJqfyewTsIt%2BZOpidgBCVjvyNTs093ubemUo%2BtIhsEhBxPDEdvK8V6gZrw4jJb1JLQGXdyr8Zg40fYMHWEkyVq1qCHsw%2Bgqoez%2BHWL9cbhh%2BOZl5uarkrV%2FPtZhr%2FZYaVlUflO0frNsX2LUth5NeBxSWrTs2HSn0Mh42D%2F7pRyIo3gy6idmYqZYzD%2B41q5D0VEI0XX%2BNk18nv4hS0ZYJLdQlm0e&X-Amz-Signature=d5d6421d03a761f3b2e0f6831e75e8db1c11ae6ed9b5223e4ca0d84314424135&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UEUXGLLQ%2F20260403%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260403T153023Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIGXIqiEbYi1Uj43sLeWsvjzaAa2EvMkwSpQiGYXIbqXCAiEA2UPqtYKHjUt5gWfYwYfpFSR%2FfuOSht%2F2%2F5XRf7zIth4qiAQIiP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDBtHc%2FloEr2o%2Bz1WMCrcA30DNR2CBY5R%2B1C6xaP00jgqxqdWOMLXOC8yjWkj8lSy0yQ8ghcEY5zyAHSvIyOkzU2XIecuvO9iFbKm5o9jQfH6QdjVIwn1X5Wz7HYRVXZ60NIFMCmW8%2Ft%2B%2FnN20sVL3HrIGDuTYz85Gnn05iz1Cz8zOR3WruvIgBceLDRPrsZbi7q9mv8sSbjFd6Praul9XlozKWgGMlRWFppChkKhSsrB%2BPL9%2FBmuyhgomv9rrGPNV%2Fg%2FnBHHPB2EE7z7X6zRLxpZtXb0ZABhhkPoRHuB4lG%2FUttrrgYJExgnIKXSbBFN1SnA1elLXNtuCUV0dhGFWhtcJOpL2Scz9TZwjryDnh2F81IItR0CaUlqTtqsWPp8KKSrmrfJq%2FHFjlvyMS5L3STDevHTvxUMTJVDCSP2Smr1RgsU4dUQNyG%2FNOhrqUK5m8a8QWKXlQVt8GjBwLiUKNYoKCdZScB%2FF7u0KienqWUp7maCGBRo%2FGoDCAz2WCSTGRcUvRnQYqtoT3Ftrx2tdLDWGXuOU6q%2B%2BVUKSlG0QSdJZ8FLPp834MZec3A7bFIcjn1UvOTHQq8NEz8Mzz0OXqdnbQU%2F5XbDllNccOVKaFf1VEsNBJZ1ScWz5m2c3LlOXRRvSDiWX9KXbi8qMMCbv84GOqUBSkvD8fuVAZ%2BRDlOXyFB1lwEjVCsqfDh248TQ79J9Fo2SLVL4dzNZ848XN%2FNeUrVMluHmSw1D4WJHy1jdUwEpqtL%2B7kWGVnC0rkV8UMP8niwWFEIWYFPB3fq3HT39Sab%2BruTdtGR9i4TYTx38ZsKrEuWYgTxCUJy9wjR4qArFfK5u2PRLNEuF1P4n%2FipqArEpFNaww%2BntZKuvxoXFa%2BlrAc%2FRJ81c&X-Amz-Signature=a675f1ef7ee95299ef6e0040eb42f6e845c26575c50120dd5c5c1ee3deee6168&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RIDSFTMP%2F20260403%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260403T153026Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCbvM%2F%2BAmolFOK9Dh0jEpH9hUdZVy33ZFDNmd2O8PI4awIgaA69VGNB7WWdLYKIO6UUmUEnlAMCgtOcqPogUOOFOZIqiAQIh%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDONkoOXBzdU0K9VV8SrcA%2BjYOsmyZfQX%2BNcxfgJZR3S55OzHJAY9kO%2BP0W5qgE0Xxr9LdT%2Fv3oNeFwbeNaMgww1I1jQYC62XU50pAiZfnh8EvszcEdae0WJgaiBeZGi52pMeqV6WcxZTMlC6iOqISQR8K5pWWHWwHmWK5yxSsrnWxiG%2FqUCimL%2BgvQmOleWowXv6oHKQu3uRsDqRpF9ImTt5Q%2FT4Yg4%2BByClJqHuwkoE7cmZn1jh%2FvZ9RE79J7YSw5Sbv%2F1zB88NT5NhkAFjSZNiNPop2yIXDKG%2Be2ELP20JbV89Hg%2B6kHx0ecfVMGeFr4AWLWUQOKFfG6W2U8D1KQynHjukQF%2BlZKO9ETafadfL0qvBtfSwde22rwTZZdbFZxV%2B4WRy36HlDKaNQ3sbXpOkJ5%2BN%2BuZCZR%2BgRk8cPaNlOyh6GBlvVgTtvcnH%2F6sZFuk0QRPStPb%2FCSQGZ1HT5GYrwCRrd6L4D8jK8MRJtmKCuFxIkL46vAtQDLZan2PBKjGHhmcN4gMOzAikQaGqinKq5Bl7eez%2FUAycMTqvywyIVYqF3BpdGvUrSifRuEnp8Szx9OMeMmngRaBhZyG0EAN7t4zS7e6dMLa3dV0SQymJ1DgQJ2X7a8%2FB4aHjFFZpWZvL90tlM10V48kaMJeav84GOqUBwyFMVUpHTUzpswS477rx0CbHr1vquC9w3CyEsmsOUdI5OXd5q9R2U4jvtflhlo2%2BrTZj5zhHgM%2Fn%2BTSL7VDF0Izlpb%2Be0IcMOhs2%2B3kkCkAz4cPm7F8dpUvyCains4%2FvG86Cdae9qiDs1ZuqEkb5hfTzm8j7DUEjZTGT9or7U2lEuRXUwd%2FsS0IA0RgvgfadRMfvEDApMR%2Bq1SCSDipJlOHh8g3C&X-Amz-Signature=db752e9126089a8f1aca262ab13c32c9da422478ea3a7132204c400621a4f729&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RIDSFTMP%2F20260403%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260403T153026Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCbvM%2F%2BAmolFOK9Dh0jEpH9hUdZVy33ZFDNmd2O8PI4awIgaA69VGNB7WWdLYKIO6UUmUEnlAMCgtOcqPogUOOFOZIqiAQIh%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDONkoOXBzdU0K9VV8SrcA%2BjYOsmyZfQX%2BNcxfgJZR3S55OzHJAY9kO%2BP0W5qgE0Xxr9LdT%2Fv3oNeFwbeNaMgww1I1jQYC62XU50pAiZfnh8EvszcEdae0WJgaiBeZGi52pMeqV6WcxZTMlC6iOqISQR8K5pWWHWwHmWK5yxSsrnWxiG%2FqUCimL%2BgvQmOleWowXv6oHKQu3uRsDqRpF9ImTt5Q%2FT4Yg4%2BByClJqHuwkoE7cmZn1jh%2FvZ9RE79J7YSw5Sbv%2F1zB88NT5NhkAFjSZNiNPop2yIXDKG%2Be2ELP20JbV89Hg%2B6kHx0ecfVMGeFr4AWLWUQOKFfG6W2U8D1KQynHjukQF%2BlZKO9ETafadfL0qvBtfSwde22rwTZZdbFZxV%2B4WRy36HlDKaNQ3sbXpOkJ5%2BN%2BuZCZR%2BgRk8cPaNlOyh6GBlvVgTtvcnH%2F6sZFuk0QRPStPb%2FCSQGZ1HT5GYrwCRrd6L4D8jK8MRJtmKCuFxIkL46vAtQDLZan2PBKjGHhmcN4gMOzAikQaGqinKq5Bl7eez%2FUAycMTqvywyIVYqF3BpdGvUrSifRuEnp8Szx9OMeMmngRaBhZyG0EAN7t4zS7e6dMLa3dV0SQymJ1DgQJ2X7a8%2FB4aHjFFZpWZvL90tlM10V48kaMJeav84GOqUBwyFMVUpHTUzpswS477rx0CbHr1vquC9w3CyEsmsOUdI5OXd5q9R2U4jvtflhlo2%2BrTZj5zhHgM%2Fn%2BTSL7VDF0Izlpb%2Be0IcMOhs2%2B3kkCkAz4cPm7F8dpUvyCains4%2FvG86Cdae9qiDs1ZuqEkb5hfTzm8j7DUEjZTGT9or7U2lEuRXUwd%2FsS0IA0RgvgfadRMfvEDApMR%2Bq1SCSDipJlOHh8g3C&X-Amz-Signature=edcc1a01e7bb8f384c8303cbf5f720959354a00ab2d4ea0b89608a6adf6e678a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466R2ZI5YHR%2F20260403%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260403T153014Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCm4RuiDA%2FQmrUCM3vwrZ34RJV8xGSvjTnByWW4oGcGJQIhANLKXoFQeThuOmRgdiv5T89z6gLmhdFJQHA%2FPaJ2KdqNKogECIf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzC5fTMRMwEp3%2FuClIq3AOKhrKfzJQlqaiiOCqQncXgnYkO8vI7y76AK%2BtBLgI1DPIyDqa12wInAmkuenMN84k8ieQG1FI%2FibMikXwXXRz6yj%2FoIWUZgbHqWTigBJUOUtv%2B8RtEStxTcxeRNS9Hyq2ElEOwHWvIKAMi2hsijG2TTeTYnipsLx0CrWYOHPV5RJwD2DpRVncV8kAk0h%2BTwePffz%2FKhhet%2FEihEaCXnnC%2FRuZkwSTXKIGxH0NrMQFjNXXH1AgwBfsnZXVC06gJ0HGJvWgLIAWdGn8BdS0TOdub2j5OfziwHkfqsdiCSej%2FytT68aGSWF14qLZp8itWKmYcNZJsDL77Zf7j7xl21sChK2qjBdCppHWHN2gCmeK%2BLAmSETUBGv%2BkNETH%2BEp8qaejrgs8AnOiEd%2B2A%2Fpo%2FRVDN56UjUw%2B7sdxwzPTF64QnV0ZN7LfJaH%2BnpVqVEE1UWTzG7vmUGISIV5rYOcS6q%2B0bcxW1Q1AhpFzdO%2BEmUYotBidBywCot5AaWVEt6iUa2oG9ufv4r6%2B%2BwEF5NJ27RtQYfj3adMy2sG%2Fb4MYtgC7ViYiD6FWo%2F7HVQF6QOyIpAUzdZcUipXiKqOTo%2B1BhtdKYg2ae6Th%2FRYtJ7RhuYDkqNDe5zFOE8CdCWku9jCUmr%2FOBjqkAWM3ibmRDqTYCaUkuU7Hbwc%2FV7yPox1K5xZHQmU9JRUG32VjzE6ess61S6y1VP3QTtk53qd7Ra%2F5BxmZnXuZbqY0TJ0FBXVW1ojWvjKyZfCquMCgMUGoF2TYAtdmJ7znUG73CerXEGtQXwRv9paEMh05zSNxhOiA%2FO6QupUxsiJomzHA22JWhLMZUCK4lqZFwKkDp%2FOXKobRWpy2%2B%2Bq9TG7pW41%2F&X-Amz-Signature=455cd3f41e12d72533246cdee78538942f57293348f70d3fa8dd3c58056788c8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UTHNBK36%2F20260403%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260403T153028Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIFNt2sIaoRGNIHLJaAoLhDw4liE0kw1ec3dP%2B75DcsGGAiB%2BQdhoyurBv3M6ALPg0BMj35PNADGcNAxfLy0ptMXM5CqIBAiH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMwQvbzUk%2B7pQIeCsEKtwDZtWZA%2Fj2N8sr%2FYvStVw6lfssB1S85afUIeJe0bTXgvU1SbZTHmAazk%2BiquzZeK9e7PVHUtXwMQPvfeonspDPuzZYENHGTEuZ3cRKU6qPo%2BVepF4Rba8knoEWU8QoEa8Dsmk%2BeqAKl0F6pmm82SlT4QRmGMSlw7RDqZQcdaDLZdTOQkVi6xcGhZmtuiljHSqE0gPa84jUkyDdXo4HivsbzU3oEFioUB2S1rU2iNOsw5O7JPQ8jWZDFi1PM7W%2B8Hc88k6jO9OnZn2H4FlZxseJVoi6GiC48PowNI9Fftk9Unam3izvKrThUprzL4L0PyoNmOw72gdNFDCfhilTIhaDt5iR8Qw2bhCyRKZwyQda451BTr7qNLO0amhwiPHOVfThhkzK4TXtmjhgtVHurQbqIGfO8RBgOVT8bynW2YgnLtn59LMuEbX%2FZ%2B9ufI%2BWX8gGGw%2BfspYrIJvWT9uib%2BAWUzf1VPmlo9BWSTnueZ0OsFzRskGCQuNb6PTWXEWIcFi6BiuVSJVIECK58kauh6RRexbIZ%2BmX3qQ0RXGHZhoI29DVbEhv5VsI%2Btb0qhfkqKHUJbJr0YPcH0IGwwEUJwD23wV3TSLs6rv%2B6zo9Fsqb%2B11tGT3MCoimnnCNyPow5Zq%2FzgY6pgEKmDhnt7BXotiIxRWwxBrm1NuATHEnezO2%2FbAfidKULCfGd0VXBKCr8wUEgnp6F7DzKDZHxgqviO4GcR3gwB7dNNct05dL2L6845icFP0s7ZEVMeBOzqZvvSl1OrsENIRM2s%2FXhoILLAOJ4CYu4d8y0AWSkBQsW8K0ocxkurIMmmzB7BlFXyrlaeQ9UIK1B6rjj73xuelVNpdY7f%2Bew4hkEcwj1vMA&X-Amz-Signature=36aa5d4d20bf08175376f6c80e79fc74d126a4e7038b15880ff1e9833d0588a9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UTHNBK36%2F20260403%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260403T153028Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIFNt2sIaoRGNIHLJaAoLhDw4liE0kw1ec3dP%2B75DcsGGAiB%2BQdhoyurBv3M6ALPg0BMj35PNADGcNAxfLy0ptMXM5CqIBAiH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMwQvbzUk%2B7pQIeCsEKtwDZtWZA%2Fj2N8sr%2FYvStVw6lfssB1S85afUIeJe0bTXgvU1SbZTHmAazk%2BiquzZeK9e7PVHUtXwMQPvfeonspDPuzZYENHGTEuZ3cRKU6qPo%2BVepF4Rba8knoEWU8QoEa8Dsmk%2BeqAKl0F6pmm82SlT4QRmGMSlw7RDqZQcdaDLZdTOQkVi6xcGhZmtuiljHSqE0gPa84jUkyDdXo4HivsbzU3oEFioUB2S1rU2iNOsw5O7JPQ8jWZDFi1PM7W%2B8Hc88k6jO9OnZn2H4FlZxseJVoi6GiC48PowNI9Fftk9Unam3izvKrThUprzL4L0PyoNmOw72gdNFDCfhilTIhaDt5iR8Qw2bhCyRKZwyQda451BTr7qNLO0amhwiPHOVfThhkzK4TXtmjhgtVHurQbqIGfO8RBgOVT8bynW2YgnLtn59LMuEbX%2FZ%2B9ufI%2BWX8gGGw%2BfspYrIJvWT9uib%2BAWUzf1VPmlo9BWSTnueZ0OsFzRskGCQuNb6PTWXEWIcFi6BiuVSJVIECK58kauh6RRexbIZ%2BmX3qQ0RXGHZhoI29DVbEhv5VsI%2Btb0qhfkqKHUJbJr0YPcH0IGwwEUJwD23wV3TSLs6rv%2B6zo9Fsqb%2B11tGT3MCoimnnCNyPow5Zq%2FzgY6pgEKmDhnt7BXotiIxRWwxBrm1NuATHEnezO2%2FbAfidKULCfGd0VXBKCr8wUEgnp6F7DzKDZHxgqviO4GcR3gwB7dNNct05dL2L6845icFP0s7ZEVMeBOzqZvvSl1OrsENIRM2s%2FXhoILLAOJ4CYu4d8y0AWSkBQsW8K0ocxkurIMmmzB7BlFXyrlaeQ9UIK1B6rjj73xuelVNpdY7f%2Bew4hkEcwj1vMA&X-Amz-Signature=36aa5d4d20bf08175376f6c80e79fc74d126a4e7038b15880ff1e9833d0588a9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667HYFWATW%2F20260403%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260403T153029Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIASZtoLLMpn8tsDecnnXzrR5JAKj0%2FEN%2BVBFWITBibsrAiB91TuDT4GP9EH06aDfLCsdJfsgsLPi9DB1iZ45FwdeRSqIBAiH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMJomSnUKwPQrg8PJSKtwDEdwcTX7tFo%2Bxos6RcEIQE2vR%2BoRl0QuWJl9lkFJx3%2BUG79irLibLGpXf67R%2B8RMk7B9tFpvyOjTmRvOr5n52pe%2B%2BQGceRfUH5B7q9yds%2FS5gBlPjEgyo59DU%2F1Lnb0KTOPL6eF%2Br5CVnJYkqIn5lByfdk4adDjmIQRfEtrHwyk1QOSufcnhSSkP2SjaKJer8GJez%2FUfySSgzo2d6lWWj4nucZwn6rvlcYkg7U%2FxXSISTunUva6S9sgeymQjPnLDO5dEiCukprSgh6TBLssY85N4RzYClo9adtgRsajS8fpVKlLrI6TOBMACBvSaVu%2FYetdWcatUekWYsqdt6kWHnkuJiSK5EEfrN2kvk0F3Ye6RjOgiS%2B7qMLSdQgBD13Cpyq%2FBJYxi9p%2BgU1SbmDFD6%2FutoqqHNN9hOu5iskn%2Fnk6UyaFq6VhNB%2F7JEQp8L7Nq2mYJIgNXgq5oQUh4SFx%2BodWsSNK7%2FQbIdcbA2TGwXF3Mm0SnwdkQ%2BQIYpX5hJM3bPBgQonqi78L0pMgEadTCDkv16odvMjE57ULs7G44xxyHIcLtKW8ru8RlwpUlFkSX2KhtU19QKSEzvXdVhEORBDQbiKRaT3NAu7tgFZbatjSDIPtaETIRmpzbfcaAw%2BJq%2FzgY6pgELXmVKjVti%2BhVIQxVNtc0hHhSogrKmXAzGi%2FgLg0X%2B4usxgD9SJCyUoQiULu5rtHAm%2B%2Bgkzh8EUWZwh2qhIG8OzUWtsoEL7ao7vIzC%2F6wDnUaj52TQcj9pklsYzTFOc9jFwiOJBzPTX%2FB2XdnObD9zAbfPkvaed9tVizydi9gIyL8pzRVNbPKB8HWw8DJSKa1gRZkrVh%2FydLqN1%2FbX6oM57YqtlaB4&X-Amz-Signature=13b8fb8da549208e155cd89d178a5f9685b09607c14a9f6f3ad275150b3abc74&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

