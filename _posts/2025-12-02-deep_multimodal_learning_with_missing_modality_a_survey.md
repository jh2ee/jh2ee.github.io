---
layout: post
date: 2025-12-02
title: "[논문 리뷰] Deep Multimodal Learning with Missing Modality: A Survey"
tags: [MLMM, Review, Arxiv]
categories: [Paper Review]
---
- Multimodal train/test 에서 modality missing은 성능에 부정적
- missing modality를 처리하도록 설계된 multimodal learning은 model이 robust하게 작동할 수 있게 함

---


---



## Introduction


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/b5bb2d97-9e26-4130-a67d-0876cf0f895d/ee07ef86-39e0-4728-b9b3-b93b966d855d.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UN7T745K%2F20251203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251203T071146Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF4aCXVzLXdlc3QtMiJHMEUCIG9EGNmDBonVz26YuNHDsHvyeg7ktm9kClYXRQO19z5SAiEAyUygIGGSnB2JMvqpLnd8bDpnWR5CKdWfINtbDqwoIvgq%2FwMIJxAAGgw2Mzc0MjMxODM4MDUiDGmiH0ySs2rvMQgARyrcA5CscJFC%2Ba2KnTvN1%2FS5YBCtKvwY2G8cVGin3krKqpBbnHV9hKoG1%2FcjO4%2B5iPEXZAdi2OvnDcUAYq0FwwXAPeoGM3ySH5SrmeSwU2sLqOxO%2BbnTd0nvMOHhlTAjco%2Bw4aLSYnqGBnSSHEfxlwv96rhAgXHbwgHU8qvEB1rnAxpNGON9nyVLoChxKtWUG1y4YOzwtg6JnVXdVPCRCJ1bxqm7hlltwojzT%2FljW0LzOIOJypTXra9n%2BzXZvDsgrcZvB1kRGpGqkL7AQWDq9t5mpr67utkm61suqlGAroD%2FKEiqa8zhXwbWAgys14dYmF%2FS662%2FCAY4txunt%2BTx1sMTPIxfxV1M4eOk9fEQ%2F9PfQFB830yLon3I%2ByhX5caJRPZ07zdeN80E9JfWKat7IDJDTltxScmWWu%2Fwj%2BPI44bJfWaGKi2zbDwW%2BT8Qw%2Fc8qBRLIbT7FW%2F%2Fumsw1dC0aHHoduuLRautwHUNnpMkNgT6yw2uW2mvFoF9gCV6Qp9uFkvWQVkT4t4p3NKDoGQTOk2dfQ7cWlJOkY81Y6dnh7iHSa99jOJbNdnIaIp6LLnf8qH%2FLKbV1A52dq8UXNtNK%2BVA9z6QxKLEYhVz3QgRSe2Cf60CbV40FzM96l7AEwC3MOWlv8kGOqUB4hLgx5CcEffQV%2FYOVWjnfoM%2B7Xog1IFjVi8Fk2jxFet6oAWCeau2TZZ%2FhaCZrNslIzEwzkr01udf44OfYZAFwg0N9aJ9vrmuWTB95BIroQVKIkzyH2igiEHr8uABM%2FqSf92%2B7a02DmfeTdhVI3%2FkLtJ%2FCxd%2Bgj%2Fe4%2Fvqn91Xtz8ifOmxacRdU27o2YpmKCKOGp8%2Bzg03T18a0aTve8dexdRdAnN8&X-Amz-Signature=df1f5b41c9eda611aa0f8ab78707be2bb948693cf2a6504a9dd12c280bea52aa&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/b5bb2d97-9e26-4130-a67d-0876cf0f895d/ee07ef86-39e0-4728-b9b3-b93b966d855d.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UN7T745K%2F20251203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251203T071146Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF4aCXVzLXdlc3QtMiJHMEUCIG9EGNmDBonVz26YuNHDsHvyeg7ktm9kClYXRQO19z5SAiEAyUygIGGSnB2JMvqpLnd8bDpnWR5CKdWfINtbDqwoIvgq%2FwMIJxAAGgw2Mzc0MjMxODM4MDUiDGmiH0ySs2rvMQgARyrcA5CscJFC%2Ba2KnTvN1%2FS5YBCtKvwY2G8cVGin3krKqpBbnHV9hKoG1%2FcjO4%2B5iPEXZAdi2OvnDcUAYq0FwwXAPeoGM3ySH5SrmeSwU2sLqOxO%2BbnTd0nvMOHhlTAjco%2Bw4aLSYnqGBnSSHEfxlwv96rhAgXHbwgHU8qvEB1rnAxpNGON9nyVLoChxKtWUG1y4YOzwtg6JnVXdVPCRCJ1bxqm7hlltwojzT%2FljW0LzOIOJypTXra9n%2BzXZvDsgrcZvB1kRGpGqkL7AQWDq9t5mpr67utkm61suqlGAroD%2FKEiqa8zhXwbWAgys14dYmF%2FS662%2FCAY4txunt%2BTx1sMTPIxfxV1M4eOk9fEQ%2F9PfQFB830yLon3I%2ByhX5caJRPZ07zdeN80E9JfWKat7IDJDTltxScmWWu%2Fwj%2BPI44bJfWaGKi2zbDwW%2BT8Qw%2Fc8qBRLIbT7FW%2F%2Fumsw1dC0aHHoduuLRautwHUNnpMkNgT6yw2uW2mvFoF9gCV6Qp9uFkvWQVkT4t4p3NKDoGQTOk2dfQ7cWlJOkY81Y6dnh7iHSa99jOJbNdnIaIp6LLnf8qH%2FLKbV1A52dq8UXNtNK%2BVA9z6QxKLEYhVz3QgRSe2Cf60CbV40FzM96l7AEwC3MOWlv8kGOqUB4hLgx5CcEffQV%2FYOVWjnfoM%2B7Xog1IFjVi8Fk2jxFet6oAWCeau2TZZ%2FhaCZrNslIzEwzkr01udf44OfYZAFwg0N9aJ9vrmuWTB95BIroQVKIkzyH2igiEHr8uABM%2FqSf92%2B7a02DmfeTdhVI3%2FkLtJ%2FCxd%2Bgj%2Fe4%2Fvqn91Xtz8ifOmxacRdU27o2YpmKCKOGp8%2Bzg03T18a0aTve8dexdRdAnN8&X-Amz-Signature=df1f5b41c9eda611aa0f8ab78707be2bb948693cf2a6504a9dd12c280bea52aa&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- Multimodal은 단일 modality가 감지하지 못하는 복잡한 패턴과 관계 밝힘
- 그러나 Multimodal system은 modality missing 문제에 직면하는 경우 많음 → 관심 커짐
- Missing modality가 발생하는 sample 제거는 단순하나 정보가 낭비되는 문제가 있음

