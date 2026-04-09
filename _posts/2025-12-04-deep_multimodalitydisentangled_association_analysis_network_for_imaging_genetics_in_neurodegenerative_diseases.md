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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TF3BZXTS%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T085546Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEgaCXVzLXdlc3QtMiJHMEUCID%2FeZH60phdT8ttkYcS1wTANRPF9g%2BuWkKSZX6qcdmbIAiEAvilI2aUdynbJ6AzKplBdDIdky99apITON5hi57hvS8oq%2FwMIERAAGgw2Mzc0MjMxODM4MDUiDKEAyaizsYrzCCr3jSrcAz0FCv39QCcRIUXiRmc8PecGg64DLG2bVjXBqdBYqq59hFokluR7CBQdha%2FSOzmFYyySHLL9j8DyUbnymP9BfiBwMxPe%2FNS93m88cV7%2B3T0dSMKVONP%2F002gags3RpSDmDRCLrvI%2BFJIJiLTpyn8lOuZb7v1BMue6o%2BsCaKj30qV885mE0tq8qptE74vmlTY4fj9b5YuoN9xlzyFoetl4VoHahCCLcEORU8sft7Oqx5h8i%2BzDaaoO4fcZVOjF3wNd%2Fl4Cs74xocAxYlVc5F3mVUNPDU7pgqUgZhJnkMw%2Bfxl%2FNgCk3D0odsnZKfBGbrrb92H8eIagRwsYqbtMz0MGsYFjS1ba%2FPpWnnsSorRJE6c9IJOIl9nvdI1sdHWowW5%2BNAMbBvJ2Bt2AQkE0CKCBC98AaoVA0i2fz4SZMBKkiYFDbt5U80IMiwnYb4iQBi85bXEeKb4Kn2CciK8pnyj0NGYuflwX4LgcOJXxVs%2BhF60Vtyd%2BPGPo4BttSWwk1CSVYOIR1BX0kS1FKCIWvx%2BfU7ji%2FQwue5yxuCBRQJgscnNIPRfpzAJ104pLW1cdLb7ZdLDjz0OsFYZuuOm7B%2Fyueqt3YF%2FPFmjc7SHnDj5NPPJtN%2FJKjXzjBlGiCYaMOa%2B3c4GOqUBByZS2TXXr17USKzHaTEq9yvZ9HJyR0PoGiuRNEJo3Rd%2BcGdbpVNyYseoFJ49G96%2FaiDV9ZPO3leJrzGmBnDcoEJkGeazKtFv6886cNoFUlhGg%2FwkUb13YWHMBzIVfTAguAKZHowJkwuxN%2BjJRhDOAaUeIkQ%2BXkUCuZbdNMLcBw0JZkTfW9t9RdG4dzUeIHoOisPg09MKNfV8CqF2aTbnmX%2FYtEMr&X-Amz-Signature=58683c33ceab50d0379a3f535f1aeb30a74dd505d0f80821ad9cf930b3dea0c1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TF3BZXTS%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T085546Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEgaCXVzLXdlc3QtMiJHMEUCID%2FeZH60phdT8ttkYcS1wTANRPF9g%2BuWkKSZX6qcdmbIAiEAvilI2aUdynbJ6AzKplBdDIdky99apITON5hi57hvS8oq%2FwMIERAAGgw2Mzc0MjMxODM4MDUiDKEAyaizsYrzCCr3jSrcAz0FCv39QCcRIUXiRmc8PecGg64DLG2bVjXBqdBYqq59hFokluR7CBQdha%2FSOzmFYyySHLL9j8DyUbnymP9BfiBwMxPe%2FNS93m88cV7%2B3T0dSMKVONP%2F002gags3RpSDmDRCLrvI%2BFJIJiLTpyn8lOuZb7v1BMue6o%2BsCaKj30qV885mE0tq8qptE74vmlTY4fj9b5YuoN9xlzyFoetl4VoHahCCLcEORU8sft7Oqx5h8i%2BzDaaoO4fcZVOjF3wNd%2Fl4Cs74xocAxYlVc5F3mVUNPDU7pgqUgZhJnkMw%2Bfxl%2FNgCk3D0odsnZKfBGbrrb92H8eIagRwsYqbtMz0MGsYFjS1ba%2FPpWnnsSorRJE6c9IJOIl9nvdI1sdHWowW5%2BNAMbBvJ2Bt2AQkE0CKCBC98AaoVA0i2fz4SZMBKkiYFDbt5U80IMiwnYb4iQBi85bXEeKb4Kn2CciK8pnyj0NGYuflwX4LgcOJXxVs%2BhF60Vtyd%2BPGPo4BttSWwk1CSVYOIR1BX0kS1FKCIWvx%2BfU7ji%2FQwue5yxuCBRQJgscnNIPRfpzAJ104pLW1cdLb7ZdLDjz0OsFYZuuOm7B%2Fyueqt3YF%2FPFmjc7SHnDj5NPPJtN%2FJKjXzjBlGiCYaMOa%2B3c4GOqUBByZS2TXXr17USKzHaTEq9yvZ9HJyR0PoGiuRNEJo3Rd%2BcGdbpVNyYseoFJ49G96%2FaiDV9ZPO3leJrzGmBnDcoEJkGeazKtFv6886cNoFUlhGg%2FwkUb13YWHMBzIVfTAguAKZHowJkwuxN%2BjJRhDOAaUeIkQ%2BXkUCuZbdNMLcBw0JZkTfW9t9RdG4dzUeIHoOisPg09MKNfV8CqF2aTbnmX%2FYtEMr&X-Amz-Signature=58683c33ceab50d0379a3f535f1aeb30a74dd505d0f80821ad9cf930b3dea0c1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YY3WUS7I%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T085546Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEgaCXVzLXdlc3QtMiJHMEUCIQCDxg6MesDc3n2UndxzPxFu1Dw1FApLTDhsK7yE3uE%2FiQIgTUg5QGyWS2m2Z1fhNjYMqQrvsHPAHXzcM0ahFJ%2FwbT4q%2FwMIERAAGgw2Mzc0MjMxODM4MDUiDC33e%2FdhaIAupsBFcSrcAz%2FIHnt0IM0L0emIgSAXaP0%2F2NeZLC%2BT7d0pz5EmUWF0cZIJE%2FEVzwvXpMin1YJnx8%2FMfLqCRBDQTGQvZkz82QxDzTFyDOz1qZct1%2BmwNRiOkbyEAYYjLXTy7XGTvVBI4ebAomfwimV17wqd32rtxfvM03nMUy2pRWaUw3QV2E2oh8p53%2BxhJ%2BPlHRXXVlbQC65zjVWXDUw7FJVyG7cPtunHZbhxHsWbNAz5bJky7ymul%2BQ6vibe97I7KVrOCiEOQN4OyoCfjvdH5vqaYP4AmRCd7xCqtYVsxNd4AYR%2BlMzwEYApQPLtTIRtyttEW%2B1UORs4i2%2FgW6CfPg1r%2FTeuihGL3GWkqoxP0dJSZia4vzOAhT7M81E6bYw4lh0R8IN65eGn4WhkokIflBckVW5jikLIlfzOv1HrmGCQjMRCvKCS9pNDn99XRJARGa0UURRxNlJ5EKbYaGXdtIgGN3P%2F0XyCDHmBDR6F%2Fa2%2BfCmDsVFIaLw6BfFXm7JYbkIvINUnk8WQlGIl6zZa2x4dXHcdauxhG45dN5DB%2FFVuaoqFFyH%2FUcn%2FFERjTOep7YiQGlZKLQ%2Fj3UYE9VzOlg5HXU%2FjcCGxeixXZdNNOnH2HYs7l4oBkBrUAj%2BgX5j0LjwjMO3A3c4GOqUBEKgZtyMKF6AQmgA6qc%2B%2FyLR0TSo7Ax0OlNwYeTV1SLj63LGFO9%2FjZtHPEP17K7%2BxjeKI18bqGP7sJJ3LvSCYtp05FqxrpaXoul3eAJ7Ho9bPuUQMyuXIoLggX%2BY8BGZEnbsxSVene%2F%2BvFtjx8gxEeigiSYP%2BC2FvgtHpM6HFy%2B5WZoClpmXvG6sGkFW0ueC982cHsaYWyVYkyIp0EzkeeCEiCwQm&X-Amz-Signature=54bcdf4c523ccd3ec803ba0bcef351fabc33245416cf14cc4c496a4d7520acee&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XXXHM76Q%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T085550Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEgaCXVzLXdlc3QtMiJHMEUCIQD0z4PG0Uk8yoANqj9cPKOi592ouAS%2FrEjUUsdoajr1%2BQIge6UvYLh5ivK88STw8nyEPwqL4Q8hb3ntJtxQzOWR490q%2FwMIERAAGgw2Mzc0MjMxODM4MDUiDIFU545kMTEhBtWfRircA2EkN0PO6NRNo%2BLVk181ivvm0HgoEX%2FCdu3PQ%2BV42a8HQTpvLCz7U3KXLdQfEZxYoQckoJBTx7A%2B8njMB2qVBtFPrMFWut%2BNaPQwTPIpM4QtPIuda9s2tDD1SqSBHRI0%2BB38YnzyvO5IKsIzygUfvTSlhEVGEHUvpOwAlc99yCCXg%2Fq1mesaiPQw036rFoOFGPUlykE%2FqMaN6wdhWKdoMzEFEceHmct4KW5fBaj8GYta3BhXkVt2e0rDSOpbHauy4ouLi18dlqCiFxleMTQv2ousGgcBWWE0MOovTQL0wIiD1uX38GZ8rGm28%2B%2FlPPIC%2BPCHdwSo3Q2i4l0nK9vnVeNH7cEj6QtTh2bG5SsLPLA2K7VC4Xfw09fTeekjkdFQhTq8%2BmMuD6yi%2BipqauKlg7dLvSewyMXwdw2JvzqI5C4W96NM8%2F075i4L70FlIWys%2FeapDeUWg67bjnPLWKOIpvJRgkUj3r8UVbTuWAbF2FHLYRa4cXZ3TcFSDMNkVZ3m%2FZsOTPdf2AAr21OWGgmnfo1vCiCW%2FlAEsDwUpZRnpXXvJQCyGPeZUdkuwsSQYHUjlspstM7jwn5HqAjB67cvnYHQJCqCND%2BE5%2FrvbFmkKpGVNo3uZdj1I7isOY%2BbMO7A3c4GOqUBnkKIR8vXh9ef15pgIs5DdLhPNyCaghUqwKVrkCsb88TAo1Fhi9Iutiaz4vyv%2B3mhVB%2F4wbPFAxHMeQcz%2BYsY6zb4aj7BzJnmxIXfW2vulXOs8l9I8AHofhAnLlaBe9EK6PNLyPfuoz7TQ4cDaB2kGpimmW7oIO4wcON9Yc8e6Jw6oNo5nYEvYvRluJB7tpSRObojFo%2FMnzdKgTfrMfVrO1TFmViw&X-Amz-Signature=c6737568351ea73509839b8c21308e8dc01dbd96db159889555d456294d38bee&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XXXHM76Q%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T085550Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEgaCXVzLXdlc3QtMiJHMEUCIQD0z4PG0Uk8yoANqj9cPKOi592ouAS%2FrEjUUsdoajr1%2BQIge6UvYLh5ivK88STw8nyEPwqL4Q8hb3ntJtxQzOWR490q%2FwMIERAAGgw2Mzc0MjMxODM4MDUiDIFU545kMTEhBtWfRircA2EkN0PO6NRNo%2BLVk181ivvm0HgoEX%2FCdu3PQ%2BV42a8HQTpvLCz7U3KXLdQfEZxYoQckoJBTx7A%2B8njMB2qVBtFPrMFWut%2BNaPQwTPIpM4QtPIuda9s2tDD1SqSBHRI0%2BB38YnzyvO5IKsIzygUfvTSlhEVGEHUvpOwAlc99yCCXg%2Fq1mesaiPQw036rFoOFGPUlykE%2FqMaN6wdhWKdoMzEFEceHmct4KW5fBaj8GYta3BhXkVt2e0rDSOpbHauy4ouLi18dlqCiFxleMTQv2ousGgcBWWE0MOovTQL0wIiD1uX38GZ8rGm28%2B%2FlPPIC%2BPCHdwSo3Q2i4l0nK9vnVeNH7cEj6QtTh2bG5SsLPLA2K7VC4Xfw09fTeekjkdFQhTq8%2BmMuD6yi%2BipqauKlg7dLvSewyMXwdw2JvzqI5C4W96NM8%2F075i4L70FlIWys%2FeapDeUWg67bjnPLWKOIpvJRgkUj3r8UVbTuWAbF2FHLYRa4cXZ3TcFSDMNkVZ3m%2FZsOTPdf2AAr21OWGgmnfo1vCiCW%2FlAEsDwUpZRnpXXvJQCyGPeZUdkuwsSQYHUjlspstM7jwn5HqAjB67cvnYHQJCqCND%2BE5%2FrvbFmkKpGVNo3uZdj1I7isOY%2BbMO7A3c4GOqUBnkKIR8vXh9ef15pgIs5DdLhPNyCaghUqwKVrkCsb88TAo1Fhi9Iutiaz4vyv%2B3mhVB%2F4wbPFAxHMeQcz%2BYsY6zb4aj7BzJnmxIXfW2vulXOs8l9I8AHofhAnLlaBe9EK6PNLyPfuoz7TQ4cDaB2kGpimmW7oIO4wcON9Yc8e6Jw6oNo5nYEvYvRluJB7tpSRObojFo%2FMnzdKgTfrMfVrO1TFmViw&X-Amz-Signature=7fc0ddf0a3af225e9e29d8918254edd5ab88160acbd0bd77ea92bbd941512a73&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZG6IJ6UV%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T085550Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEgaCXVzLXdlc3QtMiJHMEUCIAir0Zwoq0ytqKE7ROxkliC%2B9Ag7tKSZcY7mWqBSLLqMAiEAk%2BheDu5WtUC5llldCnZ705Fz8F7FSyjXk1whoGSyNeIq%2FwMIERAAGgw2Mzc0MjMxODM4MDUiDPEuoSoFzhftH87T5yrcAy%2FUUKW5o6iFyUTj2Y%2BuHnWOU83IshOOlOW6LmMYg5l6ZudjjJgFm8XT07lJOevyeMpNecAcNkaNPGCNb0kkU61LMUy6O8a2WuY6tHClo6QCD2JcdlYmf6FbWzfcJ8JZqjsok%2B5T2mSK4Bi6SyuywXLY46kaufQ49%2FjHq6pE63hRKsV9%2B%2Bh7m0eWCalnvjRGNevTvY4U7elyk6ZBdQx0Ab7N6ZzEuXyJhrK%2FnxEXF5wZoBDFT%2Fg163X5C7LMyEu5AiC%2BklrPyflHWgM22PK8EKIE0wPczB91WcQQtOjU%2BEtReuafzgzcMvGEKnl1%2BBjtF4K0rgCMCmmZ6tdD%2Bo4JsH33KKzVmWJgLf2Hu%2Fh%2FfO8iqStPboN8O898qWAKdgoK9X7YDWEd6FsTrkrlgJ%2FSaT2wJyLFRXrfGyvrs90yd%2BSIq6%2FfIF9XBgc01hU%2BKZzPztC1Zc9bzmQm8WEYP2FFRha3EJz8ZPFmjGjrbhkHq7RTRVA1vJ10Ognz%2BmbnNDaTNI1tNlaj%2BUkpBVZZ89XFK4bRS5nN822jYSx4RUMQkg8fzDkFJ65D8MOJ12PuJE4dVVq7cE6YRuz4N1wDGHR0YnLYAhhS1mKwWYFLpNtlXZlwfv%2BDaYbUqUUNTzBrMMbA3c4GOqUBCdhX8WzOOlsWq0hfBcwJyVLbhpErWflU4oZjnEXxchYuZG83ANCcZyHLR62Hm6%2Fd3zkcfKyer56wvMqMIUUKrk51whjF%2FPQsnviDsd%2F902TekJsk21PCFqOGzz7Mw5yY1MtuLcHpilHpia9rHEgpjShioBWZpiGR4hcmDFy0PgZYDgSwl9Bz%2Bhu2kkVfIiFoPcsfT8zUGyJ%2BdS4XNRIi1%2BRycB%2FV&X-Amz-Signature=9b49fe686ed73145c1d672f342e3050b902cbd999713a21d4347a0c42af41d36&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YBDQIV2T%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T085551Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEgaCXVzLXdlc3QtMiJHMEUCIQCMhtF8YGjPNdxWvjGrmr%2BWYaA2PntF9wgQ2EtZ3w%2FAgQIgUme2ishYUsouVUGKbq9VPzaMRkQehtEjiXj4bCBWa9Yq%2FwMIERAAGgw2Mzc0MjMxODM4MDUiDJa%2B0QLEI2stSiSCRSrcA6cCly0xiU1Q4czacbMagLDSW1is8JjEidomxIoHXy7oUX6FO7iI5b8K4LbCQ59FwwNspx%2BTbtz9N39zC6h%2F5lB6MtLL%2Fx9r7fx7nt9%2FJ0Qalxx8dckJCq8UtSCUJW66yREsjo7hM14JHjp%2F%2B3FcfXk%2Bp8gsSk9SkNlnGLnG0Oe05yi78bjswn1K3Z3xeXzaUaYf5e%2BEpZQhcpNMO5c0LrPHzHDGHhW2ytbXRGmAwtC7TJnXNMgDsXNqNuqOeKcSeTsUgevU7Ic8Zv3UvGXgQmkRB7H9y7e1trrPepzVUVL2Xtwv8TQVbnVW9yNaqoGpuMgxljtMdAXIUvAsjBlSqKws5jHWU4Ka5sb9xKSxLVAgY19Vm2KavtwG3jdAJv7vH83ri7icBDoAg%2BOXagpH5migtdtSvO6mhQYgel92zj3pdozo%2FYD9Q4EJLgqifDWsD6BKVrGNRe4cS1zg4mXZSq4Mu%2Bbu3cJ14fSToSV7463xvpzMQxThTN7n4vHY81v279z7U%2FS2HiZHKOmhUHthXJ9B8Ybp9rPfbhfdCq2knFmsrIURjBRqeizHf%2BO17CsOtiJsZbxjEvnBmH7QTVI9PhNTmw5rL8iNgOMX2TYduG%2FBdQRKXptOkbg565TaMIO%2F3c4GOqUB5OPfsy8DnEcIryXrDD8eEMBUbcVhfdmFd4TLHkgHkwlpS6gwD4%2BDLFdnnky1tHic%2FkLG2ljf%2F%2B8P0Pp6CWBhdpMEId%2FeUOcvdioW4QTy6yADG5Lmne9W03sdzA8HNzBo9EV%2BHNK32UPLH5W8VFlD3ljI0Bm66epriXE8zKWAiSYTZX36D6VYRs6VegvbwynkenvK4cenyUZhFk2cbR4%2BBc0Ne8fi&X-Amz-Signature=8455bcc8e7d6e34e28a2fdc6524808a65e0918c27e6b0a2a8fd4e9efbbba009a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SQXGTTHM%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T085552Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEkaCXVzLXdlc3QtMiJHMEUCIQCJVuFXApfXyrNh2hYj8uXQXSLcOI4%2FgdP6I3%2B3bJ8L5AIgXL1Z9DEWaj6dBvx5PKn3AzaeHhTWCTGw%2Fb9nF5ToY44q%2FwMIERAAGgw2Mzc0MjMxODM4MDUiDLAQUoHCiSBSEGrCoSrcA%2B%2BQVAVJOmvSFmWKbOeqeheM0z0X5KyWjM4tEJTOgpHEaBNk8huWbG%2BHJqINnout457i9cLZ2wO40DoiPXaQrT8UGdKYa6CXWaRcgBWxK8o%2F8hCDzUhCNCmA8qqQkrj%2B%2F92HiRma5NFTwnVLbpg0A57onxeE0%2FG8jJXRuTH36RZAQy%2BJlEFuZvNiR%2BBkAMK49iljVfk8oQbtKZ1P0x5KJccFUB2OgRm2R39TXV%2FJQ5MV%2FFLMTx9OuxivU6LO6d%2FfxBatNlzlc6XdmSUEq2jHKaPzVOmg%2Fi4iLNVujyzNxkxLSf9cuEsV7b4HTQfMeqWUYqdCfDuhZ%2BsS8N0A1TywWowOrax7x0V7SuCE4PpuaByPz6N%2BYxxUBDf2tm%2BMfMsimn3uRP%2B7pqne0saWnq7i4H3DPp%2B43sH3IwxLvioL8tJ81tMFHvfbrhXaWfUPnnaLZp39QOIMexkvtrQvEQzgRsY97tOKi2Ferx4%2Br2Zoux%2BAmMGm3ozKCAjXcaDD3KbobEJtglK1pX7QxoxYVtbApwgkN%2FNbifu5eRx7wCuPJQBMMsx7mVabM3dlKoeG7khbKI06Fr7klX0KSuoXwto4kJHlPVdS42jAPjO5vZ4m56pvb8x%2FWUKFqjUjJV6WMKLC3c4GOqUBN8%2FH25FSthynMWTE0g0D9DxWOxxcKZiHXM8s4aGQwTEusRj0T0SzjyxyBhCLnRf5gu%2Fkxt2JjB%2FRYu54Ic81aU6pcAQisRHEZ0E4yLXepZGuwBUDYk84LxWI21SwR3dNy%2BhP6Gy8rNM0ZA0rsWyB5yt30c2o9qusFlmCD2FenAdvf76fhCCz%2BVLs4T8jEd6BO5bppupl%2FYJ97NwUoyb2bn1rYyGh&X-Amz-Signature=95b31b2b5232d41d567e989c23f55d10279c30ecfec9055ac121f7e205467d9c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WS5LXSYC%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T085554Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEkaCXVzLXdlc3QtMiJHMEUCIDWkAtN8IGWSEjoTaW0Yc%2BZY8Hx8vuZhpHsqAtSKen1oAiEA6%2FsbRNP2t48yM8aeZQV1veP2KTXjxIsMe2JFM7sbIJkq%2FwMIERAAGgw2Mzc0MjMxODM4MDUiDKM%2FKWZ5pP8o3rpr5SrcAz%2FxS98tgfTmYZqc5popx%2Bwdbau%2FB6VQYrWCLYXoy07jndLuX7ueYQe0R13G3RouFl62JufNJae8LqNwoWTxV7AQ8fAeesV2Zn89l%2BK%2FV0SesDkFOAjhx%2FWBw5k1mwjfGegdsiNkBP6aXRyK6uXRr5tnwxElgvuBWeiLFckgvNWC5gDmwp9h%2BdolHpqnUpuIbG3P%2BWU27t3%2Fd4AMj8wWPkfMrj7unUKx9zubKpNlwz%2FeyhQy08l1PlcZhSsOFfCCfEkzK80m9ASW9YzggSqrFi1zFzvR%2B09UFiQl8LC3zM3CZUMHhoFfR3%2BtvVUbKh96OcZqocotwMA1Jq6OJ85iV09c4dSeYc75%2BHHCMKoXmHbf3%2FN3nduVJfGRp8%2BLhgOCYMS%2BPYSbldsEDIWvIAC2sz9I%2FL8IUbB09rkSBSKXGiFMqpzDEyNZNMVw0IhQjCU3p%2BtjtzCo4%2FMk9NWio%2BGkhxJqyTeHjYmUDCu4WbTSR6uzcip28APPDZqv%2BpqFhocYSiLVNDOm6Vvd5dYsWMLHLclmUyn%2FK88L2GiqZfFqd0VCDMljiICRsEyBq3K7q4G3pQAlcgRN5MG%2FDpJRzL0yt1vJw7Jx7ktn3B9N0UrAVKQSmWEZ9qTyfsZMYNJ5MMjB3c4GOqUBgasWywHY5E6syMYc6TQteLV3sPoEE0zh2NU%2B1b9l52ZlGIc24NM33bRrAft0ii2VFng1RN%2BeZROH1rw%2BlhjqQGobkR70FA5OyF0aZlHUgEIOkGgonMJjRlJCuWcS3Hi9ugWKtAGuEr7BWfrpR0OjJ2nD4O474hYG029cIZWKAHJQmPQhrbZlSIJiK5ye6VtRkAEOPSH33lenNvC3tthCWry0Iy%2FQ&X-Amz-Signature=0a1e9f12fabe66b78a92aa714b6c90028df7d99088b45031ef43aa1e5ac4638b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WS5LXSYC%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T085554Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEkaCXVzLXdlc3QtMiJHMEUCIDWkAtN8IGWSEjoTaW0Yc%2BZY8Hx8vuZhpHsqAtSKen1oAiEA6%2FsbRNP2t48yM8aeZQV1veP2KTXjxIsMe2JFM7sbIJkq%2FwMIERAAGgw2Mzc0MjMxODM4MDUiDKM%2FKWZ5pP8o3rpr5SrcAz%2FxS98tgfTmYZqc5popx%2Bwdbau%2FB6VQYrWCLYXoy07jndLuX7ueYQe0R13G3RouFl62JufNJae8LqNwoWTxV7AQ8fAeesV2Zn89l%2BK%2FV0SesDkFOAjhx%2FWBw5k1mwjfGegdsiNkBP6aXRyK6uXRr5tnwxElgvuBWeiLFckgvNWC5gDmwp9h%2BdolHpqnUpuIbG3P%2BWU27t3%2Fd4AMj8wWPkfMrj7unUKx9zubKpNlwz%2FeyhQy08l1PlcZhSsOFfCCfEkzK80m9ASW9YzggSqrFi1zFzvR%2B09UFiQl8LC3zM3CZUMHhoFfR3%2BtvVUbKh96OcZqocotwMA1Jq6OJ85iV09c4dSeYc75%2BHHCMKoXmHbf3%2FN3nduVJfGRp8%2BLhgOCYMS%2BPYSbldsEDIWvIAC2sz9I%2FL8IUbB09rkSBSKXGiFMqpzDEyNZNMVw0IhQjCU3p%2BtjtzCo4%2FMk9NWio%2BGkhxJqyTeHjYmUDCu4WbTSR6uzcip28APPDZqv%2BpqFhocYSiLVNDOm6Vvd5dYsWMLHLclmUyn%2FK88L2GiqZfFqd0VCDMljiICRsEyBq3K7q4G3pQAlcgRN5MG%2FDpJRzL0yt1vJw7Jx7ktn3B9N0UrAVKQSmWEZ9qTyfsZMYNJ5MMjB3c4GOqUBgasWywHY5E6syMYc6TQteLV3sPoEE0zh2NU%2B1b9l52ZlGIc24NM33bRrAft0ii2VFng1RN%2BeZROH1rw%2BlhjqQGobkR70FA5OyF0aZlHUgEIOkGgonMJjRlJCuWcS3Hi9ugWKtAGuEr7BWfrpR0OjJ2nD4O474hYG029cIZWKAHJQmPQhrbZlSIJiK5ye6VtRkAEOPSH33lenNvC3tthCWry0Iy%2FQ&X-Amz-Signature=2e645540016f0fbd0a8ac682d9c73528dde501194623244e503ab26e9d3ced40&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TJ5RM57H%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T085543Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEgaCXVzLXdlc3QtMiJHMEUCIQD7fnMQ8lKvDw%2FcmUm0vXGxAKXlRdgUFcYIjI1we9l%2BCQIgUBiHN9Weljjn834xewfo1pCd5QV8MRUXinkbMjBBFqoq%2FwMIERAAGgw2Mzc0MjMxODM4MDUiDP9DS4WqspaYJs%2BqLyrcA84IReOqqbTLQGGCryajokmYEPo6VxVXGt8QbxlptOYmR%2B10eDL%2FIRVEQ11wnqAP%2BlUZGmRPTyNAWkz2rEI5Lerjpq0v3jbaWoBcbuNAr7MWFOVbutFzGjq1vH%2FHUHf6Vt%2FN0dw3It6UatQTdQYRbQXvpJs4clAbRRTyvSTPPxdbXiVR7MW8seguovHP5LD002mM1Nso0RO9SNz5eOG9wz9s3X5hlBH6i3owZpGrpUFhjemxmoqkwzbAhW5m2k1OCfP0YKjMc3cqx3aiLiEL6ggvn2tTj3XtktvRZgNyGzQf54BL2lOkLYBeLfgNsjZXsTvPJzRHGI0lWOnEioxqsDJlU%2FF8Egb5v7OoJgTuMw47AjfFFlGMDyaAFRicwScPmXc8odkaVfiFioea9YVotQy1%2BmOLbS2WbiZyR7t7xNCyyeBG%2Bxq3LaUEgZpjB46JE3s0pHUrSR9PCdbnauBQVZD%2BzOQBPDgSrUm9h2CoZL5IvkLpVzcc0oATwN4iBhaujmWuhvYYpzXDKA2NUZGvo2taNZm%2Bs4zKE4cHySFzHfFuKStG0U%2Bx3dcyco3d%2FPBA1GnHyG2skaMwE3MZ5jiZ%2FNL2Tn4dvAPSxAc%2FxC%2BQXtJnLASUEY7qEG5UIefhMIO%2F3c4GOqUB7gBs%2BJOwM%2BFgnwDItxkgsPO7LGY9wO9hkAK9DSwSLSFsXMb1UTtqJb6Ag0EeobEWYvN1y2pBJfRIJ%2Fo6hha8UZ34iiYlmO02Qt5qh40qphhTs4Hxv5ZV56gPfxtojaylXabT8i2uhMk7OfHL5diaDJfflVp1Y2CWXt9jmdi0neNpHR%2Bz9Ypt3yZ63lOSq9abitjOSXAgX8N2e0Ri0486M4WdOT9u&X-Amz-Signature=1fca75254c6de7bf9fdf3fd59e5668e516e94bd9902a147e8f117aacfeec1964&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46624OUACDW%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T085556Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEkaCXVzLXdlc3QtMiJHMEUCIFBTpPJgaer%2FA038WLYaSa6qssB20rIfoQ4uYvqUXhlsAiEAt%2BSrtusSms%2FR2gueheMQDOp36orG%2FxCnXkrrjVulJHkq%2FwMIERAAGgw2Mzc0MjMxODM4MDUiDBYi%2BP1jirTYsdbwgSrcA6p%2F%2FweilcIPzlYFmJ3y%2Fyy3OA%2BTmijavoiDakJmli%2BwZZEFdQY6KViPlzY3X3YTad4zZwRXKcyXuWgl3bR5668MKLhjXlbdfGT3DUrHZ4VP%2B15PxBHbs5QqFJCycChkDSDfEt%2F0MeaSRUgGwpXED76XpanA8bKDRbaln3YbG6HyWdIjlLY0xqSguwOph9hzOEZl8jKazfFSqUZeBUoZ%2FnivlUdF6TP0MOaZJmq66DAXCXc1qqqciP2OjxDIhwsQJMTT8pfhMlTK5dW5oszxCi%2BGBjlkruEtBQXQ9dSbOLZnsIsAvqoww8dFuhMOWlX3%2BsEdB6xzvZ6w%2FZktBdPmVtSxw8U3nRZvFnkFsKmibRGkjjGnL9VW4m3MxXXV8mTOIjDjIGwUTDOWz5f8rVFxKF0W2Ca1grG7E5hi4axemchHr8O5dxZCBFGFsmKGRsqBSiAo2czKS%2BLiCvd6nNd4BTmBMBQikDPggl1HNL7W%2FKjr9dbzDFBasPM0LnjUV08QT6gqRZgtWV9R%2B9c6B2nBjJfm9oxcUIV3QyxiuK1FFRW97HVE8FW3%2F2Zzwsdqm17sVJJdJQQaTlYFNzFEGT4tkm%2BeuzmqyFNF6E9aADBclLH4uk3ZNKoC4njlNEBWMLDB3c4GOqUBoh2jZ9bcWtsrvXEEgYw56BEwbUOnF3zM8q6ADNkePYUj%2BCDSdquM0zC5sH4wRMzZHNVmrr61TXgjwg5xa5NtDdVKHQxx1Ms0qYxV1v2ovTCkzRYRVltwxttNZhBzpXCgXYCjbicBb%2BhP6EWcUPkgfzOWbWqAQ5UymMTydPi%2FKySgdYYGetOw8t4Nn%2BAc3HHyNsdvGtP%2BniDwQP%2FZFc9Enk6NLrX6&X-Amz-Signature=c6b4e94a731a033d6bbbd33103207741ff344fa82446520f39109ad0f8969d6d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46624OUACDW%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T085556Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEkaCXVzLXdlc3QtMiJHMEUCIFBTpPJgaer%2FA038WLYaSa6qssB20rIfoQ4uYvqUXhlsAiEAt%2BSrtusSms%2FR2gueheMQDOp36orG%2FxCnXkrrjVulJHkq%2FwMIERAAGgw2Mzc0MjMxODM4MDUiDBYi%2BP1jirTYsdbwgSrcA6p%2F%2FweilcIPzlYFmJ3y%2Fyy3OA%2BTmijavoiDakJmli%2BwZZEFdQY6KViPlzY3X3YTad4zZwRXKcyXuWgl3bR5668MKLhjXlbdfGT3DUrHZ4VP%2B15PxBHbs5QqFJCycChkDSDfEt%2F0MeaSRUgGwpXED76XpanA8bKDRbaln3YbG6HyWdIjlLY0xqSguwOph9hzOEZl8jKazfFSqUZeBUoZ%2FnivlUdF6TP0MOaZJmq66DAXCXc1qqqciP2OjxDIhwsQJMTT8pfhMlTK5dW5oszxCi%2BGBjlkruEtBQXQ9dSbOLZnsIsAvqoww8dFuhMOWlX3%2BsEdB6xzvZ6w%2FZktBdPmVtSxw8U3nRZvFnkFsKmibRGkjjGnL9VW4m3MxXXV8mTOIjDjIGwUTDOWz5f8rVFxKF0W2Ca1grG7E5hi4axemchHr8O5dxZCBFGFsmKGRsqBSiAo2czKS%2BLiCvd6nNd4BTmBMBQikDPggl1HNL7W%2FKjr9dbzDFBasPM0LnjUV08QT6gqRZgtWV9R%2B9c6B2nBjJfm9oxcUIV3QyxiuK1FFRW97HVE8FW3%2F2Zzwsdqm17sVJJdJQQaTlYFNzFEGT4tkm%2BeuzmqyFNF6E9aADBclLH4uk3ZNKoC4njlNEBWMLDB3c4GOqUBoh2jZ9bcWtsrvXEEgYw56BEwbUOnF3zM8q6ADNkePYUj%2BCDSdquM0zC5sH4wRMzZHNVmrr61TXgjwg5xa5NtDdVKHQxx1Ms0qYxV1v2ovTCkzRYRVltwxttNZhBzpXCgXYCjbicBb%2BhP6EWcUPkgfzOWbWqAQ5UymMTydPi%2FKySgdYYGetOw8t4Nn%2BAc3HHyNsdvGtP%2BniDwQP%2FZFc9Enk6NLrX6&X-Amz-Signature=c6b4e94a731a033d6bbbd33103207741ff344fa82446520f39109ad0f8969d6d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664HYUTJBC%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T085556Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEgaCXVzLXdlc3QtMiJHMEUCIB1CDpGnQLjMYC4RuKMzz23Ydl%2BMOZtT3NOktYVJr3UyAiEA7VBdzFyXWXcPPm3pBT1TqU3krt1J8y7Xz59ECZXpKmAq%2FwMIERAAGgw2Mzc0MjMxODM4MDUiDEALa1IwUPWDXFMz%2FyrcAyAG%2Fl99J9YTDbq0uuYS1n63rMKSGZh9Nj1%2BYs5dEwGkvHBvIAwNwZZNyQQUr%2BN1VjC8ihIzV544Ps%2FO46jI0fFfRlgiIr6fzjsVFYCjCqmGY8ApC9mWrPy%2F1TlIyYhIyCRkDXPKfRULCJRPC%2B3sa1Rqo4FNgDm6MsNlyatuDfZI%2Bk6X8JC83XC0HCjMaA4znvDHxyzbYGgkWG%2B32rtF4wooMsqFSGkM%2B5wChPT1lU7dGwdXUXZ64Pxc7EQGvVsGiZdBykRmrgjYQPObYp6ufuD186AhLS4%2FPVhINytjYnkqDK32UwYsmPfyJUtSKPW1xAHwbjfHUcUxp3e%2BilbGFxZG8mkW2j6SaQAGpx716aNHCfMRDf%2FIlZ1luXmtiYcfAicd%2FeQwTNpVRN7RPiSVObfAGPWHYh%2F5zoP3lJc8EqX5Cx%2BwbmcmkDIra04vIJTpP%2BrwjIlYBbdFpQS5JnYiArofWsF0SZSnHqCLH1bgaxqwJdWUfgEK8g3OPbiHXRYeNWTjAlJH9tZit%2FgK6xTFxMFvJSQik0%2FOlY0EKGzj%2BEVqLM0b3b%2FhuvMRe9wWK13gAxgWFWER8e6h3y25GDUOD947xHEJsO4mbE9l8geMAcH99S0JzNquuWTvRLJ4MNi%2F3c4GOqUB5miI%2Fu1VlHsTen90RV9qq6mv8W3h05A5A%2BAGQuepW35V5uZUAQgQRG53v0jP9qsWVCaeELGc2i%2FvUUBi9qUZY9bCWYCu0DRLlmC%2BwAkpCm6Irv6UaGVjasWhypPODppJUFSkZxr%2BB2p5IUFRB9LyoUcr%2Bwal52IssN7QOt4QJu%2B29QNAcPspfFLH%2FSdefeHaYOj%2FGL0hvkrWaS6K1OLzTmeAFNao&X-Amz-Signature=a9bc4eddf3da548eecdfeda43b04c0e0166b5d0f6d935079c638c7edd50c0e99&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

