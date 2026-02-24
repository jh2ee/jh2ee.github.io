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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665JKNPBFE%2F20260224%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260224T032842Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECMaCXVzLXdlc3QtMiJIMEYCIQDvS9pXVY%2BtGgMLu7WmV1VSIn1qawoSqsPyWOQTjtIh4gIhAJKPD%2BBnhxik1WKhKDmhvzRDv17GYvZXhNjh3BL5%2BPArKogECOv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igz0VZio7mxRB5%2FhmOsq3AMAN0fTE0OJPFlWs6pCdlKDnU2tQw1gymRXIllOXgChK2VqeGCczdOkc8EASCM3aeWcuHcUMznMERG5WlPWkraxVkwSrxZER5VVWvTADvXCdZMU86%2BTAPXBNDwYPged6GSdCyl2lVIyCd%2FmHx8mDrpc5WMQh7UlDE2nJm2Eynv2WIE5N%2BFFGXkAhnHrdSVoktzXasYO3vxe22dSDnxXTr9xG1mMV1pkflyPc9GBcShyPXn6eNPP2bya31LLHu5Zy97sCSB0fb4QW0Rxb2%2BryVYN1nHkBYAJqPo9vpye3oc8tTWdY3HT6VU6Xed1lBfvQhQHTqw0TcAbyeGUiU3n1n6vIfUgpOnH1O%2FG17JN0vsDyozs8vPn5II18SWM%2BwjKWYSeeinZjqfKvim1TDXpm1YJ5OyI3%2B5fSPdapV40Ktr%2BsgctEFXs2lujvY92GalZmg8EvCU2bcbtKV9drMSGIub4q6jr0L5Fap9zoSyIWmsVFQoe%2BjTp8RF4DbHgQ38pTmTUv%2FxfxmCvP9i6QoM3gUU4suBg%2B2rVb7pUQocrjUiXVPKLd%2FMlWgek0d5UE15sM6UhM30rcEsOxGnUD40wC6hwPFbfSpcbFxmispeoQSr%2Fc7eTzyQNr6CY0Gf3QDCumPTMBjqkAQkvNTWZ2mLXFqBW7xYlnDdkUjbCNUS7t8UM1H7eJ%2F3pol7nRRtysza4Pv7eBXbJ%2BS4lFI3gVpGQkcjLVjrxViUFmSkGj3i6I3tXGrh%2FQKlBEsQkJcXxy3hOvRQIDqAqORNDGLsB8foiSrSxKpuqPdodvjdTywuATfCRPOAYwSTABCDbf1hD%2BLNQkGtDqxdv9Jglslr1E3C9mQczDgdrDN7BZGpb&X-Amz-Signature=170dda590e6a3c2dc59326d2847268adc34a011b6aadf96dece6dd6edd5881d7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665JKNPBFE%2F20260224%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260224T032842Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECMaCXVzLXdlc3QtMiJIMEYCIQDvS9pXVY%2BtGgMLu7WmV1VSIn1qawoSqsPyWOQTjtIh4gIhAJKPD%2BBnhxik1WKhKDmhvzRDv17GYvZXhNjh3BL5%2BPArKogECOv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igz0VZio7mxRB5%2FhmOsq3AMAN0fTE0OJPFlWs6pCdlKDnU2tQw1gymRXIllOXgChK2VqeGCczdOkc8EASCM3aeWcuHcUMznMERG5WlPWkraxVkwSrxZER5VVWvTADvXCdZMU86%2BTAPXBNDwYPged6GSdCyl2lVIyCd%2FmHx8mDrpc5WMQh7UlDE2nJm2Eynv2WIE5N%2BFFGXkAhnHrdSVoktzXasYO3vxe22dSDnxXTr9xG1mMV1pkflyPc9GBcShyPXn6eNPP2bya31LLHu5Zy97sCSB0fb4QW0Rxb2%2BryVYN1nHkBYAJqPo9vpye3oc8tTWdY3HT6VU6Xed1lBfvQhQHTqw0TcAbyeGUiU3n1n6vIfUgpOnH1O%2FG17JN0vsDyozs8vPn5II18SWM%2BwjKWYSeeinZjqfKvim1TDXpm1YJ5OyI3%2B5fSPdapV40Ktr%2BsgctEFXs2lujvY92GalZmg8EvCU2bcbtKV9drMSGIub4q6jr0L5Fap9zoSyIWmsVFQoe%2BjTp8RF4DbHgQ38pTmTUv%2FxfxmCvP9i6QoM3gUU4suBg%2B2rVb7pUQocrjUiXVPKLd%2FMlWgek0d5UE15sM6UhM30rcEsOxGnUD40wC6hwPFbfSpcbFxmispeoQSr%2Fc7eTzyQNr6CY0Gf3QDCumPTMBjqkAQkvNTWZ2mLXFqBW7xYlnDdkUjbCNUS7t8UM1H7eJ%2F3pol7nRRtysza4Pv7eBXbJ%2BS4lFI3gVpGQkcjLVjrxViUFmSkGj3i6I3tXGrh%2FQKlBEsQkJcXxy3hOvRQIDqAqORNDGLsB8foiSrSxKpuqPdodvjdTywuATfCRPOAYwSTABCDbf1hD%2BLNQkGtDqxdv9Jglslr1E3C9mQczDgdrDN7BZGpb&X-Amz-Signature=170dda590e6a3c2dc59326d2847268adc34a011b6aadf96dece6dd6edd5881d7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z2QK4BSG%2F20260224%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260224T032842Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECMaCXVzLXdlc3QtMiJHMEUCIQCQxAzpw0yOF78KJnKHkXgtxSRAiXFX8IRLb1KS7GhG3gIgKLYEsADw1mm514dcQNUjSq1%2FEymVC4J7vxz%2FVs4XF4IqiAQI6%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDNWMnKRKw3wa5QWedircA1GV1Pu3TyAz0UjhU2DwDQkvWHuVMNzMWbmOXfWsEaEMITi%2FbcS%2BF2iTC5EpGhPPz7p2dWGAMSmT%2B1YY0D9V6dYXMyCbYVMANeNdj1R%2F8k8zUtuQTkxI5KMFN3ucFsO85o%2BogOdw3rGrljwCXb5ka6beKxMa8%2Fp2xE%2BQtNnYMUbfm7VUf%2FrPPGCABFZvOP5FAeVJTUQYU%2FlmSkJvpWS6YNuZgmpkAuwOb8lYzL%2BZBgN4JUHs0iJXJ9sKwkM2aRgWo4qgpUMgTbxmAN1T2Oz7Ntct1m34wqa52wbr%2B4sfSf97VYG6EpfJUjT9ogwGJdMOC5ssLx62NzuxAFKReTeqIn5%2Ff7j2gGtEs92n7UmqS2so%2F5K6n0DjxFUL1v43VrvSoE3wrUuy4czUB46vXVXYyiZYH80T%2FPEAaeZzO2u3MLrCTvmA293Ua5jw0OSg5prgr0OueI%2BUIAsXHx7omUWLiqo%2BDP8RILVow%2BuSvIOpxCMFC3Sbo1%2BBorwb8m1cSlhGlxu0LizVaJSBM9DcP%2FNCalnGvsxscGo9Fe2reFuZuB%2FN38FZnlLAwd3FPSXkGsSv9pNHRDPEoH6gzH4hZrFyRI%2F9gcFNsBbNRjwnyOGjTjDIt6f9%2B0wwJ7%2BYW2MKMK2Y9MwGOqUBSep5KxTRUTtfnUhZ0HtsaU%2F6LNaLo%2FGJWCjmndAfcU5jPyBUbVJAfk5rWzQBSBD5Xe8pZGhHuItAw4TnYNu7UgxEx9Qj3CYgk2HukutWp58UAkXiV6JQwC0Rg%2BzfmKs%2BngxQeoFvJbZrOP908d%2BGLXRf7SuRN8vXGBVv4XTYLxeKMLGlF15zcghlEtF3o9RpltNLz36ilJF9imAtKwiBOXFylEKN&X-Amz-Signature=1d0fb63bfd0e746d3439e7de949cfe58c2cfb2cb8e9ce9f736289d4207bed3af&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663ZU57I53%2F20260224%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260224T032844Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECMaCXVzLXdlc3QtMiJHMEUCIG3g4IcQc0O5JyCxR2cPx1CgxH6idxT7b3bZJBDNqS6uAiEA4Rte8y7lBqNvOk8n6PneKGqmwg34PPNZoyYgXnpa8b8qiAQI6%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDOhg4GgcZYqtEdt2tyrcA%2BUPxTMqHr094MAIOPSEoMSfhzH9TiB3l5jrxSNVCz7%2F4zxPe2daV7YQjP47FDrpCMieIi01A5qlAEy%2BPLY7lz1IU3Ut6cvtLcauS5DPVLTgHXYnU5L%2FwNYC8tWpWcB%2FSmchOKagACRfjI%2BoN4M13LYafwuyeXILxQN7DH7f%2BAVKxH9IRAFr5%2FucYuVBwLnKAJDCXyKXQ%2BFVfblm%2BvcNN2zt2iPwYm%2FcoF5TQsoi%2BaMPYb4yh2V%2BpcSxInN9Q9ZIK7DsNGJxvNqVyYqiznlvg1FelHwjGsxHeR0WK1mh5r93ZOYNTd7aRi1Fb07RcZHTYXZiXVEElw2JEwGYmyzlJnobcyMuelCudy%2FVZ7%2F3JoRMWpZa7xpw4VjySNdiiY88g10amnfMkA2bdZrwcvz0qAHFfVAcmZ91e%2BXbkonmF%2Fq%2BAFO2ydcLyapvK4mWcoI4DkW9atJWnvGBgRz4BSI%2BmXhDa5NW7rZ8lHUIscbECL%2FeC2H3861BjGKebhx5BxSFdzhY0HZcZtj5g6B89Vc95uyDngetHn3Z1PvsshoFUSmkH0vppi1bHINOQqjNYntGL68i4VHbwmH0n6STJDejW1iRDSdoSq6ZiXb4JpExN5Hd0zOEgkpWJr9Vg6r3MLSX9MwGOqUBnOowym99Qkmz0ku4YvfsmeFjpMg8o0SSdCJZCHTWJ5zDOZjTvriIhM6dLx%2BiIMn7F6yg0Y7N8%2Bj%2FxzQLYUJ202zH4bgXkl11%2BQWI9hKE7p4YlzTgiYphEob2fLGuPHOwxt%2FcI7UI3mZFT82JcjKc%2Bu1BQrIyLa%2Fm4%2FX0GNDpyATCNJzj%2Ff%2B%2BKvjGWTpE9juMPlQ%2Bea3og594nPjn233Mej1QNDxC&X-Amz-Signature=614b4e729fcb602b1e99f921c10c3a3b51e096f22ed31e4e80403ed30fd70ff1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663ZU57I53%2F20260224%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260224T032844Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECMaCXVzLXdlc3QtMiJHMEUCIG3g4IcQc0O5JyCxR2cPx1CgxH6idxT7b3bZJBDNqS6uAiEA4Rte8y7lBqNvOk8n6PneKGqmwg34PPNZoyYgXnpa8b8qiAQI6%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDOhg4GgcZYqtEdt2tyrcA%2BUPxTMqHr094MAIOPSEoMSfhzH9TiB3l5jrxSNVCz7%2F4zxPe2daV7YQjP47FDrpCMieIi01A5qlAEy%2BPLY7lz1IU3Ut6cvtLcauS5DPVLTgHXYnU5L%2FwNYC8tWpWcB%2FSmchOKagACRfjI%2BoN4M13LYafwuyeXILxQN7DH7f%2BAVKxH9IRAFr5%2FucYuVBwLnKAJDCXyKXQ%2BFVfblm%2BvcNN2zt2iPwYm%2FcoF5TQsoi%2BaMPYb4yh2V%2BpcSxInN9Q9ZIK7DsNGJxvNqVyYqiznlvg1FelHwjGsxHeR0WK1mh5r93ZOYNTd7aRi1Fb07RcZHTYXZiXVEElw2JEwGYmyzlJnobcyMuelCudy%2FVZ7%2F3JoRMWpZa7xpw4VjySNdiiY88g10amnfMkA2bdZrwcvz0qAHFfVAcmZ91e%2BXbkonmF%2Fq%2BAFO2ydcLyapvK4mWcoI4DkW9atJWnvGBgRz4BSI%2BmXhDa5NW7rZ8lHUIscbECL%2FeC2H3861BjGKebhx5BxSFdzhY0HZcZtj5g6B89Vc95uyDngetHn3Z1PvsshoFUSmkH0vppi1bHINOQqjNYntGL68i4VHbwmH0n6STJDejW1iRDSdoSq6ZiXb4JpExN5Hd0zOEgkpWJr9Vg6r3MLSX9MwGOqUBnOowym99Qkmz0ku4YvfsmeFjpMg8o0SSdCJZCHTWJ5zDOZjTvriIhM6dLx%2BiIMn7F6yg0Y7N8%2Bj%2FxzQLYUJ202zH4bgXkl11%2BQWI9hKE7p4YlzTgiYphEob2fLGuPHOwxt%2FcI7UI3mZFT82JcjKc%2Bu1BQrIyLa%2Fm4%2FX0GNDpyATCNJzj%2Ff%2B%2BKvjGWTpE9juMPlQ%2Bea3og594nPjn233Mej1QNDxC&X-Amz-Signature=d3d03fefac214e51e6564cd19d0ea54eedfba688aad775ea3af3eebf086e9977&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U5Z5UQLK%2F20260224%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260224T032844Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECMaCXVzLXdlc3QtMiJIMEYCIQC4xWxD6Rm1f%2FbyoLC4WxhLAUjvh1XswF%2FVM9dmxDYicwIhAPfyX6oqvUEYOnL4KNL6s75zzbG36X6yehI08uFURDvrKogECOz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igyf%2BCsJ41TP0YHtCasq3AO93FdUAD5HG5m80xee221GOILUmCgM7gLmO8TI1XpKOkRqNphvE5lSbhPZsL02KuT56TTnRSQ65DUAmCXk5gflrsI2kk7UdcjNOBAi2YnAQTfpxgX6YfvrNTUe1d8mQK5MdwT8hvIUYij1t3GoH1UFrm5unrojElgprnqyA7hW8pmUImC3l61F0vPKuw43VVPEk5hTybCwaA9lv29bJno0RCuFBE07bS7zu6G9ppvh5tRz1MrT3ynzXT3zIzeBHWgzAm2i4sn%2BAUVhELHCqmgWsdZnoRjyTtoQkzsLSKUsud4D6pyqBrlBFZFMLcmbVTYrtJUbZfuqBKtHYUw9XrLcjkxcvWY5fk3pL72rrEIj4Cyx2gP2M%2F7Vhs%2Bv69dXF0qywuFVCbeqGACY3%2FbJWJ29DXGZnytw8%2FK5Jt651JjKJEecqqlR4AAq3Jmz6MxkdeGqKwE%2FBDkQ4DjfZy4H%2Fgimljzlo%2FV0Axw0J6jj93cymHW9ycM2n29NNtsB6RpD9n66%2F4fzoU5kVdWvpwmWrSnBsUS0HnIGr4pYw4Pow%2F96GmofVjh5b4oPiQcIILchuabT4dpPKEwlHP7fN7Ig0a5aUWrJuU951gg4%2Fe92fWB35cfY3SF6VPMAQrGgUTDgmPTMBjqkATY5P8LCH388nS2N5MiFcXyUpfBvKAedfnnNATmSO%2BuInus6uluHB1FbY5lOUgGj7BtHArDuu6ThIfcO%2B%2BVt3n5KIkPnW4JN0h0fOhVJ9%2BVp22XB2Iml0eYhiwzzvDzqqz8YAv2WCF7L4jKAinP01Z1U3EJxoMZ9UcodWy5RnflPdUawv9AkkLTcBqQVyvK8FVlnaKjPTmr2txZtRXn2xdMAifIg&X-Amz-Signature=559aeadadd223c5192489e9a06cee03886c9aed5b8a263c69b124fc78a01eab4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665FGIUUWV%2F20260224%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260224T032844Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECMaCXVzLXdlc3QtMiJHMEUCIFxJ3C16XHRVAnvuSLhnc5ov%2Bp5%2B9xBzHbnN8fu2Uk1KAiEAn62vJmtmFb9e51MuBYgcnEmgt9J6ZH7XkuXSplZDRBQqiAQI6%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDHXrqPcMltbZUObPRSrcA%2Ba5HoWEwG1wFtV5HpUr%2B97W4qGCJNkK7L0MgobSRfbE7JShy7iBuufqhacvTPUXiIi2r6VYMz7at0AeKEOyUj%2BNhQjP9N32OI%2BSKrvY%2Bo7EQ0c0DtDMfdaRUYQKAxCa1eeV18Gjs8bgMRVFQmsoXkfkMOybGzs%2FxVz%2FnWrvbmjY%2FQl6jR1AGXtN%2BH4gfKEspS%2Fu3FcxzkuUoEk5NGwzVjwZSEl7SRyrBj9zQ0rzVycm9Ibz0nzxGfZhc%2F9Pcw%2BFVsKkqT%2FUAaaVQWKw0NvgnO66Mm8XR8zXYOO2nu%2FyAHvBBoagDv23jiWFx3Hj8oOLzTEJQiobJESeLI1%2FNrfxZ0PZWXGtK5THf6Bl6FLMZbZw7bAjHi%2Bn30deewWJmURofc8PoshnQAPA%2B06juFl4E7B%2Bq0DKOTsMAOTK0q6hlH%2B%2FQ%2BrkszCt8XkQXHOi%2FEYkTVAe7vluO5oqFD5wtyk9t6oE67pn8IGmxsnU%2BqeFDQ2qtJbwWFdgMkVGls02BsL6MzT0FvqIPt52TlwGIOV3zf55DYFwHFCHBfQvgh%2BqY2IVlWXE1CQu8zi8rj2F70EVwkNq10baGwJpBSLoVHpFz8z5pwkmwmj66UnK9WGWHK9Tz8HUwDZcJIg8Ek%2BSMLmX9MwGOqUBxYZ5n%2BpyOaqVIgqOwYAzOb910cikNW7IB6IT3XNNUwxqyu59zu79%2B0EurT1DQZPErBMGqZTQ2bwBTtDd23jPoahmNc5axgJDPIGbQ6dgADq51jxQ0VE6CubnzCAwap%2F8ni57KjMlOCF9u9vIEii21VzemlexmqGqybi3Sra4epSQpaefe0A7B%2B6Wad8vs7KEVgJ8dADTAld4g%2BOx084YdtWmzNny&X-Amz-Signature=c96d637e20dd2117af2e3b8db4c60d86fcc0438adc5cfc1f32a9aea1dafe338e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZQNMP5US%2F20260224%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260224T032845Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECMaCXVzLXdlc3QtMiJHMEUCIQDSlPwKbsuUFO%2FEuHBXOQQTY2MSb5W51Dz7ybwoIZQXywIgQlkciRyfzkX4JmsdPO8FMN1LqSdusvjAkJvGks2nsHAqiAQI6%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDBmoWEB%2BOkyhAllizyrcA7lU0nqRP1m1zu3CpBnyTTqP5R3Itl%2FXbuMF6UaGuzhU3cgz8slMfgyo%2BK3ip3ECk6oDuj7fnl%2BKeKcM4kE8aMv6bxYTLG%2FgWYk3nyCztJJ%2FU%2Fj19Hnp%2BDQk4Wppx1Ypz0dCUeLtykMZetAbx%2F1risnyDos9j6RUlASh26ZxCZMC9gir%2Fzh3gi41MAwPMEWT6NIkNI2aLOHnOe1HIcebMAlmwsyP6BdebKc6Uvq2%2FEgP9cR2%2FNZD%2BDGP3jP4g4gqvi5Bunfzunio5f2BwObqkNmedd9jON2EvEU%2F6GrGZW72dhbWvQjXxgHCWJk7Ig5W6KLcos3Myh3GZvIEV0QutEI6iwarqrpDJxLxL694j%2BCMz%2BRe8DuEiGmeE8CYk3w5kV0Azauu9B5m1VKzGtgbTxk1%2ByyoNSa9%2BKNcvgh6N6V0pQWliYqVf3K3zr%2F1I6KvKaBAmXok3DbUX%2FFHARY2vHSmFCPX13TacCC89WImvZLUZxDtzDtOA%2Bb4Zj1wS8o%2FGBWExPa6GaUBSexK2dz8OezFKRd7Iz5uDfnCUi4KG2gHobxdQDHM5UgvL166lB%2F0umO8D8mu3pn2q21ruZj4xNYcnV8y%2B6RMfT5qyEGZoT0WpImCT7uzX4%2BN9OH8MM6X9MwGOqUBh%2Fjie1Z8G6hRarJ2o6l9EnpuV7MX4YZFTusSucdhdkyKjaMfBo7Z2902pjU3SqJiGhsl5TQMGr%2BxfHOC1jsK1cP9X7L6AZuj0nYMMgAgkiRRmK1Oz7Tk%2BU7CJ1FawajYQpYgijY%2BOI2c2dKR3zuwsuyvyXfksGr66oBbzQY9yvBKywshlWsjNsOU%2FBlVctD9mc%2BYkiyoMmQlGFyvUp2QWuWna7k1&X-Amz-Signature=fdc05957cf5dd802a643098cfdc462cc36ba1b183ab2082978dd07dd3a8b837f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46653PPV4JM%2F20260224%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260224T032847Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECMaCXVzLXdlc3QtMiJHMEUCIQDeP6tTWY702slN5tjWWJj410WfqrJbIwKYIZ0RECSjTQIgXcw9Xm%2FF9hM5qt5tCBZ7KOwLcVmeYp3uYvF9lCB9mCoqiAQI6%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDKhPeTf5emhta5GHuCrcAzihoMWVKvHtqF6g3naogvAhKqdBQY%2FLaz%2Bulb5YEtiXKyfPW62h4yfrUTlx%2FQddmsztDtvJ7r03vHqR7jQj3MF7%2F5E%2F0uDozs5IIglXEInoQPIOMlB7YkZ8qy92l5mQBlWOjzOlCw9bXV5F3dVfOshKGEECsB1jYOYIs1ywRjvzZVSFQf0A3%2B6l0RRj8ib0VzjrMQQEIjeF8N2G2hGxrVLNXBrhRXncr4TYQzPBylGaCZ0kKzbWdBvyOMNgmNn68REJQE0kpWkHEPt6v8fPprsM01c1dyYp3q0dmnth7yAPhTeeVAOq23WFOBDGqVd7tTBCPR2nIGjpD3mSOfdCDPiBExIG6N%2Fm4k1hYr59Bl3NAEDORYXlKcdrFmdmpR9UymvRerM4x1o16IxWeunJQ1TkyZiMs69LCcJkI1MDwVg0rnnrZSRh2W603GGEkwUCSLJaNMgnR9JVsr4yp9eSj2t7RNdAzfXM1TfqjfWB1%2BG1fjwF4cThJ7gHK8wVcMbesUC0nfvxJw6diFksImeOT2lH0cC4KZBSrjl2u7l5gAC7Wb9N3mRs2yTeSD8hIdl9hfcT0aP2lF0fdegHdXxVoWxsZpSSSW7cl5YPVEipwZs9H9Vz5ZfRYcBNwEMaMMWX9MwGOqUB9%2BnSHkN1BIltQhb6MreNhnQI8qp02MAt65QVKQ8%2FVxBKWR2gbBwB58ZZ7k3qm7nKaElyQJqyvJKy37s5JgxzyUn3TWo1xd7wtqVnWLi6p1oADuRcc4cZgVCm%2Flp6pHbIBfs8M6Yf5B%2BmSJMVhtobnfHI0zs0xfjoOPzOGpEMlQonA1f7vO2YZiG2As2TSmpuy9YQEyvMbQJE1xy%2BYyESvWkXSug4&X-Amz-Signature=f99da386df901a00e2b0fe11d2d2ef7b0d0103d7745c7043970ecb1fbfc321c7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46653PPV4JM%2F20260224%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260224T032847Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECMaCXVzLXdlc3QtMiJHMEUCIQDeP6tTWY702slN5tjWWJj410WfqrJbIwKYIZ0RECSjTQIgXcw9Xm%2FF9hM5qt5tCBZ7KOwLcVmeYp3uYvF9lCB9mCoqiAQI6%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDKhPeTf5emhta5GHuCrcAzihoMWVKvHtqF6g3naogvAhKqdBQY%2FLaz%2Bulb5YEtiXKyfPW62h4yfrUTlx%2FQddmsztDtvJ7r03vHqR7jQj3MF7%2F5E%2F0uDozs5IIglXEInoQPIOMlB7YkZ8qy92l5mQBlWOjzOlCw9bXV5F3dVfOshKGEECsB1jYOYIs1ywRjvzZVSFQf0A3%2B6l0RRj8ib0VzjrMQQEIjeF8N2G2hGxrVLNXBrhRXncr4TYQzPBylGaCZ0kKzbWdBvyOMNgmNn68REJQE0kpWkHEPt6v8fPprsM01c1dyYp3q0dmnth7yAPhTeeVAOq23WFOBDGqVd7tTBCPR2nIGjpD3mSOfdCDPiBExIG6N%2Fm4k1hYr59Bl3NAEDORYXlKcdrFmdmpR9UymvRerM4x1o16IxWeunJQ1TkyZiMs69LCcJkI1MDwVg0rnnrZSRh2W603GGEkwUCSLJaNMgnR9JVsr4yp9eSj2t7RNdAzfXM1TfqjfWB1%2BG1fjwF4cThJ7gHK8wVcMbesUC0nfvxJw6diFksImeOT2lH0cC4KZBSrjl2u7l5gAC7Wb9N3mRs2yTeSD8hIdl9hfcT0aP2lF0fdegHdXxVoWxsZpSSSW7cl5YPVEipwZs9H9Vz5ZfRYcBNwEMaMMWX9MwGOqUB9%2BnSHkN1BIltQhb6MreNhnQI8qp02MAt65QVKQ8%2FVxBKWR2gbBwB58ZZ7k3qm7nKaElyQJqyvJKy37s5JgxzyUn3TWo1xd7wtqVnWLi6p1oADuRcc4cZgVCm%2Flp6pHbIBfs8M6Yf5B%2BmSJMVhtobnfHI0zs0xfjoOPzOGpEMlQonA1f7vO2YZiG2As2TSmpuy9YQEyvMbQJE1xy%2BYyESvWkXSug4&X-Amz-Signature=c624dae4fb535061cc140016d62269637a4b6ba492496ea68f28031f304608ba&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XYWBUHXN%2F20260224%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260224T032840Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECMaCXVzLXdlc3QtMiJHMEUCIDWN45RNd4XxZooz%2FhTb3pETIr4vo%2BEDkm7yXMFKbFNvAiEAv9KR75SueXZj5fPFK%2BbKTp5d6LPT3BxajR5JBbVDMmwqiAQI7P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDCjIjo%2Fo5t00zyjMqSrcA%2Fse614UeJWIavbLIHMgJC4hqCaVNHr7ZINFWJ1FoMOm5fx%2FrZcTcvUa2M7x2EIeAGgzMk4zGkbad8krkwwfhyFceoVm2WQEDANG6zdNb1XCL8FMO4CpaVdLTKHhOJdrHWLfaJ6UV73vw4giQq3YhsEoTc6hTpbfX7Q58lIjIL8f%2B6x0oR3r%2B6UnkCUqPrTTV7133CrhJnX6ZEqlSfJzbDSGMCZ8oOQ4STN6Le0II7xmWncH4oXwRS8FtzldiaXgMrVyuf3C08XNlU1wVTCauwgZVWEzhh1WC79u12%2BWRGpSqkhlGQVdoIcr18T9BAsR2adb2Qmkc%2BYH%2BRY1X96kL0Sla8ICP2%2Ffpqf0Abh7gUMP5xHVf7Yt5B50xrpow3DQ%2Fs%2BOZ2bBKxPxcw4tmdPbv%2F3ET5HXYTTlaVVOCywVZT6QZb3kXPBnqUd1dLF8ZoIPLl0upO%2Bl9rUT8xPzrBQV1lOfBl9ooti1IPFHLEnjtwipfggcmwzMavS9q%2FzUOfFXKx64e0tAKFvp2xSHIkv0joNt4hwUBlzQLrCv53T0rYBeE5z2fZK0rUkrWUPH0Vse2YxUDnNKczK25ftwasRfAdQfoLnzTREgzseAoK9gvS7IR6OjFSdckckeElCFMLuX9MwGOqUBHl1CZ0eaHTgG5PChD%2B240KVrk1sjZug%2FR5v6hADxHJDF222Pl%2FKxVe92QXU4dg67Kd1hhKlHb6i1%2FYnb1ZDjuVatXP8BapeoHH0p98o8wmqfyJudstRr57NUuUVgdyc6VhWV4bOEaOPGDMuN2gYJbpxnt6FgRvkHT1oqtXU%2FNhhhqrIk5So0xdRQLP%2BaUNJV4twhIUwUB%2BdsV93JhpB6UcA0bMCL&X-Amz-Signature=47b6c7a46159219f6c4ca8e609fb219d7d7f63c4d75c50300f4535527f279d84&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S77TSEBF%2F20260224%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260224T032850Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECMaCXVzLXdlc3QtMiJGMEQCIHp0rPe%2B2Db6rNz8SMnvwkSzya4rPbHZMu3Ltfc6lzi7AiBMNdFm3%2FX60G6NKHlOuN6rOsSC04nPqfansnLWOFgpryqIBAjr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMVD1steVEYJWDS9nAKtwD35BO3b493SDP0c2UJjqAd6CtUn7LEvSiTOUTfX6euqya8sv1t%2BfQfy6wTDLIp%2FBpLlS2oH9QvQm3KIuUEoWXobjmPiywvRKWfAdqh%2BzV%2BHXbEr4h1DnMJk1QjLVObj3G7m78LvTnikQD%2F3EkHH23fOLC%2F%2FCPOA5IV1I%2BiYRa4GPgAHuxzqiwyISkkRo%2B8X5MLhDthfgLLeVc9QQpJ31pE4NitPgX2OdhZPbQqDmP8LIJMmkNLJRcHt6UefnFPijboXIpLnKXofsebFr%2Bv57afa2m7klLrkfLl%2Br3jfEFy7EYJZlrCyTOnuXtQ4gMFODbuPkJ5aqkBma5yLzHZYJJ6LczHbKmzcsPkvD3OW0Vem%2FVhuyAB9yn4VA%2BLqOStesMmZyEZjbUz7dHv7pnDly1EVh3QC1kE0e%2FZgMt2Xy0%2B%2Fzn0RAY4oQRmYovxeOMWBnNmAdVkvGaBB1z5r1qxLuk4tVGT1sFQR%2BfM6Ru0gGTNeZ8m%2FZGkMy9fT2cEQyTx0Eny5r2vQgU0bTqP7qRpiCz0Z01jEdNK6r3S%2BHu7seL3kfCXtDsLfLGlAce810mykQhh9mcWWBIwTXub2QyyR1nXGjJo2cSlZouC3c5jw4%2BrAWglDMsiINrtTpY92EwhJj0zAY6pgG9FQhh3aw5OYouJ5UI9gfWOE7nSGdD365WCJdn0ZINXZYoH2uqvgiBQYRug37eM11Nr0y0yo5ev6qzynzbAPoHNRRS4euyrTAFLdAbaTHBWvZRWW06ErikXicTRGvcfMbYx0UpWzAoVCnxCTnjGFB4xvChV45lrQIJjis5Zp0uyZV9B7xhARXjLXpemqLuWepPr8i2KpLm1iSFeYiMKpGdJXlN2LMr&X-Amz-Signature=7ead57cd686b73ce46935152f7d570c60afc6828a6250a6b5e7d9c12749b99cf&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S77TSEBF%2F20260224%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260224T032850Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECMaCXVzLXdlc3QtMiJGMEQCIHp0rPe%2B2Db6rNz8SMnvwkSzya4rPbHZMu3Ltfc6lzi7AiBMNdFm3%2FX60G6NKHlOuN6rOsSC04nPqfansnLWOFgpryqIBAjr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMVD1steVEYJWDS9nAKtwD35BO3b493SDP0c2UJjqAd6CtUn7LEvSiTOUTfX6euqya8sv1t%2BfQfy6wTDLIp%2FBpLlS2oH9QvQm3KIuUEoWXobjmPiywvRKWfAdqh%2BzV%2BHXbEr4h1DnMJk1QjLVObj3G7m78LvTnikQD%2F3EkHH23fOLC%2F%2FCPOA5IV1I%2BiYRa4GPgAHuxzqiwyISkkRo%2B8X5MLhDthfgLLeVc9QQpJ31pE4NitPgX2OdhZPbQqDmP8LIJMmkNLJRcHt6UefnFPijboXIpLnKXofsebFr%2Bv57afa2m7klLrkfLl%2Br3jfEFy7EYJZlrCyTOnuXtQ4gMFODbuPkJ5aqkBma5yLzHZYJJ6LczHbKmzcsPkvD3OW0Vem%2FVhuyAB9yn4VA%2BLqOStesMmZyEZjbUz7dHv7pnDly1EVh3QC1kE0e%2FZgMt2Xy0%2B%2Fzn0RAY4oQRmYovxeOMWBnNmAdVkvGaBB1z5r1qxLuk4tVGT1sFQR%2BfM6Ru0gGTNeZ8m%2FZGkMy9fT2cEQyTx0Eny5r2vQgU0bTqP7qRpiCz0Z01jEdNK6r3S%2BHu7seL3kfCXtDsLfLGlAce810mykQhh9mcWWBIwTXub2QyyR1nXGjJo2cSlZouC3c5jw4%2BrAWglDMsiINrtTpY92EwhJj0zAY6pgG9FQhh3aw5OYouJ5UI9gfWOE7nSGdD365WCJdn0ZINXZYoH2uqvgiBQYRug37eM11Nr0y0yo5ev6qzynzbAPoHNRRS4euyrTAFLdAbaTHBWvZRWW06ErikXicTRGvcfMbYx0UpWzAoVCnxCTnjGFB4xvChV45lrQIJjis5Zp0uyZV9B7xhARXjLXpemqLuWepPr8i2KpLm1iSFeYiMKpGdJXlN2LMr&X-Amz-Signature=7ead57cd686b73ce46935152f7d570c60afc6828a6250a6b5e7d9c12749b99cf&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UOC3KRJT%2F20260224%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260224T032850Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECMaCXVzLXdlc3QtMiJIMEYCIQCvBe6qjZ%2FAk8DQA1ILgxbdBU69oiZ2zuTZdK2%2FqpIcLgIhAN%2BQJTDqPbJB2wOtw8dGK%2F3cG87vCb3KFVvtQOs5%2BUw8KogECOv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igxp%2Bw2a8SPBKXQtgPYq3APq3VHlVJhxiFxoiUnqCauRghj6czJlzYuaQ49SN71gPlYozlhIfzT%2F0nC%2FZAzwQK01sb71YSvgAs%2BIUA%2FLkF%2FxT5pRTnfe8%2B4ciMaa8pkfoiG%2FtYEqSTJvPJzOW8N3jOefcpGjR4uAcP0wvHcIuCcY%2Fv5WTBmCOjuwpJX7XtJvvy9pHPaqHwb1dFXuY0dzjVRh8SbzTJWly2acrYBr3g4SS3%2B3kqCdOEA0JxqgWazuFRPEQQk2puHMhf4MT9FswJl3Guitp%2BA3BPkkH%2FCe27CbHoQ%2F7qJOCKICFsQ1BIa6Ti3I8e9kkwLzlepmN32x2L3ERDXqGXu24EOW1BdayDfRN9KN%2B5zUX2gaYwsd9%2BZuSJNjUJj1YlYjcN1sEMa4tSXD14ek4lVwwpWfV5VVdMhIC3JtE6nt599vgYkpbptbmukbTyBKrLOG%2FLgMZldJJmqsug6gBH7tG5uI6kHSfkzKbSaaJRlN1JOumsnr9JbOXSqn8vGiIVS%2FPIqiNZqK77ks0w%2F1XGKv3fpeLFJa%2F9PdeFklWt88Wkfb6MlVCP%2F7fg6z3XQbJXLkRPEeO1HNq6d0fBnCpRqeesgUGVa0PY0AcmB041VylIzY%2FvlnZ8uTG5XHUf58axJzZObmszCumPTMBjqkAUpthg4kCM4IsGTsSSQon5M0n6MGYqTX9yXqXfxY9n1MfB%2BtsGJ%2BaV7NNS%2Bv%2FGmu0txw24I30cdT4v2N0u0nl%2Fxh1LXvFfRo116tmZAzb4ukkZP5BfvH26qQzCfQB4RaOKpK%2FJtRCUgqgwz2IxfS%2F1fHZXub7CXEIod0UHqdaYhsGCbjga74%2FEP0oDmOsDFLGGqij%2FGBy4bEwkmx5stGVT8DBmm7&X-Amz-Signature=a77e6f5cbd01bb28d46f822cd7dbfa931d502c2d1d1af3267465f397c0d565eb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

