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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XMIQEXS3%2F20260415%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260415T195617Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIFGvHFnlKjKYkWICiWdbn3VZP%2BMUGZ7hxoAOYCLK%2BZZhAiB7Wf31bDwbNJMK6xiKDcDhL2zbdsrI9vqivk1eJgZcqSqIBAis%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMnI7uwXKJtFVT8h2cKtwDe536AfqJy8VtWdA8XQ%2FdxjLXpP%2BG6bI8EgXJTUUw5IIkC1Ui3KfdptJyfDAFRTrkFVWZSE2qVuoyV12CJW0sj0xcQVI7URlFsX1guBnnB6uCL9M7QhRpEhIWWKe7Jdx333BWCdZKoft8xdNKbAWpGg9sX049T3wubdBe1pXh9oDgTxxssDeFQHprLV%2Fa7sOg6daVFJfGcxYikUt8L6oIJ8ExnW86vrXwzdmq%2FM8ENU2jyie0YREgw3S6cmUb4lU4zkmomnw6pjEmqeBLDcR2Nv0V8DSDq%2BZLcoqgAfTm2BqAx7MArOTAaKywgOoesM0BW4xRkVg%2B%2FcNhpaqvC4OJCj%2B8I%2FAxIjE1QtmI%2FVh0vNoufSAJ6m8kBg184GgCvmNGJgMT94AtaqLie6ET898D7mpuG5II3OunG3cvMPZ9GkOlpAUpgii4HMS2K9SsQKqW60JjRIxrM38aJwPPccsL30kYluJ9fRlRZKdCHw4lYPZQX1Vhr%2FGrmQH7Y372d2lNvZLsPGn8JyRqgF3RQhQna9azecey%2BekULdk1Y3Sv4cOhXQSau%2BaVdt7cvXkWWQSwUKAAvSTu5OVoNkBiy5rlnU8K%2BtmXWQFzhBpvXghLF2UP8uuClgelEBiUKCww%2BtP%2FzgY6pgEZtFfkNOn%2FGVHW3OrR4Z6prQdQwJcom9sUOU9EXyIXoGhDoCnZD4aR7Zs65d8p%2BaVNEVbKHoA8j5USjR7dbuZ5OV4Jc%2F8v2Cj4TiqQX3uwqXlDmOYamC536YOBI94Mco4N1%2BVR7%2FHZZPrVyIKoxwQrFnLSYf1REf8wmTlcp6eklsDGYOi2E6UyqJ0054LeN5G3we%2FaogFKhnIx18JiFBBPnIZqvwJs&X-Amz-Signature=4b3bd8ef04d9eb28e0b17a88829b3b0508044266faddbdb5529800ee02d54fd1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XMIQEXS3%2F20260415%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260415T195617Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIFGvHFnlKjKYkWICiWdbn3VZP%2BMUGZ7hxoAOYCLK%2BZZhAiB7Wf31bDwbNJMK6xiKDcDhL2zbdsrI9vqivk1eJgZcqSqIBAis%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMnI7uwXKJtFVT8h2cKtwDe536AfqJy8VtWdA8XQ%2FdxjLXpP%2BG6bI8EgXJTUUw5IIkC1Ui3KfdptJyfDAFRTrkFVWZSE2qVuoyV12CJW0sj0xcQVI7URlFsX1guBnnB6uCL9M7QhRpEhIWWKe7Jdx333BWCdZKoft8xdNKbAWpGg9sX049T3wubdBe1pXh9oDgTxxssDeFQHprLV%2Fa7sOg6daVFJfGcxYikUt8L6oIJ8ExnW86vrXwzdmq%2FM8ENU2jyie0YREgw3S6cmUb4lU4zkmomnw6pjEmqeBLDcR2Nv0V8DSDq%2BZLcoqgAfTm2BqAx7MArOTAaKywgOoesM0BW4xRkVg%2B%2FcNhpaqvC4OJCj%2B8I%2FAxIjE1QtmI%2FVh0vNoufSAJ6m8kBg184GgCvmNGJgMT94AtaqLie6ET898D7mpuG5II3OunG3cvMPZ9GkOlpAUpgii4HMS2K9SsQKqW60JjRIxrM38aJwPPccsL30kYluJ9fRlRZKdCHw4lYPZQX1Vhr%2FGrmQH7Y372d2lNvZLsPGn8JyRqgF3RQhQna9azecey%2BekULdk1Y3Sv4cOhXQSau%2BaVdt7cvXkWWQSwUKAAvSTu5OVoNkBiy5rlnU8K%2BtmXWQFzhBpvXghLF2UP8uuClgelEBiUKCww%2BtP%2FzgY6pgEZtFfkNOn%2FGVHW3OrR4Z6prQdQwJcom9sUOU9EXyIXoGhDoCnZD4aR7Zs65d8p%2BaVNEVbKHoA8j5USjR7dbuZ5OV4Jc%2F8v2Cj4TiqQX3uwqXlDmOYamC536YOBI94Mco4N1%2BVR7%2FHZZPrVyIKoxwQrFnLSYf1REf8wmTlcp6eklsDGYOi2E6UyqJ0054LeN5G3we%2FaogFKhnIx18JiFBBPnIZqvwJs&X-Amz-Signature=4b3bd8ef04d9eb28e0b17a88829b3b0508044266faddbdb5529800ee02d54fd1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZZFSVH2S%2F20260415%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260415T195618Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQD0IBLI3JMMUaBUNgFNlqhZdvfqcj0LCVnmZwbXuGJa2AIgI9ka8T5do8N0BpWRm2eRDeh5FWrb%2FJA%2BeKz2YlnFUToqiAQIrf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDAmd4GqngUzfGvxgVircAykWweVifZvsr%2FhTp4oXCXbZ31l1o%2FAM%2BO1iGh5XrpdUvY8hKSwUYO6XFOMrnXL74ozQubWso8Euyp8JXbhQUPlYf4CO8W8iKF1X7lxG6fDHHQGu4AG706LqhPGasdiE2n4Fa1HxYH%2Bwyfn2PRQp2AkcYaZtJOB1WioHSCk5H72zvDsKMdKQwe0wm5KDGR6%2BV2wEBGtTBpJq01uarRAhqReJlR8SehlBGbYWvN5SEDjWOCfFbI3xUzCSRfQ%2FQlpd7og9KbWFAUpixbIjllGmmSj%2FSsQWJxGZImTC01dfcPAVZS0ffYWdmYfiIHF6oDE0Iij0GYfuU%2FH24Aw5a1NtI4tUxks49wTHtVXeIR1O8TbDGXO7MUcN%2BjmySK%2BFiGmDO17rmjMA%2FLzrENM0gaeQXmBTWI%2BvtSzG3fQxl56hD7QnA5uHVBz79ms2NrViEC7DkNfq43%2BDY6%2Bsz3q4G2ecZxAk6ZO5fZkg4y4V5tDaMcdSaLAlwIw%2B4NuBjlO7azlXzmiqWWeXZ6xwyjl2Rf%2Fdr1Tc9Q98ZmgDFCZqrmEZjv88evO3l78rKgwTjTWY8nHhD0q6tGcty4dBrTmH7k3bNUSYT68E6jYZm%2BFnG9h0FHZSDAnBVBWvmdBYq30NMIfT%2F84GOqUB3zYsxgcBQJXgGeFJxlNOLGfirdltOwYjv%2FhkWS3sdBHtbucUM3qSnpkx%2BOwTNAxJm5pw%2F3oMLDh6V4g164Tavr2MyB0PBrT%2BUled2XftYIKpfvlwrJ8qG%2FnfwhPLJV5MqPEwRjxqA%2BGHSFAJm%2F7cHDeOq4785j6pZ8KrKhVbs3AJOvcC03zjP5CbffMyMs9a8n9tdI1jJh2g%2FCDMbqOs1p2l8X4L&X-Amz-Signature=6502932f0f848ef6bf7f823dfeadc148b9f02341cf5d4f8455afc718bfda5e11&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XT3VEHZP%2F20260415%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260415T195625Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDAJigE0KpH%2Br%2F8q2hJxlXIRrHUoWB%2BAcr7VUOL0%2FisxwIge3ZJItu8ad%2BZtfXG1Z7vHwhw%2BWCR7Mi0Fd4w9Z4kqAUqiAQIrf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDCCTL7nPASEnwYu86yrcAyZ%2FPKmYzgda0U1rBskivphtDHGiHiCeJqoUVM96xLmcPEv0mN5nMllTClCNfLj2WpSt99vPb5s76MKsPzJYGbfSsOW85aQwg6jnVrmSvDSorIE%2FSIG9E2%2FwrgzJN9Tx0nZcTc8wPojLreiok9AMItOBJW7WGkhwtK89Vpve6RzKKcW3asOQAAbxt3%2Blzo%2BA2t1CGi5JzqnMT%2FR4ia8cEgD2yp8P1ZacRjys06PE6NTMWOcmGn%2BY%2BRM2uIo%2F73K4rEN2pxG3ua4FAeow5NHecmzbj6E0MNzyEDVQttf66aswdh6N1bGDVXz1kajrZIhnYHD3OgEwON36TRi33Ab48u%2FJHAboP9Imec8jI6%2FtI%2F9FOdrF4bv2jd6aYmLgk7348bNOa4E030AcAMsC2zotGPwUNdKpkbEBD8VvjCwz2dSgp%2B%2BDBPjbJfKHc0m4EEH9GbaEw3mmjvVp3mHluCzC6hzbgk4jQnGS6p3YDneoIGVYyS%2FDmcBNIbMuBjjkJaigoAvuX0i1JS2m38%2FBreUPbpXey9pn7lQGq2y6snlh7X1Ph42Lv2%2BFGC2xSVUnJFZM0gLFgc02GaYRzdu3sa2ugvmnNWoDouls%2FWz8Ao1ZYp0Y0av121Vm%2FouKvwARMI7T%2F84GOqUBMQ93XtvhUUR3%2F4PxTTfR2qwA%2BOJZ4burWzZVXH1IUjxj5YyQXyyLh6DsM5SaBLhDugEi2sIc1HwYu00pR9RsGyt8rnN46ps3knckMMlENumMN807y%2BrI60Fm9Sdhe9IcZ9XmNMrSxrEBg8eM3iGzzPGWAqGaZC6E11C73wLPTxea1Ez9N7a%2B2mf9KzLV%2BSqx5LZYjEqpklSVrRI1Y4jc49qkTEPu&X-Amz-Signature=0cc33d3e1e0247ee5772259d626d48eec56ad3333b56596e9b587dcb73c3da0f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XT3VEHZP%2F20260415%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260415T195625Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDAJigE0KpH%2Br%2F8q2hJxlXIRrHUoWB%2BAcr7VUOL0%2FisxwIge3ZJItu8ad%2BZtfXG1Z7vHwhw%2BWCR7Mi0Fd4w9Z4kqAUqiAQIrf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDCCTL7nPASEnwYu86yrcAyZ%2FPKmYzgda0U1rBskivphtDHGiHiCeJqoUVM96xLmcPEv0mN5nMllTClCNfLj2WpSt99vPb5s76MKsPzJYGbfSsOW85aQwg6jnVrmSvDSorIE%2FSIG9E2%2FwrgzJN9Tx0nZcTc8wPojLreiok9AMItOBJW7WGkhwtK89Vpve6RzKKcW3asOQAAbxt3%2Blzo%2BA2t1CGi5JzqnMT%2FR4ia8cEgD2yp8P1ZacRjys06PE6NTMWOcmGn%2BY%2BRM2uIo%2F73K4rEN2pxG3ua4FAeow5NHecmzbj6E0MNzyEDVQttf66aswdh6N1bGDVXz1kajrZIhnYHD3OgEwON36TRi33Ab48u%2FJHAboP9Imec8jI6%2FtI%2F9FOdrF4bv2jd6aYmLgk7348bNOa4E030AcAMsC2zotGPwUNdKpkbEBD8VvjCwz2dSgp%2B%2BDBPjbJfKHc0m4EEH9GbaEw3mmjvVp3mHluCzC6hzbgk4jQnGS6p3YDneoIGVYyS%2FDmcBNIbMuBjjkJaigoAvuX0i1JS2m38%2FBreUPbpXey9pn7lQGq2y6snlh7X1Ph42Lv2%2BFGC2xSVUnJFZM0gLFgc02GaYRzdu3sa2ugvmnNWoDouls%2FWz8Ao1ZYp0Y0av121Vm%2FouKvwARMI7T%2F84GOqUBMQ93XtvhUUR3%2F4PxTTfR2qwA%2BOJZ4burWzZVXH1IUjxj5YyQXyyLh6DsM5SaBLhDugEi2sIc1HwYu00pR9RsGyt8rnN46ps3knckMMlENumMN807y%2BrI60Fm9Sdhe9IcZ9XmNMrSxrEBg8eM3iGzzPGWAqGaZC6E11C73wLPTxea1Ez9N7a%2B2mf9KzLV%2BSqx5LZYjEqpklSVrRI1Y4jc49qkTEPu&X-Amz-Signature=1951edb5336f95313140f2c20ac2aa302925838d100a5c46a6eb625e87b63a78&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VKYG567V%2F20260415%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260415T195625Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIAn8eQHnZd81NQaX85KV7PFF9Nms%2FO%2BNnGetXL%2BHRyrTAiAMGKF9lzoPAeCedyNGLN7Jmh3auHkaC5lnPiQmI%2FfnzSqIBAit%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMfeb8S%2BULB7PpzUb3KtwDEHPbVCDRG820np2oBGuMcIKeMmZqv43eA5PNn3oosJex%2B0coKIudrvZpn7UewyZdseeLtGkiBhqT9X1NW%2FY9VcKbAC0SL1QN4%2BlGUX4Re2qOgRisyELLl3hH4imTR9gULRS%2FAJpTIYjY7HyQlDtqNNy%2F9P6ctDyFVN4BCLhCgL8ZMmxBFQze%2Fnol3hC%2BW7Bvdv6a%2BKUWevG4YcAos8PO7%2BI89oCw8VkFZU1NY9D7DMPIfBT3OSFiHoL516eq4VRZOWehAkiEs%2FRv7eko3xUY7PQq%2Ffd71oWAqDhkN7EnWm5zuADISn1l0klzZ0dcy59iQEf%2FAeINiBG1etUYTm9qsfC8uDOK%2F1SI5YaLCEHuuiR0xMfxrrWap8BV6UsejMurMpZF3B61Qka7uWENtrIicVQhSI%2BvQh5fZj9NJcjpbzAk3S8T6qNvvFGhbHu1XUQ7ZhDKbtp%2FUHPJA3N3FmsU5AJSLTklV1bfbkiA%2FtGUCb3kyqwFw0eLmsr7S%2FwMkapSBMwM9r8azjHT1xcpzZXLKS7MIY9IjIalLnH698INIEgVt474ZLkbuVUaHIGB4vICHwBp0OeBCHe5q1o0k1sNmezl1UYmc9URUxZBl%2BfGXU%2B2a%2FWsQ4WFwzvl7mYw89L%2FzgY6pgFYvOMvtttPB7fg%2FDo24rS6ozumrbSwMbPC%2BxqQcNILs%2Fr2VThb8aI8dtTNjGCB3qX%2BOcSxOD%2BWCeeRGKpQAzEQGF3DKFQZSELkT%2BZ7tqB%2B%2FAkPT%2Fz0k4OaQEh6JJhQD2DFBsVGRLYqIfqNnOHAxZibEH%2FusLcBnR%2F2j%2BJ82sIEfGqZSZQS%2BQHlg6rqr8Ec0ydsmC9FSLlIU7r827lmEiRsQ9PHKZTv&X-Amz-Signature=f4411f9cf9bbda5f1546aadce4d640a6c033670a9148b92bfa81437d1110be31&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SV73ZU6U%2F20260415%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260415T195625Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDod3Bf68Hf86zUFyFyAvpu7f3zBK3iWgAH29IL4%2FjFDwIgIRAdVq8s6y%2F5Lx1%2FIWkp8jwVyfh8Ri2IHnqyyJFncnoqiAQIrf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDAXBBeF8d9gxhnIUqyrcA6K%2F7aX1HfT5VsGKzhcCa57g2%2F1WY1f9cO0UjzycxI%2Fkn9NZwq4JmrOXvRUH1OS8sanhhK3nDLf8KIqxmDwf7Gbo0Rs74T0ORoFwTUVThMehRSRWrL4YhVLovLuGzea7Ac9dF6AThKmEKAL%2F05IdVMQ4lY3ihRsPSf7502WII4UvYBjkEVH8bkQMxzkXLTn8zhFR4vmHnvvD1voc4bwJqCiPnUrvQbY0TtIHvB7kY0leh7Ct%2BxVpmSnQkCxEewJtPDVMPx5Z29bOyScAOWxvUEZN8wa8biwwOoDdZEHl5Uo2BiTE6wohqqLNt5SBj251ct2s3o0fsqbwFZbcH%2Fiy3tA%2BzJZRtGOB6DtghIIgBrdB%2Fvyi6xuB1Dt%2BufuTkWaa16k1Y%2F1jwGdGe1EZHQsyc1FiDMclTCYINE1MdnnDJ9x3uF2WyYD3Fwu8%2BVsyqB6UZfyT%2FK39hoAyCOIF8ELT2ve0TIfrGf8CJ4W%2F%2FJZ2JzGkZ53g7aPvaYe1cf35rDt0mJdwCmECGparYkUY2Y1KkxVWDGuamFV00twpSo6u%2BkS5vHbmw6ddMoFyG5zCjpaxrEivem7ep1tNUam65p4zZmKSrUTcszVfxDOBYQgEPutLCRViFeRr0V05UB9PMOTU%2F84GOqUBg%2BFvjBBP58sAuDUi3Ohs5%2BAo8UgkJRimlZ7v4d0fNDaKwFagi5QGUIwC7G6S7zAYz466C5%2FSeSbeLEvapVqlzkFOxv1D6YeflYVUAnEaSJFkTTEbAo3cwAjPFJDsaJPYBzmUDjQ0Z18D8%2FyL6L08wemsAckomj%2BOkew3O51blkuS6molW5r8Z7pGSvP%2BJLKHeugsI231Jn02raZH4Iz3X8IYlpCs&X-Amz-Signature=eee5c159466ed9fcd7460fc2af0af76bc79d204c52e34020319f62456cc8b0cf&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666XK3BA4V%2F20260415%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260415T195626Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCOFvS%2FysML0aeYbUZdqYOV%2BvqEVMUgtLo4ewmQnX7gBgIhAN12Esq06njf3BJtUrIOhqBzP8FyEAVlK2ZJvykjvPGJKogECK3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyyrQeOOLsju7s29HYq3AOPglP2QDM2RozNCuxFdP87qKYdlZP1ONUvL4V3suGdKs23i9rWTU5p281TKU6P%2F%2Fo2QHgRl6OEXgewoZT6dQ3Pgn%2FoIdeQ7yVhNVIQ2Y7jgxJROXiBn43cei7IMaDzoXcPyU%2Bg63Cmc2op%2F6EUWoc8xrr4WRY1eyMlX2y7fqzKEkXzJiXkfHQ3M8y9QOVtm83Bsk%2Bq4kyca7cNvGggbO1si2ifC1VnWLEPW3YqSH6yOPiLksVyMzBplAem6Y6ge1sFzpBtkaznJBXs6Yv%2B8UGbHPv%2B3Ny7mS%2Bql51oMzjpZ2YzTkqF9smVWntIoDWVHyhpiZTpOTNAam4a4gOOzId9nKyVcQAP2lAaPcbbyMSf2i50BfBnpjvQilgSq8V%2BePwBg2Kyt7zogg%2BlCHYEFvXAPhsmFxmVaksyHCgk%2FoZFyKqAGbl%2Ft%2FyQZ6RBu7TdpVq%2FzaHo4zt0BWLBBPAkfcaSWUyAKpe5s8h0QiFw1h%2Bgoc8o70VDMbt9bVCCsAxILCtGEGP%2F5Hkxb42FdDc%2B8Ez2R1nmq8FRxnSUHwejDNjsjrKIHhDMA%2FoqIx7TpxWRKm%2BDyUpLK%2BI0dNj5lPyNIy0GAmC7JYBuQq7ZQJ4liJsMkuP%2B46njtAQNWH64WDDn0%2F%2FOBjqkAaeJaEiY%2F2jgaXa4ueyG8eHOes1Ax1Z3bSujvjM7Ly41dY6qt7doK0uLl4BKWNwbpKVlZD2xA%2B6IDGuy5i5MSKcHndgvCFZLNRwYzqxI0q8bfNu9d2CpNvsOd6kg2W4vusbFjALgOdZKKD%2BiFA33FerjDfqizH9ufDdpa3aCHjl7uNjiKzv9y%2BtWTd5nuWVcIwSSgiuegYIED7Av03URy%2Bty1Ebn&X-Amz-Signature=cd80c85b63591591c50a84b8a6e37f66dcb0f8cfa43f695faaf0040d9fb825ee&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662HB573ZR%2F20260415%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260415T195627Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIANZ%2BC6Q9wD2yfxfSLWlSpsZqHWdnP80HT%2FORfFifijQAiEAqIc8rDaHnmY14EC21OxWSE%2BkW3kE1Ds3lS856Sc0i9IqiAQIrf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDNZMwjf7MmGxFLaZkSrcA2E4YXFgUWnaoPpZtH7hsncYRAb9XBISs5X%2BAFZxv3N81URADJa43cfIRdup6%2FBySfLahEBmaZFuElPgffgF%2Bzpn9ak6vCyjOpaPq%2BoI%2BrhQ3IzDZl0VnrmWa90JIfNgpWMjyB%2B67DscmYp3UZSL4PK6%2Fl2nMR7ZTticL%2BhTOXYJhvt1FQYLGE5vBKA%2B8yDqIsMnozhxzsqr0O8xneIEaNEhvHEge1DhnZQvOt4zxT4Ep0PaTuOgeP7R9M050EPhEhHwqpeI7gL6lU2siuZ5q8TwGMjqm1xzRCTCr6JVciLifzgXs4qIhHsLjDJP1Lxq%2F6lppi9I6gWotg3ApD0pDJJm8lZ4wi1Lj2h%2BZOJgtqOAO78i9MSRBENfuZ4t88AZec1fu3J97b%2Bfh05ITCS5cjC%2FW%2B5NKsM45Y%2FRwsytXOdxOjrsb2ASPXIk9N54i2I7nuKn30ylVkWp2WwDWV49XL7I8bLPT4EAGHFX2oJ0D1Ac53o4fm13SVJVHxJGu3ZYFTcZe0zM%2Bm%2FIwWyyzBt5VQBq26e%2FKH7Ln0JUV9fzOMcdnu1zg%2Fb6O1GlBa2E3pINrAcyJBab81S3UzKFW8RjFWfQzPjdfFUT3pFkhF%2FWceMrw6P9d0kW7bJGI04sMNHS%2F84GOqUBV7KTwMgBWB8VC9OEcMuDW0UGjndp7O0jG7ucxgZCTdzmERx30A7HMC%2B1ARMCgAZJcbGwudd%2F%2FvyXSgnv%2BG4GgYNikzEKXDrahWt5U7KngyG5wngh9bpILVn8f0R6LcAGRm0W28tpy%2Fypga%2BeiwLx3WNSyV5DBYYOuaWsVaN7xwoJXgOxBmpeCJOOIL%2F7uDpw4fZKlrOfVkkh8Wb1IzcneAxCphBh&X-Amz-Signature=4a7d3f3e807e3304ec3351611c938364a45ff0e8f23505879238e7a305c44019&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662HB573ZR%2F20260415%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260415T195627Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIANZ%2BC6Q9wD2yfxfSLWlSpsZqHWdnP80HT%2FORfFifijQAiEAqIc8rDaHnmY14EC21OxWSE%2BkW3kE1Ds3lS856Sc0i9IqiAQIrf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDNZMwjf7MmGxFLaZkSrcA2E4YXFgUWnaoPpZtH7hsncYRAb9XBISs5X%2BAFZxv3N81URADJa43cfIRdup6%2FBySfLahEBmaZFuElPgffgF%2Bzpn9ak6vCyjOpaPq%2BoI%2BrhQ3IzDZl0VnrmWa90JIfNgpWMjyB%2B67DscmYp3UZSL4PK6%2Fl2nMR7ZTticL%2BhTOXYJhvt1FQYLGE5vBKA%2B8yDqIsMnozhxzsqr0O8xneIEaNEhvHEge1DhnZQvOt4zxT4Ep0PaTuOgeP7R9M050EPhEhHwqpeI7gL6lU2siuZ5q8TwGMjqm1xzRCTCr6JVciLifzgXs4qIhHsLjDJP1Lxq%2F6lppi9I6gWotg3ApD0pDJJm8lZ4wi1Lj2h%2BZOJgtqOAO78i9MSRBENfuZ4t88AZec1fu3J97b%2Bfh05ITCS5cjC%2FW%2B5NKsM45Y%2FRwsytXOdxOjrsb2ASPXIk9N54i2I7nuKn30ylVkWp2WwDWV49XL7I8bLPT4EAGHFX2oJ0D1Ac53o4fm13SVJVHxJGu3ZYFTcZe0zM%2Bm%2FIwWyyzBt5VQBq26e%2FKH7Ln0JUV9fzOMcdnu1zg%2Fb6O1GlBa2E3pINrAcyJBab81S3UzKFW8RjFWfQzPjdfFUT3pFkhF%2FWceMrw6P9d0kW7bJGI04sMNHS%2F84GOqUBV7KTwMgBWB8VC9OEcMuDW0UGjndp7O0jG7ucxgZCTdzmERx30A7HMC%2B1ARMCgAZJcbGwudd%2F%2FvyXSgnv%2BG4GgYNikzEKXDrahWt5U7KngyG5wngh9bpILVn8f0R6LcAGRm0W28tpy%2Fypga%2BeiwLx3WNSyV5DBYYOuaWsVaN7xwoJXgOxBmpeCJOOIL%2F7uDpw4fZKlrOfVkkh8Wb1IzcneAxCphBh&X-Amz-Signature=bf63dda33b4dfbb1d7b042635340c3711b59c26098265baf9099237e003b4c23&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666IPIEQ63%2F20260415%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260415T195615Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCuAstwA1F81ei2JCKohFSqBXLt6SSc7qM8xL1gWCgYBgIgbnJWxZuh6UNjD81LOhEq6wOP5sejgUJFTtQSH%2FZQgHMqiAQIrf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDE0ScaAjGiXXriAxFCrcA9RkFwhKVa4NNY3FBfd6qC%2FsycdyaeOdSumzDBBhw3Izrt7afqEUIcoQXuZMn7LLywL098j%2FsHyevxT3Vmp500IP76VNu1tDPVJksRDbrjc%2BAL3iI4KF3AAdVxRQX9PH1zY8K3JkYCrIWHl8Xwu%2FHd%2FSwIKDlw%2FeAIl%2B4fZYDXvrQp2MTJJf1URn2cDhVvvT759jz%2F7qUWWHVkikBA51EKH2eHKRpydMFaEy%2FAYRoQP1Vu6EWMNA7QbMEWyuDJJYvjXN6XNLwawnjyXZBrbgX2DqInTFe6d6D7F3Bh4CCXXuQ1a0yg4H7vN76q3bWnYuuwtGcxK25zGAY2A1ylpg8ZA4MyTKpFrvBfeOJcZFf0XDhp3KPYI8rY%2FQGytld%2FAC0puueYbphwd%2FTJDNKgCw5BBwVUF4S972A3Sb62Wlg9JrQ4VIYxsM%2FbAkuHCZBzWuRNKEmZM9c7O1kiwmH5ekJK7v5CpwZwRq%2F%2Br74WHLUnAU41nqQFNau6rTLWlg0iA9a4HS82fTUgwX5lKRemEaItQvSuiISJM1jSjyUklnaTEIWSVRdASx1NXiTL59MNuxMH0u3I602wcT9ErqvxU5y5H%2Ff2Ax8xfPS%2FEJvMFV87Y6lTTqFBT2P8dp%2BD9tMJjT%2F84GOqUBMBtkJ6VByFf12kDBid1hlWTINJoOy3ICSZMLLnVUIK%2FDGKyfO5zMmg2WWi6IZ6lLWTdX%2Bmp314XkuvekZpmZsSOy32l%2BjgdrJaFVrYycl9mVF9sUGssoUOIH23qqfU%2FAyPelk7TvvmfTeU1ZHd203K5%2BqvXcVRr%2FEscdu6jzPQOGL13s%2B0H6hVSA8k2M4VtXyJxx35T83C6iHUQELvXRb9RB357m&X-Amz-Signature=ef1c12600405c28cd5242cf602908d879a3aa99e523d7739eca962acd782a5b2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XT3VEHZP%2F20260415%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260415T195633Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDAJigE0KpH%2Br%2F8q2hJxlXIRrHUoWB%2BAcr7VUOL0%2FisxwIge3ZJItu8ad%2BZtfXG1Z7vHwhw%2BWCR7Mi0Fd4w9Z4kqAUqiAQIrf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDCCTL7nPASEnwYu86yrcAyZ%2FPKmYzgda0U1rBskivphtDHGiHiCeJqoUVM96xLmcPEv0mN5nMllTClCNfLj2WpSt99vPb5s76MKsPzJYGbfSsOW85aQwg6jnVrmSvDSorIE%2FSIG9E2%2FwrgzJN9Tx0nZcTc8wPojLreiok9AMItOBJW7WGkhwtK89Vpve6RzKKcW3asOQAAbxt3%2Blzo%2BA2t1CGi5JzqnMT%2FR4ia8cEgD2yp8P1ZacRjys06PE6NTMWOcmGn%2BY%2BRM2uIo%2F73K4rEN2pxG3ua4FAeow5NHecmzbj6E0MNzyEDVQttf66aswdh6N1bGDVXz1kajrZIhnYHD3OgEwON36TRi33Ab48u%2FJHAboP9Imec8jI6%2FtI%2F9FOdrF4bv2jd6aYmLgk7348bNOa4E030AcAMsC2zotGPwUNdKpkbEBD8VvjCwz2dSgp%2B%2BDBPjbJfKHc0m4EEH9GbaEw3mmjvVp3mHluCzC6hzbgk4jQnGS6p3YDneoIGVYyS%2FDmcBNIbMuBjjkJaigoAvuX0i1JS2m38%2FBreUPbpXey9pn7lQGq2y6snlh7X1Ph42Lv2%2BFGC2xSVUnJFZM0gLFgc02GaYRzdu3sa2ugvmnNWoDouls%2FWz8Ao1ZYp0Y0av121Vm%2FouKvwARMI7T%2F84GOqUBMQ93XtvhUUR3%2F4PxTTfR2qwA%2BOJZ4burWzZVXH1IUjxj5YyQXyyLh6DsM5SaBLhDugEi2sIc1HwYu00pR9RsGyt8rnN46ps3knckMMlENumMN807y%2BrI60Fm9Sdhe9IcZ9XmNMrSxrEBg8eM3iGzzPGWAqGaZC6E11C73wLPTxea1Ez9N7a%2B2mf9KzLV%2BSqx5LZYjEqpklSVrRI1Y4jc49qkTEPu&X-Amz-Signature=d9246dd907a74ee6f240bc45ff9dfde3037ffd74b25bdbacbb6d4653191a2e56&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XT3VEHZP%2F20260415%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260415T195633Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDAJigE0KpH%2Br%2F8q2hJxlXIRrHUoWB%2BAcr7VUOL0%2FisxwIge3ZJItu8ad%2BZtfXG1Z7vHwhw%2BWCR7Mi0Fd4w9Z4kqAUqiAQIrf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDCCTL7nPASEnwYu86yrcAyZ%2FPKmYzgda0U1rBskivphtDHGiHiCeJqoUVM96xLmcPEv0mN5nMllTClCNfLj2WpSt99vPb5s76MKsPzJYGbfSsOW85aQwg6jnVrmSvDSorIE%2FSIG9E2%2FwrgzJN9Tx0nZcTc8wPojLreiok9AMItOBJW7WGkhwtK89Vpve6RzKKcW3asOQAAbxt3%2Blzo%2BA2t1CGi5JzqnMT%2FR4ia8cEgD2yp8P1ZacRjys06PE6NTMWOcmGn%2BY%2BRM2uIo%2F73K4rEN2pxG3ua4FAeow5NHecmzbj6E0MNzyEDVQttf66aswdh6N1bGDVXz1kajrZIhnYHD3OgEwON36TRi33Ab48u%2FJHAboP9Imec8jI6%2FtI%2F9FOdrF4bv2jd6aYmLgk7348bNOa4E030AcAMsC2zotGPwUNdKpkbEBD8VvjCwz2dSgp%2B%2BDBPjbJfKHc0m4EEH9GbaEw3mmjvVp3mHluCzC6hzbgk4jQnGS6p3YDneoIGVYyS%2FDmcBNIbMuBjjkJaigoAvuX0i1JS2m38%2FBreUPbpXey9pn7lQGq2y6snlh7X1Ph42Lv2%2BFGC2xSVUnJFZM0gLFgc02GaYRzdu3sa2ugvmnNWoDouls%2FWz8Ao1ZYp0Y0av121Vm%2FouKvwARMI7T%2F84GOqUBMQ93XtvhUUR3%2F4PxTTfR2qwA%2BOJZ4burWzZVXH1IUjxj5YyQXyyLh6DsM5SaBLhDugEi2sIc1HwYu00pR9RsGyt8rnN46ps3knckMMlENumMN807y%2BrI60Fm9Sdhe9IcZ9XmNMrSxrEBg8eM3iGzzPGWAqGaZC6E11C73wLPTxea1Ez9N7a%2B2mf9KzLV%2BSqx5LZYjEqpklSVrRI1Y4jc49qkTEPu&X-Amz-Signature=d9246dd907a74ee6f240bc45ff9dfde3037ffd74b25bdbacbb6d4653191a2e56&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666EPPWQ6J%2F20260415%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260415T195633Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDx8s8CA42ogJRZV%2FT%2BR8hrK86y97KMC4IYK2ZwNY3gQwIhAKRW5b%2Fp6%2BDo2njQ%2FIhma93Je%2Fp3GfTJ840Py7LBLLjfKogECK3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igy5y7hd3My4b0oqEvoq3AOuBzvkbnTClaRy8uRzEt0O7CHE%2BLP4QGmd3vzwGVk9wxIPVqoIW8nExUIEEbv%2BGHRYuf7efi4zZj3rDKPeTWDkcomsuFRyAxcnWjK7iPSA3zkYCQ1GAUgdLbcUoqzAJGaoQZ2hKqeRs%2BXbHE8SRtfruX4t2J5MhK3piIQu%2BdouXBUM0TVdFbDgOjrIdqdK1ijT3PjpK06xATW%2FoXFhsNYOlX7Qn0nAThBuvFNk2IxRrWEAAMszJQjnOfMp%2F3hbTQZ7%2BuAehVg9hya6BJEpwhm3M2mVN12nyuV2SO3iNWMksGGxT4m2Daa9nj7k46d6VMOuJNYUBnCwnsmepQyt%2BMGFfY9ogbDc26W7BAR4wrtKJKzyEhYcjdHnbqRQ6GS05fNI2vbFj%2BXF4V0TYlZgzjclCeI%2FoR6qWWYaG9Fah0lSgL%2Bx%2FzQr3t1BxlD%2BjhftHOSDj4oNwi9Zlm3KdqW4uhfTnSglaE6YsGrxHMfOSCUINfcoRekuIJbeQKvsw3NyGXXwni3QRQlrVoL1JF16Sgk3ifEiIG8yBKVasn8A4vhrkZeNSX61cxQyjY%2B%2FGa%2BTwvUu8KOpw748f%2B%2FjxqQaeex6rUTv1a1WNiGPXfFszG%2F6C0BvfVBvnh4J2kmr5TCo1f%2FOBjqkAbsbKRoswHbz6qYwaXVs0cy0nAMeHKcF0phv6zjIWsobkC2Jm%2FsUL4qCOYH%2BZnXICcvhbtfAZnDlWnG43UIy3x9jPnhhOspHW7XOQiGbKKuuisOczOEZ6M8rT0mnt2kgI3lM53jhhm2okKRFaJzZ%2BrMM7yPvxxSHs%2BjTmQ24segsOP4yX01lsY%2Fj00QlSvG%2FnwRfj0mXgZ08pxGhZV55UrNW2gJ5&X-Amz-Signature=8c983e6f4e138cd39e4aaf4545153ba08978429f3e9cfb8cf337e2b9cba6ab4a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

