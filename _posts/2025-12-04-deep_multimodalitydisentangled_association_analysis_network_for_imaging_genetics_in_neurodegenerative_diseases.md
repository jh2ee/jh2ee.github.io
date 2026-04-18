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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666AE7YYBY%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T060417Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBkaCXVzLXdlc3QtMiJGMEQCIHMx5kiLQ65XLP35n5SGiPtz4WfKUTG%2B%2F%2BUVLJFUe29HAiBVEN54%2BVkQaAXh%2Bu6GQHMQ67qPQHY8h4hHuzcIyEuLDCqIBAji%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMBk9urqRvdor1RlxIKtwDiQgvz2LG57jyloKtMnAtGTPFo5fyZQOWYhlrMk1KF05P5DQRwKe3Tqw18WYFM8XBE15AWlpDSrCWQrNqcaXRZHDOTtXeUqClHtAns3c3MlWtSBpeB6%2BMOQjsJFmlAH2WGEoOXNj9Y9HQF3SqWRHqKtUVTbfNMzluomqVivDBaULcTUos4Cc49E1HFZM%2F%2Ft0qma92%2BVq%2F4RkH0yU5tyyjTAjUvZ8lCs9Ae3s6el9g5IoDoAHPyuUNEz5NZB3RkHJ%2FSXTSE%2BaTgykeb5d%2BTl082s3BplnzOGk1llmK8I%2F4p5o%2FPNzume2dGIjglHaKn2W3tCJCBd0ikZtC%2Fd10OmJwEiR5Tvr%2BzM0GknS%2BMWqKI%2FShuvcogU12KjRWvHr6jIX%2Fv9%2BrfuM9%2FDP8sz66zC1mlrJXD247hVWYhCdN0mVMh19BvewOPK73xKdzEe%2BRhgLtpK%2BbeDy6qXBB5UTTdaGjaENQRSpwGkd2NP7uhsTE%2Be5hLvdY6PD7f7kU70KomxW8mfdsZmSEJbewHknafpWKNJVRH5Zq7NsVqKoyNg6%2B9AkqFjYLJ8JHf3cIg1OHnvDJsDOuDSLIXo%2FVEyYyFQkZcH0cOJilwYRuZNRZU0turO%2FejIl0SfC87seZ8qUwvbeLzwY6pgFrGUwCa02k3xhunZTzA8FyhldCr0ydUzdGrnDwr2phaKE6uQVzelQ1oPj3WyftNAOsS9O3Ad0LccEPdrc5gtULje8Vc06UpzNLpSYcvf7F4BNQHmvKgZV%2FCeD%2FKtfxV8mVepOZpyohUjNIg5On7cZ6%2BmPxfPbtulBZP0sSfIiaA%2BWrW40h7YlR1hxdWsoiBqMmGK55E11e7IPBGUn8BzSQ94Anxli5&X-Amz-Signature=23be26ccebb501fed43ea55c15b802e6c4a5f9788bcf04f86b9668ddc917e7e2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666AE7YYBY%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T060417Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBkaCXVzLXdlc3QtMiJGMEQCIHMx5kiLQ65XLP35n5SGiPtz4WfKUTG%2B%2F%2BUVLJFUe29HAiBVEN54%2BVkQaAXh%2Bu6GQHMQ67qPQHY8h4hHuzcIyEuLDCqIBAji%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMBk9urqRvdor1RlxIKtwDiQgvz2LG57jyloKtMnAtGTPFo5fyZQOWYhlrMk1KF05P5DQRwKe3Tqw18WYFM8XBE15AWlpDSrCWQrNqcaXRZHDOTtXeUqClHtAns3c3MlWtSBpeB6%2BMOQjsJFmlAH2WGEoOXNj9Y9HQF3SqWRHqKtUVTbfNMzluomqVivDBaULcTUos4Cc49E1HFZM%2F%2Ft0qma92%2BVq%2F4RkH0yU5tyyjTAjUvZ8lCs9Ae3s6el9g5IoDoAHPyuUNEz5NZB3RkHJ%2FSXTSE%2BaTgykeb5d%2BTl082s3BplnzOGk1llmK8I%2F4p5o%2FPNzume2dGIjglHaKn2W3tCJCBd0ikZtC%2Fd10OmJwEiR5Tvr%2BzM0GknS%2BMWqKI%2FShuvcogU12KjRWvHr6jIX%2Fv9%2BrfuM9%2FDP8sz66zC1mlrJXD247hVWYhCdN0mVMh19BvewOPK73xKdzEe%2BRhgLtpK%2BbeDy6qXBB5UTTdaGjaENQRSpwGkd2NP7uhsTE%2Be5hLvdY6PD7f7kU70KomxW8mfdsZmSEJbewHknafpWKNJVRH5Zq7NsVqKoyNg6%2B9AkqFjYLJ8JHf3cIg1OHnvDJsDOuDSLIXo%2FVEyYyFQkZcH0cOJilwYRuZNRZU0turO%2FejIl0SfC87seZ8qUwvbeLzwY6pgFrGUwCa02k3xhunZTzA8FyhldCr0ydUzdGrnDwr2phaKE6uQVzelQ1oPj3WyftNAOsS9O3Ad0LccEPdrc5gtULje8Vc06UpzNLpSYcvf7F4BNQHmvKgZV%2FCeD%2FKtfxV8mVepOZpyohUjNIg5On7cZ6%2BmPxfPbtulBZP0sSfIiaA%2BWrW40h7YlR1hxdWsoiBqMmGK55E11e7IPBGUn8BzSQ94Anxli5&X-Amz-Signature=23be26ccebb501fed43ea55c15b802e6c4a5f9788bcf04f86b9668ddc917e7e2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XOHZO2XW%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T060417Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBkaCXVzLXdlc3QtMiJIMEYCIQC9neRY1aqkfSiKmXmAButPVrV1pktvqWcELpyq3urDHwIhAJC8BKTA8z4BAwZ87TZjxM9XbOMZSjNwNh39REXNKkOeKogECOL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igz65gyisrUhYdSQI4kq3AMzGDvkb2eWpXWcezeSWltiRSCWYz%2FcfVkyTRJYvgIZYPZsl1cAajSkmxvZDGBWuToLlEYoeXqT%2FHungXxPckSKCVWcVmNMzYSaoSDT2l5%2FQDTrOGG9IqDp9jAHE1TH3qIY7WImHAtSCOXocaTWxPSnADe5AJCVP25dRPUqvfB90Ba3rZcrhr0MZdSB0twjW7xEaeQIsged%2FujTxyuErRoceYz2Cc82rGLzd%2FZxb%2FvaR0z7qAKteyO2n6sAKqSpdzKXqBKv04EC7RidiJecYiUw1uRke5HpzOPFpKGmgqPYR9fuvDdFWsl7mt3%2BMjv98xe0cH%2F25ftsEeX7j%2BW34KZzKukgIqFKH7Re3hJvow2SqUwwQdcq81ixAkEAJLnUsxR8kDGIdkdwH2yBadS31beQGF5pIR3EtcZJRLAMNotyAg3T9egcDGL%2Fi9VbCGYVBR95dE7Q%2B2bxYbQvnUyZA0%2BULw9H%2BbmRQ3hTE2TwQJT2H7sFxunbi3dA2vVBRKbAGUEuT3GwNpy93oSTkvKzNYDOBEMukQdKvpWKweVv1FfVTl8bjTFwil%2ByrJmp0izS0fSNOhmjq4zxdh6AUVRQKBxE8T8HQk%2FZ63AuKoHaLTl%2FcoVTmTwauUY8bZzHZzDGtovPBjqkAbonAqkviKjfG6jqEJbIvXZ7kXippQi3r6WaM1HqPqxg8f8gN9H9V%2BDt5XagyxMllJ2QaZ9x7NhaLFSIFbsrAU6cAN%2BZyVGC9rSwwOfjFdRHJ6wkccvHLFgJ%2BCkCpMZ8WHUJ0QtVLYNO8xl3QMQTaOGuEHcjp3xHFUKZicXs1fqVD0PHpE0ZK%2F%2FL2KWCoY0ZfZbbFENEivYAMwKbbmEa5ibu4SJM&X-Amz-Signature=110325be0e93a32fdd32d7d516d7f499f554402ddf57e49f3798922752905e48&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667BQ3KTP2%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T060418Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBkaCXVzLXdlc3QtMiJGMEQCIBQXj7Em%2Fn0rSbQ%2BOpOKX0TR2kzk0fHbtiKMXq0gGAgDAiAgkTmZa1MZ9Efj4xQccQbe7izvTNBKVh%2F2a5VGEJMdASqIBAji%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMxKKYqusIYnzmeePdKtwDMfoIjkz%2F3syGheBV2gqQ9A6%2BUiiebqc1ZxCTXSIpmrFZzmGrGMzKIzQxgUXoxzz6%2BpaNH2xbGQmtd2ZFzAlhh9jTxbNW4l8Qx5X1xM7TaGcXXEzebs9yd92eOmvmkqjzv1Y9ZxQ23xd6vIIYxnKhtDM8x3yGikliDVWgkHZAXYCtSyc8MmNj007woZhZXreLF%2BssJOm86FNcWcwDJrv1HX9yDN4YMrj36jkVrZUwjY%2FWytfg297wUZ945Urf7LEbrTVf%2BFaN%2BnUjB39hSRfu11CfqTPQ0xb%2B4V91s8LwGfYXadAXmOzJ1Dl%2BjVkrl%2BCfrKiwHikqIByaKOg9gxv7ffhfbfb1p5K%2BVbD1WTJC0PyqBHqzKyQCZSvzchtJya8iVG1DUhnTBT63rIaBASCehgjRuuDgGZJ9Fbszd5TCDEzDcyZ8UTgutym2dzxJvVjaOmvBZgbfH8nqA%2F1xFPFIbsHRKQw9pgX2MRhdZ4fyAYZYTFdmQ2bDdyaLkmONWN76a1ZQRvNOMa%2BCF9chbB1%2Bsz673oJnE9c7VW643B%2BAcKk07H%2B3GzYKj1hashWly7lUzGtrqO5YoRfTgGVEXuTN2GMYwLhy%2FW0%2Fm3zl4KVPKSI%2BpD09QKUsWpvhWf0wo7WLzwY6pgERWMX3HyCXx%2BdqHa1WfDadXfOYBsMTliOWy21kkcfLw1jvRpOs9wJtwuEx1sX0Ojx7kDr3X0ycl3VE959oVN56NKKAd1nNexw9y6tFAm9E23Qyd7avx4OPb%2F6cI63wUEl4q6oDKJ%2BfJlYjxmjiFasAB4O1J461OcbOeOXxBoGLt5M5ayR9rka9LVteWKdinuD7ODhpQfzLT%2B3KID6A1CyJMyNX26N%2B&X-Amz-Signature=096e44eb56227bdaa85b589c80e7a983dc3a4c5dd2032e14e064366749ab6e61&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667BQ3KTP2%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T060418Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBkaCXVzLXdlc3QtMiJGMEQCIBQXj7Em%2Fn0rSbQ%2BOpOKX0TR2kzk0fHbtiKMXq0gGAgDAiAgkTmZa1MZ9Efj4xQccQbe7izvTNBKVh%2F2a5VGEJMdASqIBAji%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMxKKYqusIYnzmeePdKtwDMfoIjkz%2F3syGheBV2gqQ9A6%2BUiiebqc1ZxCTXSIpmrFZzmGrGMzKIzQxgUXoxzz6%2BpaNH2xbGQmtd2ZFzAlhh9jTxbNW4l8Qx5X1xM7TaGcXXEzebs9yd92eOmvmkqjzv1Y9ZxQ23xd6vIIYxnKhtDM8x3yGikliDVWgkHZAXYCtSyc8MmNj007woZhZXreLF%2BssJOm86FNcWcwDJrv1HX9yDN4YMrj36jkVrZUwjY%2FWytfg297wUZ945Urf7LEbrTVf%2BFaN%2BnUjB39hSRfu11CfqTPQ0xb%2B4V91s8LwGfYXadAXmOzJ1Dl%2BjVkrl%2BCfrKiwHikqIByaKOg9gxv7ffhfbfb1p5K%2BVbD1WTJC0PyqBHqzKyQCZSvzchtJya8iVG1DUhnTBT63rIaBASCehgjRuuDgGZJ9Fbszd5TCDEzDcyZ8UTgutym2dzxJvVjaOmvBZgbfH8nqA%2F1xFPFIbsHRKQw9pgX2MRhdZ4fyAYZYTFdmQ2bDdyaLkmONWN76a1ZQRvNOMa%2BCF9chbB1%2Bsz673oJnE9c7VW643B%2BAcKk07H%2B3GzYKj1hashWly7lUzGtrqO5YoRfTgGVEXuTN2GMYwLhy%2FW0%2Fm3zl4KVPKSI%2BpD09QKUsWpvhWf0wo7WLzwY6pgERWMX3HyCXx%2BdqHa1WfDadXfOYBsMTliOWy21kkcfLw1jvRpOs9wJtwuEx1sX0Ojx7kDr3X0ycl3VE959oVN56NKKAd1nNexw9y6tFAm9E23Qyd7avx4OPb%2F6cI63wUEl4q6oDKJ%2BfJlYjxmjiFasAB4O1J461OcbOeOXxBoGLt5M5ayR9rka9LVteWKdinuD7ODhpQfzLT%2B3KID6A1CyJMyNX26N%2B&X-Amz-Signature=092ca5815759783573d854ca98c8d761167c76afb20747f3bbbf865f1e84f0ab&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S3KFZCWR%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T060418Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBkaCXVzLXdlc3QtMiJIMEYCIQD9ersNqon%2FZNHO%2FRyr7MkWYdQ0R1Px5hPoBGwxVCQBeQIhAITFNWKZCxGvBrCdehIzKdrKkENueXLgYItQMF9VCWcpKogECOL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxxjdAVWhul5QwzQEwq3AOk1bWInc8pWwk1AIJxWhZhvQgCa%2F%2BPtUvMvc6oF3IWZJKV9PvXK%2FhgUkHe1K6D%2BxYNhBR%2FAz3xB0PBPGMzvAc1xVl7%2F%2FWG1YtH%2BIZ03exn5mH5QvKGbJvd3hg43jD4L4sMXUNDhKvyVQaN6n8RbtxUJiIoCIn1WX%2BKs%2FVo6EUUGonTBEOfgpqDmWGP%2BNdipg7qoDLSjM5GvDIFxWs1ejR5OdIGbggNWVRtSOmlYGHBVPJGKR8GS8403wdlV6hskPjlsNkQjf4LmgMXIQO6fPBZ2aSwKS%2FUpEY4H6AC8td2VVgWzGMOQGSpv%2FohOdSV%2FPWqHbL8H1h9dp4omlV%2FT%2FznHHy1A3qQke0X9YQ02ynCYzq3%2B9JU1t6WUfd9BsMkjLsibB9PBpJXZvegWi0nl0Btrq9N88JneJPvTOqG7pd8GB9vboAR4mComkvP8iHpMUNR6dr2e%2B8M7HhK7Dq8qN2dvbeCoxhy%2B2oSCDWvNiQf4fENXKNL6Dxg2%2FXdQE79dfPvOdnJZ64rbZIclG1jJgcxsymaOVOYMkJVX5O09l2nzR7TojBU3ieUvy3IVzOVRgw2O0OgyTQGYaWZ8u4FijPPSzYLMmJYFHzPP5gdlrBfqz96dL5IleTcA9GE8zCftYvPBjqkAagqwKV2%2BLVSAqSKpCIj1sTLv4FJxYRy51v7R%2FF0xO4bGpdqejvXuvjugknPt8a9fd0hkEbeFaOHAlQ2iPoAQA%2BC%2Bjxmfn%2FUW23LztuXyTrHS1DdfGWQRkpi32EbNX481cw8hAFARqo77Ptg2qhj1CFruKAiJquRl%2FdOePw3vx7XON68CMs52vvmEAXIy2z0KfgTqTu3sVgSjAc5UzwvnqTTAGSI&X-Amz-Signature=3a4b7ac212b6b6bb9d36262730da56eaa07527cd54888664a4d66c8af710dd86&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YCPOSLNT%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T060418Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBkaCXVzLXdlc3QtMiJHMEUCIE3qMaTu3%2FtD30QWYDT%2FkOLYpm7wdHgMD6jaEBH9LsacAiEAwhohAYF%2FK9ty4KXi9%2F1DGYrezjiHS4AYWS3kGfVYEU0qiAQI4v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDGQNjRk7Hf3TO6uYQircA0nApaae8NvItGK7Egvh1anc72Rw1A12czFX%2BEJ87l5Kq3tuoOZBN%2BCR6iPTNr5yV7CVcOCfRZ6IVVMZJ4ADC8remNR4LpLjImQ5qqWb9DufY87TaZXzq74pU7rCmvHr6pwDF7glB%2FAS2XukRE5HfFbhFgHAn5vKbCMvmatMLTXHNU9RQuhxLsiaSJeXLknYNYN9nphjFUmQBl7FVMgQJNVwyyJjEIIiF92bSiJ75qnpyrO8pNXWb%2FBA548hRD%2Fl%2B3zFtkbCQpNjJ0vrGT2KPoPMv5x0AMctCnd47DEtE%2FJXE%2FiON80UP4LSUr11bD%2FcHDdHF8ji5jPbM70HjdMVX8NJrA8hp1AFd0Z1NeIZ3eru9tdh91KYNopmxGl9NS7RgInzJ4vSMgQC3B2hwdS6pyP1Vm7aIJ%2BJSvDSoj4bliepraNpwUDIBuaaNShoGB%2BTfxMn73SmRsbUYL4uHxOfjpSt0HYK62bBpakd4cct2LJICKg1UE9mRNC157q4%2BYcBk5jbn4WW863yVhSwLN1UuGzqpeKeUc%2FF6qgTeWeaxwVLGr1E9S4N%2BcKD7A3KyvV%2BSlnfOZbED%2FAzRZSgkQTdqyl9xGLBxAgHVF9NjbomZBHBE0BV1C%2Bozv39ioTVMPq2i88GOqUBkFfF2z522JWe6Gl4KJ6VhLY%2FQxAN%2FsZanbaJKnLmQgTqUYDklBDk32eDaUNNpcJzakGIB9lBYHOUTVfz7Kk%2Be1JBl4FfsOjs27KIYyX3xiVtwPXoKMMA4NHF%2FV3yjWaQPQ0hMGpvjtrtnQNHtAJHT9ig%2FlVPdALUS7zJPtYB4xkBRfKxepJizhvCcKB2y%2BLKbRKgrjr0dRZo7mZwxuaouFsopcE8&X-Amz-Signature=b3d0c5b8977ca4b15b4b16c901bb760cbb17a394a8f8cb8aaab19c5d7071e8f9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663XK5ANXY%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T060420Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBkaCXVzLXdlc3QtMiJIMEYCIQCwr6nCWXoG9rw6QzoWZcKZl2sLhmQAUt9WwiLAvXVwuQIhAJLlQR8ey42WnrNWrAbzHYkn8llrm3154XarggZBKKv1KogECOL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyxtLOWuKqWY97N7agq3ANU3YzobWcSxRodqPHNVdMzLgUQkutIILGhkMC3Y7Pru4CyMM8BxhE4LS065slFOeszZzGVlsEyC3mYdwSUW8vz%2By0yl3j5H3%2F%2BTuoeXdlAK2r6hjyWaICc5eYD8xGZaYcZy1lx8W1HW7qvFAEH2z36S2Y8ca6Dh46k1HaMNd3iI%2B3qt4lXo2BOoUEIeonqGtTbqiEjG1B1a0FlTcTMn3UeNmWX%2F3GMr71O%2BN3HF33G5GYr9enelMfOcSjEVeZKt0rnXuQjTJHDfiqoMjw8%2BAlptML6%2F6NoE192lymo8EVrF%2Frc0nCX26x93GCQuk5LXzefiRB59MvqewnsMBNdXpSIzje5BfiwCV6sxyqQ%2FyVA%2Fuk1IBVs398RmgRVB68dBjnlYeH4gVSa9suEc3qknndbkz6gtBmlQ9apIex3YF%2F5Spn9716YCgSUuMS6GqLueWHAKRGa3rhDLIsEzm1l%2FJAb7LItQFATg2E9qpbtMIKv4AeHcDNV3tp6w9Va4zClNSOR2tV2BRshRqivZ6cwmRVgbYwhM75Z2eR72eJ4NgMHkGsyGM3MmdV69bUyYLsRyeSUd6%2FMQEAdWRQtBp69lrM2nAWlGnC%2F5LIMtjlTQxNKhN5C6MMTGqwsc7FsLDCQtYvPBjqkAUWd1bpRw9X2kyEXpWSNnULqcL4wX8Cg0vP7C0pSFLg3JwNGx3eOvPWc%2FNmGxuh2oFGHmph74FnifPu14CliHu8ikeWsmFNTpWVzL3Su89xw4jcINmleUKXK7%2BdoZdyWZNBF8hdD7YNeMxAZncBTG8MMarcHGIKLK67zMUxKH85dc0nURZbsxSoLrZfvAuc23XE51eclsLPRjrzJyNVMW5OkRa%2Br&X-Amz-Signature=7aa27a0542e92ac840b738179706fe926d8b240a59e8033da7823164625a85a2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YELKK6GW%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T060421Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBkaCXVzLXdlc3QtMiJGMEQCIGg1TmAIJmcP19nDOU8DJsUryoJPx89MU0x%2B5HCgQOcSAiBC9F9HO7aItHdF20Am%2Fs%2FlWwDyVDSENFMN7Q3QZfESiyqIBAji%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM8fGIyB5dlRSCD0b8KtwDXsrnvsVJ8CdXrscxKGGE06ZE9otPBt0RwY43khonk%2BTvCMGiAJRjsW4P4enW9fwHze6K8fULyA%2BLmGWMMkcBQ0d6PSw4oKynfaIR1W1yyuTGWcxZXOVrrvjeExIeoZjcW0f1duP2uUCKys1KO5P57gx66BgQTD54I5rlrIRqHqR7sknMfq1MGH%2BGQ%2FdKRCEQTEhFl3xV37kwEinbGIGj9kg7jYLuQFhcIq0rH19AxwgelvvJQsgcVi2keCkBtbUPdsbVUW3bnwZR3r%2FgzuZYNgBuMuBzaiDbCC9oxo%2FLDOIFp9eXHsCE6f5ndr9NiHOeYoe25fJJGv4cYI9bi0n0GfHYcZN6WqN%2BaOZ0M2OYryXXpqYrCsE0GjxQStl3BorkvP9VbBHZudEBJAw0%2Fvb1N6DKL29%2FQPUkQZ%2BOq0WhUOIrgP0aqok6mOgGZa%2BWM0ct6%2BA5UJSOcoRgv9g8oNZhBwNRmpL5kwL7zpy8cKRZBRByh14N49TQNDIaBDvQm8D7YTiGGFOaQFiPzS1AeqC43tOOZHXvQgRdB01sCcmyDNuvWw6PYVinUnOWzt8TRVDSf6u1MbChppztbHxBMrz9Hv0xAi4sSbcUJNqBddeBwQoRw%2B38aeZGeIp3HTww7LWLzwY6pgGE1lI8%2BCC3w6h%2F7e64bfJX3DvUeeaP7lCzGsfs835lXmUCviVx1YwootdITHwDnvTi7Mow%2FvVnFeGbpqfe5ZHXCaoVyc8q3%2FhJb4TVXup2FjF%2FDDeG7CCYkDDEt8294EowMQlHT0qSdbZUKK8VohrruPafLwj3%2F7nekXUrdhwBCfbjs9JLLGYGY1ffgMtfkW5EXuXz9%2BPLYNimdjYi1CMoN0ZRQ8rR&X-Amz-Signature=e6535af52343a5cacaa666ac083db4025f762dd33d583f448a9bfb0b4305987f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YELKK6GW%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T060421Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBkaCXVzLXdlc3QtMiJGMEQCIGg1TmAIJmcP19nDOU8DJsUryoJPx89MU0x%2B5HCgQOcSAiBC9F9HO7aItHdF20Am%2Fs%2FlWwDyVDSENFMN7Q3QZfESiyqIBAji%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM8fGIyB5dlRSCD0b8KtwDXsrnvsVJ8CdXrscxKGGE06ZE9otPBt0RwY43khonk%2BTvCMGiAJRjsW4P4enW9fwHze6K8fULyA%2BLmGWMMkcBQ0d6PSw4oKynfaIR1W1yyuTGWcxZXOVrrvjeExIeoZjcW0f1duP2uUCKys1KO5P57gx66BgQTD54I5rlrIRqHqR7sknMfq1MGH%2BGQ%2FdKRCEQTEhFl3xV37kwEinbGIGj9kg7jYLuQFhcIq0rH19AxwgelvvJQsgcVi2keCkBtbUPdsbVUW3bnwZR3r%2FgzuZYNgBuMuBzaiDbCC9oxo%2FLDOIFp9eXHsCE6f5ndr9NiHOeYoe25fJJGv4cYI9bi0n0GfHYcZN6WqN%2BaOZ0M2OYryXXpqYrCsE0GjxQStl3BorkvP9VbBHZudEBJAw0%2Fvb1N6DKL29%2FQPUkQZ%2BOq0WhUOIrgP0aqok6mOgGZa%2BWM0ct6%2BA5UJSOcoRgv9g8oNZhBwNRmpL5kwL7zpy8cKRZBRByh14N49TQNDIaBDvQm8D7YTiGGFOaQFiPzS1AeqC43tOOZHXvQgRdB01sCcmyDNuvWw6PYVinUnOWzt8TRVDSf6u1MbChppztbHxBMrz9Hv0xAi4sSbcUJNqBddeBwQoRw%2B38aeZGeIp3HTww7LWLzwY6pgGE1lI8%2BCC3w6h%2F7e64bfJX3DvUeeaP7lCzGsfs835lXmUCviVx1YwootdITHwDnvTi7Mow%2FvVnFeGbpqfe5ZHXCaoVyc8q3%2FhJb4TVXup2FjF%2FDDeG7CCYkDDEt8294EowMQlHT0qSdbZUKK8VohrruPafLwj3%2F7nekXUrdhwBCfbjs9JLLGYGY1ffgMtfkW5EXuXz9%2BPLYNimdjYi1CMoN0ZRQ8rR&X-Amz-Signature=538cf4266769d34bd65b1814184205fb99bb8e5d1dcf79294362300fa7c6e8e8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U7ITJPCM%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T060414Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBkaCXVzLXdlc3QtMiJHMEUCIEJVWr3FXHrysiZgCBQLstmF%2F30%2B2n9mnzgQn2wCQMQzAiEA3cVVd86BJA1b52SU1gcyNPq%2Fu22%2BkBt3NKoVxcqQs4AqiAQI4v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDJ4iJauFuNSdxjFQgyrcAyEwo6XDDKA4osyEIIfIcSfqFi7i6wCN6VjwIknyfHe5FS0dS1ek8xDd0RSb2jWnDaZFlKin%2B%2FEcIwTKwrDO%2BdLs%2BXvReP1a%2BF9biWQuJXNOBXzFZ4O7Y1%2FGqLmJD7dVMBcqhl6MbSelvuMrRcETJ5FMh71DGLXLlAPn5Y7guru5bwfOOiT20mHFUolB3t3nwJuZf6OTCJF9092j6bXZG8lcKrKxiUrXxhOuGuSwtgzbC1BobzDV3kVH5abgsd3BsWhOlDauNuJVcqiB23L0PKSTLqsanuqhZTJozFh22LIIHOStUzMIERwbnQ5KXpk%2BrhnJuxp8DffX3VhMgF%2FdNfM9%2Bk4RCpiROJcmteEtCDrwVY8LlMB8KB5OFqFh6IuMJI4e9Yqq1VRW%2FEtsrLTm%2FtEtsZbokfRKMRJzay80oV9GBrzn6RZ1mJMGO%2FqTaLZbXiRpHwxfcjiP%2BvQQWlX23iVEpymzK%2BCHPJMkYjch3e%2BYQ1glSOfUU95YY5PyFWFv1ip15GfkVKeADXx89nFG56U4IHjhibaY0PeVxKtRhj0LcQIT812%2FUMHrg3vVdy4eopnfj%2FbwC2nF8xSlSvKURhrSSj1XyGkS1LhVKd%2B8FKZjCb2gOPNAEuSaE2skMM20i88GOqUBx4j%2BhhixRaXQsIQq1lUiW6noKR%2FcGbdZvkKWphXgTGjlHWLoB%2Bjv4M6CdEt7v%2B3CFMMEuwyvMhgHvVt%2BACZsmXSBMtuEEZg5QSBFYB3AOisCZNwg1s3%2BkbdJ80%2ByCIhgNYpISurDXy8npX90TKQkhdGnlJGifXGeMLJQUnSKD7vLafa5u85r%2F0zV51na32ZTw6etSQKULTH6mhbyXItCe1Iv%2F%2BSY&X-Amz-Signature=6581550fbffc1e16ae6d230e4acacce8531682886f8f0f8b3e9f790889a7e247&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZGWF4BFW%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T060421Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBkaCXVzLXdlc3QtMiJHMEUCIQD0ZaytU4Aqnr8XNjENNPQWMJLXp%2Fa6bl%2B5BCG%2FkA%2ByYwIgOayYvN8S6aGAQwKnVlXXDNY8WSLuHaJbDH4c6dl9aZMqiAQI4v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDHkAXb77w4VZWY0mZircA3YjAYb4iEIDqfGP1YSDeaE%2BbJXOQZyzKDxqyrHHjUdXJ6jyHfdYAb8MmNV0C09kGGJaHUW5JILOIBq%2FaSBXRNl6Uz33IoGdzqMBk29RhHrV53C9GCKD80%2BeORT9%2BlNDH06lkj3U4qNCj2KBLeO11T9774yehit4TTcX26hQqxkVViyEpm%2Fk%2BRwQ30NWj%2Bm59LJY%2BaqSEw6jgUAhIkacy5SFzf0JsVK7Cs4OT%2FGBUj8%2FNszLPTDcv%2BvpWCAD7g%2FjuO%2FCyzvb2cNPLM2LvVe5Sv5kM%2FRiRiPkXcmoVppTvtGYI97bPomUlvl1r1JWKoFKlWzo6e9C5Mvviq33yHCQt0GL%2FjV%2BnNsUPUAJp5mfL2TAhz3Pjm5eAjVCKWDTpgF%2FGh%2FGT16ykMa3nS9W9J%2FFs3kZtzX51ZxuHknS%2BXqIRz7RMQ1YBXX%2F%2BP%2BZKPuffmeQg%2B9He9%2Bj23%2BFkqQuIyZqnIVG%2BYcpw2TX8DoyH2Sg9tYE%2FLGN3nQdKqo7Y8dM%2BFB64UXCVXaNmUw77sSkEzyvVlDTtAkHIrwc%2FOyw16JvAQQur3wCxf0SXDIPcZ0XBStuctbiMCFjnJX4nakeGbQo1jplOnQnv5cUdXTrUrc6nVAsGqV2X6TeIU2XI0APMOe0i88GOqUBRxgwGaiGkMOSkgdrwm%2BxTec8KE4HDtFpvh7JdsJWaL%2Fg%2FDFmy5GDjUWOXp0r6oL7OMJd53sdfAL%2F2a49FIoRUulMVbTiBMptYBBLcqc%2FegJYLFbOMvsfCEd7Z7DnhmKxaHw6JbdzgBInHVj75mzLRZpf%2Fac1t74PUxycA6zIyFffsVcpEH8gv3CBmndOvAhEVBlrIuIa98xof7RMxJuCmj260mxf&X-Amz-Signature=158a0bc758616794f341c84a2f58c617d08f0b93fced8b7e741551231534e060&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZGWF4BFW%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T060421Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBkaCXVzLXdlc3QtMiJHMEUCIQD0ZaytU4Aqnr8XNjENNPQWMJLXp%2Fa6bl%2B5BCG%2FkA%2ByYwIgOayYvN8S6aGAQwKnVlXXDNY8WSLuHaJbDH4c6dl9aZMqiAQI4v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDHkAXb77w4VZWY0mZircA3YjAYb4iEIDqfGP1YSDeaE%2BbJXOQZyzKDxqyrHHjUdXJ6jyHfdYAb8MmNV0C09kGGJaHUW5JILOIBq%2FaSBXRNl6Uz33IoGdzqMBk29RhHrV53C9GCKD80%2BeORT9%2BlNDH06lkj3U4qNCj2KBLeO11T9774yehit4TTcX26hQqxkVViyEpm%2Fk%2BRwQ30NWj%2Bm59LJY%2BaqSEw6jgUAhIkacy5SFzf0JsVK7Cs4OT%2FGBUj8%2FNszLPTDcv%2BvpWCAD7g%2FjuO%2FCyzvb2cNPLM2LvVe5Sv5kM%2FRiRiPkXcmoVppTvtGYI97bPomUlvl1r1JWKoFKlWzo6e9C5Mvviq33yHCQt0GL%2FjV%2BnNsUPUAJp5mfL2TAhz3Pjm5eAjVCKWDTpgF%2FGh%2FGT16ykMa3nS9W9J%2FFs3kZtzX51ZxuHknS%2BXqIRz7RMQ1YBXX%2F%2BP%2BZKPuffmeQg%2B9He9%2Bj23%2BFkqQuIyZqnIVG%2BYcpw2TX8DoyH2Sg9tYE%2FLGN3nQdKqo7Y8dM%2BFB64UXCVXaNmUw77sSkEzyvVlDTtAkHIrwc%2FOyw16JvAQQur3wCxf0SXDIPcZ0XBStuctbiMCFjnJX4nakeGbQo1jplOnQnv5cUdXTrUrc6nVAsGqV2X6TeIU2XI0APMOe0i88GOqUBRxgwGaiGkMOSkgdrwm%2BxTec8KE4HDtFpvh7JdsJWaL%2Fg%2FDFmy5GDjUWOXp0r6oL7OMJd53sdfAL%2F2a49FIoRUulMVbTiBMptYBBLcqc%2FegJYLFbOMvsfCEd7Z7DnhmKxaHw6JbdzgBInHVj75mzLRZpf%2Fac1t74PUxycA6zIyFffsVcpEH8gv3CBmndOvAhEVBlrIuIa98xof7RMxJuCmj260mxf&X-Amz-Signature=158a0bc758616794f341c84a2f58c617d08f0b93fced8b7e741551231534e060&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665M5XVCEN%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T060422Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBkaCXVzLXdlc3QtMiJHMEUCIQDwYSqXm38CMj6zUrgCe5kOLpqcOH9PPlaX0IcMDDT7NgIgb4PDK5ZvaTpOYf6oJLajEMxomy8XaaEzEFyPtIDVA94qiAQI4v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDGwJvv%2B7hg3N1ezVlCrcA5pexio25eooG0mnX2xjzmviJMEkXR12uD3wSNKCokRto9zCR2JKWtdd%2BQId4FNv8PwWsyPE5i8xU1%2FZsjIxLE5AXdmXHKkx3nhrZTl0IVfat2DnaqEMgtLY42HHCqy6INmYFp35e79%2BiNBlRGlMMYWTrOq5xYpkU6HwT41wYVuS7cfOO9j1ZRJtDJb5lI62PhHgXopDtm%2FWi26rBw0bJcyvnOpZYq%2Fp24lC0CUt9HEARr7RHgNtw8dYe4cKMavhNrllK0GRfuf%2FJPxgtHczUzphkzkflTxAgur02yYlitJtPaL6cDtXts5FXIcxquu%2Fr1hzH0%2FNnXdiZeNihC0FKMDHYZ3qDCmDkDYHiXXz6qQSm6hnwL69sk9ei75nhlbNOUeFuI9KTwsua4x%2FifXSkYbaCE5ae5sKODuEPwhn%2BS7MkXO5FnPsLtVdPjiJJitu2%2FjU7oGaiEbbrELAEmZa3xHEK%2BZ%2FsX%2BhfdqcuG709OCzkLHkweYrzkiKPFm%2BaRSu0ucTyLKrtzsLnOMhwP902FzswiWUk7oBzzKZPIdwNtEx3HcKaOMFAc%2BlYNwUhbzaU%2FH47aVCzqhpTID8Y5U35ujaZ0gpAyjiDJvRpyWYEiHRN99PnSBrKEabhy9tMPa1i88GOqUBQ3141ACb5tVUzcWnGSjA8%2Byt7RhRWFX30YYSoe%2FaqEmi5CQ5e7mQaYB6DypEpO4ppxqN%2FdjAfOZ%2BOVlBopmDXzt%2FeQCk6ps%2Bd%2BHNujNK1SioS7q2ndK17NgjT9XGApaGeWGqS%2BiKRcy99x5TM4BxapLPluj0rvVuDXyM%2F1BQ%2FnNhJsX2xBX9xv4pog5PQKHaQ8CngCSv6PS6hXFOWujBHQ4BUr%2Fd&X-Amz-Signature=b221dd32c0eb51eb64c86ccf2df8845bd328c21967aedd4bc0a43154938da027&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