_→ Missing modality에도 robust하게 작동하는 system 개발이 중요_



### Definition


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/3cf0d1ef-3cd1-433d-ace9-502a2061d49b/8bd66c4f-be6a-4ce6-963e-a632a4f5176a.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666VXAHPS6%2F20251203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251203T071147Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF8aCXVzLXdlc3QtMiJIMEYCIQCq6cBIjtjbCgfqA%2F7d5B7VHl4eJy17sv9lB2EOfObMswIhANtvkwfLBsue0CrQrYqDP0s3ZZ251oUn5lNHCDTuwBuEKv8DCCgQABoMNjM3NDIzMTgzODA1IgwFutGmPg8sP4UbQ7cq3ANWBNxCdhVOB8h%2B5BuoiwDiuZ98%2BVhvPxDACFRbVVyomwasNFID%2FNHGcKQ6ZuYqmVSyk4h5YtlKFJ6JFPs7b5oXArBy%2Bw6XEaWY71vg0EJMNyj1ghpyx6rK97vt3ikXtKi5oIpQERH808uA%2FiVA0njMYEfWTWCjIwQ7SoIIr6p%2FYerBeoBnktcXo0sbZhWnuVx0O22tEYktQ%2B19PVBXjkQUi%2F2yKcqEN5P%2FfoIdahVVkDp7hXmvGfpx8g%2BjGcozItv1DHzgjSpTu9Aozkks2ybKV5ndnBPHlah4t3C%2B3P3dBR2gwPdcsKkV5sDm4X%2BAkTBddrUGp9VUQ7Yenp4Xk0zeuyxVVvKXceAhhygF264ItW1pQygdvAPX1%2Br0VFLHjHMZi8J1NU26rCfKz7tA78KYSkxl9rQL7PemBaasg6xEKN%2F90y0F4YASSwF05y0NLu%2B%2B%2BOsSKxvuQmWfOZdVnnljKJ4LApWC6fAasJJ4%2FD3W0TAjOKugj2DKyU3ahSXt2zYfSqo9SedAm3%2BRgHePwlkYgJnwJavZ%2Bahxy1E9qd1E63iDnbSB%2F051ebw%2FXiVUNrq2P8uufV%2FAaOwJ955q7tSAX8C2Hb%2FbG%2BokU7ePfhOOPj2LK%2FGOIeyz%2Fl2sVjCoxL%2FJBjqkAdwUmAJdualrLkbjWzHc02d4dOWXVhGz6Sc2H54HtqW8zH5kqt9eNZAYsv9qNYAsqw5c9ruoQhe3nwYYtol2c5hcALM43wBy0sMpiBkvjMdkbWYyov2hAh85jdBkFs%2BKTqtoginvDAezl5P2JC8DLAheeObse1gIN7tlSCo5IQJIG0%2FXszJ0zmGgJMhUaTtjY8fq64Rb8AszesmOJK3VcLUzdeFF&X-Amz-Signature=ab515a93c21fce08c4900abc65fe76f64c81a4caa0efb30d44fc1b0f2043146b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/3cf0d1ef-3cd1-433d-ace9-502a2061d49b/8bd66c4f-be6a-4ce6-963e-a632a4f5176a.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666VXAHPS6%2F20251203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251203T071147Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF8aCXVzLXdlc3QtMiJIMEYCIQCq6cBIjtjbCgfqA%2F7d5B7VHl4eJy17sv9lB2EOfObMswIhANtvkwfLBsue0CrQrYqDP0s3ZZ251oUn5lNHCDTuwBuEKv8DCCgQABoMNjM3NDIzMTgzODA1IgwFutGmPg8sP4UbQ7cq3ANWBNxCdhVOB8h%2B5BuoiwDiuZ98%2BVhvPxDACFRbVVyomwasNFID%2FNHGcKQ6ZuYqmVSyk4h5YtlKFJ6JFPs7b5oXArBy%2Bw6XEaWY71vg0EJMNyj1ghpyx6rK97vt3ikXtKi5oIpQERH808uA%2FiVA0njMYEfWTWCjIwQ7SoIIr6p%2FYerBeoBnktcXo0sbZhWnuVx0O22tEYktQ%2B19PVBXjkQUi%2F2yKcqEN5P%2FfoIdahVVkDp7hXmvGfpx8g%2BjGcozItv1DHzgjSpTu9Aozkks2ybKV5ndnBPHlah4t3C%2B3P3dBR2gwPdcsKkV5sDm4X%2BAkTBddrUGp9VUQ7Yenp4Xk0zeuyxVVvKXceAhhygF264ItW1pQygdvAPX1%2Br0VFLHjHMZi8J1NU26rCfKz7tA78KYSkxl9rQL7PemBaasg6xEKN%2F90y0F4YASSwF05y0NLu%2B%2B%2BOsSKxvuQmWfOZdVnnljKJ4LApWC6fAasJJ4%2FD3W0TAjOKugj2DKyU3ahSXt2zYfSqo9SedAm3%2BRgHePwlkYgJnwJavZ%2Bahxy1E9qd1E63iDnbSB%2F051ebw%2FXiVUNrq2P8uufV%2FAaOwJ955q7tSAX8C2Hb%2FbG%2BokU7ePfhOOPj2LK%2FGOIeyz%2Fl2sVjCoxL%2FJBjqkAdwUmAJdualrLkbjWzHc02d4dOWXVhGz6Sc2H54HtqW8zH5kqt9eNZAYsv9qNYAsqw5c9ruoQhe3nwYYtol2c5hcALM43wBy0sMpiBkvjMdkbWYyov2hAh85jdBkFs%2BKTqtoginvDAezl5P2JC8DLAheeObse1gIN7tlSCo5IQJIG0%2FXszJ0zmGgJMhUaTtjY8fq64Rb8AszesmOJK3VcLUzdeFF&X-Amz-Signature=ab515a93c21fce08c4900abc65fe76f64c81a4caa0efb30d44fc1b0f2043146b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- **MLMM (Multimodal Learning with Missing Modality) **: Modality missing 문제 해결책
- **MLFM (Multimodal Learning with Full Modality)** : MLMM과 대조되는 모든 modality set 사용하는 방법


