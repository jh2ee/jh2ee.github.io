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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TL3OLXQF%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T202127Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGwaCXVzLXdlc3QtMiJIMEYCIQDn60wvJ40D7yJ8N1EC69KtsSfg89G%2B%2FE3gcGKsjIJcrQIhANvkPUz4FsvnA%2BwO3b1jKPgq8grYSRmoGl3QYuQ9oJnDKv8DCDUQABoMNjM3NDIzMTgzODA1IgwrdvII7mY0go5F9wQq3ANRXVJ%2FPHo%2BZYOhPhu60wPwILB56SpWPfqEqbvCz79JkDbFPquYXl2a1XMOC8T1N7DewsO9EmU1y6%2FfiNdnu73nU90v6kAPz6iyonCn2wTaZL1AH%2FHVBe6eJAta2emGRjFhLpzCqGWYFPud2rY%2F1Rp21RfiDx6%2FB%2Ft9q3QDTCYIm3Y5HDUEQookL%2FI%2FyU77faVc%2Fq27jL1KaJrlQ5ZdpxKdL57uqGoAfspXXGoVJr03sK1tS2ebW6Yqu9GyT5ZLVjYkwLiH5r6Xz0iGrYwjWoqOeYjVev0lfZYsHTC0Vbe9LTemyNO%2FMf2qDhOhg1KDiC5XR2GlrPSc52LtOR60Lk7MNbHjJ2zkeLR9V46B21Yu9%2Bjt9OgPEDkk8Lq5neAJHdrLfiMq2U1CycNgNqj8FZlD7uNaZCu%2FoG%2F5qIuSOj0UzB1oKZ4%2BJSx%2FAe2t%2FYJFrLlmB1%2B092xvTv65yM%2FqwbQmjdZiX4xwpNVn0fl1IfpzNmBzIkDeRg0rv8YyIVlXqw5XTSasQmtV33b6emLNIfN7Zx%2FMqe%2FrwghpuXBcvLrLyINjGVlZvD9syuQF22gkHJned9NX%2Fa4RXJtln1wYNE5jzTVuJfnwl8UVnSwKeXNvAgsroDgk886c4J4PJjCDqeXOBjqkAegI4DY16U4f06LSJ6FfPYRVzkenpucn5hiRq1j00ZgOATROVT%2F81D1rsJ%2BrtA5S96vHpMmHOU%2FySHd8GSQ7NivLmFxGEtIb1dAkVW0OsVzLGgt2%2BsMJ2yTgHlSxVn1LX27By%2FZEF5QL4bv6xojWzean5FfJeeakNL80LUS3O7jehJ17BCZVSB27NUI0H9ZXA8McReMKB2WclpdhXoTa7g29BQ3w&X-Amz-Signature=b111e05f08545d9520a7776fe9b9be66ce3d7aa5f2b7d0a43ed4b243ed1b512d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TL3OLXQF%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T202127Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGwaCXVzLXdlc3QtMiJIMEYCIQDn60wvJ40D7yJ8N1EC69KtsSfg89G%2B%2FE3gcGKsjIJcrQIhANvkPUz4FsvnA%2BwO3b1jKPgq8grYSRmoGl3QYuQ9oJnDKv8DCDUQABoMNjM3NDIzMTgzODA1IgwrdvII7mY0go5F9wQq3ANRXVJ%2FPHo%2BZYOhPhu60wPwILB56SpWPfqEqbvCz79JkDbFPquYXl2a1XMOC8T1N7DewsO9EmU1y6%2FfiNdnu73nU90v6kAPz6iyonCn2wTaZL1AH%2FHVBe6eJAta2emGRjFhLpzCqGWYFPud2rY%2F1Rp21RfiDx6%2FB%2Ft9q3QDTCYIm3Y5HDUEQookL%2FI%2FyU77faVc%2Fq27jL1KaJrlQ5ZdpxKdL57uqGoAfspXXGoVJr03sK1tS2ebW6Yqu9GyT5ZLVjYkwLiH5r6Xz0iGrYwjWoqOeYjVev0lfZYsHTC0Vbe9LTemyNO%2FMf2qDhOhg1KDiC5XR2GlrPSc52LtOR60Lk7MNbHjJ2zkeLR9V46B21Yu9%2Bjt9OgPEDkk8Lq5neAJHdrLfiMq2U1CycNgNqj8FZlD7uNaZCu%2FoG%2F5qIuSOj0UzB1oKZ4%2BJSx%2FAe2t%2FYJFrLlmB1%2B092xvTv65yM%2FqwbQmjdZiX4xwpNVn0fl1IfpzNmBzIkDeRg0rv8YyIVlXqw5XTSasQmtV33b6emLNIfN7Zx%2FMqe%2FrwghpuXBcvLrLyINjGVlZvD9syuQF22gkHJned9NX%2Fa4RXJtln1wYNE5jzTVuJfnwl8UVnSwKeXNvAgsroDgk886c4J4PJjCDqeXOBjqkAegI4DY16U4f06LSJ6FfPYRVzkenpucn5hiRq1j00ZgOATROVT%2F81D1rsJ%2BrtA5S96vHpMmHOU%2FySHd8GSQ7NivLmFxGEtIb1dAkVW0OsVzLGgt2%2BsMJ2yTgHlSxVn1LX27By%2FZEF5QL4bv6xojWzean5FfJeeakNL80LUS3O7jehJ17BCZVSB27NUI0H9ZXA8McReMKB2WclpdhXoTa7g29BQ3w&X-Amz-Signature=b111e05f08545d9520a7776fe9b9be66ce3d7aa5f2b7d0a43ed4b243ed1b512d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665U5YNNCT%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T202127Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGwaCXVzLXdlc3QtMiJGMEQCIAPuTdt6bUFd7cMkJUCmmm3t%2B3Mf6a0g51XKUpXyT%2FguAiBcnem9at9XLpaLTwTW1G3ZXnO0Ip9EwK0tv5qKH3rdLir%2FAwg1EAAaDDYzNzQyMzE4MzgwNSIMe8DoJSIs5wrRr3bfKtwD1qo1Dp00IfMG6iG0dbMFDvst8EmJHN9ZTTJpb6yXDRokbPAfK23AoS1jSnRl%2FDO%2BrZg4AVsYPorYG7FK5TX5VUs07W%2F1jsDhjiF1uGGinBHEl4sBlLaS22PGi0KKSl7ZHlCPm01bxCVdfKSuYQDehAWFoLCx3YDQEcdrHHe5otBYoOKdhcAenbhVqF33Pfx4c%2BmXT8YQqEsm7bwS28ChgSS%2F2aWgAQG69Jrk6WJS%2F9SahbPpgYorN5XxlIs2jXKLr1C8tobtNbZx4dtnbFBUehWS%2F8oiPKnuwgYzG1kP17dhC9QGVFEIkNCh23pKP6fCJ%2Br92rDOu77ZRXxYXf%2FJa06i%2Bg24Rc%2FLZqqPR1tZwfEoCr6UmCdtvgcU%2F0KMp0lWWVxRby7C8OOiQv2%2F3md55PE3mGMmD6HqjYM%2BhKqkduSzxLqdmsD8F5YsAYgbnD%2F9Hfo2m%2BDg3p60avOkCnPQqbFD%2BsOVshxkx2IJkzhinGVOJMgJYCBEL3uDtehv2qcXqi1nwFNzZvbkthtxjVJa33fey6Fqk0LF9n9ZrsZWXr4jbdQIiQdK9YbH9JYXQMJI9Y2Q5qq4jVESmI0WCCQSrzPdMF8s0RAVtPZzhI8K%2BgKPTms3HmBr5DHVpoow0KrlzgY6pgHq1kfq%2Bar1RQAFvro8jzY6VZw5L7kr9nS%2BINEJYmwOTOoYuxn1%2BaVXmp%2BQ4kA7PzsLzuM4YXFtbB5PTEEBWioc1APByoe4YvmiLIqyUw0ZI%2BuA3PI0yWcbvE%2F207vNlZFC4IPfHRba16%2F0wbGrRBQ3KCGo5HWYMd%2FQ7S5p2DlS51MSoA0nO1wk%2BJ6ryv%2B4Zr%2BEu5nI%2FVaK69d8mcc39%2B9z45n3%2BSE2&X-Amz-Signature=91bfc445f81e25d43a0129291ffb76270a763353c4b8eb1b3d36697abfc90e07&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667QUGQPQ5%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T202130Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGwaCXVzLXdlc3QtMiJHMEUCIAK8yM2w68NLjJ%2FvWyhvbFKTMOwdULy%2F0nNjUCD%2BMy8AAiEA5ELhZ3%2BF%2BL9eIK2EJfgkPyoNNl%2BLYVgBe85VZpiGnEcq%2FwMINRAAGgw2Mzc0MjMxODM4MDUiDA4mcs7tu1itghwlMyrcA0fhZrDZCBX6ISIZ1gceG2fhstSo46T8M5lPPUQNQOa16esIUzNbvxQ7Mk%2BKnLpVv4U7tBgVn%2BlsczhPo0NfVwbXd%2BH5gJlfVjT%2Bja3lbUbcmY0sRfvAbXrcc3OvIj0xwN4MwsIHW255DX9NtzeQg6ssQ%2FawtmYqlPRLonxmC%2F2bnB54LXZb30LGzYN3yGCfMYNt4PAScXJb1W9%2FXVrIjdJlMp%2F5kDUYwRM6wGfeh9MIVYsytWAD6QFwfb6QAkOSkGRwzyBqTMa1K1gw9Y1cxJK9ldHCMrCC0NLg0AIjXXSl%2BXxg98nn9PgTo8pPUt4CQKj4dtyZdhzNYFmULaDc1CUpE9wPNPymgWiWBkcViXOh5MjEyBx9iYdAX7lXP2DZQ8JwDjlUKvxCBCkLU48l1W5skPlAMrr9r9AoFluY0KTGDYcBJ08FYC03IC7sfqLzISmEERU2vhkVMHeSWxk8vvyRvjFjsvk%2F5eIx%2FtPW3gra6%2BggmVsesuBaoONYOcQU%2F0gBnoNgWpsEDO5Bm%2Flma48R36cG5N0SF2iHS48Ssu7SkXRpdtQAVQKse%2F68Jnexir9hGONfCXA%2F9EHWsSHJDhudYcW2Y3yor3H%2FDbh%2F4u%2F5hmyB0IugrXRGlq2wMNip5c4GOqUBs6a3kVVK%2BbGjXWanpQJlnJPER78i8TszWyMXYgcG9%2BfOZ1i1WB5IEqUHohlGYeWS0L7%2FW0O4AMvoYlhLrLa1uhGzSHT7evydAik9cJ6H2%2BFCNlqxfCNcTu0ycAS9IafHhFFQ9bC1YpWGb%2BdOYkGNSvmzyQ6t56S4tW6d6vN%2Fn6dVuMW1lXNHnxEhoaO0WpTN7KVCkRo5SpfmdRLdJHVhPOJrvbEn&X-Amz-Signature=81f22785d47b7750d8108f626c8539fe99e8c6fdbae1741baf57527acc2f38e5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667QUGQPQ5%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T202130Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGwaCXVzLXdlc3QtMiJHMEUCIAK8yM2w68NLjJ%2FvWyhvbFKTMOwdULy%2F0nNjUCD%2BMy8AAiEA5ELhZ3%2BF%2BL9eIK2EJfgkPyoNNl%2BLYVgBe85VZpiGnEcq%2FwMINRAAGgw2Mzc0MjMxODM4MDUiDA4mcs7tu1itghwlMyrcA0fhZrDZCBX6ISIZ1gceG2fhstSo46T8M5lPPUQNQOa16esIUzNbvxQ7Mk%2BKnLpVv4U7tBgVn%2BlsczhPo0NfVwbXd%2BH5gJlfVjT%2Bja3lbUbcmY0sRfvAbXrcc3OvIj0xwN4MwsIHW255DX9NtzeQg6ssQ%2FawtmYqlPRLonxmC%2F2bnB54LXZb30LGzYN3yGCfMYNt4PAScXJb1W9%2FXVrIjdJlMp%2F5kDUYwRM6wGfeh9MIVYsytWAD6QFwfb6QAkOSkGRwzyBqTMa1K1gw9Y1cxJK9ldHCMrCC0NLg0AIjXXSl%2BXxg98nn9PgTo8pPUt4CQKj4dtyZdhzNYFmULaDc1CUpE9wPNPymgWiWBkcViXOh5MjEyBx9iYdAX7lXP2DZQ8JwDjlUKvxCBCkLU48l1W5skPlAMrr9r9AoFluY0KTGDYcBJ08FYC03IC7sfqLzISmEERU2vhkVMHeSWxk8vvyRvjFjsvk%2F5eIx%2FtPW3gra6%2BggmVsesuBaoONYOcQU%2F0gBnoNgWpsEDO5Bm%2Flma48R36cG5N0SF2iHS48Ssu7SkXRpdtQAVQKse%2F68Jnexir9hGONfCXA%2F9EHWsSHJDhudYcW2Y3yor3H%2FDbh%2F4u%2F5hmyB0IugrXRGlq2wMNip5c4GOqUBs6a3kVVK%2BbGjXWanpQJlnJPER78i8TszWyMXYgcG9%2BfOZ1i1WB5IEqUHohlGYeWS0L7%2FW0O4AMvoYlhLrLa1uhGzSHT7evydAik9cJ6H2%2BFCNlqxfCNcTu0ycAS9IafHhFFQ9bC1YpWGb%2BdOYkGNSvmzyQ6t56S4tW6d6vN%2Fn6dVuMW1lXNHnxEhoaO0WpTN7KVCkRo5SpfmdRLdJHVhPOJrvbEn&X-Amz-Signature=f7cdaf4f531b82ca4e39ff8452fa047052d4fe3b0443db14c7bdd3c6ee6dd094&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WN2B7DVP%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T202130Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGwaCXVzLXdlc3QtMiJHMEUCIQCwQD0HfrgtiAlLBMov49Q1XQS%2FRF2IWwAL2Qc4R1OVAAIga9NGgaoHVZG8NgYlleW7GIvMBC2QU8igWnSps6JwiV8q%2FwMINRAAGgw2Mzc0MjMxODM4MDUiDKHEyUBw3rcFVEUBnSrcA%2Flbq%2F4E4%2BBg23ijIeWu93I1C7feQ7ZaWSD6Dhmtm3W8jRNiqfyukmGoRkOY1k8ktxG8MwfPl2PuVbDFaHbBVno8bPbBQDA4LvkCnyA%2F9u3de5ctnV%2Bxl4hbDXOnwNuuJMk2ArElGEWzulY2VTUKaA6aALIzFVGXfWRrBQsgO5J3b%2F3%2FR3HlfRzq0Nz9xUehQyRf94dCZtPNUnCZ5WhF8eYZKq8z7gfjMgy%2BzbPhB1SmrQ10e%2B8omnGRo3D7k4xK3hVIwVtZ92j8Cnvl68ruOxH4V5%2FHmEcTfReh0junIdL0yiLLIjJDapf45YXBuXv7%2F6oNyzFDFITCtTDhZSjf815wQlztrbm0pY4ORmYTrLwy%2FI0hRW1zWn1oJAqj7NzXqdo6MDCJhSdK7nc0paxefEYhOnXO4ZJ9pUv3NlV%2FpW4AIvU8WO6wERSbwDODGqvPVGLl%2FCdMdB9PBD4E%2FQo%2FGb8HuXHtsCLrMmW7uR5oAKkyayGabCU1wERCkFRcP3hxY2A%2FEvE99lofOetSzpjOnO9OAUEAanNGgDooF9xKl62g3IpLcxeAOC6LaFLFhKwOBw2VbHt6cIjvw1IQPjGAx0D1htol3O8ZoRw1dFXevVc2r5jQdr8%2FNBm6rQRbMNGo5c4GOqUBNBSuIaBNogRjvPpuwZGFf8u64y5K8mUGvBg7EirvHzLAZM5gtsqcF9LK%2F1%2FnpbaWUsqEXsI9%2FCv3iVhkX4VKMlEUU7uyeQ61IDdum1JMCDNQTAKaR0Nqan7%2BBp4PBjLxn%2Bfs8n%2F9J9cQ%2BNtidbQKZXTFU3vgiKOV2chb2LTdIHu0j5DDseN3ob8bP5Eumh2hXleXAIFVScOv%2FcTrZ7tR8uSBHsDP&X-Amz-Signature=8741139cbf072d40b5ef743a0006d4844f6e86d7041876e2b9efc8a3195d2801&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664D2RKET4%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T202130Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGwaCXVzLXdlc3QtMiJHMEUCIFg2bSKTpdX4vL%2F%2FPE1rh7AcgdPCh%2B54nHSUJ0a%2BHldVAiEAsosC4YIjwvAS6mSGDZS%2FqZ%2F3HjVeIX3D45J5s%2B30LqIq%2FwMINRAAGgw2Mzc0MjMxODM4MDUiDGAh1wjSXIfATMBFASrcAz4uLPKOjnPzjQNMJDTfN4i9Z1wlzVLCN0aakL7hFggkVLJPhQXZqB3qkgyJStsheGs4%2BlBzhrw4SNGIvdHY6VMw42tV0%2B4a9keim0%2FPoyeG1pSgFmPlXLFXUXj1jyjUW0zQECxWgNjY01cX9K6xARCkw%2BnsLz84CrLxch6ac3ruRTDLDH3SpoHipzXxBNg63ainzAh%2B9aet0weDl1Xd3i3KhL2ZULdBnixeUqQzZN1qqnO%2B9S3E7v4qXpOuzMDYqoR%2BR0m%2Fek3lxBsllQRcN0%2BM%2FmgmV8W7HPpgSN24yZlN%2Fq0nSgVhwvGUxRu5z89%2BzHmdlsjkTep0gsgwD%2BdNGA8bdlcuuluY1MQNPvLj1bFI8kKrUIvy39FZDimTyfmbAlO91q7aEDZdR1kRV9X0tw4BhcJNAcGFT1qJ3X8BmLR%2F6HtRqSU5C7jQG6%2B7fq8o6Te1BvfUYRexTHFkc6xWtyV64FT%2FTSDZHvfqJDZQBoJd87vaKr0oFwRsglYes5R95vGXsSveNPG03G2INkIIsmLrB0VG%2BY4%2FlhKDtlThAae%2FoajBG9SZynq5EjOynYrSC7iN3Eir8Btuo%2B2U5z%2F6Svu0P2raWrmHpLQYZWwwxXrVMgrizsX1jqrIO0A5MOiq5c4GOqUBxLGkbbrnAdyXsf%2BHKp2Z%2FyDjz4zmEKkAgiFnp8KyI5BV5dq5KZiz%2BqoHdkC16WLjU9mveDxgJ3iNDdBrP9TDA6Bb3IOKvLKS4j49Jax70Ou47wWu0poZTRoeKNelu1jq7boG4EIgzenB3iZyjkWyWdTVfbLrl3y4Ck5b%2BnaiCfPw%2FplAvgUxESsEmtSR5%2BZi2%2FJUFmcgIAw6iI6dgZnxyj13Gz5T&X-Amz-Signature=434cf51ac8625ada66fed561558040d3fd14ba45ea8d5b29068a1468a367f2eb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UHIQTZ32%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T202131Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGwaCXVzLXdlc3QtMiJHMEUCIQDVcFOkCBnrR0n6ffMJZo4ZseoulGb8WGkEV6L4c7ieVwIgS5bwx%2F3CRCFa%2FIvWPyRgfZ9B4BzmvERDRBoqXAx9888q%2FwMINRAAGgw2Mzc0MjMxODM4MDUiDJ4zr%2B2GpNcpH%2FCcsSrcAzu5dMJXAxpdIJmMY3RDtXvj3bKxZSs1TYztc2CE8rXKS0j5Xard6rjuznjOj2pb6STJGLqyMGKCGRCeDbM2dPWY%2BiT5iqLZxCyOU1nV6uec1GunEVOaL9ZenS3IAhONk%2B%2BXFPi3b3qTV8Bw13prD8SDN4Ewzmet1joyacLdwYdUiVtLtxDYyA17dCUeaf0BkKiCrkJrPfYwr7vJPXh%2F2FIav1eBwU%2Bd1%2BxpFdu4Y7Ci%2BzcF8nIbGCOmmZ99zZLsFaIVSLZyNgwCCIJFPQpU39EeUTHkAugV0yB0OV2F36mqOUtZ20VnzL9czKhT3C5rY4Mrl8BtM%2F4gl5hNO8aZysTpjsbzfWMUnp0quw0yq78M584U7tWBsmtWYNYKQP41vObWyXjMIJobygUgZfrxx%2BAReZaqMyqxjdoys8RqVFgbgn8IWoh34PBQFmkeuvqWX6RQ8k7qWLLawchtO%2FuD57IW951odRalXPI7D3zOfitAeh9PzOVUd4mWmaJEtrU1DsZqS%2FO1QIHhs87EgCoL5cU8sDVYA2i%2FxZUq3WJ4x8c2aS%2FPQQPyVF0eyJsXUfkFnWbVym5K%2FsqVRX2N5T8ZOGB0QBKi4dH94qC2n7EhDid8FaWoekGN69abLOPLMKOp5c4GOqUBTcxGkBRN17GH02EXMzGYNZtzN1lL0Ne4a%2F64hcOe7o4oR3O%2F%2Fg7MxyodKFE6QGnXLcfxl0cnryKThXHatcSdZG7ewLS5%2FSqQpzIcpRuZhmC1pvAEBOqObQHPtrxC%2FpeN8vs5FlG%2F5PaTx8YIybqJjntsvNM8gQmOXLMlXwk2krO34dFpJcEOx9CSp2d3oxT8WFc1QVtKOBpDC0okAd3Po530AsIn&X-Amz-Signature=59a687f52459edd4f0f5b8567bff2d05f5f83db403066cff4612a94854a0c2db&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667FC4P6K3%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T202132Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGwaCXVzLXdlc3QtMiJHMEUCIQDQQof4jk159jIyRj3g%2F0nQbwVkDEyDUpxyUI2T40j7rgIgSu7%2BEgkgL%2BoIDqxret1VMz4Ibu8N7liKNtgAmF9VOj8q%2FwMINRAAGgw2Mzc0MjMxODM4MDUiDDsJB4wvSTZuIlMLJircAx3%2BU1ONKyBNjw9sYWKFW3lx4wGanRHxpijgDUTNze8v2vyVXbEN9bW8qCdnrOLFUQSLzQCPbL%2BDhLe0Bsr2I6rVOfO2uNsr3z%2Fpw6REtb9yEqeUEwrluM41EOmek1rif6IBr6kEf3q4CWfjn%2BX68FJuL3%2FIa3UsBLOaZhXYVLCGrD2RbnAmbpG%2BKX7t8J3EfsVE5z%2Bqgc0ZPEx%2FviSfJpIgNxq8cEZKKv0eseaae%2FSEF4HgSELuEULESpWaPhmsR2koLZ5rn8Jwh09ZZ46JxJYkeEnjBK4NLtEp%2FPY6eEThSulpTbFa9SqiWAABf43cqkGmyLkJEGIhZ9DEghetcER1417Q%2FVkuZB3qlNV0nduYtwAfeMcZ65lAnwpiAT1AqgBEzlgkgZ%2F95Pnivw44xhBtIe%2FjuGdrC3pt5lgGJpkDR5fqtf%2B0kzegEgzRtLz0Loumd%2BtWFSlJS9y6Bikeg3KOJJR0wYMQzhvd1CxXQqGTYun1DCNhv0%2FPM48s0JdDycP3WFSA%2BDZMYqaGrkNk8F%2BNaQWqcTBZwXG8Ga5gp7BrRqKx7CilRIuFPqSPmRrDoYJjBh01vaZ91d1wARWNfvpbB7%2FQNJa4l19wrYDi7uRnY4AQR8lOvhtMpjOtMOio5c4GOqUBswlBv%2BVXV3qV32anPewmUVIEUmAVxj6YLIeYM%2BEAm%2FKLtYALCWFv1E1bmJqR3HObJk%2F1C1K0JXbjXIrLgvY4Kq%2FXDwdJ4A2LjDo%2B8KNJ%2BiQ4kFHdy%2FrgDuy9JjQfu0ueEAt1wggNTE7Ww1HHmtXejSCQ%2F5aSoHyUPmZsZpj78x%2F6P8xphbneP2qllfBcyHH2eItTL5Wi8Kn61KbCJOcNANROj254&X-Amz-Signature=5158d05e473310c0c21220202bb51de998a34b7e58a22df9a03ae2cffac7460e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667FC4P6K3%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T202132Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGwaCXVzLXdlc3QtMiJHMEUCIQDQQof4jk159jIyRj3g%2F0nQbwVkDEyDUpxyUI2T40j7rgIgSu7%2BEgkgL%2BoIDqxret1VMz4Ibu8N7liKNtgAmF9VOj8q%2FwMINRAAGgw2Mzc0MjMxODM4MDUiDDsJB4wvSTZuIlMLJircAx3%2BU1ONKyBNjw9sYWKFW3lx4wGanRHxpijgDUTNze8v2vyVXbEN9bW8qCdnrOLFUQSLzQCPbL%2BDhLe0Bsr2I6rVOfO2uNsr3z%2Fpw6REtb9yEqeUEwrluM41EOmek1rif6IBr6kEf3q4CWfjn%2BX68FJuL3%2FIa3UsBLOaZhXYVLCGrD2RbnAmbpG%2BKX7t8J3EfsVE5z%2Bqgc0ZPEx%2FviSfJpIgNxq8cEZKKv0eseaae%2FSEF4HgSELuEULESpWaPhmsR2koLZ5rn8Jwh09ZZ46JxJYkeEnjBK4NLtEp%2FPY6eEThSulpTbFa9SqiWAABf43cqkGmyLkJEGIhZ9DEghetcER1417Q%2FVkuZB3qlNV0nduYtwAfeMcZ65lAnwpiAT1AqgBEzlgkgZ%2F95Pnivw44xhBtIe%2FjuGdrC3pt5lgGJpkDR5fqtf%2B0kzegEgzRtLz0Loumd%2BtWFSlJS9y6Bikeg3KOJJR0wYMQzhvd1CxXQqGTYun1DCNhv0%2FPM48s0JdDycP3WFSA%2BDZMYqaGrkNk8F%2BNaQWqcTBZwXG8Ga5gp7BrRqKx7CilRIuFPqSPmRrDoYJjBh01vaZ91d1wARWNfvpbB7%2FQNJa4l19wrYDi7uRnY4AQR8lOvhtMpjOtMOio5c4GOqUBswlBv%2BVXV3qV32anPewmUVIEUmAVxj6YLIeYM%2BEAm%2FKLtYALCWFv1E1bmJqR3HObJk%2F1C1K0JXbjXIrLgvY4Kq%2FXDwdJ4A2LjDo%2B8KNJ%2BiQ4kFHdy%2FrgDuy9JjQfu0ueEAt1wggNTE7Ww1HHmtXejSCQ%2F5aSoHyUPmZsZpj78x%2F6P8xphbneP2qllfBcyHH2eItTL5Wi8Kn61KbCJOcNANROj254&X-Amz-Signature=da4c97627e92f25da7b2f2a66da7a96a841df36f03da8c8f20d3c320828f7741&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466R7XZI2OV%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T202125Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGwaCXVzLXdlc3QtMiJHMEUCIQCV0XhALiGmJPv%2Bq2PRiKSH%2B6YToGOIAFUhhl8gwtW%2FMAIgfV6CsgN6dsgNV%2BMYCngFVe8dCut62jR5cR3Rxzj7Wzsq%2FwMINRAAGgw2Mzc0MjMxODM4MDUiDKry%2FP3gC%2B1cv0SvbyrcA8V%2BFMGLtovG6D6LdCyd%2FeHMYY7CtnbbQmCO9r3orZ9Nn6cv4NyiUfqwj%2BXizGnWA0u1Aycxo7GfXTId7wAMaG6REKGzD1L7gxb%2FMIUfc11XTsZfDsjC2dayN4Bi6AdQWQJPkfHanKj0Za7GIlo6Zgo2v8tPfJwLAkXf20XPVR5r0wmAxMAXoMd1OCJWC66QKZrSNKaTRB45e90YKoGcq8TSXKlbcjoItVxWnLl5uXfV27%2Fpyq11p0phJt8UYD74jivWdHQ5eCCHrjTyu%2B1SLus6yEbJ0JzeZl7YDcymyq7v8L4xFFAPxRHCRBREw8YemUFKGYbzbDtEnHoTmhHZd16SkIJfz%2BNOLFjLc0pfR97Nikf2YSZQgQ79fBRBuNQaDwGA1nBQe2jdLHQ%2BjCiiJDSXki6s0h7kzM45vom1BFRkyBy24QQXuRV3P8mSP1Do7TynYAdNde%2FWvbZQFTRPqhPuioGNl%2BmvzFs9XUyj5goKaTbvosOTSocXGLBOGu64rnBFWVZgfu%2FQm9bZK141WSlRYrbMGU3E5KHTq6mmY49au7z6ti4aMdmechEQmm1%2F2C7c%2FQXBLxD6O9%2B1gBS9oaLN6XYDiZeQJX9lGATQaZ16Qf16i0faEXKVdHkKMLWp5c4GOqUBf447SXfJb5hpZe%2BS2ChCQMkDVJOsFaOhpF0Zt%2FnFhkNgbtF94YMHByKkLv047eCkmwlA38cAgHDeztYjSVnt3cdwSWKMPtwD4iGYH8t7cX8Jjz%2Fh7XstTtUe60G3mWlYOIZAm7rUM15x9QiRrO9H8WtoDxfuAC4r0jfbe4Zvcjy8Z5bJEFIVIYogNrbOjWc8fyqszqf1BkBVVsKWXqum0Gih8S9m&X-Amz-Signature=769a1cbe6fdca951dc668d220cbba6608c324dcd0cad17b7fa088853ca60f726&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466V4GJ4RB5%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T202133Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGwaCXVzLXdlc3QtMiJGMEQCIENB6i3hNzXMtHzZ75Q%2BSCgSL7xyuc3SXbXzyJ7uzjLwAiAjM81HpTASJ8rMxQ4mve9TzdHMPDbkDhgLcSvW1K%2F%2FmSr%2FAwg1EAAaDDYzNzQyMzE4MzgwNSIMZKgKqfQaoNjtVk09KtwD70w2d10XV%2BK7IKzLflF7VoKXudLK5eZ6T%2F0htJ4UC0ZgW%2FGB9GDJU%2Fi4SrHkDt007zMcwe0ya9h%2Bu22FBzXc1U7EfSVVeWUFWIAYNCAaYtBfCqY7j9BWE95%2Bge6qZISgMAezM4u1OaEZyCEkwpUi3Tczz9X%2FKph81n74OHt141L1MCQquxcqTfJV%2FcJo2fKEvHZp8Wa%2BaDoq7xIn6BmXW7yNmvyOjXfj0WloFLl9ZUdVFR8J5LFRn1ZRtl0O7dU0vcdlf9xkXqklEZk4F0V0GqnPQU3c7Ds%2FFC3CcqeT%2FrpVpl%2BVV%2FwAChIRLEEBq0Y%2FooJOrZrTFGCN5gXP%2BynQ6ObHlho80VonGJ5zC4omzPYBVBa37FuxdJeh9g286Lphdg6wRkgvW4quXOA0IhMEBUKQ914zfbLSbE0grw8XV41%2BK2NG9xt4QGaqIyohtXlzNAs28p52i6trU7vntP2age6Rvb1ki9RCgO%2FLVTv%2FnhanpkxyHrif52aKX3Wzn7LF7nTKV2t6LT7P55D%2FlPI2CqaMbQEHUd1jIjK%2FGeYM8KwVlUjgkAzf2kCbBCh6senS2Ct79ZVvC5fYhvoblIt77NVdcjy6xZGSRxM6uFACt38WXqhB1k7DyBvixX4wiKrlzgY6pgHTnePTeVj9yTGlKOasxR5K%2BJpefryRU6kZemzvKUZgb90cqWQMnHM0A0KVvplWCYychBtWdh320XXwQjJ4kwJ4JjJ%2FWX3%2FFq8HvkQuvU5jiBMGY1Dx%2Byb20TzV0qilkIP2m4rkVU8oCl%2Fpb%2B99L8L1Ww9kEUHVDvJp%2B6Hv6gl15b0HMMPXmdDL21dT5E5CGa2PU51vJP8wAs0BT5bYj8jh%2FsMlW4nO&X-Amz-Signature=48cfe365edef774f181b668186ca345fa25608c2066b4f30ba3f9190946ff6ef&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466V4GJ4RB5%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T202133Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGwaCXVzLXdlc3QtMiJGMEQCIENB6i3hNzXMtHzZ75Q%2BSCgSL7xyuc3SXbXzyJ7uzjLwAiAjM81HpTASJ8rMxQ4mve9TzdHMPDbkDhgLcSvW1K%2F%2FmSr%2FAwg1EAAaDDYzNzQyMzE4MzgwNSIMZKgKqfQaoNjtVk09KtwD70w2d10XV%2BK7IKzLflF7VoKXudLK5eZ6T%2F0htJ4UC0ZgW%2FGB9GDJU%2Fi4SrHkDt007zMcwe0ya9h%2Bu22FBzXc1U7EfSVVeWUFWIAYNCAaYtBfCqY7j9BWE95%2Bge6qZISgMAezM4u1OaEZyCEkwpUi3Tczz9X%2FKph81n74OHt141L1MCQquxcqTfJV%2FcJo2fKEvHZp8Wa%2BaDoq7xIn6BmXW7yNmvyOjXfj0WloFLl9ZUdVFR8J5LFRn1ZRtl0O7dU0vcdlf9xkXqklEZk4F0V0GqnPQU3c7Ds%2FFC3CcqeT%2FrpVpl%2BVV%2FwAChIRLEEBq0Y%2FooJOrZrTFGCN5gXP%2BynQ6ObHlho80VonGJ5zC4omzPYBVBa37FuxdJeh9g286Lphdg6wRkgvW4quXOA0IhMEBUKQ914zfbLSbE0grw8XV41%2BK2NG9xt4QGaqIyohtXlzNAs28p52i6trU7vntP2age6Rvb1ki9RCgO%2FLVTv%2FnhanpkxyHrif52aKX3Wzn7LF7nTKV2t6LT7P55D%2FlPI2CqaMbQEHUd1jIjK%2FGeYM8KwVlUjgkAzf2kCbBCh6senS2Ct79ZVvC5fYhvoblIt77NVdcjy6xZGSRxM6uFACt38WXqhB1k7DyBvixX4wiKrlzgY6pgHTnePTeVj9yTGlKOasxR5K%2BJpefryRU6kZemzvKUZgb90cqWQMnHM0A0KVvplWCYychBtWdh320XXwQjJ4kwJ4JjJ%2FWX3%2FFq8HvkQuvU5jiBMGY1Dx%2Byb20TzV0qilkIP2m4rkVU8oCl%2Fpb%2B99L8L1Ww9kEUHVDvJp%2B6Hv6gl15b0HMMPXmdDL21dT5E5CGa2PU51vJP8wAs0BT5bYj8jh%2FsMlW4nO&X-Amz-Signature=48cfe365edef774f181b668186ca345fa25608c2066b4f30ba3f9190946ff6ef&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z6BJZV2B%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T202133Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGwaCXVzLXdlc3QtMiJGMEQCIHBLHV%2FWvHTFhUjAFmDdnpwAOVIDt%2BEXlHyHWOPxBXeEAiBtIPgxC2gOQzZSh1uEBmsCSUFDR5r9e3TODX0cxTAVUCr%2FAwg1EAAaDDYzNzQyMzE4MzgwNSIMgWTUGoO1uMLjyOLQKtwDK2vv%2FhZ3dK2dMpLy0g0Q8PfBmnrKHU61v8ac9J9zA79zs6WcKlpDmOzDcnYqxrZZul80SsHEeyGRuVkmxGstiuzCe%2BidnVhowLHT%2BdIVR01X8yhFniYbJ%2BjTab%2Fr73RXMO9OgBihi37dpLffGqFovxqSTmJ17giJq8jRY0oY%2BnJTwNnRs%2FPpgiQDdnt7conrkhDMhzMB%2FviuYtjUTt8pV8zJujdpfJlybhyqeZYklYP0xxMlYGBnzeaZRikLpoA08%2BH7a3vs0sIGTUxzX6p6w5R4GHCYXqxj%2BwImvwfIm64aex8EXP7vqkuiHkeyoobvbxwohofVC4nJeGCuWgMou55lbS2AuReWLR%2BBUJFoll7sQy0kuunaU%2FDoCYmbtMnD1NTDjAuoZJUNT4eXloFkiq06yDe9RnNvHmD97ilMY9Pw1pGJhaYx3%2B5dSBroGhxUkYB5qkfsv6bYKZ1bWbW4Rwt5tL0mUcocoMP21e20F1Ze5xCkHyeR4mqI0SaMiLwXLe9KgCtzLArYGhSBummSm97BQQ24VH5PMFMuF%2BR1igJTWqt1IuclHFuMW03HFyMSFa2s5Vge9y13pF1T1WTU2ADpJEaJr6Y0eiSMiJpqT0LRjcly4rwzdzI519ow3avlzgY6pgHXfr90rvZxzFQk0VzffqZXkq8zT3CGjakuUTBXrta3Yz2EgX3StIeZ6%2BVc48NEa0XauP8cS6m%2B5d4Gq8YjJx8VNur7BAeJ%2BFgjtZYKrNku7dAtJ8X1kJS1UJZZUYW041KhgfXnDOg4%2B6omKUFOF9HLRIOHtFQ4vZJ4XLupHM8NVfmGfiDlb8hWN8t0%2B5Qo3MnwpIaYv%2F6gnmOjQUAc8P9Z5OPNpJaf&X-Amz-Signature=cdac78233af7dc73cd1955a827ee3a805e49fe0131765e65347cb6a46f30dcba&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