### Challenge

- train/test 중에 사용 가능한 modality 수에 관계없이 정보를 dynamic하게 handle/fusion
- Full modality sample 성능과 유사 성능 유지


### Domains

- information retrieval
- remote sensing
- robotic vision
- medical diagnosis
- sentiment analysis
- multi-view clustering

---


---



## Method


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/66502228-d1b0-4790-b025-23bcc5f96d18/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664Z2EWMMH%2F20251203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251203T071145Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF8aCXVzLXdlc3QtMiJGMEQCID4i%2FzxKbUC4VMKeHTMQw1inisA5aDPv0IPKkPRVQDDlAiAr6g65XuOzjfAb2LUBiwpShw2Wn3FbTxgTV87a4GwJ5Sr%2FAwgoEAAaDDYzNzQyMzE4MzgwNSIMuG8Yz7g36MzBQG1SKtwDxxvrsjKHrlPFgRrQd35dWrKKatrX5O9VSlvyAj8W4mELcDHUhT7fG0Jl8jdmNp7%2Fbe2VTxRB4srddryKuYzRnz8%2BSuqOIc1tDw4aGqsbg5lffRihJXiHcngacL6EJ%2BBogg0KgpsWf2NScSL8tqaOX87omM5KmezV0Zv8zHpngM%2BS2nLwk3Sg8RxJknPwB%2B766DyVuMLVkDKi3hwgdUCjPzqsDX%2BvFLtiLzjo7%2BiAj3MmQFboaX01fz9OAnKRlR%2BWRfpPam8Nb0JT%2B5qWaOT3u0t25bq2d9UeSNnG9PTF9DyQrbH%2B5xlNVwOr5rkZncm4sXsmu8uNKMGGGmUIXXkoxhaXAo%2FP%2FalZMLxhZmuoGXGLaG9jHuVpFkinPJFq4oRZePWn3t3KHcKrKZqiRUINL517z2ld5dv75tod6du4YpSJ92b71cwkGj0y0cfdM0Dm9yuxUaEs3ghNzQjAkEfhk2NCAC9WIz7Vz4OgdwRUme2ZnlyhHyf9PbZkf7ZbopbmeTTCCo3LazmTb09lBfjctVVBTokSZC7A8YD0O6G32HAEnN02L9sqDHe5GGEbYi48%2Bj6bb0fdrfzl0GteQ6IoNwh1K3Kcg%2B51gWSPo06betU7yzaXJ25RgPN98zwwqMS%2FyQY6pgE5Q2%2B%2Bc3ofVUBdCg%2Fu4BfeFcgU36I3sh5c8pPJz5bKFimeNJllT0szFsf3GwDiRMnmXYfYjAs%2FhMMyeB7SZLRhYZ8%2Fo8dlQfTWe9jRmeZGu1jnetWONNkIUWqsuaHxEa0C2hhK1CG90nXmJ73A7jU8QUzLvv%2FGPRhWcStvBqIK%2Boy9CDNBkIrZtKLyMc2UfHW4QVtu6in99UrG2SFsz1AkTKyt%2FHyR&X-Amz-Signature=b01aab675b394b28571b85aa9cbd7994691ab236c02f7d1aa04bc552976f5c1c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Data Processing Aspect


Model의 data processing 방법(시점)에 중점



#### **Modality Imputation**


modality data level에서 missing 처리, missing data 자체를 imputation


_→ modality missing을 정확히 imputation한다면 full modality로 간주_


	**Missing compositing** : 합성

	- `Zero/Random value composition`

		<span class="notion-red">_→ dataset의 다양성 줄임_</span>

	- `Retrieval-based composition` : 유사 분류의 sample에서 데이터 copy / average (KNN)

		<span class="notion-red">_→ pixel-level task에 부적합, KNN의 경우 cost가 높고 불균형 data에 민감_</span>


	**Missing generating** : GAN, Diffusion 통해 missing modality 생성

	- `Individual modality generation` : modality 별 생성 model 학습
	- `Unified modality generation` : 전체 modality 생성 가능한 model 학습

		<span class="notion-red">_→ 고품질 생성 한계, cost 높음_</span>



#### **Representation-Focused Models**


representation level에서 missing 처리


	**Coordinate representation **: 다른 modality의 representation를 semantic space에 align

	- `Regularization`
	- `Correlation`

		→ 두 개 또는 세 개 modality 사용시 성능 높음


	**Missing compositing**

	- `Retrieval-based composition` : 유사 sample의 feature 이용
	- `Arithmetic operation-based representation composition` : 비학습 방식, 단순 pooling 등

	**Missing generating**


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/5116ca66-ded0-4dc2-a7ae-a5bcb44bb6c3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ULR4VF3Y%2F20251203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251203T071149Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF4aCXVzLXdlc3QtMiJHMEUCICHwsiNkNmIeUm08Yi4Rlfe6n4kMz59g1k%2BTdzzk%2FA0lAiEA7nDH8mji%2FWpvUSMsNBil4YeiG2NC6Fc%2B1fKeT37o%2FLoq%2FwMIJxAAGgw2Mzc0MjMxODM4MDUiDJb8%2Bf5cQ1wgUMSNFCrcA4NJgTpfkcJC3hvVeIiBx0YfuWX6090n0pH4%2BDc%2Btl5d7JcB43oo4P59Bydn28pZrGeygKxsdn7vi1aS9pXnncMql9bJedfVSLx73TSMGDHmfJSXEVqVaFtFy4ueikm3cdOH8a%2BNrLBaz4BDcYKVAgpZbMmtOV3QZAgsTb%2F7Qt%2FO4CP%2FuX5duQn5zuSvBW7KorAcBDCKnidSkR6qIvEteiyiHbe4ZNNLk3LHmE8jzklKO36STbLk1IXTEtzl52L8NckcnGuqIT5rnjXY9TpYXbEbMU4fzkEuf8XVdVawFDlO%2BUXp3aEB8sWclHRDKJRyD5q%2BvtdHaLUCGShpqEeW43FidyejwVST68bPFOLVgWmv6z%2B1V02Syb7%2FgldbR83dY%2B%2FEi2v9uTytlFKtakZUDwjQae0QIb7LGnmDE4MmicKZTZYx%2FSVsh8LmJ4OQBIj5dQW1xxh5Pe4KvWFs25LagFtSmPBT%2Bw8mcJfutV2wa72UVj6qOgwzGgyEYUl8hcsDym8vszZo4bPXjaxZUQ6Sxy8PhrF7jE4cGt%2BNtzmR4ecxoTKG4ru%2FombbPyg2F8TNn3HX4%2BZzp2Jbqvg4HsIQD2NuolFfAHKe1ugsw%2FqEnhLzpFFJvFkn3tGCjuryMIOmv8kGOqUB7r51nEVR6A9DNeFZCnInPMs4CsSHmwx1zXp%2BljOgpRnUeII%2FQ6rGZsKG61rn0QtFHt5rTqXO5930eC99Z2ab4nGn5IrBPY%2F7wClwsRIBUndyCWtBbRAvZC9%2FOvIQTk5OXY9Ld89rO%2Bt%2Flx6voSAxbNeee26dAHOEx4y06ph5zHq%2F6u%2BFmrxcThS34rCFakMpt5GdcQqLak63b28fykpyz%2B1qAuoa&X-Amz-Signature=7a651914442fc463da33b677800ec31685b5ea547735c13e2b308d51021496c2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/5116ca66-ded0-4dc2-a7ae-a5bcb44bb6c3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ULR4VF3Y%2F20251203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251203T071149Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF4aCXVzLXdlc3QtMiJHMEUCICHwsiNkNmIeUm08Yi4Rlfe6n4kMz59g1k%2BTdzzk%2FA0lAiEA7nDH8mji%2FWpvUSMsNBil4YeiG2NC6Fc%2B1fKeT37o%2FLoq%2FwMIJxAAGgw2Mzc0MjMxODM4MDUiDJb8%2Bf5cQ1wgUMSNFCrcA4NJgTpfkcJC3hvVeIiBx0YfuWX6090n0pH4%2BDc%2Btl5d7JcB43oo4P59Bydn28pZrGeygKxsdn7vi1aS9pXnncMql9bJedfVSLx73TSMGDHmfJSXEVqVaFtFy4ueikm3cdOH8a%2BNrLBaz4BDcYKVAgpZbMmtOV3QZAgsTb%2F7Qt%2FO4CP%2FuX5duQn5zuSvBW7KorAcBDCKnidSkR6qIvEteiyiHbe4ZNNLk3LHmE8jzklKO36STbLk1IXTEtzl52L8NckcnGuqIT5rnjXY9TpYXbEbMU4fzkEuf8XVdVawFDlO%2BUXp3aEB8sWclHRDKJRyD5q%2BvtdHaLUCGShpqEeW43FidyejwVST68bPFOLVgWmv6z%2B1V02Syb7%2FgldbR83dY%2B%2FEi2v9uTytlFKtakZUDwjQae0QIb7LGnmDE4MmicKZTZYx%2FSVsh8LmJ4OQBIj5dQW1xxh5Pe4KvWFs25LagFtSmPBT%2Bw8mcJfutV2wa72UVj6qOgwzGgyEYUl8hcsDym8vszZo4bPXjaxZUQ6Sxy8PhrF7jE4cGt%2BNtzmR4ecxoTKG4ru%2FombbPyg2F8TNn3HX4%2BZzp2Jbqvg4HsIQD2NuolFfAHKe1ugsw%2FqEnhLzpFFJvFkn3tGCjuryMIOmv8kGOqUB7r51nEVR6A9DNeFZCnInPMs4CsSHmwx1zXp%2BljOgpRnUeII%2FQ6rGZsKG61rn0QtFHt5rTqXO5930eC99Z2ab4nGn5IrBPY%2F7wClwsRIBUndyCWtBbRAvZC9%2FOvIQTk5OXY9Ld89rO%2Bt%2Flx6voSAxbNeee26dAHOEx4y06ph5zHq%2F6u%2BFmrxcThS34rCFakMpt5GdcQqLak63b28fykpyz%2B1qAuoa&X-Amz-Signature=7a651914442fc463da33b677800ec31685b5ea547735c13e2b308d51021496c2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- `Indirect-to-task representation generation` : 
modality 학습 시 decoder도 함께 학습, missing에 대해 decoder로 representation 생성
- `Direct-to-task representation generation` : 
가용 modality의 representation으로 missing modality의 representation 생성하는 model 학습


### Strategy Design Aspect



#### **Architecture-Focused Models**


train/inference 단계에서 사용 가능한 modality에 adaptive하도록 설계


	**Attention-based**

	- `Attention fusion` : modality 내 또는 intra modality 에서의 attention fusion

		<span class="notion-red">_→ missing modality 의 정보는 실제 fusion 과정에서 무시, 존재하는 modality로 representation을 잘 만들기 위한 목적_</span>


	**Transformer-based**

	- `Joint representation learning` : modality encoder 의 출력을 transformer 기반의 fusion model에 전달
		- missing modality를  masking처리
	- `Parameter efficient learning` : Full modality sample들로 학습 후 누락 modality sample들로 LoRA 등 추가해 학습

	**Distillation-based** : full modality sample로부터의 distillation / model 내의 branch 통한 distillation

	- `Representation-based` : full modality로 학습된 teacher model로 missing modality로 학습되는 student model 지도
	- `Process-based`
	- `Hybrid` 

	<span class="notion-red">_→ teacher model의 학습 시 결국 full modality 요구_</span>


	**Graph Learning-based**

	- 각 modality `공통 space에 mapping`
	- 가용 modality를 dynamic하게 연결하는 `hyper edge` 도입
	- `graph attention` 

**MLLM **: LLM이 feature processor 역할, encoder feature 통합.



#### **Model Combinations**


architecture 또는 학습 방법을 통해 해결


	**Ensemble** : encoder 결합


	**Dedicated training** : train method 중심


	**Discrete scheduler** : LLM이 controller 역할을 해 task에 따라 적절한 module 선택


---


---


> 💡 <span class="notion-red">최근 MLMM task에 대한 연구가 늘어나고 있고 특히 의료나 비디오 등의 분야에서 주목받고 있는 듯 하다. GAN과 같은 generative model을 이용한 modality imputation 시도와 Auto encoder를 이용한 representation 단에서의 imputation이 주를 이루는 것 같다. Fusion이나 train method를 이용한 시도도 등장하고 있으나 조금 더 연구가 필요해 보인다.</span>

